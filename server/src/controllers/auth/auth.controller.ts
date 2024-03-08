/* istanbul ignore file */
import { Application, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ShamanExpressController } from "shaman-api";
import { SERVICE_TYPES } from "../../composition/app.composition.types";
import { IAuthService } from "../../services/auth/auth.service";

@injectable()
export class AuthController implements ShamanExpressController {
  private router: Router;
  name: string = "auth";

  constructor(
    @inject(SERVICE_TYPES.AuthService) private authService: IAuthService
  ) {}

  configure = (express: Application) => {
    let router = Router();
    router.post("/", this.login);

    express.use("/api/v1/auth", router);
  };

  login = (req: Request, res: Response, _next: any) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    this.authService
      .login(email, password)
      .then((user) => {
        res.json(user);
      })
      .catch((ex: Error) => res.status(401).json({ message: ex.message }));
  };
}

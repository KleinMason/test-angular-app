import { Application, Router } from "express";
import { inject, injectable } from "inversify";
import { RouteError, ShamanExpressController } from "shaman-api";
import { SERVICE_TYPES } from "../../composition/app.composition.types";
import { IUserService } from "../../services/user.service";

@injectable()
export class UserController implements ShamanExpressController {
  private router: Router;
  name: string = "user";

  constructor(
    @inject(SERVICE_TYPES.UserService) private userService: IUserService
  ) {}

  configure = (express: Application) => {
    let router = Router();
    router.get("/", this.getAllUsers);
    router.get("/:id", this.getUserById);
    router.post("/", this.addUser);

    express.use("/api/v1/user", router);
  };

  getAllUsers = (_req: any, res: any, next: any) => {
    return this.userService
      .getAllUsers()
      .then((users) => res.json(users))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  };

  getUserById = (req: any, res: any, next: any) => {
    const id: number = +req.params.id;
    if (isNaN(id)) return next(new RouteError("Invalid user id.", 400));
    return this.userService
      .getUserById(id)
      .then((user) => res.json(user))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  };

  addUser = (req: any, res: any, next: any) => {
    console.dir(req.body);
    if (!req.body.firstName)
      return next(new RouteError("First name not provided", 400));
    if (!req.body.lastName)
      return next(new RouteError("Last name not provided", 400));
    if (!req.body.email) return next(new RouteError("Email not provided", 400));
    if (!req.body.password)
      return next(new RouteError("Password not provided", 400));
    const { firstName, lastName, email, password } = req.body;
    return this.userService
      .addUser(firstName, lastName, email, password)
      .then((user) => res.json(user))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  };
}

import { Application, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { RouteError, ShamanExpressController } from 'shaman-api';
import { SERVICE_TYPES } from '../../composition/app.composition.types';
import { IAuthService } from '../../services/auth/auth.service';
import { IBlogService } from '../../services/blog/blog.service';
import { ControllerBase } from '../controller.base';

@injectable()
export class BlogController
  extends ControllerBase
  implements ShamanExpressController
{
  name: string = 'blog';

  constructor(
    @inject(SERVICE_TYPES.BlogService) private blogService: IBlogService,
    @inject(SERVICE_TYPES.AuthService) authService: IAuthService,
  ) {
    super(authService, []);
  }

  configure = (express: Application) => {
    let router = Router();
    router.get('/', this.authorize, this.getAllBlogs);

    express.use('/api/v1/blog', router);
  };

  getAllBlogs = (_req: Request, res: Response, next: any) => {
    return this.blogService
      .getAllBlogs()
      .then((blogs) => res.json(blogs))
      .catch((ex: Error) => next(new RouteError(ex.message, 500)));
  };
}

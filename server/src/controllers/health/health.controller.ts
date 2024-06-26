/* istanbul ignore file */
import { Request, Response, Application, Router } from 'express';
import { injectable } from 'inversify';
import { ShamanExpressController } from 'shaman-api';

@injectable()
export class HealthController implements ShamanExpressController {
  private router: Router;

  name: string = 'health';

  configure = (express: Application) => {
    let router = Router();
    router.get('/', this.getStatus);

    express.use('/api/v1/health', router);
  };

  getStatus = (_req: Request, res: Response, _next: any) => {
    res.json({ status: 'healthy' });
  };
}

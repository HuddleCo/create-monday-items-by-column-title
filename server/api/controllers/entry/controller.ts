import { Request, Response } from 'express';
import EntryService from '../../services/entry.service';

export class Controller {
  create(req: Request, res: Response): void {
    EntryService.create(
      req.body.name,
      req.body.business,
      req.body.contactNumber,
      req.body.email,
      req.body.message,
      req.body.newsletter
    ).then(() => res.status(200).json({ message: 'ok' }));
  }
}
export default new Controller();

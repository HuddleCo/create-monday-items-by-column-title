import { Request, Response } from 'express';
import EntryService from '../../services/entry.service';

export class Controller {
  create(req: Request, res: Response): void {
    EntryService.create(
      req.body.mondayBoardId,
      req.body.mondayDeveloperToken,
      req.body.name,
      req.body.mondayNameColumn,
      req.body.business,
      req.body.mondayBusinessColumn,
      req.body.contactNumber,
      req.body.mondayContactNumberColumn,
      req.body.email,
      req.body.mondayEmailColumn,
      req.body.message
    ).then(() => res.status(200).json({ message: 'ok' }));
  }
}
export default new Controller();

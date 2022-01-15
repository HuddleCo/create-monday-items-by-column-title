import { Request, Response, NextFunction } from 'express';

const HEADER = 'X-GRAVITY-FORMS-API-KEY';

export default function authorisationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.header(HEADER) === process.env.GRAVITY_FORMS_API_KEY) {
    next();
  } else {
    res.status(401).json({ message: `unrecognised ${HEADER} token` });
  }
}

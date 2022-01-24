import { Request, Response, NextFunction } from 'express';

const HEADER = 'X-STUDIO-BAND-GRAVITY-FORMS-API-KEY';

const invalidJSON = (str = ''): boolean => {
  str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
  str = str.replace(
    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    ']'
  );
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
  return !/^[\],:{}\s]*$/.test(str);
};

export default function authorisationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const keys: string = process.env.CREATE_MONDAY_ITEMS_API_KEYS || '[]';
  if (invalidJSON(keys)) {
    res
      .status(401)
      .json({ message: `unrecognised format for ${HEADER} token` });
    return;
  }

  if (JSON.parse(keys).some((key: string) => req.header(HEADER) === key)) {
    next();
  } else {
    res.status(401).json({ message: `unrecognised ${HEADER} token` });
  }
}

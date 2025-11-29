import { Response } from "express";

export const handleError = (res: Response, error: any, msg: string) => {
  console.error(msg, error);
  return res.status(500).json({ error: msg });
};

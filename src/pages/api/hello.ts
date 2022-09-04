import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
  res.status(200).json({ name: "John Doe" });

  // チェーン呼び出しせずに次のように記述しても OK
  // res.statusCode = 200
  // res.json({ name: 'John Doe'})
};

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTimeTableDatabyId } from "../../const/nebutas";
import { Nebuta } from "../../const/nebutas";
// API のレスポンス型
export type NebutasTimeTableByIdApiResponse = {
  Nebuta?: Nebuta;
  debugMessage?: string;
};

// API のエントリポイント
export default function timeTableByIdApi(
  req: NextApiRequest,
  res: NextApiResponse<NebutasTimeTableByIdApiResponse>
): void {
  const id = req.query.id as string;
  const nebuta = fetchTimeTableDatabyId(id);
  if (nebuta) {
    res.status(200).json({ Nebuta: nebuta });
  } else {
    res.status(400).json({ debugMessage: `nebuta [id=${id}] not found` });
  }
}
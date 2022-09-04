import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTimeTableData } from "../../const/nebutas";
import { Nebuta } from "../../const/nebutas";

// API のレスポンス型
export type NebutasTimeTableGetAllApiResponse = {
  Nebuta?: Nebuta[];
  debugMessage?: string;
};

// API のエントリポイント
export default function timeTableGetAllApi(
  req: NextApiRequest,
  res: NextApiResponse<NebutasTimeTableGetAllApiResponse>
): void {
  const nebuta = fetchTimeTableData();
  if (nebuta) {
    res.status(200).json({ Nebuta: nebuta });
  } else {
    res.status(400).json({ debugMessage: `nebutas not found` });
  }
}

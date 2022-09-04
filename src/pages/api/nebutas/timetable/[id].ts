import type { NextApiRequest, NextApiResponse } from "next";

type Waypoint = {
  lat: number;
  lng: number;
};

type Timetable = {
  arraivalTime: Date;
  waypoint: Waypoint;
};

export type Nebuta = {
  id: string;
  startPoint: Waypoint;
  name: string;
  shape: string;
  fastival: string;
  descriptions: string;
  organization: string;
  image: string;
  entryNumber: string;
  time_table: Timetable[] | any;
};

// API のレスポンス型
export type NebutasTimeTableByIdApiResponse = {
  Nebuta?: Nebuta;
  debugMessage?: string;
};

function addMinutes(date: any, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

function initializeTimeTable(waypoints: Waypoint[], currentTime: Date, requireTime: number[]): Timetable[] {
  let timetable: Timetable;
  let timetables: Timetable[] = [];
  console.log(waypoints);
  console.log([0, 1, 2]);
  waypoints.map(function (data, index) {
    currentTime = addMinutes(currentTime, requireTime[index]);
    timetable = { arraivalTime: currentTime, waypoint: data };
    timetables[index] = { ...timetable };
    console.log(index, timetables);
  });
  return timetables;
}

//配列をずらす関数
function shiftArray(original: Waypoint[]): Waypoint[][] {
  const points = [...original];
  let results: Waypoint[][] = [points];
  let pre;
  for (let i = 1; i <= 9; i++) {
    pre = points[0];
    points.shift();
    points.push(pre);
    results[i] = [...points];
  }
  return results;
}

// API のエントリポイント
export default function timeTableByIdApi(
  req: NextApiRequest,
  res: NextApiResponse<NebutasTimeTableByIdApiResponse>
): void {
  const id = req.query.id as string;
  const nebuta = fetchTimeTableData(id);
  if (nebuta) {
    res.status(200).json({ Nebuta: nebuta });
  } else {
    res.status(400).json({ debugMessage: `nebuta [id=${id}] not found` });
  }
}

// 擬似的なデータフェッチ関数
function fetchTimeTableData(id: string): Nebuta | undefined {
  let now = new Date();
  const points: Waypoint[] = [
    { lat: 35.65402334223389, lng: 139.74982448505963 },
    { lat: 35.65485274960821, lng: 139.7451873649693 },
    { lat: 35.65966314254042, lng: 139.74285422297962 },
    { lat: 35.65987640448466, lng: 139.74361249412627 },
    { lat: 35.658478343589756, lng: 139.7471122071108 },
    { lat: 35.65973422991844, lng: 139.74757883550873 },
    { lat: 35.659781621468646, lng: 139.7488037350533 },
    { lat: 35.65954466343638, lng: 139.7506119200953 },
    { lat: 35.65722243750996, lng: 139.7502911130717 },
  ];
  const requireTime: number[] = [10, 10, 10, 10, 10, 10, 10, 10, 10];

  const pointIWantForm: Waypoint[][] = shiftArray(points);

  console.log(pointIWantForm[0]);
  const nebutas: Nebuta[] = [
    {
      id: "1",
      name: "寝る豚",
      startPoint: points[0],
      shape: "ohgi",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[0], now, requireTime),
    },
    {
      id: "2",
      name: "sample",
      startPoint: points[1],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[1], now, requireTime),
    },
    {
      id: "3",
      name: "sample",
      startPoint: points[2],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[2], now, requireTime),
    },
    {
      id: "4",
      name: "sample",
      startPoint: points[3],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[3], now, requireTime),
    },
    {
      id: "5",
      name: "sample",
      startPoint: points[4],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[4], now, requireTime),
    },
    {
      id: "6",
      name: "sample",
      startPoint: points[5],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[5], now, requireTime),
    },
    {
      id: "7",
      name: "sample",
      startPoint: points[6],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[6], now, requireTime),
    },
    {
      id: "8",
      name: "sample",
      startPoint: points[7],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(shiftArray(points)[7], now, requireTime),
    },
    {
      id: "9",
      name: "sample",
      startPoint: points[8],
      shape: "sample",
      fastival: "sample",
      descriptions: "sample",
      organization: "sample",
      image: "sample",
      entryNumber: "sample",
      time_table: initializeTimeTable(pointIWantForm[8], now, requireTime),
    },
  ];
  return nebutas.find((nebuta) => nebuta.id === id);
}

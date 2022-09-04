import React from "react";

import { Nebuta } from "./RootMain";

export const NebutaPage: React.FC<{ nebuta: Nebuta }> = ({ nebuta: Nebuta }) => {
  return <>{Nebuta.id}</>;
};

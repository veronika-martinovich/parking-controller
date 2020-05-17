import React from "react";
import { ParkingTable } from "./ParkingTable";
import { ActionsPanel } from "./ActionsPanel";

export const Main = () => {
  return (
    <main className="main">
      <ActionsPanel/>
      <ParkingTable />
    </main>
  );
};

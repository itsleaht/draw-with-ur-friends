import React, { FunctionComponent } from "react";
import RoomList from "./RoomList/RoomList";

const UserPanel: FunctionComponent = () => {

  return (
    <div className="panel panel--user">
      <RoomList />
    </div>
  );
}

export default UserPanel;

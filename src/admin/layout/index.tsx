// LayOut.js
import { Outlet } from "react-router-dom";
import Header from "./component/Header";

const LayOut = () => {
  return (
    <div className="flex w-full h-screen">
      <Header />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default LayOut;

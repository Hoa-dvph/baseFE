import { Outlet } from "react-router-dom";
import Header from "./component/Header";

const LayOut = () => {
  return (
    <div className="w-[80%] mx-auto py-[3rem] flex flex-col gap-5 h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayOut;

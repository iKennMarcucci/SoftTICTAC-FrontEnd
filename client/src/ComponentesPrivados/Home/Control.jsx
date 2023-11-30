import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isOpenState } from "@/Contextos/RecoilState";

function Control() {
  const isOpen = useRecoilValue(isOpenState);

  return (
    <div
      className={`mt-24 flex-1 transition-all duration-300 ${
        isOpen ? "ml-72" : "ml-36 max-sm:ml-0"
      }`}
    >
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Control;

import { Outlet } from "react-router-dom";
import PublicNavbar from "../layout/PublicNavbar";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;

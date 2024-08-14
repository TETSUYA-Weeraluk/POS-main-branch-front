import { useSelector } from "react-redux";
import { RootState } from "../../store";
import icon from "../../assets/icon/cyborg.png";
import { LuUserCircle } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DefaultNavbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token-pos");
    navigate("/login");
  };

  return (
    <div className="p-4 shadow flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img className="w-[50px] h-[50px]" src={icon} alt="" />
        <p>POS System</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <LuUserCircle />
          <span>{user.name}</span>
        </div>

        <button className="flex items-center gap-2" onClick={handleLogout}>
          <IoLogOutOutline />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default DefaultNavbar;

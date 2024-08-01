import React from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../services/api";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      
      if (refreshToken) {
        await logoutApi(refreshToken).unwrap();
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error(`Failed to log out: ${error}`);
    }
  };

  return (
      <button
        onClick={handleLogout}
        className="flex justify-center items-center ml-2 py-1 px-2 border border-transparent text-xs font-medium rounded-md text-white bg-doc hover:text-red-700 focus:outline-none"
      >
        Logout
      </button>
  );
};

export default LogoutButton;

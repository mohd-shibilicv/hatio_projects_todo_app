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
        className="absolute top-0 right-0 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-doc hover:text-red-700 focus:outline-none"
      >
        Logout
      </button>
  );
};

export default LogoutButton;

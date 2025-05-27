import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RedirectNonAdminUsers = ({ children }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user?.role !== "admin") {
      navigate("/");
      toast.error("Unauthorized path.");
    }
  });

  if (!user || user?.role !== "admin") {
    return null;
  }
  return <div>{children}</div>;
};

export default RedirectNonAdminUsers;

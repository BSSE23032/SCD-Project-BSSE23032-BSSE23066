import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  const validateLogin = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      toast.error("Login required", { position: "bottom-right" });
      navigate("/login");
      return false;
    }
    return true;
  };

  return {
    validateLogin,
  };
};

export default useAuthCheck;

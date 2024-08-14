import { useNavigate } from "react-router-dom";
import { useAuth } from "../../config/authProvider";

const RestaurantDetailPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const backToSelectRestaurant = () => {
    navigate("/");
  };

  return (
    <div className="h-full p-4">
      {user.role === "ADMIN" && (
        <button className="button-base w-auto" onClick={backToSelectRestaurant}>
          Back
        </button>
      )}
    </div>
  );
};

export default RestaurantDetailPage;

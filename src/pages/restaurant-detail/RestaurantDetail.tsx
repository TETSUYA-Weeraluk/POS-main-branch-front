import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../config/authProvider";
import { useEffect, useState } from "react";
import { RestaurantDetail } from "./ResturantDetailType";
import axios from "axios";
import { BASE_API, path } from "../../config/config";

const RestaurantDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();

  const [branch, setBranch] = useState<RestaurantDetail | null>(null);

  const backToSelectRestaurant = () => {
    navigate("/");
  };

  useEffect(() => {
    if (params["idRestaurant"]) {
      const id = params["idRestaurant"];
      const fetch = async () => {
        try {
          const response = await axios.get(
            `${BASE_API}${path.resturant.get}/${id}`
          );

          setBranch(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetch();
    }
  }, [params]);

  return (
    <div className="h-full p-4 space-y-10">
      {user.role === "ADMIN" && (
        <button className="button-base w-auto" onClick={backToSelectRestaurant}>
          Back
        </button>
      )}

      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">{branch?.name}</h1>
        <div className="p-4 border rounded space-y-4">
          <h2 className="text-xl font-bold">Branches</h2>
          <div className="flex flex-wrap gap-4">
            {branch?.branch && branch.branch.length > 0 ? (
              branch.branch.map((branch, index) => (
                <div className="border rounded-md p-4 space-y-2" key={index}>
                  {branch.image ? (
                    <img
                      className="object-contain rounded min-h-[250px] h-[250px] max-h-[250px]"
                      src={`/${branch.image}`}
                      alt="image branch"
                    />
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center min-h-[250px] h-[250px] max-h-[250px] border font-bold">
                      <p>Image not found</p>
                    </div>
                  )}
                  <p>Name : {branch.name}</p>

                  <p>Address : {branch.address}</p>
                  <p>Phone : {branch.phone}</p>
                  <p>Employee : {branch.employee.length}</p>
                </div>
              ))
            ) : (
              <p>Branch not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;

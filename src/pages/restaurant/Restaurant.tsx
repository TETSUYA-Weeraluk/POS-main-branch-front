import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { getOwnerRestaurant } from "../../store/restaurantSlice";
import { TiPlus } from "react-icons/ti";
import DialogAddStore from "./components/Dialog-Add-Store";
import DialogDeleteStore from "./components/Dialog-Delete-Store";
import { Restaurant } from "./Restaurant-type";
import DialogAlert from "../../components/dialog/Dialog-Alert";
import axios from "axios";
import { BASE_API } from "../../config/config";

const RestaurantPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );

  const [open, setOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Restaurant | null>(null);
  const [openDialogAlert, setOpenDialogAlert] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(getOwnerRestaurant(user.id));
    }
  }, [user, dispatch]);

  const handleClose = () => {
    setOpen(false);
    setSelectedStore(null);
  };

  const handleOpenDialogDelete = (store: Restaurant) => {
    setSelectedStore(store);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleOpenDialogEdit = (store: Restaurant) => {
    setSelectedStore(store);
    setOpen(true);
  };

  const handleOpenDialogAlert = () => {
    setOpenDialogAlert(true);
  };

  const handleCloseDialogAlert = () => {
    setOpenDialogAlert(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const test = await axios.get(`${BASE_API}users/Getme`);
    };

    fetch();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <DialogAlert onClose={handleCloseDialogAlert} open={openDialogAlert} />

      {open && (
        <DialogAddStore
          open={open}
          handleClose={handleClose}
          userId={user.id}
          store={selectedStore}
        />
      )}
      {openDialogDelete && (
        <DialogDeleteStore
          open={openDialogDelete}
          onClose={handleCloseDialogDelete}
          store={selectedStore}
          onOpenDialogAlert={handleOpenDialogAlert}
        />
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="button-base flex items-center justify-center gap-2"
        >
          <TiPlus /> Add Store
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {restaurant &&
          restaurant.length > 0 &&
          restaurant.map((res) => (
            <div
              key={res.id}
              className="border hover:cursor-pointer p-4 rounded-md space-y-4 shadow-md w-full h-full flex flex-col"
            >
              {res.image ? (
                <img
                  className="object-contain rounded min-h-[250px] h-[250px] max-h-[250px]"
                  src={res.image}
                  alt="Image Restaurant"
                />
              ) : (
                <div className="w-full flex flex-col items-center justify-center min-h-[250px] h-[250px] max-h-[250px] border font-bold">
                  <p>Image not found</p>
                </div>
              )}
              <div className="h-full w-full">
                <p>Name : {res.name}</p>
                <p>
                  Owner :{" "}
                  {res.userRestaurant &&
                    res.userRestaurant
                      .map((user) => user.user.name)
                      .join(" , ")}
                </p>
                <p>Branch : {res.branch.length}</p>
              </div>
              <div className="flex justify-between gap-4 w-full">
                <button
                  onClick={() => handleOpenDialogDelete(res)}
                  className="button-base bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleOpenDialogEdit(res)}
                  className=" w-full px-4 py-2 rounded-md bg-yellow-300"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantPage;

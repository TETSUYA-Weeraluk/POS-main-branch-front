import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { useAppDispatch } from "../../../store";
import {
  createRestaurant,
  updateRestaurant,
} from "../../../store/restaurantSlice";
import { Restaurant } from "../Restaurant-type";
import { useEffect } from "react";

interface DialogAddStoreProps {
  open: boolean;
  handleClose: () => void;
  userId: string;
  store: Restaurant | null;
}

const defaultValues = {
  name: "",
  image: "",
};

const schema = zod.object({
  name: zod.string(),
  image: zod.string(),
});

const DialogAddStore = (props: DialogAddStoreProps) => {
  const { t } = useTranslation();
  const { open, handleClose, userId, store } = props;
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({
      name: store?.name || "",
      image: store?.image || "",
    });
  }, [store, reset]);

  const addOrUpdateStore = (e: { name: string; image: string }) => {
    if (store) {
      dispatch(
        updateRestaurant({
          name: e.name,
          image: e.image,
          id: store.id,
        })
      );
    } else {
      dispatch(
        createRestaurant({
          name: e.name,
          image: e.image,
          userId,
        })
      );
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent>
        <form onSubmit={handleSubmit(addOrUpdateStore)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Store Name"
                type="text"
                className="border border-primary w-full px-4 py-2 rounded-md"
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <TextField
                  {...field}
                  label="Image"
                  type="text"
                  className="border border-primary w-full px-4 py-2 rounded-md"
                />
                <div className="w-full flex justify-center">
                  {field.value ? (
                    <img
                      className="h-[200px] w-[200px] object-contain"
                      src={field.value}
                      alt=""
                    />
                  ) : (
                    <span>Image not found</span>
                  )}
                </div>
              </div>
            )}
          />

          <div className="flex items-center justify-between w-full gap-4">
            <button className="button-base" type="submit">
              {t("confirm")}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="border border-primary w-full px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddStore;

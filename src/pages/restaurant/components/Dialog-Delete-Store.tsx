import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Restaurant } from "../Restaurant-type";
import { useAppDispatch } from "../../../store";
import { removeRestaurant } from "../../../store/restaurantSlice";

interface DialogDeleteStoreProps {
  open: boolean;
  onClose: () => void;
  store: Restaurant | null;
  onOpenDialogAlert: () => void;
}

const DialogDeleteStore = (props: DialogDeleteStoreProps) => {
  const { open, onClose, store, onOpenDialogAlert } = props;
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    if (store?.id) {
      dispatch(removeRestaurant(store?.id));
      onClose();
      onOpenDialogAlert();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="alert-dialog-title">
        Do you want to delete store {store?.name}?
      </DialogTitle>
      <DialogContent>
        <div className="flex justify-center">
          <img src="/src/assets/remove-gif.gif" alt="confirm" />
        </div>
      </DialogContent>

      <DialogActions>
        <button onClick={onConfirm} className="button-base" disabled={!store}>
          Confirm
        </button>
        <button
          onClick={onClose}
          className="border border-primary w-full px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteStore;

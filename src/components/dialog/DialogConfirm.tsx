import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DialogConfirmProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DialogConfirm = (props: DialogConfirmProps) => {
  const { title, open, onClose, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div className="flex justify-center">
          <img src="/src/assets/confirm.gif" alt="confirm" />
        </div>
      </DialogContent>

      <DialogActions>
        <button onClick={onConfirm} className="button-base">
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

export default DialogConfirm;

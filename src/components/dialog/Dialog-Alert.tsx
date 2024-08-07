import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DialogAlertProps {
  open: boolean;
  onClose: () => void;
}

const DialogAlert = (props: DialogAlertProps) => {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Success</DialogTitle>
      <DialogContent>
        <div className="flex justify-center">
          <img src="/src/assets/correct.gif" alt="confirm" />
        </div>
      </DialogContent>

      <DialogActions>
        <button className="button-base" onClick={onClose}>Close</button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;

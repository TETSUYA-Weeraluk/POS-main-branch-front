import { Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DialogSelectCodeProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
  listCode: {
    code: string;
    discount: number;
    description: string;
    percent: boolean;
  }[];
}

const DialogSelectCode = (props: DialogSelectCodeProps) => {
  const { t } = useTranslation();
  const { open, onClose, onConfirm, listCode } = props;
  const [selectedCode, setSelectedCode] = useState<string>("");

  const confirm = () => {
    onConfirm(selectedCode);
    onClose();
  };

  const handleSelectCode = (code: string) => {
    setSelectedCode(code);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <div className="space-y-4 p-4">
        {listCode.map((code) => (
          <div
            className="border rounded sapce-y-2 p-4 hover:cursor-pointer"
            style={{
              borderColor: selectedCode === code.code ? "#279eff" : "#D3D3D3",
            }}
            onClick={() => handleSelectCode(code.code)}
          >
            <div className="flex flex-col">
              <span>{t('code')} : {code.code}</span>
              <span>{t('description')} : {code.description}</span>
            </div>
          </div>
        ))}
      </div>
      <DialogActions>
        <button onClick={confirm} className="button-base">
          {t("confirm")}
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

export default DialogSelectCode;

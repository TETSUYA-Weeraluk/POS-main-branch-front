import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { RootState, useAppDispatch } from "../../../../store";
import { addInCart, confirmOrder, removeItem } from "../../../../store/orderSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import DialogConfirm from "../../../../components/dialog/DialogConfirm";
import DialogAlert from "../../../../components/dialog/Dialog-Alert";
import DialogSelectCode from "./DialogSelectCode";
import { CiCircleRemove } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const ListOrderComponent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const orders = useSelector((state: RootState) => state.order.cart);

  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [takeAway, setTakeAway] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<string>("table1");
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [openDialogCode, setOpenDialogCode] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [descriptionDiscount, setDescriptionDiscount] = useState<string>("");
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const addItem = (type: string, name: string, price: number) => {
    dispatch(addInCart({ name, price, type }));
  };

  const removeItemInCart = (type: string, name: string, price: number) => {
    dispatch(removeItem({ name, type, price }));
  };

  if (orders.items.length < 1) {
    return;
  }

  const confirm = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialogAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseDialogAlert = () => {
    setOpenAlert(false);
  };

  const handleConfirm = () => {
    handleClose();
    dispatch(
      confirmOrder({
        cart: orders,
        codeDiscount: selectedCode,
        discount: discount,
        descriptionDiscount: descriptionDiscount,
        total: orders.total,
      })
    );
    handleOpenDialogAlert();
  };

  const handleCheckOrderToTable = () => {
    setTakeAway((prev) => !prev);
  };

  const handleSelectTable = (e: SelectChangeEvent<string>) => {
    setSelectedTable(e.target.value as string);
  };

  const handleSelectCode = (code: string) => {
    const selectedCode = mockCode.find((item) => item.code === code);
    if (selectedCode) {
      setSelectedCode(selectedCode?.code);
      setDescriptionDiscount(selectedCode?.description);
      if (selectedCode.percent) {
        setDiscount(() => (orders.total * selectedCode.discount) / 100);
        setFinalTotal(
          () => orders.total - (orders.total * selectedCode.discount) / 100
        );
      } else {
        setDiscount(selectedCode.discount);
        setFinalTotal(orders.total - selectedCode.discount);
      }
    }
  };

  const handleOpenDialogCode = () => {
    setOpenDialogCode(true);
  };

  const handleCloseDialogCode = () => {
    setOpenDialogCode(false);
  };

  const table = ["table1", "table2", "table3"];

  const mockCode = [
    { code: "1234", discount: 10, description: "10%", percent: true },
    { code: "5678", discount: 20, description: "20%", percent: true },
    { code: "1111", discount: 30, description: "30฿", percent: false },
  ];

  const handleResetCode = () => {
    setSelectedCode("");
    setDiscount(0);
    setDescriptionDiscount("");
    setFinalTotal(0);
  };

  return (
    <div
      className="space-y-4 border rounded h-full p-4 overflow-auto"
      style={{
        maxHeight: "calc(100vh - 180px)",
      }}
    >
      <p className="text-center text-colorText font-bold">{t("order")}</p>

      <FormControlLabel
        control={
          <Checkbox onChange={handleCheckOrderToTable} value={takeAway} />
        }
        label={t("takeAway")}
      />

      {!takeAway ? (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="select-table">{t("table")}</InputLabel>
          <Select
            fullWidth
            label={t("table")}
            value={selectedTable}
            onChange={(e) => handleSelectTable(e)}
            input={<OutlinedInput label={t("table")} />}
          >
            {table.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          fullWidth
          id="name-customer"
          label="Name"
          variant="outlined"
        />
      )}

      <Divider />

      {/* List */}
      {orders.items.map((order) => (
        <div className="space-y-2" key={order.type}>
          <span className="font-bold text-lg">{order.type}</span>
          {order.order.map((item, index) => (
            <div
              key={item.name + index}
              className="grid grid-cols-3 gap-4 border-b items-center"
            >
              <div className="flex flex-col">
                <span className="text-wrap line-clamp-2">{item.name}</span>
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  className="button-base"
                  onClick={() =>
                    removeItemInCart(order.type, item.name, item.price)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="button-base"
                  onClick={() => addItem(order.type, item.name, item.price)}
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span>{item.price}฿</span>
                <span className="text-neutral-400">
                  {item.quantity * item.price}฿
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="w-full space-y-2">
        {openDialogCode && (
          <DialogSelectCode
            open={openDialogCode}
            onClose={handleCloseDialogCode}
            onConfirm={handleSelectCode}
            listCode={mockCode}
          />
        )}

        <div className="flex items-center justify-between">
          <button
            className="border w-full py-2 border-primary rounded"
            onClick={handleOpenDialogCode}
          >
            {selectedCode ? `Code : ${selectedCode}` : t("selectCode")}
          </button>
          {selectedCode && (
            <IconButton aria-label="delete" onClick={handleResetCode}>
              <CiCircleRemove />
            </IconButton>
          )}
        </div>
      </div>

      <Divider />

      {/* Total */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-400">
            <span>{t("total")}</span>
            <span>{orders.total}฿</span>
          </div>

          <div className="flex justify-between text-neutral-400">
            <span>
              {t("discount")} {descriptionDiscount}
            </span>
            <span>{discount ? `-${discount}` : discount}฿</span>
          </div>

          <div className="flex justify-between font-bold">
            <span className="text-xl font-bold">{t("totalPaid")}</span>
            <span>{discount ? finalTotal : orders.total}฿</span>
          </div>
        </div>

        <div>
          <button onClick={confirm} className="button-base">
            {t("confirm")}
          </button>
        </div>
      </div>

      <DialogConfirm
        title="Confirm Order"
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      <DialogAlert open={openAlert} onClose={handleCloseDialogAlert} />
    </div>
  );
};

export default ListOrderComponent;

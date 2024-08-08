import { Divider, TextField } from "@mui/material";
import { RootState, useAppDispatch } from "../../../store";
import { addInCart, confirmOrder, removeItem } from "../../../store/orderSlice";
import { useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import DialogConfirm from "../../../components/dialog/DialogConfirm";
import DialogAlert from "../../../components/dialog/Dialog-Alert";

const ListOrderComponent = () => {
  const dispatch = useAppDispatch();

  const orders = useSelector((state: RootState) => state.order.cart);

  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [descriptionDiscount, setDescriptionDiscount] = useState<string>("");
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [errorCode, setErrorCode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const addItem = (type: string, name: string, price: number) => {
    dispatch(addInCart({ name, price, type }));
  };

  const removeItemInCart = (type: string, name: string, price: number) => {
    dispatch(removeItem({ name, type, price }));
  };

  if (orders.items.length < 1) {
    return;
  }

  const checkCode = (code: string) => {
    setErrorCode(false);
    if (code === "Hello") {
      const total = orders.total;
      setDiscount(10);
      setFinalTotal(total - 10);
      setDescriptionDiscount("10฿");
    } else if (code === "World") {
      const total = orders.total;
      const disc = total * 0.1;
      setDiscount(disc);
      setFinalTotal(total - disc);
      setDescriptionDiscount("10%");
    } else {
      setErrorCode(true);
    }
  };

  const inputCode = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorCode(false);
    }

    setCode(e.target.value);
  };

  const removeCode = () => {
    setCode("");
    setDiscount(0);
    setDescriptionDiscount("");
  };

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
        codeDiscount: code,
        discount: discount,
        descriptionDiscount: descriptionDiscount,
        total: orders.total,
      })
    );
    handleOpenDialogAlert();
  };

  return (
    <div className="space-y-4 border rounded h-full p-4">
      <p className="text-center text-colorText font-bold">Order</p>
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
        <div className="gap-2">
          <TextField
            type="text"
            label="Code discount"
            className="w-full"
            onChange={(e) => inputCode(e)}
            value={code}
            error={errorCode}
            helperText={errorCode ? "Code is invalid" : ""}
            disabled={discount > 0}
            InputProps={{
              endAdornment: discount > 0 && (
                <button onClick={() => removeCode()}>X</button>
              ),
            }}
          />
        </div>
        <button
          className="border w-full py-2 border-primary rounded"
          onClick={() => checkCode(code)}
        >
          Check code
        </button>
      </div>

      <Divider />

      {/* Total */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-400">
            <span>price</span>
            <span>{orders.total}฿</span>
          </div>

          <div className="flex justify-between text-neutral-400">
            <span>discount {descriptionDiscount}</span>
            <span>{discount ? `-${discount}` : discount}฿</span>
          </div>

          <div className="flex justify-between font-bold">
            <span className="text-xl font-bold">Total</span>
            <span>{discount ? finalTotal : orders.total}฿</span>
          </div>
        </div>

        <div>
          <button onClick={confirm} className="button-base">
            Confirm
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

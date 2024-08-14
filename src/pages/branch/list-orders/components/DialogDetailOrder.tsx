import { Dialog, DialogActions, Divider } from "@mui/material";
import { ListOrdersType } from "../../order/order-type";

interface DialogDetailOrderProps {
  data: {
    order: ListOrdersType;
    orderNumber: number;
  };
  open: boolean;
  onClose: () => void;
}

const DialogDetailOrder = (props: DialogDetailOrderProps) => {
  const { data, open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="border rounded p-4 space-y-4 h-full min-w-96">
        <div className="flex justify-between items-center">
          <span>Order : {data.orderNumber}</span>
          <span
            className=" rounded"
            style={{
              backgroundColor: "#FFDE4D",
              padding: "0.25rem 0.5rem",
            }}
          >
            {data.order.status}
          </span>
        </div>

        <div className="space-y-2 p-2 rounded">
          {data.order.orders.map((order) => (
            <div key={order.type} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-semibold">{order.type}</span>
              </div>
              <div className="px-2">
                <div>
                  {order.order.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between">
                        <span>
                          {item.name} | {item.quantity}x
                        </span>
                        <span>{item.price}฿</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-sm text-neutral-400">
                          {item.price * item.quantity}฿
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <p className="flex justify-between">
                    <span className="text-sm text-neutral-400">Quantity</span>
                    <span className="text-sm text-neutral-400">
                      {order.quantity}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="">Total</span>
                    <span className="">{order.total}฿</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border p-2 rounded">
          <span>Summary</span>
          <div className="space-y-1 px-2">
            <div>
              <p className="flex justify-between">
                <span className="text-sm text-neutral-400">Total Quantity</span>
                <span className="text-sm text-neutral-400">
                  {data.order.quantity}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-sm text-neutral-400">Total</span>
                <span className="text-sm text-neutral-400">
                  {data.order.total}฿
                </span>
              </p>
            </div>
            <Divider />
            <div>
              <p className="flex justify-between">
                <span className="text-sm text-neutral-400">Code</span>
                <span className="text-sm text-neutral-400">
                  {data.order.code}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-sm text-neutral-400">
                  Discount {data.order.descriptionDiscount}
                </span>
                <span className="text-sm text-neutral-400">
                  {data.order.discount}฿
                </span>
              </p>
            </div>
            <Divider />
            <p className="flex justify-between">
              <span className="font-bold">Total Paid</span>
              <span className="font-bold">{data.order.total}฿</span>
            </p>
          </div>
        </div>
      </div>
      <DialogActions>
        <button className="button-base" onClick={onClose}>
          Change status
        </button>
        <button
          className="px-4 py-2 w-full border border-primary rounded"
          onClick={onClose}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDetailOrder;

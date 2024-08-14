import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Divider } from "@mui/material";
import { useState } from "react";
import { ListOrdersType } from "../order/order-type";
import DialogDetailOrder from "./components/DialogDetailOrder";

const ListOrders = () => {
  const listItems = useSelector((state: RootState) => state.order.listOrders);

  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    order: ListOrdersType;
    orderNumber: number;
  } | null>(null);

  const handleOpenDialogDetail = (
    items: ListOrdersType,
    orderNumber: number
  ) => {
    setSelectedOrder({
      order: items,
      orderNumber: orderNumber,
    });
    setOpenDialogDetail(true);
  };

  const handleCloseDialogDetail = () => {
    setOpenDialogDetail(false);
  };

  if (listItems.length === 0) {
    return <span>No orders</span>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">List Orders</h1>

      <div className="grid grid-cols-5 md:grid-cols-3 gap-4">
        {listItems &&
          listItems.length > 0 &&
          listItems.map((item, index) => (
            <div key={index} className="border rounded shadow p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span>Order : {index + 1}</span>
                <span className="bg-yellow-300 p-2 rounded">{item.status}</span>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span>Table</span>
                  <span>1</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Total Quantity</span>
                  <span>{item.quantity}</span>
                </div>
              </div>

              <Divider />

              <div className="flex items-center gap-4">
                <button
                  className="button-base"
                  onClick={() => handleOpenDialogDetail(item, index + 1)}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
      </div>

      {selectedOrder && (
        <DialogDetailOrder
          open={openDialogDetail}
          onClose={handleCloseDialogDetail}
          data={selectedOrder}
        />
      )}
    </div>
  );
};

export default ListOrders;

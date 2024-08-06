import ItemCardMenuComponent from "./components/ItemCardMenu.component";
import { useState } from "react";
import ListOrderComponent from "./components/ListOrder.component";
import { listItems } from "./dataItems";
import { OrderType } from "./order-type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface Item {
  name: string;
  price: number;
  image: string;
  type: string;
}

const Order = () => {
  const listTypes = Object.values(OrderType);

  const [items, setItems] = useState<Item[]>(listItems);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const test = useSelector((state: RootState) => state.order.listOrders);

  console.log("test", test);

  const selectType = (type: string) => {
    if (type === "ALL") {
      setItems(listItems);
      setSelectedType("ALL");
      return;
    }

    setSelectedType(type);
    setItems(listItems.filter((item) => item.type === type));
  };

  return (
    <div className="space-y-4">
      {/* Select Type */}
      <div className="flex flex-wrap gap-4">
        {listTypes.map((type, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${
              selectedType === type
                ? "bg-primary text-colorTextSecondary"
                : "bg-colorTextSecondary text-primary border border-primary"
            }`}
            onClick={() => selectType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* All Item */}
      <div className="flex gap-4 w-full">
        <div className="space-y-4 col-span-2 w-full">
          <div
            className="grid grid-cols-4 w-full flex-grow gap-4 overflow-auto"
            style={{
              maxHeight: "calc(100vh - 180px)",
            }}
          >
            {items.map((item, index) => (
              <ItemCardMenuComponent
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/* Cart */}
        <ListOrderComponent />
      </div>
    </div>
  );
};

export default Order;

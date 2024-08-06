import { Divider } from "@mui/material";
import ItemCardMenuComponent from "./components/ItemCardMenu.component";
import { useState } from "react";
import ListOrderComponent from "./components/ListOrder.component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Item {
  name: string;
  price: number;
  image: string;
  type: string;
}

const Order = () => {
  const listItems: Item[] = [
    {
      name: "Red Potion",
      price: 10,
      image: "red-potion.png",
      type: "Drink",
    },
    {
      name: "Orange Potion",
      price: 20,
      image: "orange-potion.png",
      type: "Drink",
    },
    {
      name: "Orange Potion",
      price: 30,
      image: "orange-potion.png",
      type: "Food",
    },
    {
      name: "Orange Potion",
      price: 40,
      image: "orange-potion.png",
      type: "Dessert",
    },
  ];

  const listTypes = ["Drink", "Food", "Dessert", "Snack"];

  const [items, setItems] = useState<Item[]>(listItems);
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const itemInCart = useSelector((state: RootState) => state.order.cart);

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
      <div className="flex flex-wrap gap-4">
        <button
          className={`rounded px-4 py-2 ${
            selectedType === "ALL"
              ? "bg-primary text-colorTextSecondary"
              : "bg-colorTextSecondary text-primary"
          }`}
          onClick={() => selectType("ALL")}
        >
          All
        </button>
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

      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="space-y-4 col-span-2">
          <div className="grid grid-cols-3 w-full flex-grow gap-4">
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

        <div className="space-y-4 border rounded h-full p-4">
          <p className="text-center text-colorText font-bold">Order</p>
          <Divider />
          <ListOrderComponent orders={itemInCart} />
        </div>
      </div>
    </div>
  );
};

export default Order;

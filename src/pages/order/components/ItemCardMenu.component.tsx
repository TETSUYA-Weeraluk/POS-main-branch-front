import { Card, CardActions, CardContent, Divider } from "@mui/material";
import { useAppDispatch } from "../../../store";
import { addInCart } from "../../../store/orderSlice";

export interface ItemCardMenuComponentProps {
  name: string;
  price: number;
  image?: string;
  type: string;
}

const ItemCardMenuComponent = (props: ItemCardMenuComponentProps) => {
  const { name, price, image, type } = props;
  const dispatch = useAppDispatch();

  const addItemToCart = () => {
    dispatch(addInCart({ name, price, type }));
  };

  return (
    <Card variant="outlined" className="h-full flex flex-col shadow-md">
      <CardContent className="flex flex-col flex-grow">
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-center">
            <img
              src={image}
              alt=""
              className="h-[100px] w-[150px] hover:scale-150 transition-transform duration-500 object-contain"
            />
          </div>
          <Divider />
          <span>Name : {name}</span>
          <span>Price : {price}฿</span>
        </div>
      </CardContent>
      <Divider />
      <CardActions className="flex-shrink-0">
        <button onClick={addItemToCart} className="button-base">
          + Add Item
        </button>
      </CardActions>
    </Card>
  );
};

export default ItemCardMenuComponent;

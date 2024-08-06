export interface ListOrderProps {
  type: string;
  order: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

const ListOrderComponent = (props: { orders: ListOrderProps[] }) => {
  const { orders } = props;
  return orders.map((order) => (
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
            <button className="button-base">-</button>
            <span>{item.quantity}</span>
            <button className="button-base">+</button>
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
  ));
};

export default ListOrderComponent;

export enum OrderType {
  ALL = "ALL",
  Usableitems = "Usable items",
  Weapon = "Weapon",
  Armor = "Armor",
  Card = "Card",
}

export interface Cart {
  total: number;
  quantity: number;
  items: {
    type: string;
    quantity: number;
    total: number;
    order: {
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
}

export interface ListOrders {
  orders: {
    type: string;
    quantity: number;
    total: number;
    order: {
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
  total: number;
  quantity: number;
  code?: string;
  descriptionDiscount?: string;
  status: string;
  discount: number;
}

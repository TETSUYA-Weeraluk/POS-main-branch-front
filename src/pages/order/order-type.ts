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

export interface ListOrdersType {
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
  totalFinal: number;
  total: number;
  quantity: number;
  code?: string;
  descriptionDiscount?: string;
  status: string;
  discount: number;
}

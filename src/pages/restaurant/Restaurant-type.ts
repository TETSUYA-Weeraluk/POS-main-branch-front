export interface Restaurant {
  id: string;
  name: string;
  userRestaurant: UserRestaurant[];
  branch: Branch[];
  createdAt: string;
  updatedAt: string;
}

export interface UserRestaurant {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  employee: Employee[];
  category: Category[];
  code: Code[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  position: Position;
  salary: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  name: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  nameTH: string;
  nameEN: string;
  createdAt: string;
  updatedAt: string;
  branchId: string;
}

export interface Code {
  id: string;
  code: string;
  description: string;
  discount: string;
  isPercentage: boolean;
  isActive: boolean;
  limit: number;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}

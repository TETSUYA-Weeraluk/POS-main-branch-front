export interface RestaurantDetail {
  id: string;
  name: string;
  image: string;
  branch: Branch[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  image: string;
  phone: string;
  employee: Employee[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  salary: number;
  branchId: string;
  positionId: string;
  createdAt: string;
  updatedAt: string;
}

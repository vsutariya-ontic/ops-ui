export interface Team {
  teamId: string;
  teamName: string;
  teamLocation: string;
}

export interface Item {
  category: string;
  imageUrl: string;
  ingredients?: string;
  itemId: string;
  itemName: string;
  quantityLeft?: number;
  timeToMake: number;
}

export interface CartItem {
  itemId: string;
  userId: string;
  quantity: number;
  creation_time?: Date;
}

export interface Order {
  instructions: string;
  itemId: string;
  userData: any;
  orderId: string;
  quantity: number;
  status: string;
  tableNo: number;
  userId: string;
  createdTime: any;
}

export interface Table {
  tableNo?: number | string;
  tableId: string;
  tableName?: string;
}

export enum OrderStatus {
  IN_CART = "IN_CART",
  PLACED = "PLACED",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
}

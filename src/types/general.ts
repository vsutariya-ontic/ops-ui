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
  quantity_left: number;
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
  orderDateTime: string;
  orderId: string;
  quantity: number;
  status: string;
  tableNo: number;
  userId: string;
  userName: string;
}

export interface Table {
  tableNo: number;
  teamId: string;
}

export enum OrderStatus {
  IN_CART = "IN_CART",
  PLACED = "PLACED",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
}

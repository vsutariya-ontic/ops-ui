interface Team {
  teamId: string;
  teamName: string;
  teamLocation: string;
}

interface Item {
  category: string;
  imageUrl: string;
  ingredients?: string;
  itemId: string;
  itemName: string;
  quantity_left: number;
  timeToMake: number;
}

interface CartItem {
  itemId: string;
  userId: string;
  quantity: number;
  creation_time?: Date;
}

interface Order {
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

interface Table {
  tableNo: number;
  teamId: string;
}

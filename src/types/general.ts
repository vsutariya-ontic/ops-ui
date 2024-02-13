interface Team {
    team_id: string;
    team_name: string;
    team_location: string;
}

interface Item {
    category: string;
    image_url: string;
    ingredients?: string;
    item_id: string;
    item_name: string;
    quantity_left: number;
    time_to_make: number;
}

interface CartItem {
    item_id: string;
    user_id: string;
    quantity: number;
    creation_time?: Date;
}

interface Order {
    instructions: string;
    item_id: string;
    order_date_time: string;
    order_id: string;
    quantity: number;
    status: string;
    table_no: number;
    user_id: string;
    user_name: string;
}

interface Table {
    table_no: number;
    team_id: string;
}

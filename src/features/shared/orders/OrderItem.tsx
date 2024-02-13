import { Button, Menu, MenuItem, Paper } from "@mui/material";
import { useAuthStore } from "../../../authstore/store";
import { useUpdateOrderStatusMutation } from "../../../services/data/useUpdateOrderStatusMutation";
import { useState } from "react";

interface OrderItemProps {
    order: Order;
    item: Item;
}

export const OrderItem = (props: OrderItemProps) => {
    const { order, item } = props;
    const role = useAuthStore((state) => state.role);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const orderStatusMutation = useUpdateOrderStatusMutation();
    const getStatus = (status: string) => {
        switch (status) {
            case "waiting": {
                return (
                    <button
                        onClick={handleClick}
                        disabled={role === "employee"}
                        className="border-[1px] border-green-500 py-2 px-4 text-green-500 rounded-lg "
                    >
                        <span>Waiting</span>
                    </button>
                );
            }
            case "preparing": {
                return (
                    <button
                        onClick={handleClick}
                        disabled={role === "employee"}
                        className="border-[1px] border-blue-500 py-2 px-4 text-blue-500 rounded-lg"
                    >
                        <span>Preparing</span>
                    </button>
                );
            }
            case "completed": {
                return (
                    <button
                        // onClick={handleClick}
                        disabled={role === "employee"}
                        className="bg-green-500 py-2 px-4 text-slate-700 rounded-lg"
                    >
                        <span>Completed</span>
                    </button>
                );
            }
        }
    };
    return (
        <Paper className="flex w-full px-4 py-2 justify-between transition-all duration-500 space-x-4">
            <div className="w-[60%] flex justify-between space-x-4">
                <div className="flex space-x-4">
                    <div className="w-[80px] hidden sm:flex justify-center">
                        <img src={item.image_url} className="h-[70px]" />
                    </div>
                    <div className="flex flex-col ml-6 justify-center">
                        <span className="text-xs md:text-sm text-gray-500">
                            {item.category}
                        </span>
                        <span className="md:text-lg">{item.item_name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-[45%] ">
                    {order.instructions && (
                        <>
                            <span className="text-xs md:text-sm text-gray-500">
                                Instructions:
                            </span>
                            <p className="text-xs md:text-sm overflow-auto max-h-[50px]">
                                {order.instructions}
                            </p>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-between space-x-8 md:space-x-12 lg:space-x-16 xl:space-x-20">
                <div className="flex flex-col justify-center h-full">
                    {role === "pantryboy" && (
                        <span className="text-sm md:text-md">
                            {order.user_name}
                        </span>
                    )}
                    <span className="text-xs md:text-sm text-gray-500">
                        Table : {order.table_no}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                        Quantity : {order.quantity}
                    </span>
                </div>
                <div className="hidden md:flex flex-col justify-center h-full">
                    <span className="text-xs md:text-sm text-gray-500">
                        {order.order_date_time.slice(0, 10)}
                    </span>
                    <span className="text-sm md:text-md">
                        {order.order_date_time.slice(11, 16)}
                    </span>
                </div>
                <div className="flex h-full items-center">
                    {getStatus(order.status)}
                    {role === "pantryboy" && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            className="min-w-52"
                            MenuListProps={{
                                style: {
                                    width: "fit",
                                    padding: "0",
                                },
                            }}
                        >
                            {order.status !== "preparing" && (
                                <MenuItem
                                    disabled={orderStatusMutation.isLoading}
                                    onClick={() => {
                                        orderStatusMutation.mutateAsync({
                                            order_id: order.order_id,
                                            newStatus: "preparing",
                                        });
                                    }}
                                >
                                    <Button color="info">Prepare now</Button>
                                </MenuItem>
                            )}
                            {order.status !== "completed" && (
                                <MenuItem
                                    disabled={orderStatusMutation.isLoading}
                                    onClick={() => {
                                        orderStatusMutation.mutateAsync({
                                            order_id: order.order_id,
                                            newStatus: "completed",
                                        });
                                    }}
                                >
                                    <Button color="success">Complete</Button>
                                </MenuItem>
                            )}
                        </Menu>
                    )}
                </div>
            </div>
        </Paper>
    );
};

import {
    Box,
    Button,
    Grid,
    LinearProgress,
    useMediaQuery,
} from "@mui/material";
import { useOrderListQuery } from "../../../services/data/useOrderListQuery";
import { useState } from "react";
import { useItemListQuery } from "../../../services/data/useItemListQuery";
import { useTheme } from "@emotion/react";
import GhostItem from "../../../components/GhostItem";
import { OrderItem } from "./OrderItem";

const orderCategories = [
    {
        label: "Pending",
        color: "primary",
    },
    {
        label: "Preparing now",
        color: "info",
    },
    {
        label: "Completed",
        color: "success",
    },
];

const Orders = () => {
    const { palette }: any = useTheme();
    const [selectedOrderCategory, setSelectedOrderCategory] =
        useState<string>("Pending");
    const orderList = useOrderListQuery(selectedOrderCategory);
    const itemList = useItemListQuery("All");
    const isLargeScreen = useMediaQuery("(min-width: 800px)");
    const noOrdersLabel = (orderCategory: string) => {
        switch (orderCategory) {
            case "Pending": {
                return <>No pending orders</>;
            }
            case "Preparing now": {
                return <>No orders preparing</>;
            }
            case "Completed": {
                return <>No completed orders</>;
            }
            default: {
                return <>No orders</>;
            }
        }
    };
    return (
        <Box className="w-full h-[calc(100vh-88px)] p-4">
            <Grid
                container
                className="font-bold flex w-full justify-center py-8"
                rowGap={4}
                columnGap={4}
            >
                {orderCategories.map((cat: any) => (
                    <Grid item key={cat.label}>
                        <Button
                            color={cat.color}
                            onClick={() => setSelectedOrderCategory(cat.label)}
                            variant={
                                selectedOrderCategory === cat.label
                                    ? "contained"
                                    : "outlined"
                            }
                            size={isLargeScreen ? "large" : "medium"}
                        >
                            {cat.label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Box className="w-full flex flex-col items-center space-y-4 h-[80%] overflow-auto relative ">
                {(orderList.isFetching || orderList.isLoading) && (
                    <div className="sticky top-0 w-full">
                        <LinearProgress
                            color="primary"
                            className="w-full "
                            style={{
                                backgroundColor: palette.background.default,
                            }}
                        />
                    </div>
                )}
                {!orderList.isLoading &&
                    !orderList.data?.length &&
                    noOrdersLabel(selectedOrderCategory)}
                {orderList.isLoading && (
                    <>
                        <GhostItem variant="orderItem" />
                        <GhostItem variant="orderItem" />
                    </>
                )}
                {!orderList.isLoading &&
                    orderList.data &&
                    orderList.data.map((elem: any) => {
                        const order = elem.order;
                        const item = itemList.data.find(
                            (item: any) => item.item_id === order.item_id
                        );
                        return (
                            <OrderItem
                                key={order.order_id}
                                order={order}
                                item={item}
                            />
                        );
                    })}
            </Box>
        </Box>
    );
};

export default Orders;

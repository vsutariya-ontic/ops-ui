import { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";
import { useCartItemMutation } from "../services/data/useCartItemMutation";
import { useAuthStore } from "../authstore/store";
import { useCartListQuery } from "../services/data/useCartListQuery";

interface UseCartItemSyncReturn {
    displayCount: number;
    increaseCount: Function;
    decreaseCount: Function;
    deleteCartItem: Function;
    isLoading: boolean;
}
export const useCartItemSync: (
    item: any,
    debounceDurationInMilliseconds: number
) => UseCartItemSyncReturn = (
    item: any,
    debounceDurationInMilliseconds: number
) => {
    const user_email = useAuthStore((state) => state.email);
    const cartList = useCartListQuery();
    const [displayCount, setDisplayCount] = useState(0);
    const debouncedDisplayCount = useDebounce(
        displayCount,
        debounceDurationInMilliseconds
    );
    const mutation = useCartItemMutation(user_email, String(item.item_id));

    const [realTimeCountOnServer, setRealTimeCountOnServer] = useState(
        debouncedDisplayCount
    );
    const increaseCount = () => {
        setDisplayCount(displayCount + 1);
    };
    const decreaseCount = () => {
        setDisplayCount(displayCount - 1);
    };
    const deleteCartItem = () => {
        setDisplayCount(0);
    };
    useEffect(() => {
        const fun = async () => {
            try {
                if (debouncedDisplayCount !== realTimeCountOnServer) {
                    await mutation.mutateAsync({
                        quantity: debouncedDisplayCount,
                    });
                    setRealTimeCountOnServer(debouncedDisplayCount);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fun();
    }, [debouncedDisplayCount]);
    useEffect(() => {
        if (!cartList.isLoading && cartList.data) {
            const target = cartList.data.find(
                (ct: any) => ct.item_id === item.item_id
            );
            if (target) {
                setDisplayCount(target.quantity);
                setRealTimeCountOnServer(target.quantity);
            } else {
                setDisplayCount(0);
                setRealTimeCountOnServer(0);
            }
        }
    }, [cartList.dataUpdatedAt]);

    return {
        displayCount,
        increaseCount,
        decreaseCount,
        deleteCartItem,
        isLoading: mutation.isLoading || cartList.isLoading,
    };
};

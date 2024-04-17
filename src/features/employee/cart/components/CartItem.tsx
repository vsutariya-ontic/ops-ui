import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useCartItemSync } from "../../../../hooks/useCartItemSync";

interface CartItemProps {
    elem: CartItem;
    item: Item;
}

export const CartItem = ({ elem, item }: CartItemProps) => {
    const {
        displayCount,
        increaseCount,
        decreaseCount,
        deleteCartItem,
        isLoading,
    } = useCartItemSync(item, 300);
    const add = () => {
        increaseCount();
    };
    const remove = () => {
        if (displayCount > 0) decreaseCount();
    };
    const reset = (e: any) => {
        e.preventDefault();
        deleteCartItem();
    };
    return (
        <Paper
            key={elem.itemId}
            className="flex justify-between items-center py-2 px-2 w-[350px] sm:w-[450px] transition-colors duration-500"
        >
            <Typography
                variant="body1"
                className="w-[200px] overflow-auto space-x-4 items-center flex"
            >
                <img
                    src={item.imageUrl}
                    className="h-[40px] w-[50px] rounded-sm"
                />
                <span>{item?.itemName}</span>
            </Typography>
            <div className="flex">
                <ButtonGroup size="small">
                    <Button onClick={remove}>-</Button>
                    <Button className="cursor-default">{displayCount}</Button>
                    <Button onClick={add}>+</Button>
                </ButtonGroup>
            </div>
            <div>
                <button onClick={reset}>
                    <FontAwesomeIcon
                        className="text-red-500"
                        icon={faTrashCan}
                    />
                </button>
            </div>
        </Paper>
    );
};

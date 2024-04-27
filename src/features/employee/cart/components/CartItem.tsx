import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { useCartManager } from "../../../../hooks/useCartManager";
import { Item } from "../../../../types/general";

interface CartItemProps {
  elem?: any;
  item: Item;
}

export const CartItem = ({ item }: CartItemProps) => {
  const cartManager = useCartManager();
  const count = cartManager.getItemCount(item.itemId);
  console.log("item-count-in-cart", count);
  console.log("count in CART", count);
  const add = async () => {
    await cartManager.updateItemCount(item, count + 1);
  };

  const remove = async () => {
    if (count > 0) {
      await cartManager.updateItemCount(item, count - 1);
    }
  };

  const reset = async (e: any) => {
    e.preventDefault();
    await cartManager.updateItemCount(item, 0);
  };

  return (
    <Paper
      key={item.itemId}
      className="flex justify-between items-center py-2 px-2 w-[350px] sm:w-[450px] transition-colors duration-500"
    >
      <Typography
        variant="body1"
        className="w-[200px] overflow-auto space-x-4 items-center flex"
      >
        <img src={item.imageUrl} className="h-[40px] w-[50px] rounded-sm" />
        <span>{item?.itemName}</span>
      </Typography>
      <div className="flex">
        <ButtonGroup size="small">
          <Button onClick={remove}>-</Button>
          <Button className="cursor-default">{count}</Button>
          <Button onClick={add}>+</Button>
        </ButtonGroup>
      </div>
      <div>
        <button onClick={reset}>
          <FontAwesomeIcon className="text-red-500" icon={faTrashCan} />
        </button>
      </div>
    </Paper>
  );
};

import { useTheme } from "@emotion/react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Paper, Tooltip, Typography } from "@mui/material";
import { useCartManager } from "../../../../hooks/useCartManager";
import { useAuthStore } from "../../../../managers/authStore";

export const MenuItemCard = (props: any) => {
  const { palette }: any = useTheme();
  const role = useAuthStore((state) => state.role);
  const { item }: any = props;

  const cartManager = useCartManager();

  const count = cartManager.getItemCount(item.itemId);
  console.log("item-count-in-cart", count);
  const add = async () => {
    await cartManager.updateItemCount(item, count + 1);
  };
  const remove = async () => {
    if (count > 1) {
      await cartManager.updateItemCount(item, count - 1);
    }
  };
  const reset = async () => {
    await cartManager.updateItemCount(item, 0);
  };
  return (
    <Paper
      elevation={1}
      sx={{
        maxHeight: role === "employee" ? "300px" : "250px",
      }}
      className="rounded-xl hover:scale-[1.01] transition-all duration-500"
    >
      <Tooltip title={item.ingredients} placement="right">
        <div className="flex flex-col items-center p-2">
          <img
            className="rounded-2xl h-[140px]"
            src={item.imageUrl}
            height={140}
            width={140}
          />
          <Typography variant="h6" className="flex justify-center mt-4">
            {item.itemName}
          </Typography>
          <Typography variant="h6" className="flex justify-center text-xs">
            {item.timeToMake} mins
          </Typography>
        </div>
      </Tooltip>
      {role === "employee" && (
        <>
          {count ? (
            <div className="flex justify-evenly py-4">
              <div className="flex">
                <ButtonGroup size="small">
                  <Button onClick={remove} disabled={cartManager.isLoading}>
                    -
                  </Button>
                  <Button className="cursor-default">{count}</Button>
                  <Button onClick={add} disabled={cartManager.isLoading}>
                    +
                  </Button>
                </ButtonGroup>
              </div>
              <button onClick={reset} className="rounded-full">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  height={10}
                  color="rgba(255,0,0,0.8)"
                />
              </button>
            </div>
          ) : (
            <div className="flex justify-center py-4">
              <div className="flex rounded-xl">
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  className="px-3 py-1 rounded-xl"
                  onClick={add}
                  disabled={cartManager.isLoading}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Paper>
  );
};

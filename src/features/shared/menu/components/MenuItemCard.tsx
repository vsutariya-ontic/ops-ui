import { useTheme } from "@emotion/react";
import { useAuthStore } from "../../../../authstore/store";
import { useCartItemMutation } from "../../../../services/data/useCartItemMutation";
import { useCartItemSync } from "../../../../hooks/useCartItemSync";
import { Button, ButtonGroup, Paper, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const MenuItemCard = (props: any) => {
    const { palette }: any = useTheme();
    const user_email = useAuthStore((state) => state.email);
    const role = useAuthStore((state) => state.role);
    const { item }: any = props;
    const mutation = useCartItemMutation(user_email, String(item.item_id));
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
        if (displayCount > 1) {
            decreaseCount();
        }
    };
    const reset = () => {
        deleteCartItem();
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
                        src={item.image_url}
                        height={140}
                        width={140}
                    />
                    <Typography
                        variant="h6"
                        className="flex justify-center mt-4"
                    >
                        {item.item_name}
                    </Typography>
                    <Typography
                        variant="h6"
                        className="flex justify-center text-xs"
                    >
                        {item.time_to_make} mins
                    </Typography>
                </div>
            </Tooltip>
            {role === "employee" && (
                <>
                    {displayCount ? (
                        <div className="flex justify-evenly py-4">
                            <div className="flex">
                                <ButtonGroup size="small">
                                    <Button onClick={remove}>-</Button>
                                    <Button className="cursor-default">
                                        {displayCount}
                                    </Button>
                                    <Button onClick={add}>+</Button>
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
                                    disabled={isLoading}
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

import { useState } from "react";
import { useCartListQuery } from "../../../services/data/useCartListQuery";
import { Cart } from "./components/Cart";
import { Badge } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faXmark } from "@fortawesome/free-solid-svg-icons";

export const CartLayout = () => {
    const cartList = useCartListQuery();
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <>
            {isCartOpen && (
                <div
                    onClick={() => setIsCartOpen(false)}
                    className="fixed top-0 left-0 min-h-[100vh] z-20 min-w-[100vw]"
                    style={{
                        backgroundColor: "#333333",
                        opacity: "30%",
                    }}
                >
                    hii
                </div>
            )}
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
            <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={
                    "fixed z-40 right-8 bottom-8 p-4 rounded-full hover:bg-slate-400 hover:bg-opacity-20 transition-transform duration-300 " +
                    (!cartList.isLoading &&
                    cartList.data.length > 0 &&
                    !isCartOpen
                        ? "animate-bounce "
                        : " ")
                }
            >
                {!isCartOpen ? (
                    <Badge
                        badgeContent={
                            !cartList.isLoading
                                ? `${cartList.data.length}`
                                : "..."
                        }
                        color="primary"
                    >
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            height={20}
                            width={20}
                            className="h-8 w-8"
                        />
                    </Badge>
                ) : (
                    <FontAwesomeIcon
                        icon={faXmark}
                        height={20}
                        width={20}
                        className="h-8 w-8"
                    />
                )}
            </button>
        </>
    );
};

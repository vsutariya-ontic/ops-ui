import { faShoppingCart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mui/material";
import { useState } from "react";
import { useCartManager } from "../../../hooks/useCartManager";
import { Cart } from "./components/Cart";

export const CartLayout = () => {
  const cartManager = useCartManager();
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className={
          "fixed z-40 right-8 bottom-8 p-4 rounded-full hover:bg-slate-400 hover:bg-opacity-20 transition-transform duration-300 " +
          (!cartManager.isLoading && cartManager.items.length > 0 && !isCartOpen
            ? "animate-bounce "
            : " ")
        }
      >
        {!isCartOpen ? (
          <Badge
            badgeContent={
              !cartManager.isLoading ? `${cartManager.items.length}` : "..."
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

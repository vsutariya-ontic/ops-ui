import { CartLayout } from "../features/employee/cart/CartLayout";
import { MenuLayout } from "../features/shared/menu/MenuLayout";
import Orders from "../features/shared/orders/Orders";

export const EmployeeLayout = ({ path }: { path: string }) => {
    return (
        <>
            {path === "/" && <MenuLayout />}
            {path === "/orders" && <Orders />}
            <CartLayout />
        </>
    );
};

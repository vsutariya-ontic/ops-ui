import { MenuLayout } from "../features/shared/menu/MenuLayout";
import Orders from "../features/shared/orders/Orders";

export const PantryboyLayout = ({ path }: any) => {
    return (
        <>
            {path === "/" && <MenuLayout />}
            {path === "/orders" && <Orders />}
        </>
    );
};

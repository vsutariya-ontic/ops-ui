import { Grid, LinearProgress } from "@mui/material";
import GhostItem from "../../../../components/GhostItem";
import { useAuthStore } from "../../../../managers/authStore";
import { useItemListQuery } from "../../../../services/data/item/useItemListQuery";
import { Item } from "../../../../types/general";
import { CreateNewItemButton } from "../../../pantryboy/createitem/CreateNewItemButton";
import { MenuItemCard } from "./MenuItemCard";

export const MenuItems = (props: any) => {
  const { category } = props;
  const role = useAuthStore((state) => state.role);
  const itemList = useItemListQuery(category);
  const { data: items, isLoading, isRefetching, error: itemsError } = itemList;
  return (
    <Grid
      container
      rowGap={4}
      columnGap={4}
      className="mt-4 overflow-auto h-[calc(calc(100vh-88px)-200px)]"
    >
      {isLoading && (
        <>
          <LinearProgress color="primary" className="w-full" />
          <GhostItem variant="menuItem" />
          <GhostItem variant="menuItem" />
          <GhostItem variant="menuItem" />
        </>
      )}
      {isRefetching && !isLoading && (
        <LinearProgress color="primary" className="w-full sticky top-0" />
      )}
      {!isLoading && (
        <>
          {role === "employee" && !items.length && (
            <div className="w-full flex justify-center">
              No items in {category !== "All" ? category : ""}
            </div>
          )}
          {role === "pantryboy" && (
            <CreateNewItemButton>
              {" "}
              <GhostItem variant="createItemButton" />
            </CreateNewItemButton>
          )}
          {items.map((item: Item, index: number) => {
            return <MenuItemCard index={index} key={item.itemId} item={item} />;
          })}
        </>
      )}
    </Grid>
  );
};

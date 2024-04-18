import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuthStore } from "../../../../managers/authStore";
import { useCartManager } from "../../../../managers/cartManager";
import { usePutUserMutation } from "../../../../services/auth/usePutUserMutation";
import { useCartListQuery } from "../../../../services/data/useCartListQuery";
import { useItemListQuery } from "../../../../services/data/useItemListQuery";
import { usePutOrderMutation } from "../../../../services/data/usePutOrderMutation";
import { useTableListQuery } from "../../../../services/data/useTableListQuery";
import { queryKeys } from "../../../../services/queryKeys";
import { Table } from "../../../../types/general";
import { CartItem } from "./CartItem";

interface CartProps {
  setIsCartOpen: Function;
}

export const Cart = (props: CartProps) => {
  // ** Props Destructure **
  const { setIsCartOpen } = props;

  // ** State Variables **
  const [formState, setFormState] = useState<any>({
    makeDefault: false,
    table: null,
    instructions: "",
  });
  const userId = useAuthStore(state => state.userId);
  const { palette }: any = useTheme();
  const defaultTable = useAuthStore(state => state.defaultTable);
  const itemsInManager = useCartManager(state => state.items);
  const uploadCart = useCartManager(state => state.uploadCart);

  // ** Queries and Mutations **
  const queryClient = useQueryClient();
  const cartList = useCartListQuery();
  const allItemList = useItemListQuery("All");
  const tableList = useTableListQuery();
  const putUserMutation = usePutUserMutation();
  const putOrderMutation = usePutOrderMutation();

  // ** Constant, Refs and Memo Constant  **

  // ** Helper Functions **

  // ** Handlers **
  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();
    if (!cartList.data?.length) {
      alert("No items in cart");
      return;
    }
    try {
      const response = await putOrderMutation.mutateAsync({
        status: 'PLACED',
        instructions: formState.instructions
      });

      if (formState.makeDefault && formState.table?.tableId !== defaultTable?.tableId) {
        const response = await putUserMutation.mutateAsync({
          userId: userId,
          defaultTable: formState.table
        });
      }
      console.log(response, 'hereResponse');
      if (response?.success) {
        queryClient.invalidateQueries([queryKeys.CART_LIST]);
        queryClient.invalidateQueries([queryKeys.ORDER_LIST]);
        alert("Order placed successfully");
        setFormState({
          makeDefault: false,
          table: null,
          instructions: "",
        });
        setIsCartOpen(false);
      } else {
        alert("error placing orders");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ** Effects **
  useEffect(() => {
    (async () => {
      if (tableList.isFetching) return;
      const targetObject = tableList.data?.find(
        (elem: any) => elem.tableId === defaultTable?.tableId
      );
      if (targetObject) {
        setFormState({
          ...formState,
          makeDefault: true,
          table: targetObject,
        });
      }
    })()
  }, [tableList.isFetching]);

  return (
    <Box
      component="form"
      onSubmit={handlePlaceOrder}
      sx={{
        backgroundColor: palette.background.default,
      }}
      className="fixed z-30 right-12 bottom-28 flex flex-col justify-between rounded-2xl w-[400px] sm:w-[500px] h-[700px]"
    >
      <div className="flex w-full flex-col justify-center items-center mt-8 h-full">
        <Typography variant="h5">Cart</Typography>

        <div className="flex flex-col space-y-8 mt-8 justify-between h-full">
          <div className="flex flex-col items-center space-y-2 overflow-auto max-h-[300px]">
            {!cartList.isLoading &&
              !allItemList.isLoading &&
              !cartList.data.length && (
                <div>No items in your cart</div>
              )}
            {!cartList.isLoading &&
              !allItemList.isLoading &&
              cartList.data && (
                <>
                  {cartList.data.map((elem: any) => {
                    const item = allItemList.data.find(
                      (item: any) =>
                        item.itemId === elem.itemId
                    );
                    return (
                      <CartItem
                        key={item.itemName}
                        elem={elem}
                        item={item}
                      />
                    );
                  })}
                </>
              )}
          </div>
          <div className="flex flex-col justify-between space-y-4 w-[350px] sm:w-[450px]">
            <div className="flex justify-between items-center space-x-2">
              <Autocomplete
                disablePortal
                onChange={(e: any, selectedTable: any) => {
                  setFormState({
                    ...formState,
                    table: selectedTable,
                  });
                }}
                id="combo-box-demo"
                options={
                  !tableList.isLoading && tableList.data
                    ? tableList.data
                    : []
                }
                value={formState.table}
                getOptionLabel={(tableItem: Table) =>
                  tableItem ? String(tableItem?.tableName || tableItem?.tableNo) : ""
                }
                sx={{
                  width: 300,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Select Table"
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Switch
                    value={formState.makeDefault}
                    checked={formState.makeDefault}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        makeDefault:
                          !formState.makeDefault,
                      });
                    }}
                  />
                }
                label="Set default"
              />
            </div>
            <TextField
              size="small"
              label="Instructions"
              className=""
              value={formState.instructions}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  instructions: e.target.value,
                })
              }
              multiline
              rows={5}
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center py-4">
        <Button
          type="submit"
          disabled={putOrderMutation.isLoading || putUserMutation.isLoading}
          variant="contained"
          className="rounded-lg"
        >
          Place order
        </Button>
      </div>
    </Box>
  );
};

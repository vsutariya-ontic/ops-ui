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
import { useCartManager } from "../../../../hooks/useCartManager";
import { useAuthStore } from "../../../../managers/authStore";
import { useCartQuery } from "../../../../services/data/cart/useCartQuery";
import { usePostOrderMutation } from "../../../../services/data/order/usePostOrderMutation";
import { useTableListQuery } from "../../../../services/data/table/useTableListQuery";
import { Table } from "../../../../types/general";
import { CartItem } from "./CartItem";

interface CartProps {
  setIsCartOpen: Function;
}

export const Cart = (props: CartProps) => {
  const { setIsCartOpen } = props;
  const { palette }: any = useTheme();
  const [formState, setFormState] = useState({
    makeDefault: false,
    table: null,
    instructions: "",
  });

  const cartManager = useCartManager();
  const { isLoading: cartLoading } = useCartQuery();

  const tableList = useTableListQuery();
  const tables = tableList.data;
  const defaultTable = useAuthStore((state) => state.defaultTable);

  const postOrderMutation = usePostOrderMutation();

  useEffect(() => {
    if (defaultTable) {
      const targetObject = tables.find(
        (elem: any) => elem.tableId === defaultTable.tableId
      );
      if (targetObject) {
        setFormState({
          ...formState,
          makeDefault: true,
          table: targetObject,
        });
      }
    }
  }, [defaultTable]);

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();
    if (!cartManager.items.length) {
      alert("No items in cart");
      return;
    }
    try {
      const response = await postOrderMutation.mutateAsync({
        items: cartManager.items,
        table: formState.table,
      });

      if (response.success) {
        setFormState({
          makeDefault: false,
          table: null,
          instructions: "",
        });
        setIsCartOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
            {!cartLoading && !cartManager.items.length && (
              <div>No items in your cart</div>
            )}
            {!!cartManager.items.length && (
              <>
                {cartManager.items.map((item: any) => {
                  return <CartItem key={item.itemName} item={item} />;
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
                  !tableList.isLoading && tableList.data ? tableList.data : []
                }
                value={formState.table}
                getOptionLabel={(tableItem: Table) =>
                  String(tableItem?.tableName || tableItem.tableNo)
                }
                sx={{
                  width: 300,
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Select Table" />
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
                        makeDefault: !formState.makeDefault,
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
          disabled={
            cartManager.isLoading ||
            !cartManager.items.length ||
            !formState.table
          }
          variant="contained"
          className="rounded-lg"
        >
          Place order
        </Button>
      </div>
    </Box>
  );
};

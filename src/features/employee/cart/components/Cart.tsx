import { useEffect, useState } from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    FormControlLabel,
    Paper,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@emotion/react";
import { useItemListQuery } from "../../../../services/data/useItemListQuery";
import { useTableListQuery } from "../../../../services/data/useTableListQuery";
import { useDefaultTableQuery } from "../../../../services/data/useDefaultTableQuery";
import { useAddOrderMutation } from "../../../../services/data/useAddOrderMutation";
import { useCartListQuery } from "../../../../services/data/useCartListQuery";
import { useCartItemSync } from "../../../../hooks/useCartItemSync";
import { CartItem } from "./CartItem";

interface CartProps {
    setIsCartOpen: Function;
}

export const Cart = (props: CartProps) => {
    const { setIsCartOpen } = props;
    const cartList = useCartListQuery();
    const { palette }: any = useTheme();
    const allItemList = useItemListQuery("All");
    const [formState, setFormState] = useState({
        makeDefault: false,
        table: null,
        instructions: "",
    });
    const addOrderMutation = useAddOrderMutation({ formState: formState });
    const tableList = useTableListQuery({
        enabled: false,
    });
    const defaultTable = useDefaultTableQuery({
        enabled: false,
    });
    useEffect(() => {
        const fetchTablesInfo = async () => {
            try {
                const tables = await tableList.refetch();
                const def = await defaultTable.refetch();
                const targetObject = tables.data.find(
                    (elem: any) => elem.table_no === def.data.table_no
                );
                if (targetObject) {
                    setFormState({
                        ...formState,
                        makeDefault: true,
                        table: targetObject,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchTablesInfo();
    }, []);

    const handlePlaceOrder = async (e: any) => {
        e.preventDefault();
        if (!cartList.data?.length) {
            alert("No items in cart");
            return;
        }
        try{
            const response = await addOrderMutation.mutateAsync();
        if (response) {
            setFormState({
                makeDefault: false,
                table: null,
                instructions: "",
            });
            setIsCartOpen(false);
        }
        }catch(err){
            console.log(err);
        }
    };
    return (
        <Box
            component="form"
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
                                                item.item_id === elem.item_id
                                        );
                                        return (
                                            <CartItem
                                                key={item.item_name}
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
                                    tableItem ? String(tableItem.table_no) : ""
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
                    disabled={addOrderMutation.isLoading}
                    onClick={handlePlaceOrder}
                    variant="contained"
                    className="rounded-lg"
                >
                    Place order
                </Button>
            </div>
        </Box>
    );
};

import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCreateNewItemMutation } from "../../../services/data/useCreateNewItemMutation";
import { useTheme } from "@emotion/react";

const categories = ["Fast Food", "Fruits", "Desserts", "Beverages", "Snacks"];
interface CreateNewItemProps {
    setCreateFormOpen: Function;
    handleSnackbarClick: Function;
}
export const CreateNewItemForm = (props: CreateNewItemProps) => {
    const { setCreateFormOpen, handleSnackbarClick } = props;
    const { palette }: any = useTheme();
    /* form data handling */
    const formRef = useRef(null);
    const [formData, setFormData] = useState<any>({
        itemName: "",
        category: "",
        timeToPrepare: "",
        ingredients: "",
        imageUrl: "",
    });
    const createItemMutation = useCreateNewItemMutation(formData);
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleClose = (e: any) => {
        setCreateFormOpen(false);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleSnackbarClick();
        try {
            const response = await createItemMutation.mutateAsync();
            setFormData({
                itemName: "",
                category: "",
                timeToPrepare: 0,
                ingredients: "",
                imageUrl: "",
            });
            setCreateFormOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full w-full bg-black bg-opacity-90 z-10">
            <div
                ref={formRef}
                className="p-10 md:p-20 z-20 rounded-3xl relative"
                style={{
                    backgroundColor: palette.background.paper,
                }}
            >
                <Button
                    className="absolute top-0 right-0 p-4 rounded-3xl"
                    variant="text"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faXmark} className="h-8 w-8" />
                </Button>
                <Typography variant="h5" className="">
                    Create a new item
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    className="sm:w-[400px] md:w-[500px] flex flex-col items-center"
                >
                    <TextField
                        label="Item Name"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Select Category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        select
                        fullWidth
                        margin="normal"
                        required
                    >
                        {categories.map((item: string) => {
                            return (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <TextField
                        label="Time to prepare (in minutes)"
                        type="number"
                        name="timeToPrepare"
                        value={formData.timeToPrepare}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{
                            style: {
                                color: "black",
                            },
                        }}
                    />
                    <TextField
                        label="Ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        className="w-[50%] mt-4 h-12 rounded-2xl"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

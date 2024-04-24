import { Button, Grid, useMediaQuery } from "@mui/material";
import { useAuthStore } from "../../../../authstore/store";

export const MenuCategory = (props: any) => {
    const role = useAuthStore((state) => state.role);
    const isLargeScreen = useMediaQuery("(min-width: 800px)");
    const { selectedCategory, setSelectedCategory } = props;

    const categories = [
        { label: "All", iconPath: "/images/52391.jpg" },
        { label: "Fast Food", iconPath: "/images/52391.jpg" },
        { label: "Fruits", iconPath: "/images/52391.jpg" },
        { label: "Desserts", iconPath: "/images/52391.jpg" },
        { label: "Beverages", iconPath: "/images/52391.jpg" },
        { label: "Snacks", iconPath: "/images/52391.jpg" },
    ];
    /* Snackbar state and actions */

    return (
        <Grid
            container
            className="font-bold flex w-full justify-center py-8"
            rowGap={4}
            columnGap={4}
        >
            {categories.map((cat) => (
                <Grid item key={cat.label}>
                    <Button
                        onClick={() => setSelectedCategory(cat.label)}
                        variant={
                            selectedCategory === cat.label
                                ? "contained"
                                : "outlined"
                        }
                        size={isLargeScreen ? "large" : "medium"}
                    >
                        {cat.label}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

import { useState } from "react";
import { MenuCategory } from "./components/MenuCategory";
import { MenuItems } from "./components/MenuItems";
import { Box } from "@mui/material";

export const MenuLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <Box className="w-full h-[calc(100vh-94px)] p-4">
            <MenuCategory
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <MenuItems category={selectedCategory} />
        </Box>
    );
};

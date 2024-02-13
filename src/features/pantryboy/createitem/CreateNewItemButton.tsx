import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { CreateNewItemForm } from "./CreateNewItemForm";
const SNACKBAR_DURATION = 5000;
export const CreateNewItemButton = (props: any) => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState<any>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const handleSnackbarClick = () => {
        setSnackbarState({
            ...snackbarState,
            open: true,
        });
    };
    const handleSnackbarClose = (event: any, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
    };

    const handleButtonClick = () => {
        setIsCreateFormOpen(true);
    };
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
        >
            <FontAwesomeIcon icon={faXmark} />
        </IconButton>
    );
    return (
        <>
            <Snackbar
                className="z-50"
                anchorOrigin={{
                    vertical: snackbarState.vertical,
                    horizontal: snackbarState.horizontal,
                }}
                open={snackbarState.open}
                autoHideDuration={SNACKBAR_DURATION}
                onClose={handleSnackbarClose}
                message="New menu item created successfully"
                key={"top" + "center"}
                action={action}
            />
            {isCreateFormOpen && (
                <CreateNewItemForm
                    setCreateFormOpen={setIsCreateFormOpen}
                    handleSnackbarClick={handleSnackbarClick}
                />
            )}
            <button className="w-fit h-fit" onClick={handleButtonClick}>
                {props.children}
            </button>
        </>
    );
};

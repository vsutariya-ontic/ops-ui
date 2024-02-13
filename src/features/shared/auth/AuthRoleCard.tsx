import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";
import { RoleCardProps } from "./types";

const RoleCard = (props: RoleCardProps) => {
    const { role, cardName, setRole, iconPath } = props;
    const iconStyle = {
        display: role.length ? "none" : "flex",
    };
    const handleCardClick = () => {
        setRole(cardName);
    };
    return (
        <Paper
            sx={iconStyle}
            elevation={3}
            className="
                flex-column 
                align-middle 
                w-fit 
                items-center 
                mt-8 
                rounded-xl 
                transition-transform duration-500
                hover:scale-[1.02] 
            "
        >
            <CardActionArea
                onClick={handleCardClick}
                sx={{ display: "flex", flexDirection: "column", padding: 2 }}
            >
                <div
                    className="
                        flex
                        justify-center
                        w-[250px]
                        h-[250px]
                        md:w-[320px]
                        md:h-[320px]
                    "
                >
                    <img src={iconPath} width={320} className="rounded-lg" />
                </div>
                <Typography variant="h4" className="flex justify-center mt-4">
                    {cardName}
                </Typography>
            </CardActionArea>
        </Paper>
    );
};

export default RoleCard;

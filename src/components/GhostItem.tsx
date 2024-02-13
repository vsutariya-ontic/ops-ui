import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Skeleton, Tooltip } from "@mui/material";

const GhostItem = ({ variant }: { variant: string }) => {
    switch (variant) {
        case "menuItem": {
            return (
                <Paper className="rounded-xl flex flex-col items-center h-[250px]">
                    <div className="flex flex-col items-center justify-between p-2">
                        <Skeleton variant="rounded" height={140} width={140} />
                        <Skeleton variant="text" width={80} />
                    </div>
                    <Skeleton variant="text" width={50} />
                </Paper>
            );
        }
        case "createItemButton": {
            return (
                <button className="h-[250px] relative w-[140px]">
                    <Paper className="rounded-xl flex flex-col items-center h-[250px] w-[156px] justify-center space-y-12">
                        <div>
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="top-12 left-12 w-16 h-16"
                            />
                        </div>
                        <span className="text-lg">Add item</span>
                    </Paper>
                </button>
            );
        }
        case "orderItem": {
            return (
                <Paper
                    sx={{
                        height: 160,
                    }}
                    className="flex items-center justify-between p-2 transition-all duration-1000 w-full"
                >
                    <div className="flex items-center">
                        <div>
                            <Skeleton
                                variant="rounded"
                                className="min-h-[140px]"
                                height={140}
                                width={140}
                            />
                        </div>
                        <div className="flex flex-col ml-4">
                            <Skeleton
                                variant="rounded"
                                height={40}
                                width={80}
                            />
                        </div>
                    </div>
                    <div>
                        <Skeleton variant="text" width={40} />
                    </div>
                    <div className="mr-4">
                        <Skeleton variant="text" width={20} />
                    </div>
                </Paper>
            );
        }
    }
};

export default GhostItem;

import { useTheme } from "@emotion/react";
import {
    faCircleHalfStroke,
    faPowerOff,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../managers/authStore";
import { useThemeStore } from "../theme/theme";

const Topbar = (props: any) => {
    const queryClient = useQueryClient();
    const role = useAuthStore((state) => state.role);
    const navigate = useNavigate();
    const userFirstName = useAuthStore((state) => state.userFirstName);
    const toggleTheme = useThemeStore((state: any) => state.toggleTheme);
    const logout = useAuthStore((state) => state.logout);
    const { palette }: any = useTheme();
    return (
        <nav
            className={`
                flex justify-between items-center py-4 px-4 w-full text-xl
            `}
            style={{
                color: palette.secondary.main,
                backgroundColor: palette.primary.main,
            }}
        >
            <Box className="flex items-center space-x-4">
                <button onClick={() => navigate("/")}>
                    <div
                        className="p-[2px] rounded-md"
                        style={{
                            backgroundColor: palette.background.default,
                            border: `4px solid ${palette.background.paper}`,
                        }}
                    >
                        <FontAwesomeIcon
                            className="absolute top-[40px] left-[40px] w-[14px] h-[14px]"
                            icon={faUtensils}
                        />
                        <img
                            height={50}
                            width={50}
                            src="https://stage-scon.qaontic.com/stage/static/icons/ontic/logo-mark-color.svg"
                            alt="Ontic"
                            aria-label="Home"
                        />
                    </div>
                </button>
                {role !== "" && <span>Hello {userFirstName}!</span>}
            </Box>
            <Box className="flex items-center space-x-4 lg:space-x-8">
                {role !== "" && (
                    <>
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                color: palette.secondary.main,
                            }}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate("/orders")}
                            style={{
                                color: palette.secondary.main,
                            }}
                        >
                            {role === "employee" ? "My Orders" : "Orders"}
                        </button>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="px-2 py-2 rounded-full"
                >
                    <FontAwesomeIcon
                        icon={faCircleHalfStroke}
                        height={32}
                        width={32}
                        className="w-8 h-8 mt-1"
                    />
                </button>
                <button
                    onClick={() => {
                        logout();
                        queryClient.invalidateQueries();
                    }}
                    disabled={role === ""}
                    className="px-2 py-2 rounded-full"
                    style={{
                        color: palette.secondary.main,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPowerOff}
                        height={32}
                        width={32}
                        className="w-8 h-8 mt-1"
                    />
                </button>
            </Box>
        </nav>
    );
};

export default Topbar;
// this is the comment that i wanna check

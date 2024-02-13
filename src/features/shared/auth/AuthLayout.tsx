import { useState } from "react";
import { Container, Typography } from "@mui/material";
import RoleCard from "./AuthRoleCard";
import AuthForm from "./AuthForm";
import { Grid } from "@mui/material";
import { AuthLayoutProps } from "./types";
import { useNavigate } from "react-router-dom";

const AuthLayout = (props: AuthLayoutProps) => {
    const { type } = props;
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const roles = [
        {
            name: "Employee",
            iconPath: "/images/52391.jpg",
        },
        {
            name: "PantryBoy",
            iconPath: "/images/8000_4_06.jpg",
        },
    ];
    const iconStyle = {
        display: role.length ? "none" : "flex",
    };
    return (
        <>
            <AuthForm type={type} role={role} setRole={setRole} />
            <Typography
                variant="h4"
                className="
                    mt-16
                    flex
                    justify-center
                "
            >
                {type !== "Login"
                    ? "Create a new account"
                    : "Welcome to login page"}
            </Typography>
            <Container
                style={iconStyle}
                className="
                    flex
                    justify-center
                "
            >
                <div>
                    <Grid
                        container
                        columnGap={8}
                        className="mt-8 align-middle items-center relative justify-center flex flex-wrap"
                    >
                        {roles.map(
                            (item: { name: string; iconPath: string }) => {
                                if (
                                    type === "Login" ||
                                    item.name === "Employee"
                                ) {
                                    return (
                                        <Grid item key={item.name}>
                                            <RoleCard
                                                role={role}
                                                type={type}
                                                cardName={item.name}
                                                setRole={setRole}
                                                iconPath={item.iconPath}
                                            />
                                        </Grid>
                                    );
                                }
                            }
                        )}
                    </Grid>
                    {type !== "Login" && (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <Typography
                                variant="body2"
                                className="w-full flex justify-end mt-8 text-lg text-blue-500 no-underline"
                            >
                                {"Already having an account? Log in here"}
                            </Typography>
                        </button>
                    )}
                </div>
            </Container>
        </>
    );
};

export default AuthLayout;

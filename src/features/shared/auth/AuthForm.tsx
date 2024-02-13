import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as EmailValidator from "email-validator";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthFormProps } from "./types";
import { authFormActions, formReducer } from "./utils";
import { useNavigate } from "react-router-dom";
import { DEFAULT_STATE } from "./data";
import { LinearProgress } from "@mui/material";
import { useLoginMutation } from "../../../services/auth/useLoginMutation";
import { useAddUser } from "../../../services/auth/useAddUserMutation";
import { useTheme } from "@emotion/react";

const Form = (props: AuthFormProps) => {
    const { role, setRole, type } = props;
    const { palette }: any = useTheme();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(formReducer, DEFAULT_STATE);
    const loginMutation = useLoginMutation({
        rememberMe: state.rememberMe,
    });

    const addUserMutation = useAddUser();
    const incorrect =
        !loginMutation.isLoading &&
        loginMutation.data &&
        !loginMutation.data.success;
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const handleEmailChange = (e: any) => {
        dispatch(authFormActions.emailChange(e.target.value));
        setIsInvalidEmail(
            e.target.value && !EmailValidator.validate(e.target.value)
        );
    };
    const handlePasswordChange = (e: any) => {
        dispatch(authFormActions.passwordChange(e.target.value));
    };
    const handleConfirmPasswordChange = (e: any) => {
        dispatch(authFormActions.confirmPasswordChange(e.target.value));
    };
    const handleRememberMeChange = (e: any) => {
        dispatch(authFormActions.rememberMeChange(!state.rememberMe));
    };
    const handleFirstNameChange = (e: any) => {
        dispatch(authFormActions.firstNameChange(e.target.value));
    };
    const handleLastNameChange = (e: any) => {
        dispatch(authFormActions.lastNameChange(e.target.value));
    };
    const formStyle = {
        display: role.length ? "flex" : "none",
    };
    useEffect(() => {
        setIsInvalidEmail(false);
        console.log("changes");
    }, [type, role]);
    const handleLogin = async () => {
        try {
            const loginResponse = await loginMutation.mutateAsync({
                user_email: state.email,
                user_password: state.password,
                user_role: role,
            });
            if (!loginResponse.success) {
                dispatch(authFormActions.reset());
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleSignup = async () => {
        try {
            if (state.password !== state.confirmPassword) {
                alert("Both passwords not matching");
                dispatch(authFormActions.passwordChange(""));
                dispatch(authFormActions.confirmPasswordChange(""));
                return;
            }
            const response = await addUserMutation.mutateAsync({
                state: state,
                role: role,
            });
            if (response.success) dispatch(authFormActions.reset());
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (type === "Login") {
            await handleLogin();
        } else {
            await handleSignup();
        }
    };
    const handleBackClick = () => {
        setRole("");
        dispatch(authFormActions.reset());
    };
    return (
        <div
            style={formStyle}
            className="
                absolute
                hidden
                w-full
                justify-center
                top-48
                flex-col
            "
        >
            <Container
                style={formStyle}
                component="main"
                className=" p-8
                    max-w-lg
                    max-h-xl
                    flex-col
                "
            >
                {(loginMutation.isLoading || addUserMutation.isLoading) && (
                    <LinearProgress color="primary" className="w-full" />
                )}
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div className="w-full flex justify-between h-full">
                        <div className="flex items-center">
                            <button
                                className="hover:scale-110 rounded-full"
                                onClick={handleBackClick}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                        <Typography
                            component="h1"
                            variant="h5"
                            className="w-fit"
                        >
                            {role} {type}
                        </Typography>
                        <div></div>
                    </div>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                        className="flex flex-col items-center w-full space-y-4"
                    >
                        {type === "Signup" && (
                            <Grid container justifyContent={"space-between"}>
                                <Grid item>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="first-name"
                                        label="First Name"
                                        type="text"
                                        id="first-name"
                                        autoComplete="first-name"
                                        value={state.firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="last-name"
                                        label="Last Name"
                                        type="text"
                                        id="last-name"
                                        autoComplete="last-name"
                                        value={state.lastName}
                                        onChange={handleLastNameChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={type === "Signup" && isInvalidEmail}
                            value={state.email}
                            onChange={handleEmailChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={state.password}
                            onChange={handlePasswordChange}
                        />
                        {type === "Signup" ? (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="current-password"
                                    value={state.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </>
                        ) : (
                            <div className="w-full">
                                <FormControlLabel
                                    control={<Checkbox value="remember" />}
                                    label="Remember me"
                                    checked={state.rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                            </div>
                        )}
                        {incorrect && type === "Login" && (
                            <Typography className="text-red-500 w-full">
                                Incorrect email or password
                            </Typography>
                        )}
                        {type === "Signup" && isInvalidEmail && (
                            <Typography className="text-red-500 w-full">
                                Invalid email
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            className="mt-3 mb-2"
                            fullWidth
                            disabled={
                                loginMutation.isLoading ||
                                addUserMutation.isLoading
                            }
                        >
                            {type}
                        </Button>
                        {type === "Login" && (
                            <Grid
                                container
                                className="flex w-full justify-between"
                            >
                                <Grid item xs>
                                    {/* <Link
                                        href="#"
                                        variant="body2"
                                        className="cursor-default text-gray-500 no-underline"
                                    >
                                        Forgot password?
                                    </Link> */}
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        display:
                                            role === "PantryBoy"
                                                ? "none"
                                                : "inherit",
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            dispatch(authFormActions.reset());
                                            setRole("");
                                            navigate("/signup");
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            className="text-blue-500 no-underline cursor-pointer"
                                        >
                                            {"Don't have an account? Sign Up"}
                                        </Typography>
                                    </button>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Form;

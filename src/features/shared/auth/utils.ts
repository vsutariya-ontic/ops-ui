import { ActionType, AuthFormState } from "./types";
const initialState: AuthFormState = {
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    firstName: "",
    lastName: "",
};
export const formReducer = (
    state: AuthFormState,
    action: { type: ActionType; payload?: any }
): AuthFormState => {
    switch (action.type) {
        case ActionType.EMAIL_CHANGE:
            return { ...state, email: action.payload };
        case ActionType.PASSWORD_CHANGE:
            return { ...state, password: action.payload };
        case ActionType.CONFIRM_PASSWORD_CHANGE:
            return { ...state, confirmPassword: action.payload };
        case ActionType.REMEMBER_ME_CHANGE:
            return { ...state, rememberMe: action.payload };
        case ActionType.FIRST_NAME_CHANGE:
            return { ...state, firstName: action.payload };
        case ActionType.LAST_NAME_CHANGE:
            return { ...state, lastName: action.payload };
        case ActionType.RESET:
            return initialState;
        default:
            return state;
    }
};
export const authFormActions = {
    reset: () => ({
        type: ActionType.RESET,
    }),

    emailChange: (email: string) => ({
        type: ActionType.EMAIL_CHANGE,
        payload: email,
    }),

    passwordChange: (password: string) => ({
        type: ActionType.PASSWORD_CHANGE,
        payload: password,
    }),

    confirmPasswordChange: (confirmPassword: string) => ({
        type: ActionType.CONFIRM_PASSWORD_CHANGE,
        payload: confirmPassword,
    }),

    rememberMeChange: (rememberMe: boolean) => ({
        type: ActionType.REMEMBER_ME_CHANGE,
        payload: rememberMe,
    }),

    firstNameChange: (firstName: string) => ({
        type: ActionType.FIRST_NAME_CHANGE,
        payload: firstName,
    }),

    lastNameChange: (lastName: string) => ({
        type: ActionType.LAST_NAME_CHANGE,
        payload: lastName,
    }),
};

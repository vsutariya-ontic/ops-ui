export interface UserSignupRequest {
    user_name: string;
    user_email: string;
    user_password: string;
    user_role: string;
    table_no?: number;
    team_id: any;
}

export interface AuthLayoutProps {
    type: string;
}

export interface RoleCardProps {
    role: string;
    type: string;
    cardName: string;
    setRole: (role: string) => void;
    iconPath: string;
}

export interface UserLoginRequest {
    user_email: string;
    user_password: string;
    user_role: string;
}

export enum ActionType {
    EMAIL_CHANGE = "EMAIL_CHANGE",
    PASSWORD_CHANGE = "PASSWORD_CHANGE",
    CONFIRM_PASSWORD_CHANGE = "CONFIRM_PASSWORD_CHANGE",
    REMEMBER_ME_CHANGE = "REMEMBER_ME_CHANGE",
    FIRST_NAME_CHANGE = "FIRST_NAME_CHANGE",
    LAST_NAME_CHANGE = "LAST_NAME_CHANGE",
    RESET = "RESET",
}
export interface AuthFormProps {
    type: string;
    role: string;
    setRole: (role: string) => void;
}

export interface AuthFormState {
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    firstName: string;
    lastName: string;
}

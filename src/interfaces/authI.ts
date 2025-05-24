export interface authI {
    statusText: string;
    message: string;
}

export interface loginI {
    login: string;
    password: string;
}

export interface signUpI {
    login: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface errorI {
    status: number;
    message: string;
}

export interface successI {
    statusText: string;
    message: string;
}

export interface verifyOtpI {
    email: string;
    otpToken: string;
}

export interface restoreI {
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

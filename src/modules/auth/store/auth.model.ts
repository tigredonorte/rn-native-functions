export interface AuthUserModel {
    id: string;
    name: string;
    email: string;
}

export interface ISignupModel {
    email: string;
    password: string;
};
export interface ILoginModel {
    email: string;
    password: string;
};
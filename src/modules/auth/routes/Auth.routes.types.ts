export enum AuthRoutes {
    Login = "Login",
    Signup = "Signup",
    Recover = "Recover",
    Logout = "Logout",
}

export type AuthStackType = {
    [AuthRoutes.Login]: undefined;
    [AuthRoutes.Signup]: undefined;
    [AuthRoutes.Recover]: undefined;
    [AuthRoutes.Logout]: undefined;
};
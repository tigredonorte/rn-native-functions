import * as SecureStore from 'expo-secure-store';
import { ThunkDispatch } from 'redux-thunk';

import { AuthUserModel, ILoginModel, ISignupModel } from './auth.model';
import { AuthState as State, AuthStateName } from './auth.state';
import { requestService } from './request.service';

export enum AuthActionType {
    Authenticate = 'AuthenticateAction',
    Logout = 'LogoutAction',
    Recover = 'RecoverAction',
    VerifyResetCode = 'VerifyResetCodeAction',
    ResetPassword = 'ResetPasswordAction',
    ChangeEmail = 'ChangeEmailAction',
    ChangePassword = 'ChangePasswordAction',
    UpdateProfile = 'UpdateProfileAction',
    FetchUser = 'FetchUserAction',
    DeleteAccount = 'DeleteAccountAction',
    ConfirmVerifyEmail = 'ConfirmVerifyEmailAction',
    VerifyEmail = 'VerifyEmailAction',
}

const saveToStorage = async(data: any) => {
    data.expirationDate = new Date(new Date().getTime() + (parseInt(data.expiresIn) * 1000)).toISOString();
    await SecureStore.setItemAsync(AuthStateName, JSON.stringify(data));
}

const getFromStorage = async() => JSON.parse(await SecureStore.getItemAsync(AuthStateName) || '');
const deleteFromStorage =async() => await SecureStore.deleteItemAsync(AuthStateName);

let timer: NodeJS.Timeout;
const setLogoutTimer = (expirationTime: number) => {
    return async(dispatch: ThunkDispatch<State, any, ILogout>): Promise<void> => {
        if (isNaN(expirationTime)) {
            return;
        }
        timer = setTimeout(() => {
            dispatch(logoutAction());
        }, expirationTime);
    }
}
const clearLogoutTimer = () => timer ?? clearTimeout(timer);

export interface IAuthenticate { 
    type: AuthActionType.Authenticate;
    user: AuthUserModel;
    token: string;
};

const Authenticate = (payload: { email: string; displayName: string; localId: string; idToken: string }, expiresIn: number ) => {
    return async(dispatch: ThunkDispatch<State, any, IAuthenticate | ILogout>): Promise<void> => {
        try {
            dispatch(setLogoutTimer(expiresIn));
            const user = { email: payload.email, name: payload.displayName, id: payload.localId };
            dispatch({ type: AuthActionType.Authenticate, user, token: payload.idToken });
        } catch (error) {
            throw error;
        }
    }
}

export const SetTokenAction = () => {
    return async(dispatch: ThunkDispatch<State, any, IAuthenticate | ILogout>): Promise<void> => {
        try {
            const userToken = await getFromStorage();
            if (!userToken) {
                throw new Error('No token found!');
            }

            const expirationDate = new Date(userToken.expirationDate);
            if (expirationDate <= new Date() ) {
                return dispatch(logoutAction());
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();
            dispatch(Authenticate(userToken, expirationTime));
        } catch (error) {
            dispatch({ type: AuthActionType.Authenticate, user: { id: '', email: '', name: '' }, token: '' });
        }
    };
}

export const SignupAction = (payload: ISignupModel) => {
    return async(dispatch: ThunkDispatch<State, any, IAuthenticate>): Promise<void> => {
        try {
            const resData = await requestService({
                url: 'signUp',
                data: { ...payload, returnSecureToken: true },
                errorMessage: 'Unable to perform Signup!',
                needToken: false
            });
            await saveToStorage(resData);
            
            dispatch(Authenticate(resData, parseInt(resData.expiresIn) * 1000));
        } catch (error) {
            throw error;
        }
    };
}

export const LoginAction = (payload: ILoginModel) => {
    return async(dispatch: ThunkDispatch<State, any, IAuthenticate>): Promise<void> => {
        try {        
            const resData = await requestService({
                url: 'signInWithPassword',
                data: { ...payload, returnSecureToken: true },
                errorMessage: 'Unable to perform Login!',
                needToken: false
            });

            await saveToStorage(resData);
            dispatch(Authenticate(resData, parseInt(resData.expiresIn) * 1000));
        } catch (error) {
            throw error;
        }
    };
}

// Action to Logout - Clear all redux states
export interface ILogout { type: AuthActionType.Logout };
export const logoutAction = () => {
    return async(dispatch: ThunkDispatch<State, any, ILogout>): Promise<void> => {
        try {
            clearLogoutTimer();
            await deleteFromStorage();
            dispatch({ type: AuthActionType.Logout });
        } catch (error) {
            throw error;
        }
    }
};

export interface IRecover { type: AuthActionType.Recover, email: string };
export const RecoverAction = (email: string) => {
    return async(dispatch: ThunkDispatch<State, any, IRecover>): Promise<void> => {
        try {
            const resData = await requestService({
                url: 'sendOobCode',
                data: { email, requestType:"PASSWORD_RESET" },
                errorMessage: 'Error recovering the password!',
                needToken: false
            });
        
            console.log(resData);
            // dispatch({ type: AuthActionType.Recover, email });
        } catch (error) {
            throw error;
        }
    };
}

export interface IVerifyResetCode { type: AuthActionType.VerifyResetCode, email: string };
export const VerifyResetCodeAction = (email: string) => {
    return async(dispatch: ThunkDispatch<State, any, IVerifyResetCode>): Promise<void> => {
        try {

            const resData = await requestService({
                url: 'resetPassword',
                data: { email, requestType:"PASSWORD_RESET_CODE" },
                errorMessage: 'Error Verifying the reset code!',
                needToken: false
            });

            console.log(resData);
            // dispatch({ type: AuthActionType.VerifyResetCode, email: resData.email });
        } catch (error) {
            throw error;
        }
    };
}

export interface IResetPassword { type: AuthActionType.ResetPassword };
export const ResetPasswordAction = (resetCode: string, newPassword: string) => {
    return async(dispatch: ThunkDispatch<State, any, IResetPassword>): Promise<void> => {
        try {        
            const resData = await requestService({
                url: 'resetPassword',
                data: { oobCode: resetCode, newPassword },
                errorMessage: 'Error reseting password',
                needToken: false
            });

            console.log(resData);
            dispatch({ type: AuthActionType.ResetPassword });
        } catch (error) {
            throw error;
        }
    };
}

export interface IChangeEmail { type: AuthActionType.ChangeEmail, email: string };
export const ChangeEmailAction = (email: string) => {
    return async(dispatch: ThunkDispatch<State, any, IChangeEmail>): Promise<void> => {
        try {
            const resData = await requestService({
                url: 'update',
                data: { email, returnSecureToken: true },
                errorMessage: 'Error changing email',
                needToken: true
            });

            console.log({ resData });

            dispatch({ type: AuthActionType.ChangeEmail, email });
        } catch (error) {
            throw error;
        }
    };
}

export interface IChangePassword { type: AuthActionType.ChangePassword };
export const ChangePasswordAction = (password: string) => {
    return async(dispatch: ThunkDispatch<State, any, IChangePassword>): Promise<void> => {
        try {        
            const resData = await requestService({
                url: 'update',
                data: { password, returnSecureToken: true },
                errorMessage: 'Error recovering the password!',
                needToken: true
            });

            console.log(resData);
            dispatch({ type: AuthActionType.ChangePassword });
        } catch (error) {
            throw error;
        }
    };
}

export interface IUpdateProfile { type: AuthActionType.UpdateProfile, displayName: string; photoUrl?: string; };
export const UpdateProfileAction = (displayName: string, photoUrl?: string) => {
    return async(dispatch: ThunkDispatch<State, any, IUpdateProfile>): Promise<void> => {
        try {
            const resData = await requestService({
                url: 'update',
                data: { displayName, photoUrl, returnSecureToken: true },
                errorMessage: 'Error updating user profile',
                needToken: true
            });

            console.log(resData);

            dispatch({ type: AuthActionType.UpdateProfile, displayName, photoUrl });
        } catch (error) {
            throw error;
        }
    };
}

export interface IFetchUser { type: AuthActionType.FetchUser };
export const FetchUserAction = () => {
    return async(dispatch: ThunkDispatch<State, any, IFetchUser>): Promise<void> => {
        try {     
            const resData = await requestService({
                url: 'lookup',
                data: {},
                errorMessage: 'Error retrieving user data',
                needToken: true
            });

            console.log(resData);

            dispatch({ type: AuthActionType.FetchUser });
        } catch (error) {
            throw error;
        }
    };
}

export interface IVerifyEmail { type: AuthActionType.VerifyEmail };
export const VerifyEmailAction = () => {
    return async(dispatch: ThunkDispatch<State, any, IVerifyEmail>): Promise<void> => {
        try {     
            const resData = await requestService({
                url: 'sendOobCode',
                data: { requestType: "VERIFY_EMAIL" },
                errorMessage: 'Error sending verification link',
                needToken: true
            });

            console.log(resData);

            dispatch({ type: AuthActionType.VerifyEmail });
        } catch (error) {
            throw error;
        }
    };
}

export interface IConfirmVerifyEmail { type: AuthActionType.ConfirmVerifyEmail };
export const ConfirmVerifyEmailAction = (code: string) => {
    return async(dispatch: ThunkDispatch<State, any, IConfirmVerifyEmail>): Promise<void> => {
        try {     
            const resData = await requestService({
                url: 'update',
                data: { oobCode: code },
                errorMessage: 'Error confirming email',
                needToken: true
            });

            console.log(resData);

            dispatch({ type: AuthActionType.ConfirmVerifyEmail });
        } catch (error) {
            throw error;
        }
    };
}

export interface IDeleteAccount { type: AuthActionType.DeleteAccount };
export const DeleteAccountAction = (code: string) => {
    return async(dispatch: ThunkDispatch<State, any, IDeleteAccount>): Promise<void> => {
        try {     
            const resData = await requestService({
                url: 'delete',
                data: {},
                errorMessage: 'Error deleting account',
                needToken: true
            });

            console.log(resData);

            dispatch({ type: AuthActionType.DeleteAccount });
        } catch (error) {
            throw error;
        }
    };
}

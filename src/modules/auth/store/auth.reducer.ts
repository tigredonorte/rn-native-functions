import { GenericReducer } from '~app/utils/reduxUtilities';

import * as Action from './auth.action';
import { authInitialState, AuthState } from './auth.state';

export const AuthReducer = GenericReducer<AuthState, any>(authInitialState, {
    [Action.AuthActionType.Logout]: (state): AuthState => ({
        ...authInitialState,
        token: '',
        status: {
            ...state.status,
            isSignout: true,
        }
    }),
    [Action.AuthActionType.Authenticate]: (state, action: Action.IAuthenticate): AuthState => ({
        ...state,
        user: action.user,
        token: action.token,
        status: {
            ...state.status, 
            isLoading: false,
        }
    }),
    [Action.AuthActionType.Recover]: (state, action: Action.IRecover): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.ResetPassword]: (state, action: Action.IResetPassword): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.VerifyResetCode]: (state, action: Action.IVerifyResetCode): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.ChangeEmail]: (state, action: Action.IChangeEmail): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.ChangePassword]: (state, action: Action.IChangePassword): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.UpdateProfile]: (state, action: Action.IUpdateProfile): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.FetchUser]: (state, action: Action.IFetchUser): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.VerifyEmail]: (state, action: Action.IVerifyEmail): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.ConfirmVerifyEmail]: (state, action: Action.IConfirmVerifyEmail): AuthState => ({
        ...state
    }),
    [Action.AuthActionType.DeleteAccount]: (state, action: Action.IDeleteAccount): AuthState => ({
        ...state
    }),
});

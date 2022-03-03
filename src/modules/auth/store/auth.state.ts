import { AuthUserModel } from './auth.model';

export const AuthStateName = 'Auth';

export interface AuthState {
    status: {
        isLoading: boolean;
        isSignout: boolean;
    }
    token?: string,
    user?: AuthUserModel
};

export interface AuthFullState {
    [AuthStateName]: AuthState;
}

export const authInitialState: AuthState = {
    token: undefined,
    user: undefined,
    status: {
        isLoading: true,
        isSignout: false,
    }
}

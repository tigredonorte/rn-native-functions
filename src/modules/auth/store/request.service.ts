import * as SecureStore from 'expo-secure-store';
import env from '~environments';
import { i18nAuth } from '../i18n';

import { AuthStateName } from './auth.state';

export interface AuthRequest {
    url: string; 
    data: { [s: string]: any }, 
    needToken: boolean;
    errorMessage: string;
}

interface UserData {
    email: string;
    idToken: string;
    refreshToken: string;
    localId: string;
}

const getUrl = (url: string) => `${env.authServiceUrl}${url}?key=${env.authServiceKey}`

export const getUserData = async(): Promise<UserData> => {
    const userData = await SecureStore.getItemAsync(AuthStateName);
    if (!userData) {
        throw new Error('User not authenticated!');
    }
    return JSON.parse(userData);
}

export const requestService = async(post: AuthRequest, errorCallback?: (data: any) => void) => {
    let userData = null;
    if (post.needToken) {
        userData = await getUserData();
        post.data['idToken'] = userData.idToken
    }
    const resp = await fetch(getUrl(post.url), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post.data)
    });

    const response = await resp.json();
    if(resp.ok) {
        response.userData = userData;
        return response;
    }

    if (!errorCallback) {
        const message = response?.error?.errors[0]?.message;
        const translated = i18nAuth.t(message);
        throw new Error((message === translated || !translated) ? post.errorMessage : translated);
    }

    return errorCallback({ status: resp.status, response })
}
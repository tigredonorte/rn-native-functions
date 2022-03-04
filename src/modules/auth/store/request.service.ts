import { AUTH_SERVICE_KEY, AUTH_SERVICE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import i18next from 'i18next';

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

const getUrl = (url: string) => `${AUTH_SERVICE_URL}${url}?key=${AUTH_SERVICE_KEY}`

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
    console.log(getUrl(post.url));
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
        const translated = i18next.t(message);
        throw new Error((message === translated || !translated) ? post.errorMessage : translated);
    }

    return errorCallback({ status: resp.status, response })
}
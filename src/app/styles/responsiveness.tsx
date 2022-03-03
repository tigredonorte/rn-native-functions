import React from "react";
import { Dimensions } from "react-native";
import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";

const sizes = {
    'h1': 3,
    'h2': 2.4,
    'h3': 1.8,
    'icon': 1.4,
    'h4': 1.2,
    'h5': 1,
    'h6': .8,
}

export function fontSizer(size: 'h1' | 'h2' | 'h3' | 'icon' | 'h4' | 'h5' | 'h6' = 'h5' ) {
    const screenHeight = Dimensions.get('window').height;
    let fontBaseSize = 10;
    if(screenHeight > 800){
        fontBaseSize = 22;
    } else if(screenHeight > 600){
        fontBaseSize = 20;
    } else if(screenHeight > 400){
        fontBaseSize = 12;
    }
    return sizes[size] * fontBaseSize;
}

const getScreenInfo = () => {
    const dim = Dimensions.get('window');
    return dim;
}    

export type ScreenSizeClass = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ScreenData {
    isPortrait: boolean;
    screenWidth: number;
    screenHeight: number;
    screenClass: ScreenSizeClass;
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
}

const getScreenSizeClass = (width: number): ScreenSizeClass =>  
    width < 600
        ? width < 350
            ? 'xs'
            : 'sm'
        : width < 768
            ? 'md'
            : width < 992
                ? 'lg'
                : 'xl';

export const getScreen = (width: number, height: number) => ({
    isPortrait: width < height,
    screenWidth: width,
    screenHeight: height,
    screenClass: getScreenSizeClass(width),
    isXs: width <= 350,
    isSm: width > 350,
    isMd: width >= 600,
    isLg: width >= 768,
    isXl: width >= 992,
})

export const getScreenData = (): ScreenData => {
    try{
        return getScreen(getScreenInfo().width, getScreenInfo().height);
    } catch (e) {
        // fail silentetly
        return getScreen(320, 550);
    }
};

export const getScreenDimensions = () => {
    const obj = new BehaviorSubject(getScreenData());
    Dimensions.addEventListener('change', () => {
        const newValue = getScreenData();
        if (obj.value !== newValue) {
            obj.next(newValue);
        }
    });
    return obj.asObservable();
}

export function getStyle<T>(StyleFn: (data: ScreenData) => T) {
    return getScreenDimensions().pipe(distinctUntilChanged(), map(StyleFn));
}
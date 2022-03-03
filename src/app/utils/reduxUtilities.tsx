type ReducersObjType<State> = {
    [s: string]: (state: State, action: any) => State 
}

interface BaseAction { 
    type: string; 
}

export function GenericReducer<State, Action>(initialState: State, reducersObj: ReducersObjType<State>) {
    return (state: State = initialState, action: Action & BaseAction): State => {
        if (reducersObj[action.type]) {
            try {
                const newState = reducersObj[action.type](state, action);
                return newState ?? state;
            } catch (error) {
                console.error({ action, error });
            }
        }
        return state;
    }
}

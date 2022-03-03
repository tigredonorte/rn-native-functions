import React from 'react';

import { FetchStateEmpty, FetchStateEmptyInput } from './components/FetchStateEmpty';
import { FetchStateError, FetchStateErrorInput } from './components/FetchStateError';
import { FetchStateLoading } from './components/FetchStateLoading';

export interface FetchStateInput {
    loading?: boolean;
    empty?: FetchStateEmptyInput & {
        isEmpty: boolean;
    };
    error?: FetchStateErrorInput;
}

export const FetchStateContainer: React.FunctionComponent<FetchStateInput> = (props) => {

    if (props.loading) {
        return <FetchStateLoading />;
    }

    if (!!props.error?.errorText) {
        return <FetchStateError
            errorText={props.error?.errorText || ''}
            btnText={props.error?.btnText}
            fetchDataFn={props.error?.fetchDataFn}
        ></FetchStateError>;
    }

    if (props.empty?.isEmpty) {
        return <FetchStateEmpty
            onEmptyData={props.empty?.onEmptyData}
            emptyText={props.empty?.emptyText}
            emptyBtnText={props.empty?.emptyBtnText}
        ></FetchStateEmpty>;
    }

    return <>{props.children}</>;
}

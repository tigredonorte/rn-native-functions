import React, { useCallback, useEffect, useState } from 'react';

import { FetchStateContainer } from './FetchStateContainer';

export interface FetchContainerInput {
    dataLoadFn: () => any;
    isEmptyData: boolean;
    errorText?: string;
    errorBtnText?: string;
    empty?: {
        button?: {
            action: () => void;
            text: string;
        }
        text: string;
    }
}

export const FetchContainer: React.FunctionComponent<FetchContainerInput> = (props) => {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(props.isEmptyData);

    const { dataLoadFn } = props;

    const loadData = useCallback(async() => {
        try {
            setLoading(true);
            setErrorMessage('');
            setIsEmpty(false);
            props.dataLoadFn();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }, [ setLoading, setErrorMessage, setIsEmpty, dataLoadFn ]);

    useEffect(() => {
        loadData();
    }, [ loadData ]);

    return <FetchStateContainer
        loading={loading}
        empty={{
            isEmpty: isEmpty,
            emptyBtnText: props.empty?.button?.text,
            emptyText: props.empty?.text,
            onEmptyData: props.empty?.button?.action
        }}
        error={{ 
            errorText: props.errorText || errorMessage,
            btnText: props.errorBtnText,
            fetchDataFn: loadData
        }}
    />;
}

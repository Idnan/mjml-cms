import React, { useEffect, useRef } from 'react';
import { Flex, Text } from '@chakra-ui/core/dist';

export function Preview(props: any) {

    let iframe: any = useRef();

    useEffect(() => {
        if (!props.value) {
            return;
        }

        setIframeContent(props?.value ?? '');
    }, [props]);

    const setIframeContent = (value: string) => {
        window.requestAnimationFrame(() => {
            if (!iframe) {
                return;
            }
            const doc = iframe.contentDocument;
            const { documentElement } = doc;
            documentElement.innerHTML = value;
        });
    };

    return (
        <>
            { props.value ? (
                <iframe
                    title={ 'preview-window' }
                    tabIndex={ -1 }
                    scrolling={ undefined }
                    ref={ r => (iframe = r) }
                />
            ) : (
                <Flex flex={ 1 } flexDirection={ 'row' } justifyContent={ 'center' } alignItems={ 'center' }>
                    <Text>No Content</Text>
                </Flex>
            ) }
        </>
    );
}

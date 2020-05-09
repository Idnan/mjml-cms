import { BsImage } from 'react-icons/bs';
import { Box, Flex } from '@chakra-ui/core/dist';
import React, { useEffect, useRef } from 'react';

export function Preview(props: any) {

    let iframe: any = useRef();

    useEffect(() => {
        if (!props.value) {
            return;
        }

        setIframeContent(props?.value ?? '');
    }, [props]);

    const setIframeContent = (value: string) => {
        if (!iframe) {
            return;
        }
        const doc = iframe.contentDocument;
        const { documentElement } = doc;
        documentElement.innerHTML = value;
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
                <Flex flex={ 1 } flexDirection={ 'column' } justifyContent={ 'center' } alignItems={ 'center' }>
                    <Box as={ BsImage } size='100px' color='#42474e' />
                </Flex>
            ) }
        </>
    );
}

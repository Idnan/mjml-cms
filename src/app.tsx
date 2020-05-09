import get from 'lodash/get';
import { Box, Flex, Icon, PseudoBox } from '@chakra-ui/core/dist';

import './app.css';
import { Preview } from './components/preview';
import FileEditor from './components/file-editor';
import React, { useEffect, useState } from 'react';
import { DataEditor } from './components/data-editor';
import { renderTemplateService } from './services/render-template';

export function App() {

    const [mjmlWindow, setMjmlWindow] = useState(true);
    const [dataWindow, setDataWindow] = useState(true);

    const [editorWindow, setEditorWindow] = useState(true);
    const [previewWindow, setPreviewWindow] = useState(true);

    const [mjml, setMjml] = useState('');
    const [data, setData] = useState({});

    // const [template, setTemplate] = useState('');
    const [templateData, setTemplateData] = useState({});

    // useEffect(() => {
    //     if (!template) {
    //         return;
    //     }
    //
    //     getTemplateService(template)
    //         .then(data => {
    //             setMjml(data?.mjml || '');
    //             setTemplateData(data);
    //         });
    // }, [template]);

    useEffect(() => {
        if (!mjml) {
            return;
        }
        renderTemplateService(mjml, data)
            .then(data => setTemplateData(data));
    }, [data, mjml]);

    return (
        <Flex flexDir='row' flex={ 1 } bg='#252426'>
            {/*<Flex flexDirection={ 'column' }>
                <SideMenu selectedTemplateName={ setTemplate } />
            </Flex>*/ }
            <Flex flex={ 1 } flexDirection='column' bg='#1e1e1e' d={ editorWindow ? 'flex' : 'none' }>
                <Flex flex={ 1 } flexDirection='column' d={ mjmlWindow ? 'flex' : 'none' }>
                    <FileEditor content={ get(templateData, 'mjml', '') } mjml={ setMjml } />
                </Flex>
                <PseudoBox
                    _hover={ { backgroundColor: '#535a63' } }
                    onClick={ _ => setMjmlWindow(!mjmlWindow) }
                    h={ mjmlWindow ? '14px' : '20px' }
                    d={ dataWindow ? 'flex' : 'none' }
                    cursor='pointer'
                    bg='#42474e'
                    borderBottom='1px solid #343436'
                    justifyContent='center'
                    alignItems='center'>
                    <Icon name={ mjmlWindow ? 'chevron-up' : 'chevron-down' } />
                </PseudoBox>
                <PseudoBox
                    _hover={ { backgroundColor: '#535a63' } }
                    onClick={ _ => setDataWindow(!dataWindow) }
                    h={ dataWindow ? '14px' : '20px' }
                    d={ mjmlWindow ? 'flex' : 'none' }
                    cursor='pointer'
                    bg='#42474e'
                    justifyContent='center'
                    alignItems='center'>
                    <Icon name={ dataWindow ? 'chevron-down' : 'chevron-up' } />
                </PseudoBox>
                <Flex flex={ 1 } flexDirection='column' d={ dataWindow ? 'flex' : 'none' }>
                    <DataEditor data={ setData } />
                </Flex>
            </Flex>
            <PseudoBox
                _hover={ { backgroundColor: '#535a63' } }
                onClick={ _ => setEditorWindow(!editorWindow) }
                w={ editorWindow ? '14px' : '20px' }
                d={ previewWindow ? 'flex' : 'none' }
                cursor='pointer'
                bg='#42474e'
                borderRight='1px solid #343436'
                justifyContent='center'
                alignItems='center'>
                <Icon name={ editorWindow ? 'chevron-left' : 'chevron-right' } />
            </PseudoBox>
            <PseudoBox
                _hover={ { backgroundColor: '#535a63' } }
                onClick={ _ => setPreviewWindow(!previewWindow) }
                w={ previewWindow ? '14px' : '20px' }
                d={ editorWindow ? 'flex' : 'none' }
                cursor='pointer'
                bg='#42474e'
                justifyContent='center'
                alignItems='center'>
                <Icon name={ previewWindow ? 'chevron-right' : 'chevron-left' } />
            </PseudoBox>
            <Flex flex={ 1 } d={ previewWindow ? 'flex' : 'none' }>
                <Box d='flex' flexGrow={ 1 } className='preview'>
                    <Preview value={ get(templateData, 'html', '') } />
                </Box>
            </Flex>
        </Flex>
    );
}

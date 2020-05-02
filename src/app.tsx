import './app.css';
import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/core/dist';
import get from 'lodash/get';
import SideMenu from './components/side-menu';
import FileEditor from './components/file-editor';
import { getTemplateService } from './services/get-template';
import { Preview } from './components/preview';
import { renderTemplateService } from './services/render-template';
import { DataEditor } from './components/data-editor';

export function App() {

    const [mjml, setMjml] = useState('');
    const [template, setTemplate] = useState('');
    const [templateData, setTemplateData] = useState({});

    useEffect(() => {
        if (!template) {
            return;
        }

        getTemplateService(template)
            .then(data => setTemplateData(data));
    }, [template]);

    useEffect(() => {
        if (!mjml) {
            return;
        }
        renderTemplateService(mjml, {})
            .then(data => setTemplateData(data));
    }, [mjml]);

    return (
        <Flex flexDir='row' flex={ 1 } bg='#252426'>
            <Flex flexDirection={ 'column' }>
                <SideMenu selectedTemplateName={ setTemplate } />
            </Flex>
            <Flex flex={ 1 } flexDirection={ 'column' } bg={ '#1e1e1e' }>
                <Flex flex={1} flexDirection={'column'}>
                    <FileEditor content={ get(templateData, 'mjml', '') } mjml={ setMjml } />
                </Flex>
                <Flex flex={1} flexDirection={'column'}>
                    <DataEditor />
                </Flex>
            </Flex>
            <Flex flex={ 1 }>
                <Box d={ 'flex' } flexGrow={ 1 } className='preview'>
                    <Preview value={ get(templateData, 'html', '') } />
                </Box>
            </Flex>
        </Flex>
    );
}

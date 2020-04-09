import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/core/dist';
import get from 'lodash/get';
import SideMenu from './components/side-menu';
import FileEditor from './components/file-editor';
import { getTemplateService } from './services/get-template';

export function App() {
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [template, setTemplate] = useState('');

    useEffect(() => {
        if (!template) {
            return;
        }

        getTemplateService(template)
            .then(data => {
                setSelectedTemplate(data);
            });
    }, [template]);

    return (
        <Flex flexDir='row' flex={ 1 } bg='#252426'>
            <Flex flexDirection={ 'column' }>
                <SideMenu selectedTemplateName={ setTemplate } />
            </Flex>
            <Flex flex={ 1 } flexDirection={ 'column' } bg={ '#1e1e1e' }>
                <FileEditor content={ get(selectedTemplate, 'mjml', '') } />
            </Flex>
            <Flex flex={ 1 }>
            </Flex>
        </Flex>
    );
}

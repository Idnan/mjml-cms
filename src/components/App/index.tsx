import './index.css';
import { get } from 'lodash';
import SideMenu from '../SideMenu';
import FileEditor from '../FileEditor';
import { Flex } from '@chakra-ui/core/dist';
import React, { useEffect, useState } from 'react';
import { getTemplateService } from '../../services/get-template';

function App() {

    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [template, setTemplate] = useState('');

    useEffect(() => {
        if (template) {
            getTemplateService(template).then(data => {
                setSelectedTemplate(data);
            });
        }
    }, [template]);

    return (
        <Flex flexDirection={ 'row' } flex={ 1 }>
            <Flex flexDirection={ 'column' }>
                <SideMenu selectedTemplateName={ setTemplate } />
            </Flex>
            <Flex flex={ 1 } flexDirection={ 'column' } backgroundColor={ '#1e1e1e' }>
                <FileEditor content={ get(selectedTemplate, 'mjml', '') } />
            </Flex>
            <Flex flex={ 1 }>
            </Flex>
        </Flex>
    );
}

export default App;

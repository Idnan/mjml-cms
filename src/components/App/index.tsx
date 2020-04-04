import './index.css';
import React from 'react';
import SideMenu from '../SideMenu';
import FileEditor from '../FileEditor';
import { Flex } from '@chakra-ui/core/dist';

function App() {
    return (
        <Flex flexDirection={ 'row' } flex={ 1 }>
            <Flex flexDirection={ 'column' }>
                <SideMenu />
            </Flex>
            <Flex flex={ 1 } flexDirection={ 'column' } backgroundColor={ '#1e1e1e' }>
                <FileEditor />
            </Flex>
            <Flex flex={ 1 }>
            </Flex>
        </Flex>
    );
}

export default App;

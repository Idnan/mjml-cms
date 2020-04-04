import '../assets/css/App.css';
import React from 'react';
import { Flex, Heading, List, ListItem, Stack } from '@chakra-ui/core/dist';
import FileEditor from './FileEditor';

function App() {
    return (
        <Flex flexDirection={ 'row' } flex={ 1 }>
            <Flex flexDirection={ 'column' }>
                <Stack display={ 'block' }>
                    <Heading as='h6' size='xs' padding={ 0 }>Templates</Heading>
                    <hr />
                    <List styleType='none' padding={ 0 }>
                        <ListItem>buyer-account-verified</ListItem>
                        <ListItem>seller-account-verified</ListItem>
                    </List>
                </Stack>
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

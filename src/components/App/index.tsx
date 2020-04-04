import './index.css';
import React from 'react';
import FileEditor from '../FileEditor';
import { Flex, Heading, List, ListItem, Stack } from '@chakra-ui/core/dist';

function App() {
    return (
        <Flex flexDirection={ 'row' } flex={ 1 }>
            <Flex flexDirection={ 'column' }>
                <Stack display={ 'block' } paddingLeft={ 5 } paddingRight={ 10 } paddingY={ 0 }>
                    <Heading as='h6' size='xs' marginTop={ 5 } textTransform={ 'uppercase' }>Templates</Heading>
                    <hr />
                    <List styleType='decimal' padding={ 0 } lineHeight={ 1.6 }>
                        <ListItem className={'list-item'}>buyer-account-verified</ListItem>
                        <ListItem className={'list-item'}>seller-account-verified</ListItem>
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

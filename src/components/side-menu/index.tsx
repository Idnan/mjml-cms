import React, { useEffect, useState } from 'react';
import { Heading, List, ListItem, Stack } from '@chakra-ui/core/dist';
import { listTemplateService } from '../../services/list-template';

function SideMenu(props: any) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        listTemplateService()
            .then((data: string[]) => setTemplates(data as any));
    }, []);

    return (
        <Stack display={ 'block' } width='220px' spacing={0}>
            <Heading
                py={ 4 }
                bg='teal.900'
                px={ 3 }
                as='h6'
                fontSize='xs'
                textTransform={ 'uppercase' }>Templates</Heading>
            <List styleType='none'>
                {
                    templates.map((template: string, counter: number) =>
                        <ListItem
                            onClick={ () => {
                                props.selectedTemplateName(template);
                            } }
                            fontSize='md'
                            px={ 3 }
                            py={ 2 }
                            key={ `menu-item-${ counter }` }
                            _hover={ { cursor: 'pointer', bg: 'black' } }
                        >
                            { template }
                        </ListItem>
                    )
                }
            </List>
        </Stack>
    );
}

export default SideMenu;

import { Divider, Heading, List, ListItem, Stack } from '@chakra-ui/core/dist';
import React, { useEffect, useState } from 'react';
import { listTemplateService } from '../../services/list-template';

function SideMenu() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        listTemplateService()
            .then((data: string[]) => setTemplates(data as any));
    }, [false]);

    return (
        <>
            <Stack display={ 'block' } paddingLeft={ 5 } paddingRight={ 10 } paddingY={ 0 }>
                <Heading as='h6' size='xs' marginTop={ 5 } textTransform={ 'uppercase' }>Templates</Heading>
                <Divider/>
                <List styleType='decimal' padding={ 0 } lineHeight={ 1.6 } marginTop={2}>
                    {
                        templates.map((template: string, k: number) =>
                            <ListItem key={ `menu-item-${ k }` } className={ 'list-item' }>{ template }</ListItem>
                        )
                    }
                </List>
            </Stack>
        </>
    );
}

export default SideMenu;

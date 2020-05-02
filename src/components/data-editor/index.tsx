// @ts-ignore
import jsonlint from 'jsonlint-mod';
import React, { useEffect, useRef } from 'react';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/core/dist';

import './file-editor.css';
import './json-dark.css';

import CodeMirror, { Editor, EditorFromTextArea } from 'codemirror';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

// @ts-ignore
window.jsonlint = jsonlint;
let dataCodeMirror: EditorFromTextArea | any = null;

export function DataEditor(props: any) {
    let dataTextarea: any = useRef();

    useEffect(() => {
        if (!dataCodeMirror) {
            initDataEditor();
        }
    }, []);

    const beautify = (content: string): string => {
        return JSON.stringify(JSON.parse(content), null, 2);
    };

    const initDataEditor = () => {
        if (!dataTextarea) {
            return;
        }

        if (dataCodeMirror) {
            dataCodeMirror.toTextArea();
            dataCodeMirror = null;
        }

        // @ts-ignore
        dataCodeMirror = CodeMirror.fromTextArea(dataTextarea, {
            mode: 'application/json',
            autoCloseBrackets: true,
            lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: false,
            tabSize: 2,
            theme: 'json-dark',
            styleActiveLine: { nonEmpty: true },
            matchBrackets: true,
            foldGutter: true,
            lint: true,
            gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });

        dataCodeMirror.on('change', (cm: Editor) => {
            cm.setOption('lint', dataCodeMirror.getValue().trim());
        });

        dataCodeMirror.setOption('lint', dataCodeMirror.getValue().trim());
    };

    return (
        <>
            <Flex flexDirection={ 'row' } marginX={ 2 } marginY={ 2 } alignItems={ 'center' }>
                <Text
                    display={ 'flex' }
                    flex={ 1 }
                    fontSize={ 'xs' }
                    justifyContent={ 'flex-start' }
                    color={ '#fff' }>
                    Data Editor
                </Text>
                <ButtonGroup
                    spacing={ 2 }
                    flex={ 1 }
                    display={ 'flex' }
                    justifyContent={ 'flex-end' }>
                    <Button
                        cursor={ 'pointer' }
                        boxShadow={ 'none' }
                        color={ '#ffffff' }
                        _hover={ { background: 'transparent', borderColor: '#3470df', color: '#3470df' } }
                        size='xs'
                        variant='outline'
                        variantColor='teal'
                        onClick={ () => {
                            if (!dataCodeMirror) {
                                return;
                            }
                            dataCodeMirror.setValue(beautify(dataCodeMirror.getValue()));
                        } }>
                        Beautify
                    </Button>
                </ButtonGroup>
            </Flex>
            <Box className={ 'dataEditor' }>
                <textarea ref={ r => (dataTextarea = r) } />
            </Box>
        </>
    );
}

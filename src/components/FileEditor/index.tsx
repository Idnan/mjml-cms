import React, { useEffect, useRef } from 'react';

import './style.css';
import '../../assets/css/one-dark.css';

import beautifyJS from 'js-beautify';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/core/dist';

import CodeMirror, { Editor, EditorFromTextArea } from 'codemirror';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/lint/lint';

import { codeMirrorCtrlD, codeMirrorDuplicate } from './helpers/codemirror-shortcuts';
import { completeAfter, completeIfAfterLt, completeIfInTag } from './helpers/codemirror-autocomplete-mjml';

let _codeMirror: EditorFromTextArea | any = null;

function FileEditor(props: any) {
    let _textarea: any = useRef();

    useEffect(() => {
        if(!_codeMirror) {
            initEditor();
        }
        setContent(props.content);
    }, [props.content, _codeMirror]);

    const handleCtrlShiftD = (cm: any) => {
        codeMirrorDuplicate(cm, _codeMirror);
    };

    const handleCtrlD = (cm: any) => {
        codeMirrorCtrlD(cm, _codeMirror);
    };

    const initEditor = () => {
        if (!_textarea) {
            return;
        }

        if (_codeMirror) {
            _codeMirror.toTextArea();
            _codeMirror = null;
        }

        // @ts-ignore
        _codeMirror = CodeMirror.fromTextArea(_textarea, {
            tabSize: 2,
            dragDrop: false,
            matchTags: { bothTags: true },
            indentUnit: 2,
            indentWithTabs: false,
            mode: 'xml',
            lineNumbers: true,
            theme: 'one-dark',
            autoCloseTags: true,
            highlightSelectionMatches: { wordsOnly: true },
            foldGutter: true,
            styleActiveLine: { nonEmpty: true },
            gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            lineWrapping: true,
            extraKeys: {
                /* eslint-disable quotes */
                '\'<\'': (cm: Editor, pred: any) => completeAfter(CodeMirror, cm, pred),
                '\'/\'': (cm: Editor) => completeIfAfterLt(CodeMirror, cm),
                '\' \'': (cm: Editor) => completeIfInTag(CodeMirror, cm),
                '\'=\'': (cm: Editor) => completeIfInTag(CodeMirror, cm),
                'Ctrl-Space': 'autocomplete',
                'Ctrl-D': (cm: Editor) => handleCtrlD(cm),
                'Cmd-D': (cm: Editor) => handleCtrlD(cm),
                'Shift-Ctrl-D': (cm: Editor) => handleCtrlShiftD(cm),
                'Shift-Cmd-D': (cm: Editor) => handleCtrlShiftD(cm)
                /* eslint-enable quotes */
            }
        });
    };

    const beautify = (content: string): string => {
        return beautifyJS.html(content, {
            indent_size: 2,
            wrap_attributes_indent_size: 2,
            preserve_newlines: false
        });
    };

    const setContent = (content: string) => {
        const scrollInfo = _codeMirror.getScrollInfo();
        _codeMirror.setValue(content);
        _codeMirror.scrollTo(0, scrollInfo.top);
    };

    return (
        <>
            <Flex flexDirection={ 'row' } marginX={ 3 } marginY={ 3 } alignItems={ 'center' }>
                <Text
                    display={ 'flex' }
                    flex={ 1 }
                    justifyContent={ 'flex-start' }
                    color={ '#fff' }>
                    MJML Editor
                </Text>
                <ButtonGroup
                    spacing={ 2 }
                    flex={ 1 }
                    display={ 'flex' }
                    justifyContent={ 'flex-end' }>
                    <Button
                        className={ 'editorBtn' }
                        size='xs'
                        variant='outline'
                        variantColor='teal'
                        onClick={ () => {
                            if (!_codeMirror) {
                                return;
                            }
                            _codeMirror.setValue(beautify(_codeMirror.getValue()));
                        } }>
                        Beautify MJML
                    </Button>
                    <Button
                        className={ 'editorBtn' }
                        size='xs'
                        variant='outline'
                        variantColor='teal'>
                        Preview
                    </Button>
                </ButtonGroup>
            </Flex>
            <Box className={ 'FileEditor' }>
                <textarea ref={ r => (_textarea = r) } />
            </Box>
        </>
    );
}

export default FileEditor;

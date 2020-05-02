// @ts-ignore
import jsonlint from 'jsonlint-mod';
import { Box } from '@chakra-ui/core/dist';
import React, { useEffect, useRef } from 'react';

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
        setContent('');
    }, []);

    const setContent = (content: string) => {
        const scrollInfo = dataCodeMirror.getScrollInfo();

        dataCodeMirror.setValue(JSON.stringify({
            '_id': '5e08ad5c092c1b7d8e9e3034',
            'slug': 'agriculture',
            'children': [
                '5e08ad5c092c1b7d8e9e3039',
                '5e08ad5c092c1b7d8e9e3048',
                '5e08ad5c092c1b7d8e9e304a',
                '5e08ad5c092c1b7d8e9e304c',
                '5e08ad5c092c1b7d8e9e3053',
                '5e08ad5c092c1b7d8e9e306a',
                '5e08ad5c092c1b7d8e9e306c',
                '5e08ad5c092c1b7d8e9e306e',
                '5e08ad5c092c1b7d8e9e309f',
                '5e08ad5c092c1b7d8e9e30ce',
                '5e08ad5c092c1b7d8e9e30e7',
                '5e08ad5c092c1b7d8e9e30e9',
                '5e08ad5c092c1b7d8e9e30f0',
                '5e08ad5c092c1b7d8e9e3118',
                '5e08ad5c092c1b7d8e9e3123',
                '5e08ad5c092c1b7d8e9e3125',
                '5e08ad5c092c1b7d8e9e3147',
                '5e08ad5c092c1b7d8e9e3156',
                '5e08ad5c092c1b7d8e9e315d'
            ],
            'createdAt': '2019-12-29T13:42:52.272',
            'keywords': [],
            'level': 0,
            'parentId': null,
            'parents': [],
            'updatedAt': '2019-12-29T13:43:04.601',
            'active': true,
            'weight': 2,
            'shortId': 100,
            'name': 'Agriculture',
            'id': '5e08ad5c092c1b7d8e9e3034'
        }, null, 2));
        dataCodeMirror.scrollTo(0, scrollInfo.top);
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
            <Box className={ 'dataEditor' }>
                <textarea ref={ r => (dataTextarea = r) } />
            </Box>
        </>
    );
}

import React, { useEffect, useRef } from 'react';

import './style.css';
import '../../assets/css/one-dark.css';

import beautifyJS from 'js-beautify';
import { Box, Button } from '@chakra-ui/core/dist';

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

function FileEditor() {
    let _codeMirror: EditorFromTextArea | any = undefined;
    let _textarea: any = useRef();

    useEffect(() => {
        initEditor();
        setContent('<mjml> <mj-body> <mj-raw> <!-- Header --> </mj-raw> <mj-section background-url="https://i.ibb.co/BPQ5jgZ/bitmap-2x.jpg" background-size="cover" background-repeat="no-repeat" padding-top=\'48px\' padding-bottom=\'102px\'> <mj-column width="600px"> <mj-image width="170px" src="https://i.ibb.co/ZKMfxym/logo-white.png" align="right"></mj-image> <mj-text color="#fff" align=\'right\' font-size=\'12px\'>The eMarketplace <br />for MENA business buyers</mj-text> </mj-column> </mj-section> <mj-raw> <!-- Show in browser --> </mj-raw> <mj-section background-color="#4164a5" padding=\'0\'> <mj-column> <mj-text font-size="11px" color="#fff" color="#626262"><a href="#" style="color:#fff">View this email in your browser</a></mj-text> </mj-column> </mj-section> <mj-raw> <!-- Main content --> </mj-raw> <mj-section> <mj-column> <mj-text font-size="22px" color="#494949" font-family="Arial" font-weight=" bold" letter-spacing="-0.1px">Hi {{firstname}}</mj-text> <mj-text font-size="14px" line-height="24px" padding-bottom="24px">Your account has been verified as a buyer on Tradeling, we\'re so excited to welcome you onboard and provide you with access to a wide selection of verified and trusted Sellers.</mj-text> <mj-text font-family="Arial" font-size="16px" font-weight="bold" line-height="22px" letter-spacing="-0.1px" padding-bottom="16px">Tradeling offers you </mj-text> <mj-text font-size="14px" line-height="24px" padding-top="0px" padding-bottom="0"> <span style="margin-right:16px">•</span> An easy way to find trading partners and products. </mj-text> <mj-text font-size="14px" line-height="24px" padding-top="0px" padding-bottom="0"><span style="margin-right:16px">•</span> Reliable communication between partners.</mj-text> <mj-text font-size="14px" line-height="24px" padding-top="0px" padding-bottom="0"><span style="margin-right:16px" adding-bottom="24px">•</span> A smooth deal closing and beyond.</mj-text> <mj-text font-size="14px" line-height="24px" padding-bottom="24px">For any queries, please contact our Customer Care team from 10:00am - 10:00pm on our UAE toll free phone number <b>+971 4 2992002 </b>or Email us at <a href="mailto:xxx@tradelingcom"> xxx@tradelingcom </a> </mj-text> </mj-column> </mj-section> <mj-section padding="0"> {{#each users}} <mj-column> <mj-text font-size="16px" line-height="22px" letter-spacing="-0.1px" font-weight="bold">{{this}}</mj-text> </mj-column> {{/each}} </mj-section> <mj-raw> <!-- Don\'t miss ths --> </mj-raw> <mj-section padding="0"> <mj-column> <mj-text font-size="16px" line-height="22px" letter-spacing="-0.1px" font-weight="bold">Don’t miss on</mj-text> </mj-column> </mj-section> <mj-raw> <!-- Don\'t miss ths --> </mj-raw> <mj-section> <mj-column> <mj-image src="https://c8n.tradeling.com/web-www/assets/img/food-banner@2x.jpg"></mj-image> <mj-text font-size="14px" font-weight="bold">Food and Beverage latest</mj-text> </mj-column> <mj-column> <mj-image src="https://c8n.tradeling.com/web-www/assets/img/food-banner@2x.jpg"></mj-image> <mj-text font-size="14px" font-weight="bold">Office and Stationery latest</mj-text> </mj-column> </mj-section> <mj-section> <mj-column> <mj-image src="https://c8n.tradeling.com/web-www/assets/img/food-banner@2x.jpg"></mj-image> <mj-text font-size="14px" font-weight="bold">Health and Safety latest</mj-text> </mj-column> <mj-column> <mj-image src="https://c8n.tradeling.com/web-www/assets/img/food-banner@2x.jpg"></mj-image> <mj-text font-size="14px" font-weight="bold">Fashion lastest</mj-text> </mj-column> </mj-section> <mj-raw> <!-- Footer --> </mj-raw> <mj-section background-color="#f2f2f2"> <mj-column> <mj-text font-size="12px" line-height="19px">The content of this electronic communication is intended only for the use of the individual or entity to which it is addressed. It may contain information that is confidential or privileged. Distribution, disclosure or copying of this communication, other than by the intended recipient, is prohibited and may be unlawful. If you have received this communication in error, please notify us immediately and delete this communication and all copies of it. Tradeling does not accept liability for any errors, delay in the receipt, damage to your system or omissions in the contents of this communication.</mj-text> <mj-text font-size="12px" line-height="17px" font-weight="bold">BLINK Technologies FZCO - Dubai Airport Freezone (DAFZA) - Building 8E - Office Suite 201</mj-text> <mj-text font-size="12px" line-height="17px" letter-spacing="-0.2px">© 1999-2020 tradeling.com. All rights reserved.</mj-text> <mj-image align="left" width="30px" src="https://i.ibb.co/sy53PnL/linkedin-2x.png" /> </mj-column> </mj-section> </mj-body> </mjml>');
    }, [false]);

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
            _codeMirror = undefined;
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
            <Button onClick={ () => {
                if (!_codeMirror) {
                    return;
                }
                _codeMirror.setValue(beautify(_codeMirror.getValue()));
            } }>Beautify</Button>
            <Box className={ 'FileEditor' }>
                <textarea ref={ r => (_textarea = r) } />
            </Box>
        </>
    );
}

export default FileEditor;

import { last, maxBy } from 'lodash';
import { Editor, LineHandle } from 'codemirror';

export const codeMirrorCtrlD = (cm: Editor, doc: any) => {
    if (!cm.somethingSelected()) {
        // If nothing selected yet, select the word around the cursor
        const { ch, line } = cm.getCursor();
        const lineContent = cm.getLine(line);
        const reg = /([\d\w-_]+)/g;
        let found = false;
        let match;

        // eslint-disable-next-line no-cond-assign
        while (!found && (match = reg.exec(lineContent))) {
            if (ch >= match.index && ch <= reg.lastIndex) {
                found = true;

                cm.setSelection(
                    {
                        line,
                        ch: match.index
                    },
                    {
                        line,
                        ch: reg.lastIndex
                    }
                );
            }
        }
    } else {
        // Search and select next occurrence
        const selectionValue: any = cm.getSelections()[0];
        const selections: any = cm.listSelections();
        const lastSelection: any = last(selections);

        // don't support if multiline
        if (lastSelection.anchor.line !== lastSelection.head.line) return;

        const lastPos: any = maxBy([lastSelection.head, lastSelection.anchor], 'ch');
        let lineNb = lastPos.line;
        let found = false;

        const handleLine = ({ text }: {text: string}) => {
            if (!found) {
                let index;

                if (lineNb === lastPos.line) {
                    index = text.substring(lastPos.ch).indexOf(selectionValue);

                    if (index !== -1) index += lastPos.ch;
                } else {
                    index = text.indexOf(selectionValue);
                }

                if (index !== -1) {
                    found = true;
                    cm.setSelections(
                        [
                            ...selections,
                            {
                                anchor: {
                                    line: lineNb,
                                    ch: index
                                },
                                head: {
                                    line: lineNb,
                                    ch: index + selectionValue.length
                                }
                            }
                        ],
                        selections.length
                    );
                }
            }
            lineNb++;
        };

        doc.eachLine(lastPos.line, cm.lastLine(), handleLine);

        // Start again from beginning
        if (!found) {
            lineNb = 0;
            doc.eachLine(0, lastPos.line, handleLine);
        }
    }
};

export const codeMirrorDuplicate = (cm: Editor, doc: any) => {
    if (!cm.somethingSelected()) {
        // If nothing selected, duplicate current line
        const { line } = cm.getCursor();
        const lineContent = cm.getLine(line);

        doc.replaceRange(`${ lineContent }\n`, { line, ch: 0 });
        return;
    }

    const selections = cm.listSelections();

    selections.forEach((selection, i) => {
        // Get up-to-date selection because previous loops changed line numbers
        const select = i === 0 ? selection : cm.listSelections()[i];

        // if single line, duplicate line
        if (select.anchor.line === select.head.line) {
            const { line } = select.head;
            const lineContent = cm.getLine(line);

            doc.replaceRange(`${ lineContent }\n`, { line, ch: 0 });
            return;
        }

        // if multiline, duplicate all lines of the selection (full line, regardless of the selection)
        const lineNumbers = [select.head.line, select.anchor.line].sort();
        let lines = '';
        doc.eachLine(lineNumbers[0], lineNumbers[1] + 1, (line: LineHandle) => {
            lines += `${ line.text }\n`;
        });

        doc.replaceRange(`${ lines }`, { line: lineNumbers[0], ch: 0 });
    });
};

import { useRef, useState } from 'react';

const TextArea = () => {
    const [value, setValue] = useState('');
    const textArea = useRef();

    return (
        <textarea
            ref={textArea}
            onKeyDown={(e) => {
                if (e.shiftKey) {
                    if (e.shiftKey && e.key === 'Tab') {
                        e.preventDefault();

                        const { selectionStart, selectionEnd } = e.target;
                        const splitValue = value.split('\n');
                        const rowLength = splitValue.map((r) => r.length);

                        let row;
                        let start = 0;
                        let end = rowLength[0];

                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < splitValue.length; i++) {
                            row = i;
                            if (i > 0) {
                                start = end + 1;
                                end = start + rowLength[i];
                            }

                            if (selectionEnd >= start && selectionEnd <= end) {
                                console.log({ row, start, end });
                                break;
                            }
                        }

                        let newValue = splitValue[row];
                        if (newValue.substring(0, 2) === '  ') {
                            newValue = newValue.substring(2, newValue.length);
                        }

                        splitValue[row] = newValue;
                        const returnValue = splitValue.join('\n');

                        setValue(returnValue);

                        if (textArea.current) {
                            textArea.current.value = returnValue;
                            if (splitValue[row].startsWith(' ')) {
                                // eslint-disable-next-line no-multi-assign
                                textArea.current.selectionStart = textArea.current.selectionEnd =
                                    selectionStart - 2;
                            } else {
                                // eslint-disable-next-line no-multi-assign
                                textArea.current.selectionStart = textArea.current.selectionEnd =
                                    selectionStart;
                            }
                        }
                    }
                }

                if (e.key === 'Tab') {
                    if (!e.shiftKey && e.key === 'Tab') {
                        e.preventDefault();

                        const { selectionStart, selectionEnd } = e.target;

                        const newValue = `${value.substring(0, selectionStart)}  ${value.substring(
                            selectionEnd
                        )}`;

                        setValue(newValue);
                        if (textArea.current) {
                            textArea.current.value = newValue;
                            // eslint-disable-next-line no-multi-assign
                            textArea.current.selectionStart = textArea.current.selectionEnd =
                                selectionStart + 2;
                        }
                    }
                }
            }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            // value={value.map(v => )}
        />
    );
};

export default TextArea;

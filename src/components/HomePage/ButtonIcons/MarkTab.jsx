import { useSlate } from 'slate-react';
import { Button } from '../../custom';
import { toggleMark } from '../helper';
import { isMarkActive } from '../validation';

const MarkTab = ({ format, icon, setSelectedText }) => {
    const editor = useSlate();
    setSelectedText(editor);

    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

export default MarkTab;

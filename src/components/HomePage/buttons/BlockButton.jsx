import { useSlate } from 'slate-react';
import { Button } from '../custom';
import { toggleBlock } from '../helper';
import { isBlockActive } from '../validation';

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

export default BlockButton;

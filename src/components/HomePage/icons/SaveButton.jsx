/* eslint-disable no-alert */
import { MdSave } from 'react-icons/md';
import BlockCount from '../BlockCount';
import { Button } from '../custom';

const plugin = BlockCount({ blockLimit: null });

const SaveButton = ({ value }) => {
    const onSave = () => {
        console.log('Limit:', plugin.blockLimit);

        if (plugin.checkLimitCrossed()) {
            return alert("Can't save, limit crossed for top level element.");
        }

        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
        return alert('Saved successfully');
    };

    return (
        <Button style={{ color: '#28b728' }} title="Save" primary={false} onClick={() => onSave()}>
            <MdSave />
        </Button>
    );
};

export default SaveButton;

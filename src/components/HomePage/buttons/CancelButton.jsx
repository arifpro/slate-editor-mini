/* eslint-disable no-alert */
import { MdCancel } from 'react-icons/md';
import { getExistingValue } from '../helper';
import { Button } from '../plugins';

const CancelButton = ({ setValue }) => {
    const onCancel = () => {
        setValue(getExistingValue());
        return alert('restored to the old saved content');
        // setTimeout(() => alert('restored to the old saved content'), 1);
    };

    return (
        <Button title="Cancel" style={{ color: 'tomato' }} onClick={() => onCancel()}>
            <MdCancel />
        </Button>
    );
};

export default CancelButton;

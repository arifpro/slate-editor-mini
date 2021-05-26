/* eslint-disable no-alert */
import { MdCancel } from 'react-icons/md';
import { Button } from '../custom';
import { getExistingValue } from '../helper';

const CancelButton = ({ setValue }) => {
    const onCancel = () => {
        setValue(getExistingValue());
        setTimeout(() => {
            alert('restored to the old saved content');
        }, 1);
    };

    return (
        <Button title="Cancel" style={{ color: 'tomato' }} onClick={onCancel}>
            <MdCancel />
        </Button>
    );
};

export default CancelButton;

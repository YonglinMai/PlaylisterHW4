import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);
    let message = "";
    if (auth.errorMessage) {
        message = auth.errorMessage;
    }
    function handleCloseModal(event) {
        auth.hideModal();
    }

    return (
        <Modal
            open={auth.errorMessage != null}
        >
        <Alert
            severity="error"
            action={<Button color="inherit" size="small" onClick={handleCloseModal}>Confirm</Button>}
        >
        {message}
        </Alert>
            
        </Modal>
    );
}
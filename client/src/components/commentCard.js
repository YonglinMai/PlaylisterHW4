import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const {user, comment } = props;

    function handleClick() {
        // DOUBLE CLICK IS FOR SONG EDITING
        store.searchListByUser(user)
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            sx={{display: 'flex', "flexDirection": "column", overflow: "scroll", p: 1 }}
        >
            <Button
                onClick = {handleClick}
            >
                By: {user}
            </Button>
            <Box>
                {comment}
            </Box>
        </Box>
    );
}

export default CommentCard;
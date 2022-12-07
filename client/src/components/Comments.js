
import { useContext, useEffect, useState } from 'react'
import GlobalStoreContext from '../store';
import AuthContext from '../auth'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';




function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [text, setText] = useState("")
    let context = "";

    const handleSearchUser = (event) => {
        console.log(event.target.value)
        store.searchListByUser(event.target.value)
    }

    if(store.currentList != null && store.currentList.comments ){
        console.log(store.currentList.comments)
        context = store.currentList.comments.map(obj => (
            <ListItem>
                <Box
                    sx={{display: 'flex', "flexDirection": "column", p: 1 }}
                >
                    <Button
                        onClick = {handleSearchUser}
                    >By: {obj.user}</Button>
                    <Box>{obj.comments}</Box>
                </Box>
                
            </ListItem>
        )) 
    }

    
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log(text)
            store.addComment(auth.user.userName, text);
        }
    }
    function handleClick(){
        store.addComment(auth.user.userName, text);
    }

    return (
        <Box>
            <List>
                {context}   
            </List>
            
            <Box>
                <TextField
                        margin="normal"
                        size="small"
                        id="comment-textfield"
                        label="comment"
                        name="comment"
                        autoComplete="comment"
                        onChange={handleUpdateText}
                        onKeyPress={handleKeyPress}
                        sx={{width: '75%', height: '10%', left: '0%'}}
                        autoFocus
                    />
                    <IconButton

                        disabled = {!store.currentList || !store.currentList.pubDate}
                        sx={{transform:"translate(20%, 30%)"}}
                        onClick = {handleClick}
                    >Post</IconButton>
            </Box>
        </Box>
        
    )
}
export default Comments;
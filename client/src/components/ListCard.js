import { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import WorkspaceScreen from './WorkspaceScreen';
import EditToolbar from './EditToolbar'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PublishIcon from '@mui/icons-material/Publish';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '@mui/material/Button';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const {auth}  = useContext(AuthContext)
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
            store.addListens(idNamePair._id)
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleCloseList() {
        store.closeCurrentList();
    }

    function handleDuplicate(){
        store.duplicateList();
    }
    
    function handlelikes(){
        store.addLike(idNamePair._id);
    }
    
    function handleDislikes(){
        store.addDislike(idNamePair._id);
    }

    function handleSearch(){
        store.searchListByUser(idNamePair.userName);
    }

    
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let context = ""
    let editToolBar = ""
    if (store.currentList != null && store.currentList._id == idNamePair._id){
        context = <WorkspaceScreen/>
        editToolBar = <EditToolbar/>;  
    }


    let pubDate = ""
    let likesDislike = ""
    let listens = ""
    if (idNamePair.pubDate){
        pubDate = "Published: " + idNamePair.pubDate.slice(0,10)
        listens = "Listens: " + idNamePair.listens
        likesDislike = <Box sx={{ display: 'flex', "flexDirection": "row", transform:"translate(0%, -10%)"}}>
                            <Box>
                                <IconButton
                                    onClick={handlelikes}
                                >
                                    <ThumbUpIcon/>
                                    {idNamePair.likes}
                                </IconButton>
                            </Box>
                            <Box>
                                <IconButton
                                    onClick={handleDislikes}
                                >
                                    <ThumbDownIcon/>
                                    {idNamePair.dislikes}
                                </IconButton>
                            </Box>
                        </Box>
    }

    if (idNamePair.pubDate && (store.currentList != null && store.currentList._id == idNamePair._id)){
                editToolBar = <Button 
                                
                                id='copy-button'
                                //sx={{transform:"translate(0%, 20%)"}}
                                style={{ width: 1, height:35 }}
                                onClick={handleDuplicate}
                                variant="contained"
                                >
                                    <FileCopyIcon/>
                                </Button>
            }

    let arrow = 
    <IconButton
        disabled = {store.currentList != null}
        onClick={(event) => {
            handleLoadList(event, idNamePair._id)
        }}
    >
        <KeyboardDoubleArrowDownIcon
            style = {{width: '45px', height: '45px', padding: "10"}}
        />
    </IconButton>
    

    if (store.currentList != null && store.currentList._id == idNamePair._id){
        arrow = 
            <IconButton
                onClick={(event) => {
                    handleCloseList(event, idNamePair._id)
                    }}
            >
                <KeyboardDoubleArrowUpIcon
                        style = {{width: '45px', height: '45px', padding: "10"}}
                />
            </IconButton>
    
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', "flexDirection": "column", p: 1 }}
            style={{ width: '90%', fontSize: '48pt' }}
            button
            
        >
            <Box 
                sx={{ display: 'flex', "flexDirection": "row"}}
                style={{ width: '90%', fontSize: '30pt' }}
            >
                <Box 
                    sx={{ p: 1, display: 'flex', "flexDirection": "row"}}
                    style={{ width: '100%', fontSize: '20pt' }}
                >
                    {idNamePair.name}
                    <Box 
                        sx={{ p: 1, transform:"translate(0%, -30%)"}}
                        
                    >
                        <IconButton 
                            onClick={handleToggleEdit} 
                            disabled = {idNamePair.pubDate}
                            aria-label='edit'
                        >
                        <EditIcon />
                        </IconButton>
                    </Box>
                    <Box 
                        sx={{ p: 1, transform:"translate(0%, -30%)"}}
                    >
                        <IconButton 
                            disabled = {auth.user.userName != idNamePair.userName}
                            onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                </Box>
                {likesDislike}
                
            </Box>
            <Box
                sx={{ transform:"translate(7%, 0%)"}}
                style={{ width: '100%', fontSize: '10pt' }}
            >
               By:  <Button onClick = {handleSearch}>{idNamePair.userName}</Button>
               <br/>
               {pubDate}
               <br/>
               {listens}
            </Box>
            <Box 
                style={{ width: '100%', fontSize: '30pt' }}
                sx={{ display: 'flex', "flexDirection": "column"}}
            >
                <Box
                    style={{ width: '100%', fontSize: '30pt' }}
                >
                    {context}
                </Box>
                <Box 
                    sx={{ display: 'flex', "flexDirection": "row", transform:"translate(5%, 0%)"}}
                    style={{ width: '100%', fontSize: '30pt' }}
                >
                    {editToolBar}
                    <Box
                        style={{ width: '30%', fontSize: '30pt' }}
                        sx={{display: 'flex', "flexDirection": "row", justifyContent:"flex-end"}}
                    >
                    {arrow} 
                    </Box>
                   
                </Box>
                
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    // let context = 
    // context = store.currentList.songs.map((song, index) => (
    //     <SongCard
    //         id={'playlist-song-' + (index)}
    //         key={'playlist-song-' + (index)}
    //         index={index}
    //         song={song}
    //     />
    // )) 

    return (
        cardElement
    );
}

export default ListCard;
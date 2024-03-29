import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import PublishIcon from '@mui/icons-material/Publish';
import FileCopyIcon from '@mui/icons-material/FileCopy';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handlePublish(){
        store.publishList();
    }

    function handleDuplicate(){
        store.duplicateList();
    }

    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong() || store.currentModal !== "NONE"}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo() || store.currentModal !== "NONE"}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={!store.canRedo() || store.currentModal !== "NONE"}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={!store.canClose() || store.currentModal !== "NONE"}
                id='close-button'
                //sx={{transform:"translate(0%, 20%)"}}
                style={{ width: 1, height:35 }}
                onClick={handleDuplicate}
                variant="contained"
            >
                <FileCopyIcon/>
            </Button>
            <Button 
                disabled={!store.canClose() || store.currentModal !== "NONE"}
                id='publish-button'
                //sx={{transform:"translate(0%, 20%)"}}
                style={{ width: 1, height:35 }}
                onClick={handlePublish}
                variant="contained">
                <PublishIcon/>
            </Button>
        </div>
    )
}

export default EditToolbar;
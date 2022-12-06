import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import YouTubePlayerExample from './YouTubePlayerExample';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    const handleMenuOpen = (event) => {
        console.log("menu")
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortByName = () => {
        handleMenuClose();
        store.sortByName();
    }

    const handleSortByLike = () => {
        handleMenuClose();
        store.sortByLikes();
    }

    const handleSortByDislike = () => {
        handleMenuClose();
        store.sortByDislikes();
    }
    const styleForButton = {
        width: '45px',
        height: '45px',
        padding: "10",
      };

      const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick = {handleSortByName}>Name (A - Z) </MenuItem>
            <MenuItem>Published Date (Newest) </MenuItem>
            <MenuItem>Listens (High to Low) </MenuItem>
            <MenuItem onClick={handleSortByLike}>Likes (High to Low)</MenuItem>
            <MenuItem onClick={handleSortByDislike}>Dislikes (High to Low)</MenuItem>
        </Menu>
      );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box 
            id="playlist-selector"
            sx={{ display: 'flex', "flexDirection": "column"}}
        >
            <Box id="list-selector-heading">
                <Typography variant="h2">Your Lists</Typography>
            </Box>
            <Box id="home-Screen">
                <Box id="tool-bar"
                    sx={{width: '100%'}}>
                    <Box id="toolbar-button" sx={{transform:"translate(0%, 20%)"}}>
                        <HomeIcon style={styleForButton}></HomeIcon>
                        <Groups2Icon style={styleForButton}></Groups2Icon>
                        <PersonIcon style={styleForButton}></PersonIcon>
                    </Box>
                    <Box component="form" 
                    sx={{width: '50%', transform:"translate(20%, 0%)"}}>
                    <Fab 
                            sx={{transform:"translate(-20%, 10%)"}}
                            color="primary" 
                            aria-label="add"
                            id="add-list-button"
                            onClick={handleCreateNewList}
                        >
                            <AddIcon />
                        </Fab>
                        <TextField
                            margin="normal"
                            size="small"
                            id="search-textfield"
                            label="search"
                            name="search"
                            autoComplete="search"
                            sx={{width: '75%', height: '10%', left: '0%'}}
                            autoFocus
                        />
                        <SearchIcon style = {styleForButton} sx={{transform:"translate(20%, 20%)"}}></SearchIcon>
                    </Box> 
                    <Box sx ={{transform:"translate(175%, -20%)"}}>
                        <Typography  variant="string">Sort By </Typography>
                        <SortIcon 
                            sx ={{transform:"translate(0%, 35%)"}} 
                            style={styleForButton} 
                            onClick={handleMenuOpen}>
                        </SortIcon>
                        {sortMenu}
                    </Box>
                </Box>
                <Box id="user-screen"
                    sx={{ display: 'flex', "flexDirection": "row"}}
                >
                    <Box id="list-selector-list"
                    sx={{width: '50%'}}
                    >
                        {
                        listCard
                        }
                        <MUIDeleteModal />
                    </Box>
                    <Box 
                        id="song-player-screen"
                        sx={{width: '50%'}}
                        >
                        <YouTubePlayerExample/>
                    </Box>
                </Box>
            </Box>
        </Box>)
}

export default HomeScreen;
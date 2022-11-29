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
            <MenuItem>Name (A - Z) </MenuItem>
            <MenuItem>Published Date (Newest) </MenuItem>
            <MenuItem>Listens (High to Low) </MenuItem>
            <MenuItem>Likes (High to Low)</MenuItem>
            <MenuItem>Dislikes (High to Low)</MenuItem>
        </Menu>
      );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
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
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="home-Screen">
                <div id="tool-bar">
                    <Box id="toolbar-button" sx={{transform:"translate(0%, 20%)"}}>
                        <HomeIcon style={styleForButton}></HomeIcon>
                        <Groups2Icon style={styleForButton}></Groups2Icon>
                        <PersonIcon style={styleForButton}></PersonIcon>
                    </Box>
                    <Box component="form" sx={{transform:"translate(90%, 0%)"}}>
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
                        <SearchIcon style = {styleForButton} sx={{transform:"translate(0%, 10%)"}}></SearchIcon>
                    </Box> 
                    <Box sx ={{transform:"translate(380%, -20%)"}}>
                        <Typography  variant="string">Sort By </Typography>
                        <SortIcon 
                            sx ={{transform:"translate(0%, 35%)"}} 
                            style={styleForButton} 
                            onClick={handleMenuOpen}>
                        </SortIcon>
                        {sortMenu}
                    </Box>
                </div>
                <div></div>
                <div id="user-screen">
                    <div id="list-selector-list">
                        {
                        listCard
                        }
                        <MUIDeleteModal />
                    </div>
                    <div id="song-player-screen">
                        testtesttest
                    </div>
                </div>
            </div>
        </div>)
}

export default HomeScreen;
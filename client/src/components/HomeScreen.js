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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext  from '@mui/lab/TabContext';
import TabList  from '@mui/lab/TabList';
import Comments from './Comments';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState('videoPlayer')
    const [text, setText] = useState("")
    const isMenuOpen = Boolean(anchorEl);
    const [page, setPage] = useState("home")

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

    const handleSortByDate = () => {
        handleMenuClose();
        store.sortByDate();
    }

    const handleSortByLike = () => {
        handleMenuClose();
        store.sortByLikes();
    }

    const handleSortByDislike = () => {
        handleMenuClose();
        store.sortByDislikes();
    }

    const handleSortByListens = () => {
        handleMenuClose();
        store.sortByListens();
    }

    const handleChange = () => {
        if (value == "videoPlayer"){
            setValue("comments")
        }else{
            setValue("videoPlayer")
        }
    }

    const handleSearch = (event) => {
        store.searchList(text);
    }

    const handleUpdateText = (event) => {
        setText(event.target.value)
    }

    const handleKeyPress = (event) => {
        event.stopPropagation()
        if (event.code === "Enter" ) {
            event.preventDefault();
            if(page == "SearchByName" && text){
                handleSearch(text);
            }
            else if(page == "SearchByUser" && text){
                store.searchListByUser(text)
            }
            else{
                store.searchOwnedList(text)
            }

        }
    }

    const handleHome = (event) => {
        setPage("home");
        store.loadIdNamePairs();
    }

    const handleSearchByName = (event) => {
        setPage("SearchByName");
        store.clearAllTransactions();
    }

    const handleSearchByUser = (event) => {
        setPage("SearchByUser");
        store.clearAllTransactions();
    }

    let highlightHome = ""
    let highlightName = ""
    let highlightUser = ""

    if (page == "home"){
        highlightHome = {color: "black"};
    }else if(page == "SearchByName"){
        highlightName = {color: "black"};
    }else if(page == "SearchByName"){
        highlightUser = {color: "black"};
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
            <MenuItem onClick = {handleSortByDate}>Published Date (Newest) </MenuItem>
            <MenuItem onClick = {handleSortByListens}>Listens (High to Low) </MenuItem>
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
                        <IconButton
                            onClick = {handleHome}
                        >
                            <HomeIcon 
                            sx = {highlightHome}
                            style={styleForButton}></HomeIcon>
                        </IconButton>
                        <IconButton
                            onClick = {handleSearchByName}
                        >
                            <Groups2Icon 
                            sx = {highlightName}
                            style={styleForButton} ></Groups2Icon>
                        </IconButton>
                        <IconButton
                            onClick = {handleSearchByUser}
                        >
                            <PersonIcon 
                            sx = {highlightUser}
                            style={styleForButton}></PersonIcon>
                        </IconButton>
                        
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
                        <input
                            // margin="normal"
                            // size="small"
                            // id="search-textfield"
                            // label="search"
                            // name="search"
                            autoComplete="search"
                            onChange={handleUpdateText}
                            onKeyPress={handleKeyPress}        
                            sx={{width: '75%', height: '10%', left: '0%'}}

                        />
                        {/* <SearchIcon 
                            style = {styleForButton} 
                            sx={{transform:"translate(20%, 20%)"}}
                            onClick = {handleSearch}></SearchIcon> */}
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
                        <TabContext value = {value}>
                            <TabList  onChange={handleChange} aria-label="basic tabs example">
                                    <Tab value="videoPlayer"label="Video Player" />
                                    <Tab value="comments" label="Comment"/>
                                </TabList>
                                <TabPanel value="videoPlayer" index={0}>
                                    <YouTubePlayerExample/>
                                </TabPanel>
                                <TabPanel value="comments" index={1}>
                                    <Comments/>
                                </TabPanel>
                        </TabContext>
                            
                       </Box> 
                </Box>
            </Box>
        </Box>
    )
}

export default HomeScreen;
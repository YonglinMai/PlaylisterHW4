import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';
import Box from '@mui/material/Box'
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function YouTubePlayerExample(props) {
    const { store } = useContext(GlobalStoreContext);
    const [currentSong, setCurrentSong] = useState(0);
    console.log(currentSong)

    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = ["7y4VB5H41Mc"];

    let infoBox = <Box
                    >
                    Now Playing:
                    <br/>
                    Playlist: 
                    <br/>
                    Song:
                    <br/>
                    Title: 
                    <br/>
                    Artist:
                </Box>;

    if (store.currentList && store.currentList.pubDate){
        playlist = store.currentList.songs.map((song) => (song.youTubeId))
        infoBox = <Box>
                    Now Playing:
                    <br/>
                    Playlist: {store.currentList.name}
                    <br/>
                    Song: {currentSong + 1}
                    <br/>
                    Title: {store.currentList.songs[currentSong].title}
                    <br/>
                    Artist: {store.currentList.songs[currentSong].artist}
                    <br/>
                </Box>
        //store.addListens(store.currentList._id)
    }
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if(currentSong > playlist.length){
            setCurrentSong(0)
        }
        let song = playlist[currentSong];
        if(store.currentList != null){
            song = store.currentList.songs[currentSong].youTubeId;
        }
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setCurrentSong((currentSong + 1) % playlist.length);
    }

    function decSong() {
        setCurrentSong((currentSong - 1) % playlist.length);
    }

    let player;
    function onPlayerReady(event) {
        player = event.target;
        loadAndPlayCurrentSong(event.target);
        player.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
        }
    }

    function handleLast() {
        decSong();
        player.playVideo();
    }

    function handlePause() {
        player.pauseVideo();
    }

    function handlePlay() {
        player.playVideo();
    }

    function handleNext() {
        incSong();
        player.playVideo();
    }

    return (
        <Box
            sx={{ marginTop: '15px', display: 'flex', "flexDirection": "column", p: 1 }}
        >
            <Box>
                <YouTube
                    videoId={playlist[currentSong]}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange} 
                />
            </Box>
            <Box
                sx={{ p: 1, transform:"translate(0%, 275%)"}}
            >
                {infoBox}
            </Box>
           
            <Box
                sx={{ p: 1, transform:"translate(35%, 550%)"}}
            >
                <IconButton onClick={handleLast}>
                    <SkipPreviousIcon/>
                </IconButton>
                <IconButton onClick={handlePause}>
                    <StopIcon/>
                </IconButton>
                <IconButton onClick={handlePlay}>
                    <PlayArrowIcon/>
                </IconButton>
                <IconButton onClick={handleNext}>
                    <SkipNextIcon/>
                </IconButton>
                
            </Box> 
        </Box>
    )
}
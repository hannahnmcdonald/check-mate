import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import  { Grid }  from '@mui/material';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

//this styles the Friend's box, the green box 
const StyledFriendBox = styled(Card)(({ theme }) => ({
    color: "#ffffff", 
    padding: '10px',  
    background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`, 
    margin: '10px 0', 
    textAlign: "center", 
    borderRadius: 0, 
})); 

var colors = ['#00A1CB','#01A4A4','#113F8C','#E54028','#F18D05','#D70060'];
var randomColor = () => {
    return colors[Math.floor(Math.random()* colors.length)];
};

//this styles the friend's avatars 
const MyAvatar = styled(Avatar)(({ theme }) => ({
    margin: 20,  
    background: randomColor(), 
    width: 56, 
    height: 56,
    '&:hover': {
    cursor: 'pointer', 
    opacity: .7, 
    }
})); 

//this is mockup data for the friend's list. We will delete this after we get it pulling from the database
const myFriends = [
    {
        name: "Amanda", 
        initial: "A", 
    }, 
    {
        name: "Chris", 
        initial: "C", 
    }, 
    {
        name: "Hannah", 
        initial: "H", 
    }, 
    {
        name: "Ben", 
        initial: "B", 
    }, 
    {
        name: "Luke", 
        initial: "L", 
    }, 
    {
        name: "Daniel", 
        initial: "D", 
    }, 

]

const FriendBox = () => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        event.preventDefault(); 
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <StyledFriendBox>
            <CardContent>
                <Typography variant="h4">My Friends</Typography>    
                <Grid container spacing={2} sx={{justifyContent: 'space-evenly'}}> 
                {/* TODO: I have already set this up to pull from an array of objects. Would need to replace with our friend db  */}
                {myFriends.map((friend, index) => (
                    <Grid 
                        item 
                        xs={6} md={4} lg={3} 
                        key={index} 
                        sx={{display: 'flex', justifyContent: 'center'}}
                    >
                        <Tooltip title="See Stats">
                            <MyAvatar aria-describedby={id} onClick={handleClick}>{friend.initial}</MyAvatar> 
                        </Tooltip>
                            <Typography 
                                varient="h6" 
                                sx={{alignSelf: 'center'}}
                            >{friend.name}
                            </Typography>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            sx={{width: '100%'}}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                        >
                            {/* TODO: Replace with friend's name */}
                            <Typography variant="h6">{myFriends[0].name}</Typography>
                            {/* TODO: Replace with how many times they have played together */}
                            <Typography variant="body2">Teamup Times: 20</Typography>
                            {/* TODO: Replace with friend's game they have played the most */}
                            <Typography variant="body2" sx={{marginBottom: 2}}>Favorite Game: Monopoly</Typography>
                            <Grid container spacing={2} sx={{marginBottom: 2}}> 
                                <Grid item>
                                    <Typography variant="div">.</Typography>
                                    <Typography variant="body1">Wins:</Typography>
                                    <Typography variant="body1">Loses:</Typography>
                                </Grid>
                                <Grid item>
                                    {/* TODO: Replace with Friend's name */}
                                    <Typography variant="body1">{myFriends[0].name}</Typography>
                                    {/* TODO: Replace with Friends Total Wins */}
                                    <Typography variant="body2">12</Typography>
                                    {/* TODO: Replace with Friends Total Losses */}
                                    <Typography variant="body2">3</Typography>
                                    
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Me</Typography>
                                    {/* TODO: Replace with Users Total Wins */}
                                    <Typography variant="body2">18</Typography>
                                    {/* TODO: Replace with Users Total Losses */}
                                    <Typography variant="body2">0</Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" sx={{textAlign: 'center'}}>Total Wins</Typography>
                            {/* TODO: Replace this with a .map for our user's common games. Shows the wins from each game the user and friend have played together */}
                            <Grid container spacing={2}> 
                                <Grid item>
                                    <Typography variant="div">.</Typography>
                                    <Typography variant="body1">Monopoly:</Typography>
                                    <Typography variant="body1">Yahtzee:</Typography>
                                    <Typography variant="body1">Life:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{myFriends[0].name}</Typography>
                                    <Typography variant="body2">5</Typography>
                                    <Typography variant="body2">1</Typography>  
                                    <Typography variant="body2">3</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Me</Typography>
                                    <Typography variant="body2">4</Typography>
                                    <Typography variant="body2">10</Typography>
                                    <Typography variant="body2">1</Typography>
                                </Grid>
                            </Grid>
                        </Popover>
                    </Grid>
                    ))}
                </Grid>
            </CardContent>
        </StyledFriendBox>
    )
}

export default FriendBox
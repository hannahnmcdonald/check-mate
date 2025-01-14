import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import  { Grid }  from '@mui/material';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import randomColor from '../utils/randomColor';
import { useQuery } from '@apollo/client';
import { GET_FRIENDS } from '../utils/queries';
import { Stack } from '@mui/material';

var colors = ['#00A1CB','#01A4A4','#113F8C','#E54028','#F18D05','#D70060'];
//this styles the Friend's box, the green box 
const StyledFriendBox = styled(Card)(({ theme }) => ({
    color: "#ffffff", 
    padding: '10px',  
    background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`, 
    margin: '10px 0', 
    textAlign: "center", 
    borderRadius: 0, 
})); 

//this styles the friend's avatars 
const MyAvatar = styled(Avatar)(({ theme }) => ({
    margin: "15px 40px", 
    background: randomColor(colors), 
    width: 80, 
    height: 80,
    '&:hover': {
    cursor: 'pointer', 
    opacity: .7, 
    }
})); 


    //this is mockup data for the friend's list. We will delete this after we get it pulling from the database

const FriendBox = (props) => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const [friendList, setFriendList] = React.useState([]);

    const { loading, error, data, refetch } = useQuery(GET_FRIENDS);

    const [ openedPopoverId, setOpenedPopoverId ] = React.useState(null);
    

    const faveGame = props.faveGame? props.faveGame : ["Monopoly", 10];

    useEffect(() => {
        if(data) {
            if(data.getFriends != null) {
            console.log("Currently Logged in user",data.getFriends); 
            setFriendList([...data.getFriends[0].friends]);
            console.log("Friend List State Variable: " + friendList);
            }else{
                setFriendList([{firstName: 'No Friends Yet'}]);
            }
        }
        }, [data]);

    const handleClick = (event, popoverId) => {
        event.preventDefault(); 
        setAnchorEl(event.currentTarget);
        setOpenedPopoverId(popoverId);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setOpenedPopoverId(null);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <StyledFriendBox>
            <CardContent>
                <Typography variant="h4" sx={{marginBottom: 4}}>My Friends</Typography>    
                <Grid container spacing={2} sx={{justifyContent: 'space-evenly'}}> 
                {/* TODO: I have already set this up to pull from an array of objects. Would need to replace with our friend db  */}
                {friendList? friendList.map((friend, i) => (
                    <>
                    <Stack direction="column">
                        <Tooltip title="See Stats">
                            <MyAvatar aria-describedby={id} onClick={(e) => handleClick(e, friend._id)}>{friend? friend.firstName.charAt(0): null}</MyAvatar> 
                        </Tooltip>
                            <Typography 
                                varient="h6" 
                                sx={{alignSelf: 'center'}}
                            >{friend.firstName}
                            </Typography>
                    </Stack>
                    <Popover
                        id={id}
                        open={openedPopoverId === friend._id}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        sx={{width: '100%', padding: "10px"}}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    >
                        {/* TODO: Replace with friend's name */}
                        <Typography variant="h6">{friend.firstName}</Typography>
                        {/* TODO: Replace with how many times they have played together */}
                        {/* <Typography variant="body2">Teamup Times: 3</Typography> */}
                        {/* TODO: Replace with friend's game they have played the most */}
                        {/* <Typography variant="body2" sx={{marginBottom: 2}}>Favorite Game: {faveGame[0]}</Typography> */}
                        <Grid container spacing={2} sx={{marginBottom: 2}}> 
                            <Grid item>
                                <Typography variant="div">.</Typography>
                                <Typography variant="body1">Wins:</Typography>
                                <Typography variant="body1">Loses:</Typography>
                            </Grid>
                            <Grid item>
                                {/* TODO: Replace with Friend's name */}
                                <Typography variant="body1">{friend.firstName}</Typography>
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
                                <Typography variant="body1">{friend.firstName}</Typography>
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
                </>
                )): null}
                </Grid>
            </CardContent>
        </StyledFriendBox>

)}

export default FriendBox;

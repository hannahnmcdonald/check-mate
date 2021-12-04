import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Grid, Typography, TextField, CardMedia, Card } from '@mui/material';
import { styled } from '@mui/system';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image from '../Images/gamebackgroundimage.png';
import { Link } from "react-router-dom";
import SubmitBtn from '../components/SubmitBtn'; 
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Play from '../components/Play'; 
import Results from '../components/Results'; 
import GameDetails from '../components/GameDetails';

const StyledButton = styled(Button)(({ theme }) => ({ 
  color: '#616161',
  height: "auto",
  "&:hover": {
      color: '#ffffff',
      background: 'transparent',
      border: "2px solid white",
  }
})); 

const RulesBtn = styled(Button)(({ theme }) => ({ 
  display: 'block', 
  height: "auto",
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`, 
  color: 'white', 
  margin: 20, 
  fontSize: 20, 
  '&:hover': {
    cursor: 'pointer', 
    opacity: .8, 
  }
})); 

const MyCard = styled(Card)(({ theme }) => ({ 
  background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`, 
  color: 'white',  
  borderRadius: 0,
})); 

const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);

  // create state for holding search field data
  const [searchInput, setSearchInput] = useState('');

  // create a state to hold the value of the selected game to be used once learn more is clicked
  //const [selectedGame, setSelectedGame] = useState('');

  const [selectedGameData, setSelectedGameData] = useState('');

  //This changes the colors of the backgrounds of each of the cards
  // Theme colors added to array
  var colors = ['#00A1CB','#01A4A4','#113F8C','#61AE24','#D0D102','#32742C','#E54028','#F18D05','#D70060'];
  var randomColor = () => {
      return colors[Math.floor(Math.random()* colors.length)];
  };


  const handleLearnMoreClick = (selectedGameId) => {
    const newArray = searchedGames.filter (item => item.gameId === selectedGameId);
    setSelectedGameData(newArray);
}

  useEffect(() => {
    if (selectedGameData) {
    console.log("selectedGameData: ", selectedGameData);}
  }, [selectedGameData]);


  // create method to search for games and set state on form submit
  const handleGameSearchFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://api.boardgameatlas.com/api/search?name=${searchInput}&limit=6&client_id=${process.env.REACT_APP_CLIENT_ID}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data  = await response.json();
      console.log( data );
      const returnedGameData = data.games;

      const setLength = (description) => {
        if(description.length > 450){
              return (description.slice(0,300) + "...");
        } else {
              return description;
        }
            };
      
      const gameData = returnedGameData.map((game) => ({
        gameId: game.id,
        gameName: game.name,
        gameDescription: setLength(game.description_preview),
        fullGameDescription: game.description_preview,
        image_url: game.image_url,
        image_thumb: game.images.thumb,
        minPlayers: game.min_players,
        maxPlayers: game.max_players,
        minAge: game.min_age,
        rulesUrl: game.rules_url,
        officialUrl: game.official_url

        // game: game.designer || ['No designer to display'],
        // image: game.imageLinks?.thumbnail || '',
      }));

      setSearchedGames(gameData);
      setSearchInput('');
      setSelectedGameData('');
    } catch (err) {
      console.error(err);
    }
  };

  const MyHeader = styled(Typography)(({ theme }) => ({
    color: 'white', 
    textShadow: `3px 3px 10px ${theme.palette.tertiary.dark}`, 
  })); 

  // This starts the code for the Tabs functionality
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
    <Grid container sx={{ justifyContent:'center', padding: '20px', color: '#ffffff', borderRadius: 0 }}>
         
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center',  backgroundImage: `url(${Image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', padding: '10px', borderRadius: 3, minHeight: 360}}>
        
        <Grid container>
          <Grid item xs={12} sx={{ m:3, ml:4, mr:4, }}>
            <MyHeader variant="h3" align="center" gutterBottom>
              Find Your Game!

            </MyHeader>
            {/* <img alt="" src= {Find}/> */}
          </Grid>

          <Grid item xs={12} sx={{ mb:2, textAlign: 'center'}}>
            <form onSubmit={handleGameSearchFormSubmit}>
              <Grid item xs={12} sx={{ mb:2, textAlign: 'center'}}>
                <TextField
                  required
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Enter name of Game"
                  sx= {{background: '#ffffff', borderRadius: 2, textAlign: 'center'}}
                />
                {/* color: '#616161' */}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                <SubmitBtn type="submit">Search</SubmitBtn>
              </Grid>
            </form>
          </Grid>
        </Grid>  
      </Grid>       
    </Grid>

  {!selectedGameData ? (  
  <Grid container sx={{ justifyContent:'center' }}>
    {searchedGames.map((game) => {
      return (
        <Grid item xs={12} sm={8} md={6} lg={4} xl={2} sx={{display: "flex", justifyContent:"center"}} key={game.gameId}>
          <Card sx={{ borderRadius: 0, maxWidth: 300, maxHeight: 900, minHeight: 900, margin:"30px", color: "#ffffff", background: randomColor, padding: '10px', }}>
            <CardContent sx={{ textAlign: 'center' }}>
            
              <CardMedia
                component="img"            
                image={game.image_url}
                alt="Board game box cover"
              />
            
              <Typography variant="h5" gutterBottom component="div">
                {game.gameName}
              </Typography>

              <Typography>
                {game.gameDescription}
              </Typography>

              <CardActions>
                <StyledButton onClick={() => {
                  handleLearnMoreClick(game.gameId);
                }}
                 size="small" sx={{ background: "#ffffff", margin: 'auto' }}>Learn More</StyledButton>
               </CardActions>
            </CardContent>
      </Card>
      </Grid>
            );
          })}
    </Grid>
    ) : null}

  {/* This starts the hard code output to be replaced by filtered data */}
  {/* THIS NOW LIVES IN GAMEDETAILS PAGE!!! */}
  {selectedGameData ? ( 
    <Grid container align="center" justifyContent="center" sx={{mb:5, mt: 5}}>
      <Grid item xs={10} md={5}>
        <MyCard sx={{width: '70%', m: 5, p: 3}}>
          <CardContent>
            <CardMedia 
              component="img"
              image={selectedGameData[0].image_url}
              alt="Board game box cover"
            />
            {/* <Typography variant="h4" gutterBottom sx={{marginTop: 5}}>
            {selectedGameData[0].gameName}
            </Typography> */}
          </CardContent>
        </MyCard>
      </Grid>
      <Grid item xs={10} md={7}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{marginTop: 5}}>
            {selectedGameData[0].gameName}
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Official Rules" {...a11yProps(1)} />
              <Tab label="Alternate Rules" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography variant="body1" sx={{textAlign: 'left', fontSize: '20px'}}>
              {selectedGameData[0].fullGameDescription}
            </Typography>
            <Stack direction="row" spacing={3} sx={{marginTop: 5}}>
              <Typography>
                Minimum Players: {selectedGameData[0].minPlayers}
              </Typography>
              <Typography>
                Max Players: {selectedGameData[0].maxPlayers}
              </Typography>
              <Typography>
                Minimum Age: {selectedGameData[0].minAge}
              </Typography>
              </Stack>
              <Stack direction= "row" sx={{justifyContent: 'center', p: 5}}>
                <SubmitBtn size= 'large' sx={{width: 100}}>Play!</SubmitBtn>
              </Stack>
            {/* {selectedGameData[0].officialUrl ? ( 
              <Button href= {selectedGameData[0].officialUrl} target="_blank" variant="contained">Game Site</Button>
            ) : null} */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {selectedGameData[0].rulesUrl ? ( 
              // <Button href= {selectedGameData[0].rulesUrl} target="_blank" variant="contained">Official Rules</Button>
              <RulesBtn href= {selectedGameData[0].rulesUrl} size= 'large' sx={{width: 200}}> Official Rules </RulesBtn>
            ) : (
              <Typography sx={{color:'red'}}>Sorry! We can't find the link.</Typography>
            )}
          </TabPanel>
          {/* TODO: Change this from a link to display the list of alternate rules created my different users */}
          <TabPanel value={value} index={2}>
            {/* <Button component={Link} to="/altrules" variant="contained">Alternate Rulesets</Button> */}
            <Stack direction= "row" sx={{justifyContent: 'center'}}>
              <RulesBtn component={Link} to="/altrules" size= 'large' sx={{width: 300}}>Add an Alternate Rule</RulesBtn>
            </Stack>
          </TabPanel>
          {/* <SubmitBtn component={Link} to="/play">Play!</SubmitBtn> */}
          {/* <RulesBtn component={Link} to="/altrules">Add A Rule</RulesBtn> */}
        </Box>
      </Grid>
  </Grid>      
  ) : null}

  <Play /> 
  <Results /> 
    </>
  );
};

export default SearchGames;
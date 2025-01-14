import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { USER_INFO, FIND_ALT_RULES } from '../utils/queries'
import {ADD_ALTRULES} from '../utils/mutations';
import Button from '@mui/material/Button';
import { 
    Typography, 
    TextField, 
     } from '@mui/material';

import { Grid, Box, CardContent } from '@mui/material';

const AltRulesComp = (props) => {

    const { error, data } = useQuery(USER_INFO);
	const userInfo = data ? data.userInfo : { name: '', email: '', friends: [] };
    if(error) {
        console.log(error);
    }
    const username = userInfo.username;

    const [altRules, setAltRules] = useState('');

    const [altRulesName, setAltRulesName] = useState('');

    const [gameId] = useState(props.selectedGameId);

    const [addAltRules ] = useMutation(ADD_ALTRULES);

    let [getAltRules, { data: dataDB = [] }  ] = useLazyQuery(FIND_ALT_RULES, {fetchPolicy: "network-only", nextFetchPolicy: "network-only"});

    useEffect (() => {
        getAltRules({variables: {game_id: gameId} });
    }, []);

    const handleRulesFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addAltRules({
                variables: { game_id: gameId, user: username, description: altRules, rule_set_name: altRulesName },
            });
            getAltRules({variables: {game_id: gameId} });
        } catch (err) {
            console.log(err);
        }
        setAltRulesName('');
        setAltRules('');   
    };


    var colors = ['#00A1CB','#01A4A4','#113F8C','#E54028','#F18D05','#D70060'];
    var randomColor = () => {
    return colors[Math.floor(Math.random()* colors.length)];
};
  
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ m:1, display: 'flex', justifyContent: 'center', borderRadius: 0 }}>
                    <Grid container>

                        <Grid item xs={12}>
                        <form onSubmit={handleRulesFormSubmit}>
                            <Grid container>
                            <Grid item xs={12} sx={{}}>
                                    <Typography variant="body2" align="center" sx={{}}>
                                        Enter your own rule modifications by entering a name for the ruleset and then its description.
                                    </Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ width: 400, maxWidth: '100%', ml:1, mr: 1, mt:1, mb:1, }}>
                                <TextField
                                    name="altRulesName"
                                    value={altRulesName}
                                    onChange={(e) => setAltRulesName(e.target.value)} 
                                    label="New Rule Set Name" 
                                    id="altRuleName"
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ width: 500, maxWidth: '100%',ml:1, mr: 1, mt:1, mb:1,  }}>
                                <TextField
                                    name="altRules"
                                    value={altRules}
                                    onChange={(e) => setAltRules(e.target.value)}
                                    fullWidth 
                                    multiline 
                                    minRows="3" 
                                    label="New Rule Set" 
                                    id="altRuleDesc"
                                />
                            </Grid>
                            </Grid>
                        

                            <Grid item xs={12} sx={{ mb:2, textAlign: 'center'}}>
                                    <Button type="submit" variant="contained">Submit</Button>
                            </Grid>
                        </form>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        
        {/* THIS IS THE START OF THE ALTERNATE RULES DISPLAY */}
        
        <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', borderRadius: 0 }}>
            <Grid container>

                {!dataDB.findaltrules ? null : dataDB.findaltrules.map((game) => {
                    return (
                        <Grid item xs={12} key={game._id}>
                            <Box sx={{ m:2, display: 'flex', justifyContent: 'center', borderRadius: 0, background: randomColor }}>
                                <CardContent>
                                    <Typography variant="h6" color="#ffffff" sx={{mb:1}}>
                                        {game.rule_set_name}
                                    </Typography>
                                    <Typography variant="body2" color="#ffffff" sx={{mb:1}}>
                                        Submitted by: {game.user}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }} color="#ffffff">
                                        {game.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Grid>
                    )
                })}

            </Grid>
        </Box>
        </Grid>
    </Grid>

        

    );
  };
  
  export default AltRulesComp;
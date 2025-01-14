import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { styled } from '@mui/system';
import Logo from '../Images/Checkmatelogofinal2.png'; 
import  { Grid }  from '@mui/material';
// AVATAR/PROFILE
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import randomColor from "../utils/randomColor";
import Auth from '../utils/auth';

const MyLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'grey'
}));

const useStyles = makeStyles((theme) => ({
  abRoot: {
    backgroundColor: '#616161',
  },
  right: {
    marginLeft: 'auto'
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    alignItems: 'center',
    // padding: '5px',
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    fontFamily: 'Quicksand',
    fontWeight: 600,
    align: 'right',
    marginRight: theme.spacing(10),
    "&:hover": {
      color: "#61AE24",
    },
  },
}));

var colors = ['#00A1CB','#01A4A4','#113F8C','#E54028','#F18D05','#D70060', '#61AE24', '#D0D102', '#32742C'];

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" classes={{root: classes.abRoot}}>
      <CssBaseline />
      <Toolbar> 
        {isMobile ? (
          <>
          <DrawerComponent/>
          <Link to='/'>
            <img src={Logo} />
          </Link>
          </>
        ) : ( 
          <>
          <Link to='/'>
            <img src={Logo} />
          </Link>
          <Grid className={classes.right}>
              {Auth.loggedIn() ? (<>
                <div className={classes.navlinks}>
                  <Link to="/searchgames" className={classes.link}>
                  Search Games
                  </Link> 
                <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                      <Avatar sx={{ width: 56, height: 56, background: randomColor(colors) }}>CM</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <Avatar /> 
                    <MyLink to='/profile'>
                      Profile
                      </MyLink>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <MyLink to="/friends">
                    Add Friends
                    </MyLink>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                      <MyLink to="/" onClick={Auth.logout} sx={{ textDecoration: 'none'}}>
                        Logout
                      </MyLink>
                  </MenuItem>
                </Menu>
              </React.Fragment>
              </div>
              </>
              )
              : <Link to="/login" className={classes.link}>
                  Login
                </Link>
                }
          </Grid>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

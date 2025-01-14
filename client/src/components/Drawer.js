import React, { useState } from "react";
import {
    Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Auth from '../utils/auth';
import { styled } from '@mui/system';

const MyLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#424242',
  fontSize: '20px',
  fontFamily: 'Quicksand',
  fontWeight: 500
}));

const useStyles = makeStyles(()=>({
    link:{
        fontFamily: 'Quicksand',
        fontWeight: 500,
        textDecoration:"none",
        color: "#616161",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {Auth.loggedIn() ? (<>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/searchgames" className={classes.link}>Search Games</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/friends" className={classes.link}>Add Friends</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/profile" className={classes.link}>Profile</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <MyLink to="/" onClick={Auth.logout}>Logout</MyLink>
            </ListItemText>
          </ListItem>
          </>
              )
              : <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/login" className={classes.link}>Login/Sign Up</Link>
                  </ListItemText>
                </ListItem>
                }
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
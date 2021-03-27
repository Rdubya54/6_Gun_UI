import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'


import MapView from '../Mapview/Mapview';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import SpecialPage from '../SpecialPage/SpecialPage';
import SignInPage from '../SignInPage/SignInPage';
import NewsFeedPage from '../NewFeedPage/NewsFeed';

import { GetUserData } from '../Providers/DisplayProvider';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    },
    bar: {
        position: "static",
        background: props => props.backcolor
    },
    drawer: {
        // backgroundColor: "#b3a8a8"
    },
    button: {
        color: "#b3a8a8"
    }
});

function NavBar() {

    var loginButton;

    const { userdata } = GetUserData();
    const classes = useStyles({ backcolor: userdata.display });

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        console.log("display is " + userdata.display)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //if user is logged in, display user name in upper right
    if (userdata.username) {
        loginButton = <Typography>{userdata.username}</Typography>;
    }

    //otherwise display login button
    else {
        loginButton = <Button color="inherit" ><Link to="/signin">Login</Link></Button>;
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar}>
                <Toolbar>
                    <IconButton edge="start" onClick={handleDrawerOpen} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        classes={{ paper: classes.drawer }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        onClick={handleDrawerClose}
                    >
                        <Divider />
                        <List>
                            {[
                                { text: 'News Feed', route: handleDrawerClose, to: '/' },
                                { text: 'Hunt Records', route: handleDrawerClose, to: '/' },
                                { text: 'Lake Status', route: handleDrawerClose, to: '/' },
                                { text: 'Draw Times', route: handleDrawerClose, to: '/' },
                                { text: 'Map', route: handleDrawerClose, to: "/geodata" },
                                { text: 'Users', route: handleDrawerClose, to: "/about" },
                                { text: 'Special', route: handleDrawerClose, to: "/special" }
                            ].map((data, index) => (
                                <ListItem button classes={{ button: classes.button }} key={data.text} onClick={data.route}>
                                    <Link to={data.to}> <ListItemText primary={data.text} /> </Link>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Drawer>
                    <Typography variant="h6" className={classes.title}>
                        6 Gun Club
                    </Typography>
                    {loginButton}
                </Toolbar>
            </AppBar>


            <Route path="/" exact component={NewsFeedPage} />
            <Route path="/geodata" exact component={MapView} />
            <Route path="/about" exact component={AboutUsPage} />
            <Route path="/special" exact component={SpecialPage} />
            <Route path="/signin" exact component={SignInPage} />
        </div>

    );
}

export default NavBar;
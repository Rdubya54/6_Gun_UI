import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
    },
    text: {
        float: "left",
        margin: 10
    },
    buttons: {
        marginTop: 20,
    }
});

export default function Post({ post, user }) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>{user}</h3>
                <div>
                    <div className={classes.text}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </div>
                    <div className={classes.text}>
                        {post}
                    </div>

                </div>
            </CardContent>
            <CardActions className={classes.buttons}>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton>
                </IconButton>
            </CardActions>
        </Card>

    )
}
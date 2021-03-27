import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';
import CircularProgress from '../Widgets/Spinner'

import { makeStyles } from '@material-ui/core/styles';
import { getCenter } from 'ol/extent';

import PostAddIcon from '@material-ui/icons/PostAdd';
import IconButton from '@material-ui/core/IconButton';

import axios, { AxiosResponse } from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useInput } from "../hooks";


const useStyles = makeStyles({
    root: {
        textAlign: "center",
        margin: 10,
    },
    addbutton: {
        position: "absolute",
        top: 75,
        right: 15
    }
});

const NewsFeedPage = () => {

    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [postProps] = useInput("");
    // const { setPostData } = GetPostData();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submit = e => {
        e.preventDefault();
        // setPostData({ post: postProps.value });
    };

    const AddPost = async () => {
        const newPost = new FormData();
        newPost.append('user', 1);
        newPost.append('post', 'sample post')
        const response = await axios.post('http://127.0.0.1:5000/posts', newPost)
    }

    const getData = () => {
        fetch('http://127.0.0.1:5000/newsfeed'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                console.log(res)
                setPosts(res.newsfeed)
                setLoading(false);

            });
    }
    useEffect(() => {
        getData()
    }, [])

    if (isLoading) {
        return (
            <div>
                <CircularProgress />
            </div>
        )

    }

    return (
        <div className={classes.root}>
            <h1> News Feed </h1>
            <div className={classes.addbutton}>
                <IconButton aria-label="add to favorites" onClick={handleClickOpen}>
                    <PostAddIcon fontSize="large"></PostAddIcon>
                </IconButton>
            </div>
            <div>
                {posts.map(post => (
                    <Post
                        post={post.post}
                        user={post.username}
                    />
                ))}
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        {...postProps}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter a Post"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={AddPost}>
                        POST
          </Button>
                    <Button color="primary">
                        CANCEL
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    )

}

export default NewsFeedPage;
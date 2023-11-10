import React, { useState, useEffect } from "react";
import './CreateArea.css';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { IconButton, MenuItem, Select, Card, CardContent } from "@mui/material";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import { setTasks } from "../../state";
import config from "../../config";

function CreateArea() {
    interface Token {
        token: string
    }

    interface FeedTask {
        tasks: Array<
            {
                id: string,
                title: string,
                description: string,
            }>
    }

    const [postUpdated, setPostupdated] = useState(false);
    const [isExpand, setExpand] = useState(false);
    const dispatch = useDispatch()
    const token = useSelector((state: Token) => state?.token);
    const feedTasks = useSelector((state: FeedTask) => state.tasks);


    const [text, setText] = useState({
        title: "",
        description: "",
        completed: false
    });

    function expanded() {
        setExpand(true)
    }
    const handlePostClick = async (e: any) => {
        e.preventDefault()
        try {
            const addPost = await fetch(`${config.apiUrl}/task`, {
                method: "POST",
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            });
            const addedPost = await addPost.json();
            if (addedPost.success) {
                setText({
                    title: '',
                    description: '',
                    completed: false
                });
                setPostupdated(prevState => !prevState);
            } else {
                console.error('Failed to add post');
            }
        } catch (error) {
            console.error('Error adding post:', error);

        }
    };

    const getMyPosts = async () => {
        try {
            const postResponse = await fetch(`${config.apiUrl}/task`, {
                method: "GET",
                headers: { 'auth-token': token }
            });
            const data = await postResponse.json()
            dispatch(setTasks({ tasks: data.response }))
        } catch (err) {
            console.log("get feedTasks error", err)
        }
    }

    const handleTextChange = (event: any) => {
        const { name, value } = event.target;
        setText((prevText) => ({ ...prevText, [name]: value }));
    };

    useEffect(() => {
        getMyPosts();
    }, [postUpdated]);

    return (
        <div data-testid='createarea' className="createAreaContainer">
            <form className="createAreaForm" onSubmit={handlePostClick}>
                <input
                    className="createAreaInput"
                    onClick={expanded}
                    onChange={event => {
                        const { name, value } = event.target;
                        setText(() => { return { ...text, [name]: value } })
                    }}
                    name="title"
                    placeholder="To do title"
                    value={text.title}
                />
                {isExpand && (
                    <div className="expandedFields">
                        <input
                            onChange={handleTextChange}
                            name="description"
                            placeholder="Add a short description..."
                            value={text.description}
                            className="descriptionInput"
                        />
                    </div>
                )}
                <IconButton type="submit" className="submitButton">
                    <AddIcon className="AddIcon" />
                </IconButton>
            </form>
            {Array.isArray(feedTasks) ? (
                <div className="taskItemList">
                    {feedTasks.map((post: any) => (
                        <Card key={post.id} className="taskCard">
                            <CardContent>
                                <TaskItem
                                    completed={post.completed}
                                    postId={post.id}
                                    title={post.title}
                                    content={post.description}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default CreateArea;
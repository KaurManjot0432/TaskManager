import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setTask, setDelete } from "../../state";
import CheckIcon from '@mui/icons-material/Check';
import config from '../../config';
import { MenuItem, Select } from "@mui/material";

interface TaskItemProperty {
    completed: boolean,
    postId: string,
    title: string,
    content: string,
    category: string
}
interface State {
    _id: string
}
interface Token {
    token: string
}
function TaskItem({ completed, postId, title, content, category }: TaskItemProperty) {
    const token = useSelector((state: Token) => state.token)
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [isChecked, setChecked] = useState(true);
    const [heading, setTitle] = useState(title);
    const [descreption, setContent] = useState(content);
    const [status, setStatus] = useState(category);

    const taskItemStyles: React.CSSProperties = {
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        width: '300px',
        position: 'relative',
    };
    const taskcheckedItemStyles: React.CSSProperties = {
        border: '3px solid black ',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        width: '518px',
        marginLeft: '378px',
        position: 'relative',
    };

    const iconsContainerStyles: React.CSSProperties = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        alignItems: 'center',
    };

    const titleStyles: React.CSSProperties = {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    };


    const checkStatus = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.apiUrl}/post/${postId}/checked`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },

            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const updatedPost = await response.json();
            dispatch(setTask({ post: updatedPost }));

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const handleDelete = async (e: any) => {
        e.preventDefault();
        setDeleteClicked(!deleteClicked);
        try {
            console.log(postId);
            const response = await fetch(`${config.apiUrl}/task/deleteTask/${postId}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": token,
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            console.log(result);
            if (!result.success) {
                throw new Error('Request failed');
            }
            console.log(result);
            dispatch(setTasks({ posts: result }));

        } catch (error) {
            console.error('An error occurred:', error);
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
            console.log("get feedPosts error", err)
        }
    }



    const handleEditIconClick = async () => {
        setIsEditMode(true);
    }

    const handleSaveIconClick = async () => {
        try {
            setIsEditMode(false);
            setChecked(!isChecked);

            const response = await fetch(`${config.apiUrl}/task/editTask/${postId}`, {
                method: 'PATCH',
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: heading, description: descreption, category: status })
            });
            const result = await response.json();
            if (result.success) {
                const updatedTasks = await fetch(`${config.apiUrl}/task`, {
                    method: "GET",
                    headers: { 'auth-token': token }
                });
                const data = await updatedTasks.json()
                dispatch(setTasks({ tasks: data.response }))
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => { getMyPosts() }, [deleteClicked])
    return (
        <div style={completed ? taskcheckedItemStyles : taskItemStyles}>
            <FormControlLabel
                control={<Checkbox />}
                checked={completed}
                onChange={checkStatus}
                label={completed ? "Completed" : 'Mark as complete'}
                style={{ marginBottom: '5px' }}
            />

            <div style={iconsContainerStyles}>
                {isEditMode ? (
                    <CheckIcon style={{ marginRight: '10px' }} onClick={handleSaveIconClick} />
                ) : (
                    <EditIcon style={{ marginRight: '10px' }} onClick={handleEditIconClick} />
                )}
                <DeleteIcon onClick={handleDelete} />
            </div>


            {isEditMode ? (
                <input
                    type="text"
                    value={heading}
                    onChange={(e) => setTitle(e.target.value)}
                />
            ) : (
                <Typography variant="h6" style={titleStyles}>
                    {title}
                </Typography>
            )}

            {isEditMode ? (
                <textarea
                    value={descreption}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4} // Adjust the number of rows as needed
                    cols={5}
                />
            ) : (
                <Typography style={{ fontStyle: 'italic' }}>{content}</Typography>
            )}

            {isEditMode ? (
                <div>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        name="status"
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="InProgress">InProgress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </div>
            ) : (
                <Typography variant="h6" style={titleStyles}>
                    {status}
                </Typography>
            )}
        </div>
    );
}

export default TaskItem;
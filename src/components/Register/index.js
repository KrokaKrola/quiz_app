import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import {uniqueId} from "./../vendor";

const getUserToken = async () => {
    try {
        let result = await fetch(`https://opentdb.com/api_token.php?command=request`);
        const generatedTokenObject = await result.json();
        if (generatedTokenObject.response_code !== 0) {
            throw new Error('Error in token generation, you can get similar question over some time');
        } else {
            return generatedTokenObject.token;
        }
    } catch (e) {
        console.log(e.message);
    }
};

const getUsers = () => {
    let result = localStorage.getItem('users');
    return JSON.parse(result) || [];
};

const getUser = name => {
    const users = getUsers();
    return users.find((user) => {
        return user.name === name ? user : false;
    });
};

const setUser = user => {
    const users = getUsers();
    const newUsers = [...users, user];
    localStorage.setItem('users', JSON.stringify(newUsers));
};

const refreshUserToken = async user => {
    console.log('token refreshed');
    user.token = await getUserToken();
    user.tokenExpireDate = new Date().getTime() + 21600000;
};

const Register = ({handleSubmit, handlePageChange}) => {
    const [userName, setUserName] = useState('');
    return (
        <>
            <form className="Register" onSubmit={async (e) => {
                e.preventDefault();
                let user = {};
                const existedUser = getUser(userName);
                if (existedUser) {
                    user = {
                        ...existedUser
                    }
                } else {
                    user = {
                        id: uniqueId(),
                        name: userName,
                        topScore: 0,
                        token: await getUserToken(),
                        tokenExpireDate: new Date().getTime() + 21600000
                    };
                    setUser(user);
                }
                if (new Date().getTime() > user.tokenExpireDate) {
                    await refreshUserToken(user);
                }
                handleSubmit(user);
                handlePageChange('Categories');
            }}>
                <TextField required label="Enter your name" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }}/>
                <Button variant="contained" color="primary" type="submit">Register and choose interested
                    category</Button>
            </form>
        </>
    );
};

export default Register;
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import {uniqueId} from "./../vendor";

async function getUserToken() {
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
}

async function getUsers() {
    let result = await localStorage.getItem('users');
    return JSON.parse(result) || [];
}

async function getUser(name) {
    const users = await getUsers();
    return users.find((user) => {
        return user.name === name ? user : false;
    });
}

async function setUser(user) {
    const users = await getUsers();
    const newUsers = [...users, user];
    await localStorage.setItem('users', JSON.stringify(newUsers));
}

const Register = ({handleSubmit, handlePageChange}) => {
    const [userName, setUserName] = useState('');
    return (
        <>
            <form className="Register" onSubmit={async (e) => {
                e.preventDefault();
                /* TODO
                *  need A BIG REFACTOR
                */
                let user = {};
                const existedUser = await getUser(userName);
                if (existedUser) {
                    user = {
                        ...existedUser
                    }
                    if (user.tokenExpireDate > new Date().getTime()) {
                        user.token = await getUserToken();
                        user.tokenExpireDate = new Date().getTime() + 21600000;
                    }
                } else {
                    user = {
                        id: uniqueId(),
                        name: userName,
                        topScore: 0,
                        token: await getUserToken(),
                        tokenExpireDate: new Date().getTime() + 21600000 // 6 hours in milliseconds
                    }
                    await setUser(user);
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
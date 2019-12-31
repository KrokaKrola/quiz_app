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

const refreshUserToken = user => {
    console.log('refresh token');
    const users = getUsers();
    const updatedUsers = users.map(async item => {
        if(item.id === user.id) {
            return {
                ...item,
                token: await getUserToken(),
                tokenExpireDate: new Date().getTime() + 21600000
            }
        }
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
};

const checkTokenExpireDate = async user => {
    if (new Date().getTime() > user.tokenExpireDate) {
        await refreshUserToken(user);
    }
};

const userChecker = async (name) => {
    let user;
    const existedUser = getUser(name);
    if (existedUser) {
        user = {
            ...existedUser
        };
        await checkTokenExpireDate(user);
    } else {
        user = {
            id: uniqueId(),
            name,
            token: await getUserToken(),
            tokenExpireDate: new Date().getTime() + 21600000
        };
        setUser(user);
    }
    return user;
};

const Register = ({handleSubmit, handlePageChange}) => {
    const [userName, setUserName] = useState('');
    return (
        <>
            <form className="Register" onSubmit={async (e) => {
                e.preventDefault();

                const user = await userChecker(userName);

                handleSubmit(user);
                handlePageChange('Categories');
            }}>
                <TextField required label="Enter your name" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }}/>
                <Button variant="contained" color="primary" type="submit">
                    Enter name and choose category
                </Button>
            </form>
        </>
    );
};

export default Register;
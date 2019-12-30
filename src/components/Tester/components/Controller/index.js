import React, {useState} from "react";
import {Button} from '@material-ui/core';

const Controller = ({handleClick, disabledState, setDisabledState, checkForCorrectAnswer}) => {
    console.log(disabledState);
    return (
        <div className="Controller">
            <Button variant="outlined" type="button" disabled={disabledState}
                    onClick={() => handleClick((prevState) => {
                        setDisabledState(true);
                        checkForCorrectAnswer();
                        document.querySelectorAll('.Answers__item').forEach(item => {
                            item.classList.remove('active');
                        });
                        return prevState + 1;
                    })}
            >
                Answer
            </Button>
        </div>
    )
};

export default Controller;
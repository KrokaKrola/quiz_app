import React, {useState} from "react";
import {Button} from '@material-ui/core';
import {removeActiveState} from './../../../vendor';

const Controller = ({handleClick, disabledState, setDisabledState, checkForCorrectAnswer, endGameMark, handlePageChange}) => {

    return (
        <div className="Controller">
            {
                endGameMark ? (
                    <Button variant="outlined" onClick={() => {
                        handlePageChange('Categories')
                    }}>Choose another category</Button>
                ) : (
                    <Button variant="outlined" type="button" disabled={disabledState}
                            onClick={() => handleClick((prevState) => {
                                setDisabledState(true);
                                checkForCorrectAnswer();
                                removeActiveState();
                                return prevState + 1;
                            })}
                    >
                        Answer
                    </Button>
                )
            }

        </div>
    )
};

export default Controller;
import React, {useEffect, useState, useRef} from "react";
import {baseUrl, uniqueId} from './../vendor';
import Question from './components/Question';
import Answers from './components/Answers';
import Controller from './components/Controller';

const totalCounterStyles = {fontSize: 48, textAlign: 'center', display: 'block', marginTop: 50};

const getLocalStorageItem = (key) => localStorage.getItem(key);
const addUrlParameter = (url, parameter, value) => `${url}&${parameter}=${value}`;

const generateQuestionsUrl = () => {
    let difficulty = getLocalStorageItem('difficulty'),
        category = getLocalStorageItem('category');
    let urlParameters = `amount=10`;
    if (category !== 'any') {
        addUrlParameter(urlParameters, 'category', category);
    }
    if (difficulty !== 'any') {
        addUrlParameter(urlParameters, 'difficulty', difficulty);
    }
    return `${baseUrl}api.php?${urlParameters}`;
};

const Tester = ({handlePageChange}) => {
    const [questionsList, setQuestionsList] = useState([]);
    useEffect(() => {
        const getQuestions = async (url) => {
            try {
                let request = await fetch(url);
                let requestedObject = await request.json();
                if (requestedObject.response_code !== 0) {
                    throw new Error('Something went wrong. Please try later');
                } else {
                    setQuestionsList(requestedObject.results);
                }
            } catch (e) {
                console.error(e);
            }
        };
        const url = generateQuestionsUrl();
        getQuestions(url);
    }, []);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [disabledState, setDisabledState] = useState(true);

    const checkForCorrectAnswer = () => {
        let d = document.createElement('div');
        d.innerHTML = questionsList[activeQuestion].correct_answer;
        let correctAnswerInText = d.textContent;
        if (document.querySelector('.Answers__item.active').textContent === correctAnswerInText) {
            setCorrectAnswers(prevState => prevState + 1);
        }
    };

    const finalQuestionMark = () => {
        return activeQuestion === questionsList.length;
    };

    return (
        <div className="Tester">
            {
                !finalQuestionMark() &&
                (<>
                    <Question questionItem={questionsList[activeQuestion]}/>
                    <Answers correctAnswer={questionsList[activeQuestion].correct_answer}
                             incorrectAnswers={questionsList[activeQuestion].incorrect_answers}
                             setDisabledState={setDisabledState}

                    />
                </>)
            }
            {
                finalQuestionMark() &&
                    <div style={totalCounterStyles}>Game end your result: {correctAnswers} correct answers of {questionsList.length}.</div>
            }
            <Controller handleClick={setActiveQuestion}
                        disabledState={disabledState}
                        setDisabledState={setDisabledState}
                        checkForCorrectAnswer={checkForCorrectAnswer}
                        endGameMark={finalQuestionMark()}
                        handlePageChange={handlePageChange}
            />
            {
                !finalQuestionMark() &&
                    <span style={totalCounterStyles}>{correctAnswers}/{questionsList.length}</span>
            }

        </div>
    )
};

export default Tester;
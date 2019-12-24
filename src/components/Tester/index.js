import React, {useEffect, useState} from "react";
import {baseUrl, uniqueId} from './../vendor';

const getLocalStorageItem = (key) => localStorage.getItem(key);
const addUrlParameter = (url, parameter, value) => `${url}&${parameter}=${value}`;

const generateQuestionsUrl = () => {
    let difficulty = getLocalStorageItem('difficulty'),
        category = getLocalStorageItem('category');
    let urlParameters = `amount=10`;
    if(category !== 'any') {
        addUrlParameter(urlParameters, 'category', category);
    }
    if(difficulty !== 'any') {
        addUrlParameter(urlParameters, 'difficulty', difficulty);
    }
    return `${baseUrl}api.php?${urlParameters}`;
}

const Tester = () => {
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
    console.log(questionsList);
    return (
        <div>
            {
                questionsList.map(question => (
                    <div key={uniqueId()}>
                        <div>
                            <p>Category {question.category}</p>
                            Question:
                            <p dangerouslySetInnerHTML={{__html: question.question}}></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default Tester;
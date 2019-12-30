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

const Tester = () => {
    // const [questionsList, setQuestionsList] = useState([]);
    // useEffect(() => {
    //     const getQuestions = async (url) => {
    //         try {
    //             let request = await fetch(url);
    //             let requestedObject = await request.json();
    //             if (requestedObject.response_code !== 0) {
    //                 throw new Error('Something went wrong. Please try later');
    //             } else {
    //                 setQuestionsList(requestedObject.results);
    //             }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };
    //     const url = generateQuestionsUrl();
    //     getQuestions(url);
    // }, []);
    const questionsList = JSON.parse('{"response_code":0,"results":[{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"What does CPU stand for?","correct_answer":"Central Processing Unit","incorrect_answers":["Central Process Unit","Computer Personal Unit","Central Processor Unit"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"On a dartboard, what number is directly opposite No. 1?","correct_answer":"19","incorrect_answers":["20","12","15"]},{"category":"History","type":"multiple","difficulty":"easy","question":"Which of the following African countries was most successful in resisting colonization?","correct_answer":"Ethiopia","incorrect_answers":["C&ocirc;te d&rsquo;Ivoire","Congo","Namibia"]},{"category":"Vehicles","type":"boolean","difficulty":"medium","question":"The Japanese Shinkansen beat the French TGV&#039;s speed record for fastest electric rail train.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"hard","question":"In &quot;It&#039;s Always Sunny in Philadelphia&quot; what was the name of Frank&#039;s wrestling persona?","correct_answer":"The Trash Man","incorrect_answers":["Bird of War","Day Man","The Maniac"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"What is the real name of Canadian electronic music producer deadmau5?","correct_answer":"Joel Zimmerman","incorrect_answers":["Sonny Moore","Adam Richard Wiles","Thomas Wesley Pentz"]},{"category":"Animals","type":"multiple","difficulty":"easy","question":"Which class of animals are newts members of?","correct_answer":"Amphibian","incorrect_answers":["Fish","Reptiles","Mammals"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"medium","question":"In the &quot;Harry Potter&quot; novels, what must a Hogwarts student do to enter the Ravenclaw Common Room?","correct_answer":"Answers a riddle","incorrect_answers":["Rhythmically tap barrels with a wand","Speak a password","Knock in sequence"]},{"category":"Science: Mathematics","type":"multiple","difficulty":"easy","question":"The metric prefix &quot;atto-&quot; makes a measurement how much smaller than the base unit?","correct_answer":"One Quintillionth","incorrect_answers":["One Billionth","One Quadrillionth","One Septillionth"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"hard","question":"In &quot;Star Trek Nemesis&quot;, why was Praetor Shinzon created?","correct_answer":"To replace Picard as a Romulan Agent","incorrect_answers":["To destroy the Enterprise","To become Picard&#039;s friend ","To steal the Enterprise"]}]}');
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [disabledState, setDisabledState] = useState(true);

    const checkForCorrectAnswer = () => {
        let d = document.createElement( 'div' );
        d.innerHTML = questionsList.results[activeQuestion].correct_answer;
        let correctAnswerInText = d.textContent;
        if(document.querySelector('.Answers__item.active').textContent === correctAnswerInText) {
            console.log('correct answer');
        }
    }

    return (
        <div className="Tester">
            <Question questionItem={questionsList.results[activeQuestion]}/>
            <Answers correctAnswer={questionsList.results[activeQuestion].correct_answer}
                     incorrectAnswers={questionsList.results[activeQuestion].incorrect_answers}
                     setDisabledState={setDisabledState}
            />
            <Controller handleClick={setActiveQuestion}
                        disabledState={disabledState}
                        setDisabledState={setDisabledState}
                        checkForCorrectAnswer={checkForCorrectAnswer}
            />
            <span style={totalCounterStyles}>{correctAnswers}/{questionsList.results.length}</span>
        </div>
    )
};

export default Tester;
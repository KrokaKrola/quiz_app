import React, {useMemo} from "react";

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const changeActiveState = (e) => {
    document.querySelectorAll('.Answers__item').forEach(item => {
        item.classList.remove('active');
    });
    e.target.closest('.Answers__item').classList.add('active');
};

const Answers = ({correctAnswer, incorrectAnswers, setDisabledState}) => {
    const answers = [correctAnswer, ...incorrectAnswers];
    const shuffledArray = shuffle(answers);
    const result = useMemo(() => shuffledArray.map((item, index) => (
        <div className="Answers__item" key={index} onClick={(e) => {
            changeActiveState(e);
            setDisabledState(false);
        }}>
            <span></span>
            <p dangerouslySetInnerHTML={{__html: item}}></p>
        </div>
    )), [correctAnswer]);
    return (
        <div className="Answers">
            {result}
        </div>
    )
};
export default Answers;

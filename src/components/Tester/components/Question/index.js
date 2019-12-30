import React from "react";

const Question = ({questionItem}) => {
    const {category, question} = questionItem;
    return (
        <div className="Question">
            <span className="Question__category">{category}</span>
            <span
                className="Question__type">
                Choose correct answer
            </span>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
        </div>)
};

export default Question;
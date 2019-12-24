import React from 'react';

const difficulties = [
    {
        id: 1,
        name: 'any'
    },
    {
        id: 2,
        name: 'easy'
    },
    {
        id: 3,
        name: 'medium'
    },
    {
        id: 4,
        name: 'hard'
    }
];

const Difficulty = ({handlePageChange}) => {
    return (
        <div className="Difficulty">
            <h2>Choose difficulty</h2>
            <div className="Difficulty__grid">
                {
                    difficulties.map((difficulty) => (
                        <div key={difficulty.id} className="Difficulty__item"
                             onClick={() => {
                                 localStorage.setItem('difficulty', difficulty.name);
                                 handlePageChange('Tester');
                             }}>
                            <span>{difficulty.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Difficulty;
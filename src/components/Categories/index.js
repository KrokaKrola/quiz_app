import React, {useEffect, useState} from "react";

const setCategories = categories => {
    localStorage.setItem('categories', JSON.stringify(categories));
};

const getSavedCategories = () => {
    return JSON.parse(localStorage.getItem('categories'));
};

const Categories = ({handlePageChange}) => {
    const [triviaCategories, setTriviaCategories] = useState([]);
    useEffect(() => {
        async function getTriviaCategories() {
            let result = await fetch(`https://opentdb.com/api_category.php`).then((result) => {
                return result.json();
            });
            const triviaCategories = result.trivia_categories;
            setTriviaCategories(triviaCategories);
            setCategories(triviaCategories);
        }

        if (getSavedCategories()) {
            setTriviaCategories(getSavedCategories());
        } else {
            getTriviaCategories();
        }
    }, []);

    return (
        <div className="Categories">
            <h2>Choose category to test your knowledge</h2>
            <div className="Categories__grid">
                {
                    triviaCategories.map(category => (
                        <div key={category.id} className="Categories__item" onClick={() => {
                            handlePageChange('Difficulty')
                        }}>
                            <span>{category.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Categories;
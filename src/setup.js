import React, { useState, useEffect } from 'react';

function Setup({ onStartQuiz }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [quizLength, setQuizLength] = useState(10);

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => {
                setCategories(data.trivia_categories);
            });
    }, []);

    const handleStartQuiz = () => {
        onStartQuiz(selectedCategory, difficulty, quizLength);
    };

    return (
        <div className="setup">
            <h2>Quiz Setup</h2>
            <div className="setup-section">
                <label>Category:</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="">Any Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="setup-section">
                <label>Difficulty:</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="setup-section">
                <label>Number of Questions:</label>
                <input
                    type="number"
                    value={quizLength}
                    onChange={e => setQuizLength(e.target.value)}
                    min="1"
                    max="50"
                />
            </div>
            <button className="start-button" onClick={handleStartQuiz}>
                Start Quiz
            </button>
        </div>
    );
}

export default Setup;

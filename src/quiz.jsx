import React, { useState, useEffect } from 'react';
import he from 'he';


function Quiz({config, onRestart}) {
    const { category, difficulty, length } = config;
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        let apiUrl = `https://opentdb.com/api.php?amount=${length}&type=multiple`;

        if (category) {
            apiUrl += `&category=${category}`;
        }

        if (difficulty) {
            apiUrl += `&difficulty=${difficulty}`;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const randomizedQuestions = data.results.map(question => {
                    const allAnswers = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ];
                    return {
                        ...question,
                        answers: allAnswers.sort(() => Math.random() - 0.5)
                    };
                });
                setQuestions(randomizedQuestions);
                setCurrentIndex(0);
                setScore(0);
                setShowAnswer(false);
                setSelectedAnswer(null);
            });
    }, [category, difficulty, length]);

    const handleAnswerOptionClick = (answer) => {
        setSelectedAnswer(answer);
        setShowAnswer(true);

        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setShowAnswer(false);
            setSelectedAnswer(null);
            const nextQuestion = currentIndex + 1;
            if (nextQuestion < questions.length) {
                setCurrentIndex(nextQuestion);
            } else {
                setShowScore(true);
            }
        }, 2000);
    };

    if (showScore) {
        return (
            <div className='score-section'>
                You scored {score} out of {questions.length}
                <div>
                    <button className="restart-button" onClick={onRestart}>Restart Quiz</button>
                </div>
            </div>
        );
    }

    if (!questions[currentIndex]) {
        return <div className="spinner"></div>;
    }

    return (
        <div className='app'>
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {currentIndex + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{he.decode(questions[currentIndex].question)}</div>

            </div>
            <div className='answer-section'>
                {questions[currentIndex].answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerOptionClick(answer)}
                        className={
                            showAnswer
                                ? answer === questions[currentIndex].correct_answer
                                    ? 'correct'
                                    : answer === selectedAnswer
                                        ? 'incorrect'
                                        : ''
                                : ''
                        }
                    >
                        {he.decode(answer)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Quiz;

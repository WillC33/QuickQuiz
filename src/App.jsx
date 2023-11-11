import React, {useEffect, useState} from 'react';
import Quiz from './quiz';
import Setup from './setup';
import tinycolor from 'tinycolor2';
import './App.css';

function App() {
    const [quizConfig, setQuizConfig] = useState(null);

    const handleStartQuiz = (category, difficulty, length) => {
        setQuizConfig({ category, difficulty, length });
    };

    const restartQuiz = () => {
        setQuizConfig(null);
    };

    const setHoverColor = () => {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();
        const hoverColor = tinycolor(primaryColor).darken(10).toString();

        document.documentElement.style.setProperty('--primary-hover-color', hoverColor);
    }
    useEffect(() => {
        setHoverColor();
    }, []);


    return (
        <div>
            <div className="app-header">QuickQuiz</div>
            {!quizConfig ? <Setup onStartQuiz={handleStartQuiz} /> : <Quiz config={quizConfig} onRestart={restartQuiz} />
            }
        </div>
    );
}

export default App;

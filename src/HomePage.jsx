import logo from './logo.svg';
import './App.css';
import { MusicGame } from './features/MusicGame/MusicGame';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function HomePage(props) {
    const navigate = useNavigate()

    const MUSIC_GAME_ROUTE = '/music_game'
    const QUIZ_GAME = '/quiz_game'
      
    function clickMusicGame() {
        navigate(MUSIC_GAME_ROUTE)
    }

    function clickQuizGame() {
        navigate(QUIZ_GAME)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Which mode would you like to play?
                    <button id="modeSelect" onClick={clickMusicGame}>Play Music Game</button>
                    <button id="modeSelect" onClick={clickQuizGame}>Play Quiz Game</button>

                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}



import logo from './logo.svg';
import './App.css';
import { MusicGame } from './features/MusicGame/MusicGame';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HomePage } from './HomePage';

function App() {
  const navigate = useNavigate()

  const MUSIC_GAME_ROUTE = '/music_game'
  const QUIZ_GAME = '/quiz_game'

  const HOME_PAGE = '/'



  return (
    <>
      <Routes>
        <Route path={MUSIC_GAME_ROUTE} element={< MusicGame/>} />
        <Route path={QUIZ_GAME} element={< MusicGame/>} />
        <Route path={HOME_PAGE} element={< HomePage/>} />
      </Routes>
     
    </>
  );
}

export default App;

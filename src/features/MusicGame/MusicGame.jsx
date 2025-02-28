import React, { useState, useEffect } from "react";

export function MusicGame(props) {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [currentRedTile, setCurrentRedTile] = useState(null);
    const [score, setScore] = useState(0);
    const [gameTimeouts, setGameTimeouts] = useState([]);
    const [audio] = useState(new Audio("./songs/Rihanna-Umbrella.mp3"));

    const AUDIO_START_TIME = 55;
    const AUDIO_END_TIME = 95;
    const startTimeDelay = 1000;
    const halfLength = 150;
    const fullLength = halfLength * 2;

    // Beatmap
    let beatMap = [];
    let currentTime = startTimeDelay;
    function addBeats(sequence) {
        sequence.forEach(({ tile, duration }) => {
            beatMap.push({ time: currentTime, tile });
            currentTime += duration;
        });
    }

    const playAudio = () => {
        audio.play().catch(error => console.log("Playback failed:", error));
    };


    // Define beats
    addBeats([
        { tile: 0, duration: halfLength }, { tile: 1, duration: halfLength }
    ]);
    addBeats([
        { tile: 5, duration: fullLength }, { tile: 6, duration: fullLength },
        { tile: 8, duration: fullLength }, { tile: 3, duration: fullLength },
        { tile: 0, duration: fullLength }, { tile: 1, duration: fullLength },
        { tile: 5, duration: fullLength }, { tile: 3, duration: halfLength }, { tile: 8, duration: halfLength }
    ]);

    // Key Mapping
    const keyMapping = {
        'q': 0, 'w': 1, 'e': 2,
        'a': 3, 's': 4, 'd': 5,
        'z': 6, 'x': 7, 'c': 8
    };

    // Function to start game
    const startGame = () => {
        stopGame(); // Reset the game before starting

        // Play the song from the start time
        audio.currentTime = AUDIO_START_TIME;
        audio.play();

        // Stop song at the defined end time
        setTimeout(() => {
            audio.pause();
            audio.currentTime = AUDIO_START_TIME;
        }, (AUDIO_END_TIME - AUDIO_START_TIME) * 1000);

        // Play beatmap
        const timeouts = [];
        beatMap.forEach(beat => {
            const timeoutId = setTimeout(() => {
                highlightTile(beat.tile);
            }, beat.time);
            timeouts.push(timeoutId);
        });

        setGameTimeouts(timeouts);
    };

    // Function to stop game
    const stopGame = () => {
        audio.pause();
        audio.currentTime = AUDIO_START_TIME;

        gameTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        setGameTimeouts([]);

        setScore(0);
        setCurrentRedTile(null);
    };

    // Highlight tile
    const highlightTile = (index) => {
        if (currentRedTile !== null) {
            setTiles(prev => prev.map((tile, i) => (i === currentRedTile ? null : tile)));
        }
        setCurrentRedTile(index);

        setTimeout(() => {
            setTiles(prev => prev.map((tile, i) => (i === index ? null : tile)));
        }, 500);
    };

    // Handle tile interaction
    const handleTileInteraction = (tileIndex) => {
        setTiles(prev => prev.map((tile, i) => (i === tileIndex ? "yellow" : tile)));

        setTimeout(() => {
            setTiles(prev => prev.map((tile, i) => (i === tileIndex ? null : tile)));
        }, 200);

        if (tileIndex === currentRedTile) {
            setScore(prevScore => prevScore + 1);
        }
    };

    // Keyboard event listener
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (keyMapping[event.key] !== undefined) {
                handleTileInteraction(keyMapping[event.key]);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="game-container">
            <h1>Music Game</h1>
            <p>Score: {score}</p>
            <div id="grid" className="grid">
                {tiles.map((tile, index) => (
                    <div 
                        key={index} 
                        className={`tile ${currentRedTile === index ? "red" : ""} ${tile === "yellow" ? "yellow" : ""}`}
                        onMouseDown={() => handleTileInteraction(index)}
                        onTouchStart={(event) => { event.preventDefault(); handleTileInteraction(index); }}
                    />
                ))}
            </div>
            <button id="startButton" onClick={startGame}>Start Game</button>
            <button id="stopButton" onClick={stopGame}>Stop Game</button>
        </div>
    );
};


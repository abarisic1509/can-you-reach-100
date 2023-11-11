import React, { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameActiveScreen from "./screens/GameActiveScreen";

const messages = {
	success: "Hooray, you won 🥳",
	gameOver: "Uh-oh, cow licked your score away 😭",
	timeUp: "Oh, no, your time is up ☹️",
};

function App() {
	//game states
	const [gameStarted, setGameStarted] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(null);
	const [timeUp, setTimeUp] = useState(null);

	//user data
	const [currentLevel, setCurrentLevel] = useState(1);
	const [totalScore, setTotalScore] = useState(0);
	const [bestScore, setBestScore] = useState(
		localStorage.getItem("canYouReach100BestScore") || 0
	);
	const [highestLevel, setHighestLevel] = useState(
		localStorage.getItem("canYouReach100Level") || 0
	);

	//start game
	function startGame() {
		setGameStarted(true);
	}
	function resetGame() {
		setGameStarted(false);
		setGameOver(false);
		setGameWon(null);
		setTimeUp(null);
		setCurrentLevel(1);
	}

	return (
		<>
			{!gameStarted && (
				<WelcomeScreen
					startGame={startGame}
					highestLevel={highestLevel}
					bestScore={bestScore}
				/>
			)}
			{gameStarted && !gameOver && !gameWon && (
				<GameActiveScreen
					level={currentLevel}
					setLevel={setCurrentLevel}
					totalScore={totalScore}
					setTotalScore={setTotalScore}
					bestScore={bestScore}
					setBestScore={setBestScore}
					gameOver={gameOver}
					setGameOver={setGameOver}
					setGameWon={setGameWon}
					setTimeUp={setTimeUp}
					highestLevel={highestLevel}
					setHighestLevel={setHighestLevel}
				/>
			)}
			{gameWon ||
				(gameOver && (
					<GameOverScreen
						message={
							gameWon
								? messages.success
								: gameOver && timeUp
								? messages.timeUp
								: messages.gameOver
						}
						resetGame={resetGame}
					/>
				))}
		</>
	);
}

export default App;

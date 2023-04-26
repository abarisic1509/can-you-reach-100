import React, { useState } from "react";
import cowGif from "./assets/cow.gif";
import { useEffect } from "react";

function App() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameOver, setIsGameOver] = useState(null);
	const [isGameWon, setIsGameWon] = useState(null);
	const [numberRolled, setNumberRolled] = useState(null);
	const [isCowVisible, setIsCowVisible] = useState(false);
	const [score, setScore] = useState(0);
	const [remainingTime, setRemainingTime] = useState(15); // 15 seconds

	//set timeout for showing cow when game is started and trigger countdown
	// useEffect(() => {
	// 	//random time will generate time between 1-5 seconds
	// 	const randomTime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 1000;
	// 	if (isGameStarted && score > 10 && remainingTime > 0 && !isGameOver) {
	// 		const timeout = setTimeout(() => {
	// 			showCow();
	// 		}, randomTime);
	// 		return () => clearTimeout(timeout);
	// 	}
	// }, [isGameStarted, remainingTime, score]);

	//trigger countdown
	useEffect(() => {
		if (isGameStarted && remainingTime > 0 && !isGameOver) {
			const timerId = setTimeout(() => {
				setRemainingTime(remainingTime - 1);
			}, 1000);

			return () => {
				clearTimeout(timerId);
			};
		}
	}, [isGameStarted, remainingTime, isGameOver]);

	//check teh score and remaining time every time each change and set game over accordingly
	useEffect(() => {
		if (score >= 100) {
			setIsGameOver(true);
			setIsGameWon(true);
		}
		if (remainingTime === 0) {
			setIsGameOver(true);
			setIsGameWon(false);
		}
	}, [score, remainingTime]);

	//check for isCowVIsible change, if it's true, trigger game over
	useEffect(() => {
		if (isCowVisible) {
			setIsGameOver(true);
			setIsGameWon(false);
			const timeout = setTimeout(() => {
				hideCow();
				setScore(0);
			}, 1500);
			return () => clearTimeout(timeout);
		}
		if (isGameStarted && !isGameOver) {
			const randomTime = Math.floor(Math.random() * (15000 - 14000 + 1)) + 5000;
			const timeout = setTimeout(() => {
				showCow();
			}, randomTime);
			return () => clearTimeout(timeout);
		}
	}, [isCowVisible, isGameOver, isGameStarted]);

	function startGame() {
		setIsGameStarted(true);
	}

	function resetGame() {
		setIsGameStarted(false);
		setIsGameOver(null);
		setIsGameWon(null);
		setNumberRolled(null);
		setScore(0);
		setRemainingTime(15);
	}

	function rollTheDice() {
		setNumberRolled(Math.floor(Math.random() * 6) + 1);
		setScore((prev) => prev + numberRolled);
	}

	function showCow() {
		setIsCowVisible(true);
	}
	function hideCow() {
		setIsCowVisible(false);
	}
	//console.log(isGameStarted, !isGameOver);

	return (
		<div className="App">
			<div className="game-wrapper">
				<header className="game-header">
					<h1>
						{isGameOver && isGameWon
							? "Congratulations, you won 🥳"
							: isGameOver && !isGameWon && remainingTime > 0
							? "Uh-oh, cow licked your score away 😭"
							: isGameOver && !isGameWon && remainingTime === 0
							? "Oh, no, your time is up ☹️"
							: "Can you reach 💯?"}
					</h1>
				</header>
				<main className="game-content">
					<div className="game-score">
						<h2>Score: {score}</h2>
						{isGameStarted && <p>Time remaining: {remainingTime} s</p>}
					</div>
					<div className="game-dices">
						{isGameStarted && <small>Click the dice to roll the number</small>}
						<button
							className="dice"
							onClick={rollTheDice}
							disabled={!isGameStarted || isGameOver}
						>
							{!numberRolled ? "-" : numberRolled}
						</button>
					</div>
				</main>
				<footer className="game-footer">
					<button
						disabled={isGameStarted && !isGameOver}
						onClick={isGameOver ? resetGame : startGame}
					>
						{isGameOver ? "Reset game" : "Start game"}
					</button>
				</footer>
				{isCowVisible && (
					<div className="cow is-visible is-active">
						<img src={cowGif} alt="" />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;

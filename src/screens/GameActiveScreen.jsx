import { useState, useEffect } from "react";
import LevelFinishedScreen from "./LevelFinishedScreen";
const levels = [
	{ difficulty: 5000 },
	{ difficulty: 4900 },
	{ difficulty: 4800 },
	{ difficulty: 4700 },
	{ difficulty: 4600 },
	{ difficulty: 4500 },
	{ difficulty: 4400 },
	{ difficulty: 4300 },
	{ difficulty: 4200 },
	{ difficulty: 4100 },
	{ difficulty: 4000 },
	{ difficulty: 3000 },
	{ difficulty: 2000 },
	{ difficulty: 1500 },
	{ difficulty: 1000 },
];

const GameActiveScreen = ({
	level,
	setLevel,
	totalScore,
	setTotalScore,
	bestScore,
	setBestScore,
	gameOver,
	setGameOver,
	setGameWon,
	setTimeUp,
	highestLevel,
	setHighestLevel,
}) => {
	const [levelStarted, setLevelStarted] = useState(false);
	const [levelFinished, setLevelFinished] = useState(false);
	const [numberRolled, setNumberRolled] = useState(null);
	const [isCowVisible, setIsCowVisible] = useState(false);
	const [score, setScore] = useState(0);
	const [remainingTime, setRemainingTime] = useState(15); // 15 seconds
	/* const [showLickedMessage, setShowLickedMessage] = useState(false); //added to fix the bug of 'score licked away' message showing prematurely */

	//trigger countdown
	useEffect(() => {
		if (levelStarted && remainingTime > 0 && !levelFinished) {
			const timerId = setTimeout(() => {
				setRemainingTime((prev) => prev - 1);
			}, 1000);

			return () => {
				clearTimeout(timerId);
			};
		}
	}, [levelStarted, remainingTime, levelFinished]);

	//check the score and remaining time every time each change and set game over accordingly
	useEffect(() => {
		if (remainingTime === 0) {
			setGameOver(true);
			setTimeUp(true);
			setGameWon(false);
			if (Number(highestLevel) < level) {
				setHighestLevel(level);
				localStorage.setItem("canYouReach100Level", JSON.stringify(level));
			}
		} else if (remainingTime > 0 && score >= 100 && level === 15) {
			setGameOver(true);
			setGameWon(true);
			if (Number(highestLevel) < level) {
				setHighestLevel(level);
				localStorage.setItem("canYouReach100Level", JSON.stringify(level));
			}
		} else if (remainingTime > 0 && score >= 100 && level < 15) {
			setLevelFinished(true);
			setTotalScore((prev) => prev + score);
			if (Number(bestScore < totalScore + score))
				localStorage.setItem(
					"canYouReach100BestScore",
					JSON.stringify(totalScore + score)
				);
			setBestScore(totalScore + score);
			if (Number(highestLevel) < level) {
				setHighestLevel(level);
				localStorage.setItem("canYouReach100Level", JSON.stringify(level));
			}
		}
	}, [score, remainingTime]);

	//check for isCowVIsible change, if it's true, trigger game over
	useEffect(() => {
		if (isCowVisible) {
			const timeout = setTimeout(() => {
				setGameOver(true);
				setGameWon(false);
				hideCow();
				setScore(0);
			}, 1500);
			return () => clearTimeout(timeout);
		}
		if (!gameOver && !levelFinished) {
			const randomTime =
				Math.floor(
					Math.random() * (15000 - 14000 + levels[level - 1].difficulty)
				) + 5000;
			const timeout = setTimeout(() => {
				showCow();
			}, randomTime);
			return () => clearTimeout(timeout);
		}
	}, [isCowVisible, gameOver, levelFinished]);

	function rollTheDice() {
		setLevelStarted(true);

		setNumberRolled(Math.floor(Math.random() * 6) + 1);
		setScore((prev) => prev + numberRolled);
	}

	function showCow() {
		setIsCowVisible(true);
	}
	function hideCow() {
		setIsCowVisible(false);
	}

	function handleNextLevel() {
		setLevel((prev) => prev + 1);
		setLevelStarted(false);
		setLevelFinished(false);
		setScore(0);
		setRemainingTime(15);
	}

	if (levelFinished) {
		return (
			<LevelFinishedScreen
				level={level}
				score={score}
				totalScore={totalScore}
				remainingTime={remainingTime}
				handleNextLevel={handleNextLevel}
			/>
		);
	}

	return (
		<main className=" bg-primary-10 rounded-2xl relative py-20 px-10 md:px-20 w-full max-w-3xl mx-auto min-h-[50vh] flex flex-col justify-center items-center">
			<div className="flex flex-wrap-reverse gap-10 justify-between">
				<p className=" text-xl flex flex-col gap-3">
					<span>Score: {score}</span>
					<span>Time: {remainingTime} s</span>
				</p>
				<h1 className=" text-3xl font-bold ml-auto">Level {level}</h1>
			</div>
			<div className="flex flex-col justify-center items-center gap-2 my-6">
				<small>Click the dice to roll the number</small>
				<button className="dice" onClick={rollTheDice}>
					{!numberRolled ? "-" : numberRolled}
				</button>
			</div>
			{isCowVisible && (
				<div className="cow is-visible is-active">
					<img src="/cow.gif" alt="" />
				</div>
			)}
		</main>
	);
};

export default GameActiveScreen;

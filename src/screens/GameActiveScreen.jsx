import { useState, useEffect, useRef } from "react";
import LevelFinishedScreen from "./LevelFinishedScreen";
const levels = [
	{ difficulty: 5000 },
	{ difficulty: 5000 },
	{ difficulty: 5000 },
	{ difficulty: 4800 },
	{ difficulty: 4800 },
	{ difficulty: 4800 },
	{ difficulty: 4000 },
	{ difficulty: 4000 },
	{ difficulty: 4000 },
	{ difficulty: 3400 },
	{ difficulty: 2600 },
	{ difficulty: 2300 },
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

	/* Dice movement */
	const [diceInitialPosition, setDiceInitialPosition] = useState(null); // static at start
	const [dicePosition, setDicePosition] = useState(null); // static at start
	const [startDiceMovement, setStartDiceMovement] = useState(false);

	const diceRef = useRef(null);
	const mainRef = useRef(null);

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
			setDicePosition(diceInitialPosition);
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

	//create a random timeout for showing cow
	useEffect(() => {
		if (!isCowVisible && !gameOver && !levelFinished && levelStarted) {
			const randomTime =
				Math.floor(
					Math.random() * (15000 - 14000 + levels[level - 1].difficulty)
				) + 5000;
			const timeout = setTimeout(() => {
				showCow();
			}, randomTime);
			return () => clearTimeout(timeout);
		}
	}, [levelStarted, isCowVisible, gameOver, levelFinished]);

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
	}, [isCowVisible, gameOver, levelFinished]);

	//Handle initial (static) position of the dice
	useEffect(() => {
		if (diceRef.current && !dicePosition) {
			const rect = diceRef.current.getBoundingClientRect();
			const parentRect = mainRef.current.getBoundingClientRect();
			const initialTop = rect.top - parentRect.top;
			const initialLeft = rect.left - parentRect.left;
			setDiceInitialPosition({ top: initialTop, left: initialLeft });
			setDicePosition({ top: initialTop, left: initialLeft });
		}
	}, [diceRef.current, mainRef.current]);

	//trigger dice movement if level >= 2
	useEffect(() => {
		if (
			level >= 2 &&
			levelStarted &&
			!levelFinished &&
			!gameOver &&
			dicePosition
		) {
			setStartDiceMovement(true);
		} else {
			setStartDiceMovement(false);
		}
	}, [level, levelStarted, levelFinished, gameOver, dicePosition]);

	//handle dice movement from level 2 onward
	console.log("startDiceMovement", startDiceMovement);
	console.log("level", level);
	console.log("dicePosition", dicePosition);
	useEffect(() => {
		if (startDiceMovement) {
			const moveDice = () => {
				const mainRect = mainRef.current.getBoundingClientRect();
				const diceSize = 124;
				const padding = 20;

				const maxTop = mainRect.height - diceSize - padding;
				const maxLeft = mainRect.width - diceSize - padding;

				const newTop = Math.random() * maxTop;
				const newLeft = Math.random() * maxLeft;

				setDicePosition({ top: newTop, left: newLeft });
			};

			// Move dice once immediately
			moveDice();

			const intervalTime = Math.max(levels[level - 1].difficulty - 900, 300);
			const interval = setInterval(moveDice, intervalTime);

			return () => clearInterval(interval);
		}
	}, [startDiceMovement]);

	function rollTheDice() {
		setLevelStarted(true);

		setNumberRolled(Math.floor(Math.random() * 6) + 1);
		setScore((prev) => prev + numberRolled);
	}

	function showCow() {
		setIsCowVisible(true);
		setStartDiceMovement(false);
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
		<main
			ref={mainRef}
			className=" bg-primary-10 rounded-2xl relative py-20 px-10 md:px-20 w-full max-w-3xl mx-auto min-h-[50vh] flex flex-col justify-center items-center"
		>
			<div className="flex flex-wrap-reverse gap-10 justify-between">
				<p className=" text-xl flex flex-col gap-3 pointer-events-none">
					<span>Score: {score}</span>
					<span>Time: {remainingTime} s</span>
				</p>
				<h1 className=" text-3xl font-bold ml-auto pointer-events-none">
					Level {level}
				</h1>
			</div>
			<div className="flex flex-col justify-center items-center gap-2 my-6">
				<small className=" pointer-events-none">
					Click the dice to roll the number
				</small>
				<div className="w-32 h-32">
					<div
						ref={diceRef}
						className="transition-all"
						style={
							dicePosition
								? {
										position: "absolute",
										top: dicePosition.top,
										left: dicePosition.left,
										transitionDuration: `${
											levels[level - 1].difficulty - 900
										}ms`,
								  }
								: {}
						}
					>
						<button className="dice" onClick={rollTheDice}>
							<span className=" pointer-events-none">
								{!numberRolled ? "-" : numberRolled}
							</span>
						</button>
					</div>
				</div>
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

import React from "react";

const LevelFinishedScreen = ({
	level,
	score,
	totalScore,
	remainingTime,
	handleNextLevel,
}) => {
	return (
		<main className=" bg-primary-10 rounded-2xl relative py-20 px-10 md:px-20 w-full max-w-3xl mx-auto flex flex-col items-center">
			<h1 className=" text-3xl font-bold text-center">Level finished 🥳</h1>
			<div className="flex flex-wrap-reverse gap-10 justify-between"></div>
			<div className="flex flex-col justify-center items-center gap-2 my-6">
				<p className=" text-xl flex flex-col gap-3 text-center">
					<span>Level: {level}</span>
					<span>Score: {score}</span>
					<span>Total score: {totalScore}</span>
					<span>Time left: {remainingTime} s</span>
				</p>
			</div>
			<button className="btn mt-10 mx-auto" onClick={handleNextLevel}>
				Next level
			</button>
		</main>
	);
};

export default LevelFinishedScreen;

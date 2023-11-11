import React from "react";

const WelcomeScreen = ({ startGame, highestLevel, bestScore }) => {
	return (
		<main className=" bg-primary-10 rounded-2xl relative p-20 w-full max-w-3xl flex flex-col gap-8 text-center">
			<h1 className="h1">Can you reach 💯?</h1>
			<p>
				Welcome to simple, yet fun game that will challenge your clicking
				abilities. Are you fast enough to reach 100?
			</p>
			<button className="btn mt-10" onClick={startGame}>
				Start game
			</button>

			<p>
				Best score: {bestScore} <br />
				Highest level reached: {highestLevel}
			</p>
		</main>
	);
};

export default WelcomeScreen;

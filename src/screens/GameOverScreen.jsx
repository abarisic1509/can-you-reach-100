import React from "react";

const GameOverScreen = ({ message, resetGame }) => {
	return (
		<main className=" bg-primary-10 rounded-2xl relative p-20 w-full max-w-3xl flex flex-col gap-8 text-center">
			<h1 className="h1">{message}</h1>
			<button className="btn mt-10" onClick={resetGame}>
				Try again
			</button>
		</main>
	);
};

export default GameOverScreen;

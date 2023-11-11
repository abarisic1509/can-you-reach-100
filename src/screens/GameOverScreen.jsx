import React from "react";

const GameOverScreen = ({ message, resetGame }) => {
	return (
		<main className=" bg-primary-10 rounded-2xl relative py-20 px-10 md:px-20 w-full max-w-3xl mx-auto min-h-[50vh] flex flex-col justify-center items-center">
			<h1 className="h1 text-center">{message}</h1>
			<button className="btn mt-10" onClick={resetGame}>
				Try again
			</button>
		</main>
	);
};

export default GameOverScreen;

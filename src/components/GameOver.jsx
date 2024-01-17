import { PropTypes } from "prop-types";
import Style from "./gameOver.module.css";
const GameOver = ({ restartGame }) => {
    return (
        <div className={Style.gameover}>
            <h2>Game Over!</h2>
            <p>Your Score:</p>
            <button onClick={restartGame}>Restart Game</button>
        </div>
    );
};
GameOver.propTypes = {
    restartGame: PropTypes.func,
};

export default GameOver;

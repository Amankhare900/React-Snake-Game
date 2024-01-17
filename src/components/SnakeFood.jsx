import Style from "./snakeFood.module.css";
import PropTypes from "prop-types";
const SnakeFood = ({ position: { x, y } }) => {
    return (
        <div
            className={Style.food}
            style={{ left: `${x}px`, top: `${y}px` }}
        ></div>
    );
};

SnakeFood.propTypes = {
    position: PropTypes.object.isRequired,
};
export default SnakeFood;

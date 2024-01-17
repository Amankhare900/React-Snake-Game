import Style from "./snakeFood.module.css";
import PropTypes from "prop-types";
const SnakeFood = ({ position: { x, y }, spacelFood }) => {
    const foodClassName = spacelFood ? Style.specialFood : Style.food;
    return (
        <div
            className={foodClassName}
            style={{ left: `${x}px`, top: `${y}px` }}
        ></div>
    );
};

SnakeFood.propTypes = {
    position: PropTypes.object.isRequired,
    spacelFood: PropTypes.bool,
};
export default SnakeFood;

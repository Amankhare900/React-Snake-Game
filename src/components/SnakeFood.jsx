import Style from "./snakeFood.module.css";
import PropTypes from "prop-types";
const SnakeFood = ({ position: { x, y }, specialFood }) => {
    const foodClassName = specialFood ? Style.specialFood : Style.food;
    return (
        <div
            className={foodClassName}
            style={{ left: `${x}px`, top: `${y}px` }}
        ></div>
    );
};

SnakeFood.propTypes = {
    position: PropTypes.object.isRequired,
    specialFood: PropTypes.bool,
};
export default SnakeFood;

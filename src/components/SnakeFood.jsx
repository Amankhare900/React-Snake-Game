import Style from "./snakeFood.module.css";
import PropTypes from "prop-types";
const SnakeFood = ({ position: { x, y } }) => {
    return <div className={Style.food} style={{ top: y, left: x }}></div>;
};

SnakeFood.propTypes = {
    position: PropTypes.object.isRequired,
};
export default SnakeFood;

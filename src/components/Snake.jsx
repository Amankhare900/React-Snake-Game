import Style from "./snake.module.css";
import PropTypes from "prop-types";
const Snake = ({ position: { x, y } }) => {
    return (
        <>
            <div
                className={Style.unit}
                style={{ left: `${x}px`, top: `${y}px` }}
            ></div>
        </>
    );
};

Snake.propTypes = {
    position: PropTypes.object.isRequired,
};

export default Snake;

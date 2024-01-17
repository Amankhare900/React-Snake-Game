import Style from "./snake.module.css";
import PropTypes from "prop-types";
const Snake = ({ position: { x, y }, isHead, isOpenMouth }) => {
    const segmentClass = `${Style.snakeSegment} ${isHead ? Style.head : ""}
    }`;

    return (
        <div className={segmentClass} style={{ left: `${x}px`, top: `${y}px` }}>
            {isHead && (
                <>
                    <div
                        className={Style.eye}
                        style={{ transform: "translate(3px, 4px)" }}
                    ></div>
                    <div
                        className={Style.eye}
                        style={{ transform: "translate(10px, 4px)" }}
                    ></div>
                    <div
                        className={`${Style.mouth} ${
                            isOpenMouth ? Style.openMouth : ""
                        }`}
                    ></div>
                    <div
                        className={`${Style.tongue} $${Style.stickOutTongue}`}
                    ></div>
                </>
            )}
        </div>
    );
};

Snake.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    isHead: PropTypes.bool,
    isOpenMouth: PropTypes.bool,
};

export default Snake;

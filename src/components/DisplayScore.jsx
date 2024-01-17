import Style from "./display.module.css";
import PropTypes from "prop-types";
const DisplayScore = ({ score }) => {
    return (
        <div className={Style.display}>
            <span className={Style.score}>Score : {score} </span>
        </div>
    );
};
DisplayScore.propTypes = {
    score: PropTypes.number,
};
export default DisplayScore;

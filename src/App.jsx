import { useState, useEffect, useRef } from "react";
import Snake from "./components/Snake";
import Food from "./components/SnakeFood";
import DisplayScore from "./components/displayScore";
import GameOver from "./components/GameOver";

function App() {
    const [snakeSegments, setSnakeSegments] = useState([
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 20, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 40, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 60, y: window.innerHeight / 2 },
    ]);
    const [spacelFood, setSpacelFood] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [foodEated, setFoodEated] = useState(0);
    const [direction, setDirection] = useState("ArrowLeft");
    let restartGameRef = useRef();
    const intervalIdRef = useRef(null);
    const [openMouth, setOpenMouth] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const xStep = 20;
    const yStep = 15;
    // const [speed, setSpeed] = useState(200);
    // const highestSpeed = 70;
    useEffect(() => {
        const head = snakeSegments[0];
        const food = {
            left: position.x - 5,
            right: position.x + 20,
            top: position.y - 5,
            down: position.y + 20,
        };
        const foodDistance = calculateDistance(head, position);

        const thresholdDistance = 30;

        if (foodDistance < thresholdDistance) {
            setOpenMouth(true);
        } else {
            setOpenMouth(false);
        }
        if (
            head.x + 10 > food.left &&
            head.x + 10 < food.right &&
            head.y + 7.5 > food.top &&
            head.y + 7.5 < food.down
        ) {
            const foodX = Math.floor(Math.random() * window.innerWidth);
            const foodY = Math.floor(Math.random() * window.innerHeight);
            setPosition({ x: foodX, y: foodY });
            setFoodEated(foodEated + 1);
            if (foodEated !== 0 && foodEated % 4 === 0 && !spacelFood) {
                setSpacelFood(true);
            } else {
                setSpacelFood(false);
            }
            if (direction === "ArrowUp" || direction === "ArrowDown") {
                setSnakeSegments((prevSegments) => [
                    ...prevSegments,
                    {
                        x: prevSegments[prevSegments.length - 1].x,
                        y: prevSegments[prevSegments.length - 1].y + 15,
                    },
                ]);
            } else {
                setSnakeSegments((prevSegments) => [
                    ...prevSegments,
                    {
                        x: prevSegments[prevSegments.length - 1].x + 20,
                        y: prevSegments[prevSegments.length - 1].y,
                    },
                ]);
            }
        }
    }, [snakeSegments, direction, position, foodEated, spacelFood]);

    useEffect(() => {
        if (gameOver) {
            clearInterval(intervalIdRef.current);
            return;
        }
        const moveSnake = (d) => {
            setSnakeSegments((prevSegments) => {
                const newSegments = [...prevSegments];
                const head = { ...newSegments[0] };
                console.log(direction);
                switch (d) {
                    case "ArrowUp":
                        head.y -= yStep;
                        break;
                    case "ArrowDown":
                        head.y += yStep;
                        break;
                    case "ArrowLeft":
                        head.x -= xStep;
                        break;
                    case "ArrowRight":
                        head.x += xStep;
                        break;
                    default:
                        console.log("Wrong Input!!");
                }
                newSegments.unshift({ ...head });
                newSegments.pop();
                return newSegments;
            });
        };

        const handleCollision = () => {
            const head = snakeSegments[0];
            const bodySegments = snakeSegments.slice(1);
            const isColide = bodySegments.some((segment) => {
                const currentSegment = {
                    left: segment.x,
                    right: segment.x + 20,
                    top: segment.y,
                    down: segment.y + 15,
                };
                const isColide =
                    head.x + 10 > currentSegment.left &&
                    head.x + 10 < currentSegment.right &&
                    head.y + 7.5 > currentSegment.top &&
                    head.y + 7.5 < currentSegment.down;
                return isColide;
            });
            if (isColide) {
                clearInterval(intervalIdRef.current);
                setGameOver(true);
            }
        };

        const restartGame = () => {
            setSnakeSegments([
                { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                { x: window.innerWidth / 2 + 20, y: window.innerHeight / 2 },
                { x: window.innerWidth / 2 + 40, y: window.innerHeight / 2 },
                { x: window.innerWidth / 2 + 60, y: window.innerHeight / 2 },
            ]);
            setFoodEated(0);
            setDirection("ArrowLeft");
            setPosition({ x: 100, y: 100 });
            setGameOver(false);

            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }

            intervalIdRef.current = setInterval(() => {
                moveSnake(direction);
                handleCollision();
            }, 200);
        };
        restartGameRef.current = restartGame;

        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        intervalIdRef.current = setInterval(() => {
            moveSnake(direction);
            handleCollision();
        }, 200);

        const handleKeyDown = (event) => {
            const key = event.key;
            if (
                (key === "ArrowUp" && direction !== "ArrowDown") ||
                (key === "ArrowDown" && direction !== "ArrowUp") ||
                (key === "ArrowLeft" && direction !== "ArrowRight") ||
                (key === "ArrowRight" && direction !== "ArrowLeft")
            ) {
                setDirection(key);
            }
        };
        console.log("hello");

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            clearInterval(intervalIdRef.current);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [direction, snakeSegments, gameOver]);
    const calculateDistance = (point1, point2) => {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return (
        <>
            <DisplayScore score={foodEated} />
            {gameOver && <GameOver restartGame={restartGameRef.current} />}
            {snakeSegments.map((segment, index) => (
                <Snake
                    position={segment}
                    isHead={index === 0}
                    isOpenMouth={openMouth}
                    key={index}
                />
            ))}
            <Food position={position} spacelFood={spacelFood} />
        </>
    );
}

export default App;

import { useState, useEffect } from "react";
import Snake from "./components/Snake";
import Food from "./components/SnakeFood";

function App() {
    const [snakeSegments, setSnakeSegments] = useState([
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 20, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 40, y: window.innerHeight / 2 },
        { x: window.innerWidth / 2 + 60, y: window.innerHeight / 2 },
    ]);

    const [direction, setDirection] = useState("ArrowLeft");

    const [position, setPosition] = useState({ x: 100, y: 100 });
    const xStep = 20;
    const yStep = 15;
    const [foodCenter, setFoodCenter] = useState({
        x: position.x + 7.5,
        y: position.y + 7.5,
    });

    console.log(xEat + "xfood " + yEat + " yfood");
    let yEat = false;
    let xEat = false;

    if (direction !== "ArrowUp") {
        yEat =
            snakeSegments[0].y >= foodCenter.y &&
            snakeSegments[0].y - 10 <= foodCenter.y;
    }

    if (direction !== "ArrowDown") {
        yEat =
            snakeSegments[0].y <= foodCenter.y &&
            snakeSegments[0].y + 10 >= foodCenter.y;
    }

    if (direction !== "ArrowLeft") {
        xEat =
            snakeSegments[0].x >= foodCenter.x &&
            snakeSegments[0].x - 10 <= foodCenter.x;
    }

    if (direction !== "ArrowRight") {
        xEat =
            snakeSegments[0].x <= foodCenter.x &&
            snakeSegments[0].x + 10 >= foodCenter.x;
    }

    if (xEat && yEat) {
        debugger;
        const foodX = Math.floor(Math.random() * window.innerWidth);
        const foodY = Math.floor(Math.random() * window.innerHeight);
        setPosition({ x: foodX, y: foodY });
        setFoodCenter({ x: foodX + 7.5, y: foodY + 7.5 });
    }
    useEffect(() => {
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
        const intervalId = setInterval(() => {
            moveSnake(direction);
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
            clearInterval(intervalId);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [direction, setSnakeSegments]);

    return (
        <>
            {snakeSegments.map((segment, index) => (
                <Snake position={segment} key={index} />
            ))}
            <Food position={position} />
        </>
    );
}

export default App;

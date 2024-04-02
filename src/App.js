import React, { useState } from "react";
import "./styles.css";

const Circle = ({ x, y, color }) => {
  return (
    <div
      className="circle"
      style={{
        top: y - 100,
        left: x - 100,
        backgroundColor: color,
      }}
    />
  );
};

export default function App() {
  const [circles, setCircles] = useState([]);

  const handleCreateCircle = (event) => {
    console.log("inside handleCreate circle");
    const { clientX, clientY } = event;
    const newCircle = {
      x: clientX,
      y: clientY,
      color: "red",
    };

    // Check for overlapping circles
    const isOverlap = circles.some((circle) => {
      const distance = Math.sqrt(
        Math.pow(circle.x - newCircle.x, 2) +
          Math.pow(circle.y - newCircle.y, 2)
      );
      return distance < 200; // If distance between centers is less than 200 (diameter of circle), they overlap
    });

    // If there is an overlap, change the color of the new circle
    if (isOverlap) {
      newCircle.color = "blue";
    }

    // Add the new circle to the list of circles
    setCircles((prevCircles) => [...prevCircles, newCircle]);
  };

  return (
    <div className="App" onClick={handleCreateCircle}>
      {circles.map((circle, index) => (
        <Circle key={index} x={circle.x} y={circle.y} color={circle.color} />
      ))}
    </div>
  );
}

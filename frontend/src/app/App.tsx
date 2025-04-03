import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function App() {
  const [height, setHeight] = useState(window.innerHeight);

  // Update the height when the window is resized
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rows = 4; // You can set this to the number of rows you want
  const rowHeight = height / rows; // Adjust height dynamically based on the number of rows

  const layout = [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 0, y: 2, w: 2, h: 2 },
    { i: "4", x: 2, y: 2, w: 2, h: 2 },
  ];

  return (
    <div className="w-full h-full">
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={4}
        rowHeight={rowHeight}
        width={window.innerWidth}
        isResizable={true}
        compactType={null}
        resizeHandles={["se", "sw", "ne", "nw"]}
        draggableHandle=".drag-handle"
      >
        <div
          key="1"
          className="border border-2-white text-white p-4 items-center text-2xl bold"
        >
          Calories
        </div>
        <div
          key="2"
          className="border border-2-white text-white p-4 items-center text-2xl bold"
        >
          Fitness
        </div>
        <div
          key="3"
          className="border border-2-white text-white p-4 items-center text-2xl bold"
        >
          Weight
        </div>
        <div
          key="4"
          className="border border-2-white text-white p-4 items-center text-2xl bold"
        >
          Progress
        </div>
      </ReactGridLayout>
    </div>
  );
}

export default App;

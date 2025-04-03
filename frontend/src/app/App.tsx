import React from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function App() {
  const layout = [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 0, y: 2, w: 2, h: 2 },
    { i: "4", x: 2, y: 2, w: 2, h: 2 },
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full h-full p-4">
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={4}
          rowHeight={300}
          width={window.innerWidth} // Make the width equal to the screen width
          isResizable={true}
          compactType={null} // Prevents grid items from auto-arranging when resized
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
    </div>
  );
}

export default App;

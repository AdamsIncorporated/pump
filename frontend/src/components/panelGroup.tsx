import React, { FC } from "react";
import DataPanel from "./panel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import wi

const PanelGroupComponent: FC = () => {
  const panelArray = [
    { title: "Calories", tableName: "calorie", bgColor: "red" },
    { title: "Weight", tableName: "weight", bgColor: "blue" },
    { title: "Lift", tableName: "lift", bgColor: "yellow" },
  ];

  return (
    <div className="h-screen overflow-auto p-4 max-w-1/2">
      <PanelGroup direction="vertical">
        {panelArray.map((panel, index) => (
          <React.Fragment key={index}>
            <Panel>
              <DataPanel
                tableName={panel.tableName}
                title={panel.title}
                bgColor={panel.bgColor}
              />
            </Panel>
            {index < panelArray.length - 1 && (
              <PanelResizeHandle
                className="h-4 my-5"
                style={{
                  backgroundImage: `radial-gradient(circle, #94a3b8 2px, transparent 2px)`,
                  backgroundSize: "10px 10px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
};

export default PanelGroupComponent;

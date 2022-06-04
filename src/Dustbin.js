import { memo } from "react";
import { useDrop } from "react-dnd";
import { ACCEPT } from "./ItemTypes";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "red",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};
export const Dustbin = memo(function Dustbin({ lastDroppedItem, onDrop }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ACCEPT,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: (item) => onDrop(item)
    }),
    []
  );
  const isActive = isOver && canDrop;
  let backgroundColor = "black";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive
        ? "Release to drop"
        : `This dustbin accepts: ${ACCEPT.join(", ")}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
    </div>
  );
});

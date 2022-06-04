import { memo, useCallback, useEffect, useState } from "react";
import { Box } from "./Box.js";
import { Dustbin } from "./Dustbin.js";
import { ItemTypes } from "./ItemTypes.js";
export const Container = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    {
      id: 1,
      lastDroppedItem: []
    },
    {
      id: 2,
      lastDroppedItem: []
    }
  ]);
  const [boxes, setBoxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
    { name: "Soup", type: ItemTypes.FOOD }
  ]);
  useEffect(() => {
    setBoxes(boxes);
    setDustbins(dustbins);
  }, []);
  const handleDrop = useCallback(
    (index, item) => {
      let tempDustbins = [...dustbins];
      tempDustbins[index]["lastDroppedItem"] = [
        ...tempDustbins[index]["lastDroppedItem"],
        item
      ];
      setDustbins(tempDustbins);
    },
    [dustbins]
  );
  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {dustbins.map(({ lastDroppedItem }, index) => (
          <Dustbin
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {boxes.map(({ name, type }, index) => (
          <Box name={name} type={type} key={index} />
        ))}
      </div>
    </div>
  );
});

import React from "react";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import BestAreaCard from "./BestAreaCard";
import { getBestAreas } from "../api/bestAreasAPI";
import { BestArea, Area } from "@pcr/shared";
import { updateArea } from "../api/areaAPI";

type BsetAreaListContainerProps = {};

type IBestAreas = Array<BestArea>;

const BsetAreaListContainer: React.FC<BsetAreaListContainerProps> = () => {
  const [bestAreas, setBestAreas] = useState<IBestAreas>([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      const bestAreas = await getBestAreas();
      console.log("Got Best Locations");
      console.log(bestAreas);
      setBestAreas(bestAreas);
    } // Execute the created function directly
    anyNameFunction();

    return () => {
      console.log("Cleanup");
    };
  }, []);

  const handleCreateArea = (areaName: string) => {
    const newArea = new Area();
    newArea._id = areaName;
    updateArea(newArea);
  };

  return (
    <Container>
      <Button
        className="mt-3"
        style={{ width: "100%" }}
        onClick={() => handleCreateArea("X-XN")}
      >
        Create Area
      </Button>
      {bestAreas.map((bestArea) => {
        return <BestAreaCard key={bestArea.location} bestArea={bestArea} />;
      })}
    </Container>
  );
};

export default BsetAreaListContainer;

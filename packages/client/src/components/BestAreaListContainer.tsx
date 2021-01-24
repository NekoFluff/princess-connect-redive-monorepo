import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BestAreaCard from "./BestAreaCard";
import { getBestAreas } from "../api/bestLocationsAPI";
import { BestArea } from "@pcr/shared";

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

  return (
    <Container>
      {bestAreas.map((bestArea) => {
        return <BestAreaCard key={bestArea.location} bestArea={bestArea} />;
      })}
    </Container>
  );
};

export default BsetAreaListContainer;

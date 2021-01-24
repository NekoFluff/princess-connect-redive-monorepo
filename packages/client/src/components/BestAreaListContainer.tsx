import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BestAreaCard from "./BestAreaCard";
import { getBestLocations } from "../api/bestLocationsAPI";

type BsetAreaListContainerProps = {};

type IBestLocations = Array<{
  location: string;
  items: Array<string>;
  itemCount: number;
}>;

const BsetAreaListContainer: React.FC<BsetAreaListContainerProps> = () => {
  const [bestLocations, setBestLocations] = useState<IBestLocations>([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      const bestLocations = await getBestLocations();
      console.log("Got Best Locations");
      console.log(bestLocations);
      setBestLocations(bestLocations);
    } // Execute the created function directly
    anyNameFunction();

    return () => {
      console.log("Cleanup");
    };
  }, []);

  return (
    <Container>
      {bestLocations.map((bestLocation) => {
        return (
          <BestAreaCard
            key={bestLocation.location}
            areaName={bestLocation.location}
            items={bestLocation.items}
          />
        );
      })}
    </Container>
  );
};

export default BsetAreaListContainer;

import { Area } from "@pcr/shared";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { deleteArea, getAreas, updateArea } from "../../api/areaAPI";
import AreaCard from "./AreaCard";
import { toast } from "react-toastify";
import NewAreaModal from "./NewAreaModal";

type AreaListContainerProps = {};

type IAreas = { [name: string]: Area };

const AreaListContainer: React.FC<AreaListContainerProps> = () => {
  const [areas, setAreas] = useState<IAreas>({} as IAreas);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteArea = async (areaId: string) => {
    const success = await deleteArea(areaId);
    if (success) {
      toast.success(`Successfully deleted area ${areaId}!`);
      const newAreas = await getAreas();
      setAreas(newAreas);
    } else {
      toast.error(`Failed to delete area ${areaId}`);
    }
  };

  const handleCreateArea = async (areaName: string) => {
    const newArea = {} as Area;
    newArea["_id"] = areaName;
    const success = await updateArea(newArea);

    if (success) {
      const areas = await getAreas();
      setAreas(areas);

      toast.success("Successfully created area!");
    } else {
      toast.error("Failed to create area...");
    }
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      const areas = await getAreas();
      setAreas(areas);
    } // Execute the created function directly
    anyNameFunction();

    return () => {
      console.log("Cleanup");
    };
  }, []);

  return (
    <Container>
      <NewAreaModal
        show={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        onConfirm={(itemName: string) => {
          handleCreateArea(itemName);
          setIsModalVisible(false);
        }}
      />

      <Button
        className="mt-3"
        style={{ width: "100%" }}
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Create Area
      </Button>

      {Object.entries(areas)
        .reverse()
        .map(([_, area]) => {
          return (
            <AreaCard
              key={area._id}
              area={area}
              onDeleteArea={() => {
                handleDeleteArea(area._id);
              }}
            />
          );
        })}
    </Container>
  );
};

export default AreaListContainer;

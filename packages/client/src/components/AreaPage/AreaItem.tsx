import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { DashCircle } from "react-bootstrap-icons";
import withDoubleClick from "../hoc/withDoubleClick";

type AreaItemProps = {
  itemName: string;
  onDeleteItem: (deletedItemName: string) => any;
};

const AreaItem: React.FC<AreaItemProps> = ({
  itemName = "Item Name",
  onDeleteItem = null,
}) => {
  const [deleteSelected, setDeleteSelected] = useState(false);

  const DashCircleWithDoubleClick = withDoubleClick(DashCircle);

  return (
    <Row className="mt-1 mb-1">
      <Col xs="auto">
        <DashCircleWithDoubleClick
          color={deleteSelected ? "green" : "red"}
          cursor={"pointer"}
          style={{ verticalAlign: "middle" }}
          onDoubleClick={() => {
            console.log("Destroy Item");
            if (onDeleteItem) {
              onDeleteItem(itemName);
            }
          }}
          onClickUpdate={(value: boolean) => {
            setDeleteSelected(value);
          }}
          overrideSelected={deleteSelected}
        />
      </Col>
      <Col>{itemName}</Col>
    </Row>
  );
};

export default AreaItem;

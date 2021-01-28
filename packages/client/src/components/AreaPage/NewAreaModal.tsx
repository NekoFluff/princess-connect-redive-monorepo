import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { useState } from "react";

const NewAreaModal = (props: any) => {
  let [areaName, setAreaName] = useState("");

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}

      <Modal.Body>
        {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        <InputGroup className="mb-3">
          {/* <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend> */}
          <FormControl
            placeholder="Area Name"
            aria-label="Areaname"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            type="text"
          />
        </InputGroup>

        <Container fluid className="d-flex justify-content-end">
          <Button variant="danger" onClick={props.onCancel} className="mr-3">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onConfirm(areaName);
              setAreaName("");
            }}
          >
            Create Item
          </Button>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default NewAreaModal;

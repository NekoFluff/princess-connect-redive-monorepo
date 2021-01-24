import { Button } from "react-bootstrap";

const RefreshButton = () => {
  return (
    <Button style={{ width: "100%" }} onClick={() => window.location.reload()}>
      Refresh Page
    </Button>
  );
};

export default RefreshButton;

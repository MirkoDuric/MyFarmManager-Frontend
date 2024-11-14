import DeletePodsjetnikFunktion from "./FunctionsBib/DeletePodsjetnikFunction";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";

const PodsjetnikCard = ({
  id,
  datumPodsjetnika,
  tekstPodsjetnika,
  rasaSvinje,
  serijskiBrojSvinje,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="mb-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            Podsjetnik za {rasaSvinje} {serijskiBrojSvinje}
          </Card.Title>
          <Card.Text>
            Podsjetnik za {datumPodsjetnika}: {tekstPodsjetnika}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Više informacija
          </Button>
          <Button variant="danger" onClick={() => DeletePodsjetnikFunktion(id)}>
            Obriši
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalji Podsjetnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Datum podsjetnika: {datumPodsjetnika}
          <br />
          {tekstPodsjetnika}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => DeletePodsjetnikFunktion(id)}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PodsjetnikCard;

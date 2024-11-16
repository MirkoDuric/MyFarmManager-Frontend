import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import DeletePodsjetnikFunktion from "../FunctionsBib/DeletePodsjetnikFunction";
import { formatDate } from "../utils-ika/dateUtils";
import "./PodsjetnikCard.css";

const PodsjetnikCard = ({
  id,
  datumPodsjetnika,
  tekstPodsjetnika,
  rasaSvinje,
  serijskiBrojSvinje,
  onDeleteSuccess,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (showEditModal) {
      setEditDate(formatDate(datumPodsjetnika)); // Ensure this formats to dd.mm.yyyy if necessary
      setEditText(tekstPodsjetnika);
    }
  }, [showEditModal, datumPodsjetnika, tekstPodsjetnika]);

  const handleDelete = () => {
    DeletePodsjetnikFunktion(id, onDeleteSuccess);
  };

  return (
    <>
      <Card className="reminder-card">
        <Card.Body>
          <Card.Title className="reminder-title">
            <BsInfoCircle size={30} style={{ marginRight: "10px" }} />
            Podsjetnik za svinju {serijskiBrojSvinje}
            <span className="reminder-title-date">
              {formatDate(datumPodsjetnika)}
            </span>
          </Card.Title>
          <Card.Text className="card-text">{tekstPodsjetnika}</Card.Text>
          <div className="reminder-body">
            <Button
              variant="outline-primary"
              onClick={() => setShowModal(true)}
            >
              Više informacija
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setShowEditModal(true)}
            >
              Uredi
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Obriši
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalji Podsjetnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Podsjetnik planiran za: {formatDate(datumPodsjetnika)}
          <br />
          {tekstPodsjetnika}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Podsjetnik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Datum Podsjetnika</Form.Label>
              <Form.Control
                type="text"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                placeholder="dd.mm.yyyy"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>Tekst Podsjetnika</Form.Label>
              <Form.Control
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Enter new reminder text"
              />
            </Form.Group>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                /* Save changes */
              }}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PodsjetnikCard;

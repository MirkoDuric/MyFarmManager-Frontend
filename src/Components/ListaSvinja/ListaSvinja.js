import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { mapIdsToNames } from "../Utils/utils-ika/dataTransform";
import { handleApiError } from "../Utils/utils-ika/handleApirError";
import {
  isValidEmail,
  isNonEmptyString,
  isPositiveInteger,
  validateReminderText,
  validateReminderDate,
} from "../Utils/utils-ika/validation";
import { handlePageChange } from "../Utils/utils-ika/pagination";
import { openModal, closeModal } from "../Utils/utils-ika/modalUtils";
import { formatDate, daysBetween } from "../Utils/utils-ika/dateUtils";
import { filterByKey } from "../Utils/utils-ika/arrayUtils";

export default function ListaSvinja() {
  const [PigList, setPigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PageList, setPageList] = useState(1);
  const [Podsjetnici, setPodsjetnici] = useState([]);
  const [remindersMap, setRemindersMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPig, setCurrentPig] = useState(null);
  const [editingPodsjetnik, setEditingPodsjetnik] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Load pigs and reminders, map reminders by pig ID
  const loadPigsAndReminders = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/piginfo/piglist?page=${PageList}`)
      .then((response) => setPigList(response.data))
      .then(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`)
      )
      .then((response) => {
        const remindersMap = mapIdsToNames(
          response.data.rows,
          "svinja_id",
          "tekst_podsjetnika"
        );
        setRemindersMap(remindersMap);
        setPodsjetnici(response.data.rows);
      })
      .catch((error) => setError(handleApiError(error)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPigsAndReminders();
  }, [PageList]);

  // Delete reminder
  const handleDelete = (podsjetnikId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/podsjetnici/${podsjetnikId}`)
      .then(() =>
        setPodsjetnici((prevPodsjetnici) =>
          prevPodsjetnici.filter((p) => p.id !== podsjetnikId)
        )
      )
      .catch((error) => setError(handleApiError(error)));
  };

  // Edit reminder
  const handleEdit = () => {
    if (
      !validateReminderText(editingPodsjetnik.tekst_podsjetnika) ||
      !validateReminderDate(editingPodsjetnik.datumpodsjetnika)
    ) {
      setError("Please enter valid reminder data.");
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/podsjetnici/${editingPodsjetnik.id}`,
        editingPodsjetnik
      )
      .then(() => updateLocalState(editingPodsjetnik.id, editingPodsjetnik))
      .catch((error) => setError(handleApiError(error)))
      .finally(() => {
        setShowEditModal(false);
        setEditingPodsjetnik(null);
      });
  };

  // Update local reminders state
  const updateLocalState = (podsjetnikId, updatedPodsjetnik) => {
    setPodsjetnici((prevPodsjetnici) =>
      prevPodsjetnici.map((p) =>
        p.id === podsjetnikId ? { ...p, ...updatedPodsjetnik } : p
      )
    );
  };

  // Show reminders modal for a specific pig
  const showPodsjetnici = (pig) => openModal(setShowModal, setCurrentPig, pig);

  // Determine button color based on reminder date
  const determineButtonColor = (datumPodsjetnika) =>
    daysBetween(new Date(), datumPodsjetnika) <= 10
      ? "btn-danger"
      : "btn-warning";

  // Loading and error states
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Učitavanje...</span>
      </div>
    );
  }

  if (error) {
    return <div>Došlo je do greške: {error}</div>;
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Serijski broj</th>
            <th scope="col">Rasa</th>
            <th scope="col">Podsjetnik</th>
            <th scope="col">Detaljni pregled</th>
          </tr>
        </thead>
        <tbody>
          {PigList.length ? (
            PigList.map((pig) => {
              const reminderText = remindersMap[pig.id] || "Nema podsjetnika";
              return (
                <tr key={pig.id}>
                  <td>{pig.serijski_broj_svinje}</td>
                  <td>{pig.rasa_svinje}</td>
                  <td>
                    {reminderText !== "Nema podsjetnika" ? (
                      <button
                        onClick={() => showPodsjetnici(pig)}
                        type="button"
                        className={`btn ${determineButtonColor(
                          reminderText.datumpodsjetnika
                        )}`}
                      >
                        Podsjetnik
                      </button>
                    ) : (
                      <p>{reminderText}</p>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn btn-info">
                      Info
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Nema podataka</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                handlePageChange(PageList, setPageList, "previous")
              }
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {[1, 2, 3].map((page) => (
            <li className="page-item" key={page}>
              <button className="page-link" onClick={() => setPageList(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(PageList, setPageList, "next")}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal for displaying reminders */}
      <Modal
        show={showModal}
        onHide={() => closeModal(setShowModal, setCurrentPig)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Podsjetnici za {currentPig?.serijski_broj_svinje}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {filterByKey(Podsjetnici, "svinja_id", currentPig?.id).map(
              (podsjetnik) => (
                <ListGroup.Item
                  key={podsjetnik.id}
                  className="poljePodsjetnika"
                >
                  {podsjetnik.tekst_podsjetnika}
                  {formatDate(podsjetnik.datumpodsjetnika, "hr-HR")}
                  <Button
                    className="ml-2"
                    variant="danger"
                    onClick={() => handleDelete(podsjetnik?.id)}
                  >
                    Briši
                  </Button>
                  <Button
                    className="ml-2"
                    variant="warning"
                    onClick={() =>
                      openModal(
                        setShowEditModal,
                        setEditingPodsjetnik,
                        podsjetnik
                      )
                    }
                  >
                    Uredi
                  </Button>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => closeModal(setShowModal, setCurrentPig)}
          >
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Reminder Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Uredi podsjetnik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingPodsjetnik && (
            <div>
              <label>Datum podsjetnika:</label>
              <input
                type="date"
                value={editingPodsjetnik.datumpodsjetnika || ""}
                onChange={(e) =>
                  setEditingPodsjetnik({
                    ...editingPodsjetnik,
                    datumpodsjetnika: e.target.value,
                  })
                }
              />
              <label>Tekst podsjetnika:</label>
              <input
                type="text"
                value={editingPodsjetnik.tekst_podsjetnika || ""}
                onChange={(e) =>
                  setEditingPodsjetnik({
                    ...editingPodsjetnik,
                    tekst_podsjetnika: e.target.value,
                  })
                }
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Otkaži
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Sačuvaj izmjene
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

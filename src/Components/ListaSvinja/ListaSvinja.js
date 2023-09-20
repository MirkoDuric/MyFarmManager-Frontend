import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, ListGroup } from "react-bootstrap";

export default function ListaSvinja() {
  const [PigList, setPigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PageList, setPageList] = useState(1);
  const [Podsjetnici, setPodsjetnici] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPig, setCurrentPig] = useState(null);

  function showPodsjetnici(pig) {
    setCurrentPig(pig);
    setShowModal(true);
  }

  function handleDelete(podsjetnikId) {
    axios
      .delete(`http://localhost:8001/podsjetnik/${podsjetnikId}`)
      .then((response) => {
        setPodsjetnici((prevPodsjetnici) =>
          prevPodsjetnici.filter((p) => p.id !== podsjetnikId)
        );
      })
      .catch((error) => {
        console.error(
          "Došlo je do greške prilikom brisanja podsjetnika:",
          error
        );
      });
  }
  function handleEdit(podsjetnikId, updatedPodsjetnik) {
    axios
      .put(
        `http://localhost:8001/podsjetnik/${podsjetnikId}`,
        updatedPodsjetnik
      )
      .then((response) => {
        setPodsjetnici((prevPodsjetnici) => {
          return prevPodsjetnici.map((p) => {
            if (p.id === podsjetnikId) {
              return { ...p, ...updatedPodsjetnik };
            }
            return p;
          });
        });
      })
      .catch((error) => {
        console.error(
          "Došlo je do greške prilikom ažuriranja podsjetnika:",
          error
        );
      });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8001/piginfo/piglist?page=${PageList}`)
      .then((response) => {
        setPigList(response.data);

        return axios.get("http://localhost:8001/podsjetnici_za_svinje");
      })
      .then((responsePodsjetnici) => {
        console.log(responsePodsjetnici.data.rows);
        setPodsjetnici(responsePodsjetnici.data.rows);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [PageList]);
  const determineButtonColor = (datumPodsjetnika) => {
    const today = new Date();
    const reminderDate = new Date(datumPodsjetnika);

    const differenceInDays = (reminderDate - today) / (1000 * 60 * 60 * 24);

    if (differenceInDays <= 10) return "btn-danger";
    return "btn-warning";
  };

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
              const matchingPodsjetnik = Podsjetnici.find(
                (p) => p.svinja_id === pig.id
              );
              return (
                <tr key={pig.id}>
                  <td>{pig.serijski_broj_svinje}</td>
                  <td>{pig.rasa_svinje}</td>
                  <td>
                    {matchingPodsjetnik ? (
                      <button
                        onClick={() => showPodsjetnici(pig)}
                        type="button"
                        className={`btn ${determineButtonColor(
                          matchingPodsjetnik.datumpodsjetnika
                        )}`}
                      >
                        Podsjetnik
                      </button>
                    ) : (
                      <p></p>
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
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                setPageList((prevPageList) => {
                  if (prevPageList > 1) {
                    console.log(prevPageList - 1);
                    return prevPageList - 1;
                  } else {
                    console.log(prevPageList);
                    return 1;
                  }
                });
              }}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPageList(1)}>
              1
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPageList(2)}>
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPageList(3)}>
              3
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                setPageList((prevPageList) => prevPageList + 1);
                console.log(PageList);
              }}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Podsjetnici za {currentPig?.serijski_broj_svinje}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {/* Ovdje ćemo mapirati podsjetnike za trenutnu svinju */}
            {Podsjetnici.filter((p) => p.svinja_id === currentPig?.id).map(
              (podsjetnik) => (
                <ListGroup.Item key={podsjetnik.id}>
                  {podsjetnik.tekst_podsjetnika}
                  <Button
                    className="ml-2"
                    variant="danger"
                    onClick={() => handleDelete(podsjetnik.id)}
                  >
                    Briši
                  </Button>
                  <Button
                    className="ml-2"
                    variant="warning"
                    onClick={() => handleEdit(podsjetnik)}
                  >
                    Uredi
                  </Button>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

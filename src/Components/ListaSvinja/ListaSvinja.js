import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListaSvinja() {
  const [PigList, setPigList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PageList, setPageList] = useState(1);
  const [Podsjetnici, setPodsjetnici] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8001/piginfo/piglist?page=${PageList}`)
      .then((response) => {
        setPigList(response.data);
        console.log(response.data);

        return axios.get("http://localhost:8001/podsjetnici_za_svinje"); // Vraćanje obećanja kako bismo mogli lančati .then()
      })
      .then((responsePodsjetnici) => {
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

  useEffect(() => {
    console.log("PODSJETNICI:", Podsjetnici);
  }, [Podsjetnici]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Učitavanje...</span>
        </div>
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
            PigList.map((pig) => (
              <tr key={pig.id}>
                <td>{pig.serijski_broj_svinje}</td>
                <td>{pig.rasa_svinje}</td>
                <td>
                  {(() => {
                    const matchingPodsjetnik = Podsjetnici.find(
                      (p) => p.id === pig.id
                    );

                    if (matchingPodsjetnik) {
                      return (
                        <button type="button" className="btn btn-danger">
                          Podsjetnik
                        </button>
                      );
                    }
                    return <p></p>;
                  })()}
                </td>

                <td>
                  <button type="button" class="btn btn-info">
                    Info
                  </button>
                </td>
              </tr>
            ))
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
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Table, Button, Form, Pagination, Alert } from "react-bootstrap";
import { LoadPigsAndReminders } from "../Utils/FunctionsBib/LoadPigsAndReminders"; // Prilagodi putanju
import { searchPigs } from "../Utils/FunctionsBib/searchPig"; // Import pretrage

const PigsList = () => {
  const [pigs, setPigs] = useState([]);
  const [remindersMap, setRemindersMap] = useState({});
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Učitavanje podataka (bez pretrage)
  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const { pigs, remindersMap } = await LoadPigsAndReminders(
        process.env.REACT_APP_API_URL,
        page
      );
      setPigs(pigs);
      setRemindersMap(remindersMap);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Pretraga svinja
  const handleSearch = async (event) => {
    event.preventDefault(); // Sprečava reload stranice
    if (!searchQuery.trim()) {
      fetchData(); // Vraća sve podatke ako je pretraga prazna
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const results = await searchPigs(
        process.env.REACT_APP_API_URL,
        searchQuery
      );
      setPigs(results.pigs); // Postavlja rezultate pretrage
      setRemindersMap({}); // Resetuje podsjetnike (opcionalno)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Učitavanje podataka prilikom promene stranice
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchData();
    }
  }, [page]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista Svinja</h1>

      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search Field */}
      <Form className="mb-3" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Pretraži po serijskom broju"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Pretražujem..." : "Pretraži"}
        </Button>
      </Form>

      {/* Pigs Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serijski Broj</th>
            <th>Rasa</th>
            <th>Podsjetnici</th>
            <th>Detalji</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Učitavanje...
              </td>
            </tr>
          ) : pigs.length > 0 ? (
            pigs.map((pig) => (
              <tr key={pig.id}>
                <td>{pig.serijski_broj_svinje}</td>
                <td>{pig.rasa_svinje}</td>
                <td>
                  {remindersMap[pig.id] ? (
                    <Button variant="warning">
                      Podsjetnik ({remindersMap[pig.id].length})
                    </Button>
                  ) : (
                    "Nema podsjetnika"
                  )}
                </td>
                <td>
                  <Button variant="info">Info</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Nema podataka
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {!searchQuery && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          />
          {[1, 2, 3].map((p) => (
            <Pagination.Item
              key={p}
              active={p === page}
              onClick={() => setPage(p)}
            >
              {p}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setPage((prev) => prev + 1)} />
        </Pagination>
      )}
    </div>
  );
};

export default PigsList;

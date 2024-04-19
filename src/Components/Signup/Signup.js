import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Dodajte kod za slanje forme
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={6} className="signup-form">
          <div className="form-wrapper">
            <h3>Napravite nalog</h3>
            <p>Vec imate nalog? </p>
            <Link to={"/login"} className="Login">
              <p>Log in</p>
            </Link>
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Unesi email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Lozinka"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Potvrdi lozinku</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Potvrdi lozinku"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" type="submit" className="signup-button">
                Registruj se
              </Button>
              <Link to="/" className="btn btn-secondary ml-2 nazad-button">
                Na pocetnu
              </Link>
            </Form>
          </div>
        </Col>
        <Col sm={6} className="signup-image"></Col>
      </Row>
    </Container>
  );
};

export default Signup;

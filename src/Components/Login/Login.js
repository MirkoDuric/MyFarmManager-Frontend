import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dodajte kod za proveru login podataka
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={6} className="login-form">
          <div className="form-wrapper">
            <h2>Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" type="submit">
                Log In
              </Button>

              <Link to="/signup" className="btn btn-secondary ml-2">
                Sign Up
              </Link>

              <Link to="/" className="btn btn-secondary ml-2">
                Nazad na pocetnu
              </Link>
            </Form>
          </div>
        </Col>
        <Col sm={6} className="login-image"></Col>
      </Row>
    </Container>
  );
};

export default Login;

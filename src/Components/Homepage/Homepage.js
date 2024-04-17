import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Homepage.css"; // Importovanje CSS datoteke za dodatnu stilizaciju
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Background slika sa overlay-om */}
      <div className="background-image">
        <div className="overlay"></div>
        {/* Tekst koji se nalazi preko slike */}
        <div className="text">
          <h1>Dobrodošli na My Farm Manager</h1>
          <p>Napravi najbolju operativnu i finansijsku odluku za svoju farmu</p>
        </div>
        {/* Tekst na lijevoj strani ekrana */}
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <div className="left-text">
                <p>
                  Farm Manager je aplikacija namijenjena za upravljanje farmom
                  svinja. Omogućava praćenje zdravlja, reprodukcije, ishrane i
                  ostalih važnih aspekata farme.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Dugmadi za prijavljivanje */}
      <div className="login-signup">
        <Link to="/login">
          <Button variant="primary" className="login">
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="success" className="signup">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

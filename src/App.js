import React, { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Map from './components/Map';
import List from './components/List';
import './components/styles.css'

function App() {

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-0.115);
const [lat, setLat] = useState(51.500);
const [zoom, setZoom] = useState(10);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <Map
              mapContainer={mapContainer}
              map={map}
              lat={lat}
              setLat={setLat}
              lng={lng}
              setLng={setLng}
              zoom={zoom}
              setZoom={setZoom}
            />
          </Col>
          <Col xs={3}>
            <List />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

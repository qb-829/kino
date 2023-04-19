import React, { useState } from 'react';
import { Card, Button, Modal, Container, Row, Col } from 'react-bootstrap';

const KinoCard = ({gameNumber, drawNumbers}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


return (
    <>
    <Card style={{ width: "18rem"}}>
        <Card.Body>
            <Card.Title>Game Number: {gameNumber}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>Draw Numbers: </Card.Subtitle>
            {drawNumbers && <Card.Text>{drawNumbers.join(", ")}</Card.Text>}
            <Button variant='primary' onClick={handleShowModal}>
                Open
            </Button>
        </Card.Body>
    </Card>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closebutton>
        <Modal.Title>Game Number: {gameNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Draw Numbers:</p>
            <ul>{drawNumbers && drawNumbers.map((number, index) => (
                <li key={index}>{number}</li>
            ))}</ul>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>

    </Modal>
    </>
)};

export default KinoCard;
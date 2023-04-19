// This Getkino.jsx file holds the functionality of the App.
// On mount, the useEffect hook loads the loadDraw function from 
// kinoSlice, as well as making the actions setData, setHasMore,
// and setPage available.
// It also returns the react-bootstrap card and modal to display to the user.

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Card, Col, Container, Row, Modal, Button } from "react-bootstrap";
import {
  setData,
  setHasMore,
  setPage,
  loadDraw,
} from "../../reducers/kinoSlice";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GetKino() {
  // Update data set
  const data = useSelector((state) => state.kino.data);
  // Update the currentDrawNumber to pass through second API call.
  const currentDrawNumber = useSelector(
    (state) => state.kino.currentDrawNumber
  );
  // Determine if page number has changed
  const page = useSelector((state) => state.kino.page);
  // Determine whether there are additional data to display
  const hasMore = useSelector((state) => state.kino.hasMore);
  const dispatch = useDispatch();

  // Load loadDraw and loadData functions when component is mounted
  useEffect(() => {
    dispatch(loadDraw());
    loadData();
  });

  // Load additional data to display in cards and modal
  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
    dispatch(loadDraw());
  };

  // Second API call to fetch and update Draw data with past draw information
  const loadData = async () => {
    try {
      const url = `https://puertorico.secondchancebonuszone.com/kino/past_drawings.php?drawid=${currentDrawNumber}&number=20&sort=desc`;
      const response = await axios.get(url, {
        params: {
          drawid: currentDrawNumber,
        number: 20,
        sort: `desc`,
        page: page,
        },
      });
      const newData = response.data || [];
      dispatch(setData([...newData]));
      setHasMore(newData.length > 0);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalDrawNumbers, setModalDrawNumbers] = useState([]);

  const handleShowModal = (gameNumbers) => {
    const selectedCard = data.find(item => item.gameNumber === gameNumbers)
    setModalDrawNumbers(selectedCard.drawNumbers);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="container">
      <h1>Kino</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={5}>
          {data.map((item, index) => (
            <Col key={index}>
              <Card onClick={() => handleShowModal(item.gameNumber)}>
                <Card.Body>
                  <Card.Title>
                    Game Number: {item.gameNumber}, Bonus: {item.bonus}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Draw Numbers:
                  </Card.Subtitle>
                  {item.drawNumbers && <Card.Text>{item.drawNumbers.join(", ")}</Card.Text>}
                </Card.Body>
              </Card>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closebutton>
                  <Modal.Title>Game Number: {item.gameNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Draw Numbers:</p>
                  <p>
                    {modalDrawNumbers &&
                      modalDrawNumbers.map((number, index) => (
                        <p key={index}>{number}</p>
                      ))}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}

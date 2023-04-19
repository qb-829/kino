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
// import KinoCard from "./Modal";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GetKino() {
  const data = useSelector((state) => state.kino.data);
  const currentDrawNumber = useSelector(
    (state) => state.kino.currentDrawNumber
  );
  const page = useSelector((state) => state.kino.page);
  const hasMore = useSelector((state) => state.kino.hasMore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDraw());
    loadData();
  });

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
    dispatch(loadDraw());
  };

  const loadData = async () => {
    try {
      const url = `https://puertorico.secondchancebonuszone.com/kino/past_drawings.php?drawid=${currentDrawNumber}&number=20&sort=desc`;
      const response = await axios.get(url, {
        params: {
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
    const [modalDrawNumbers, setModalDrawNumbers] = useState(false);
  
    const handleShowModal = (drawNumbers) => {
        setModalDrawNumbers(drawNumbers)
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
              <Card onClick={() => handleShowModal(item.drawNumbers)}>
                <Card.Body>
                  <Card.Title>
                    Game Number: {item.gameNumber}, Bonus: {item.bonus}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Draw Numbers:
                  </Card.Subtitle>
                  <Card.Text>{item.drawNumbers.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
        <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closebutton>
                  <Modal.Title>Game Number: {item.gameNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Draw Numbers:</p>
                  <ul>
                    {item.drawNumbers &&
                      item.drawNumbers.map((number, index) => (
                        <li key={index}>{number}</li>
                      ))}
                  </ul>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GetKino() {
  const [data, setData] = useState([]);
  const [currentDrawNumber, setCurrentDrawNumber] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadDraw();
  }, );

  const loadDraw = async () => {
    try {
      const web =
        "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php";
      const res = await axios.get(web, {
        params: {
          page: page,
        },
      });
      const currentData = res.data || [];
      console.log(currentData);
      setCurrentDrawNumber(currentData[0].gameNumber);
      console.log("currentDrawNumber: ", currentDrawNumber);
      loadData();
    } catch (error) {
      console.log(error);
    }
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
      console.log(newData);
      console.log(newData[0].gameNumber);
      setData([...newData]);
      setHasMore(newData.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="container">
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={5}>
          {data.map((item, index) => (
            <Col key={index}>
              <Card>
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
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}

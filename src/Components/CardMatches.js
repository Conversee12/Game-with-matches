import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const CardMatches = ({handlePlayerStart, handleAIStart}) => {

  return (
    <div>
    <Row className='justify-content-center mt-5' >
    <Card border="info" style={{ width: '25rem' }}>
        <Card.Header className='text-center fs-1'>Matches Game</Card.Header>
        <Card.Body>
          <Card.Title className='text-center p-2 fs-4'>Rules of the Game:</Card.Title>
          <Card.Text>
          Two people are playing a game. From the pile of 25 matches, each player takes either 1, 2 or 3 matches on each turn. The game is over once all matches are taken. Whoever has the even amount of matches wins.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </Row>
      <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <Button className="match-button" onClick={handlePlayerStart}>
                You start first
              </Button>
            </Col>
            <Col xs="auto">
              <Button className="match-button" onClick={handleAIStart}>
                AI starts first
              </Button>
            </Col>
          </Row>
      <br />
      </div>
  )

};

export default CardMatches;

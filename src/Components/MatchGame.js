import React, { useState, useEffect } from 'react';
import { TbMatchstick } from 'react-icons/tb';
import CardMatches from './CardMatches';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';

const MatchGame = () => {
  const [matches, setMatches] = useState(25);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [aiMatches, setAiMatches] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const [gameResult, setGameResult] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowCard(true);
  }, []);

  const playerMove = (amount) => {
    if (amount < 1 || amount > 3 || amount > matches) {
      return;
    }
    if (matches - amount <= 0) {
      handleGameEnd(playerMatches + amount, aiMatches);
    } else {
      setMatches(prevMatches => prevMatches - amount);
      setPlayerMatches(prevPlayerMatches => prevPlayerMatches + amount);
      setPlayerTurn(false);
    }
  }

  useEffect(() => {
    if (!playerTurn) {
      aiMove(matches, aiMatches);
    }
  }, [playerTurn, matches, aiMatches]);

    const aiMove = (matches, aiMatches) => {
    const aiNumber = getAIMove(matches, aiMatches);

    setTimeout(() => {
      if (matches - aiNumber <= 0) {
        handleGameEnd(playerMatches, aiMatches + aiNumber);
      } else {
      setMatches(prevMatches => prevMatches - aiNumber);
      setAiMatches(prevAiMatches => prevAiMatches + aiNumber);
      setPlayerTurn(true);
    }
    }, 500);
  }

  const makeMove = (amount) => {
    if (playerTurn) {
      playerMove(amount);
    }
  };

    const getAIMove = (currentMatches, currentAiMatches) => {
    const remainingMatches = currentMatches % 4;

    if (currentMatches === 2) {
      const aiNumber = currentAiMatches % 2 === 0 ? 2 : 1;
      return aiNumber;
    }

    if (currentMatches === 3) {
      const aiNumber = currentAiMatches % 2 === 0 ? 2 : 3;
      return aiNumber;
    }

    if (currentMatches === 4) {
      const aiNumber = currentAiMatches % 2 === 0 ? 2 : 3;
      return aiNumber;
    }

    if (remainingMatches === 0) {
      return Math.floor(Math.random() * 3) + 1;
    } else {
      return remainingMatches;
    }
  };

  const handleGameEnd = (playerMatches, aiMatches) => {
    if (playerMatches % 2 === 0) {
      setGameResult('You won this game');
    } else if (aiMatches % 2 === 0) {
      setGameResult('AI won this game');
    }
    setShowToast(true);
  };

  const handlePlayerStart = () => {
    setPlayerTurn(true);
    handleStartGame();
  };

  const handleAIStart = () => {
    setPlayerTurn(false);
    handleStartGame();
    aiMove(25, 0);
  };

  const handleStartGame = () => {
    setShowCard(false);
    setMatches(25);
    setPlayerMatches(0);
    setAiMatches(0);
    setGameResult('');
  }

  const handleRestart = () => {
    setShowCard(true);
    setShowToast(false);
  };

  return (
    <div className="full-screen text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-5">
      <Container>
        {!showCard && (
          <div className="text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-5">
            <h1 className="text-center mb-3">Matches game</h1>
            <h2 className="text-center">Remaining matches: {matches}</h2>
            <h2 className="text-center">{playerTurn ? 'Your turn' : 'AI turn'}</h2>
            <Row className="justify-content-center mt-5">
              <Col xs="auto">
                <Button
                  className="match-button"
                  onClick={() => makeMove(1)}
                  disabled={!playerTurn || matches < 1}
                >
                  <TbMatchstick /> One match
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="match-button"
                  disabled={!playerTurn || matches < 2}
                  onClick={() => makeMove(2)}
                >
                  <TbMatchstick /> Two matches
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="match-button"
                  onClick={() => makeMove(3)}
                  disabled={!playerTurn || matches < 3}
                >
                  <TbMatchstick /> Three matches
                </Button>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between mt-5">
              <Col>
                <h1 className="text-center">My matches: {playerMatches}</h1>
              </Col>
              <Col>
                <h1 className="text-center">Ai matches: {aiMatches}</h1>
              </Col>
            </Row>
          </div>
        )}
        {showCard && <CardMatches handlePlayerStart={handlePlayerStart} handleAIStart={handleAIStart} />}
        <Toast className="text-center" show={showToast} bg={'primary'}
        onClose={() => setShowToast(false)}
        style={{
            position: 'fixed',
            top: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}>
            <Toast.Header>
              <strong className="me-auto fs-5">Game Result</strong>
            </Toast.Header>
            <Toast.Body className='fs-3'>{gameResult}
            </Toast.Body>
              <Button className='m-2' variant="primary" onClick={handleRestart}>
                Restart
              </Button>
          </Toast>
      </Container>
    </div>
  );
};

export default MatchGame;

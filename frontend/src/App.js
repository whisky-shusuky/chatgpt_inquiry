import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function App() {
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080', { prompt }, { headers: { 'Content-Type': 'application/json' } });
      setCompletion(response.data.completion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>めちゃくちゃ回答が早いお問い合わせフォーム</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPrompt">
          <Form.Label>お問合せ内容:</Form.Label>
          <Form.Control type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">送信</Button>
      </Form>
      <p style={{ marginTop: '20px' }}>返信: {completion}</p>
    </div>
  );
}

export default App;

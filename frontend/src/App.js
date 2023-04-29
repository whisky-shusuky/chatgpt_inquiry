import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function App() {
  const [data, setData] = useState({
    prompt: '',
    email: '',
  });
  const [completion, setCompletion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080', data, { headers: { 'Content-Type': 'application/json' } });
      setCompletion(response.data.completion);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="container">
      <h1>めちゃくちゃ回答が早いお問い合わせフォーム</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPrompt">
          <Form.Label>お問い合わせ内容:</Form.Label>
          <Form.Control type="text" name="prompt" value={data.prompt} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>お客様の連絡先メールアドレス:</Form.Label>
          <Form.Control type="email" name="email" value={data.email} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Complete</Button>
      </Form>
      <p style={{ marginTop: '20px' }}>Completion: {completion}</p>
    </div>
  );
}

export default App;

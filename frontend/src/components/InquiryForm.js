import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function InquiryForm() {
  const [data, setData] = useState({
    prompt: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/inquiry', data, { headers: { 'Content-Type': 'application/json' } });
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
      <h1>お問い合わせフォーム</h1>
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
    </div>
  );
}

export default InquiryForm;

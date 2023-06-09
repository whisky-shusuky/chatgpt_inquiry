import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function InquiryForm() {
  const [data, setData] = useState({
    prompt: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    axios
      .post('http://localhost:8080/inquiry', data, { headers: { 'Content-Type': 'application/json' } })
      .catch((error) => {
        console.error(error);
        setSubmitted(false);
        // TODO: エラー処理
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const successMessageStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    margin: '20px 0',
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPrompt">
          <Form.Label>お問い合わせ内容:</Form.Label>
          <Form.Control as="textarea" name="prompt" value={data.prompt} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>お客様の連絡先メールアドレス:</Form.Label>
          <Form.Control type="email" name="email" value={data.email} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">送信</Button>
      </Form>
      {submitted && (
        <div style={successMessageStyle}>
          お問い合わせを受け付けました。返答まで少々お待ちください。
        </div>
      )}
    </div>
  );
}

export default InquiryForm;

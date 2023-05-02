import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const response = await axios.get('http://localhost:8080/inquiry');
      setInquiries(response.data);
    };
    fetchInquiries();
  }, []);

  return (
    <div>
      <h2>お問い合わせ一覧</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>問い合わせ内容</th>
            <th>Email</th>
            <th>仮返答</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.ID}>
              <td>{inquiry.ID}</td>
              <td>{inquiry.Prompt}</td>
              <td>{inquiry.Email}</td>
              <td>{inquiry.Completion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InquiryList;

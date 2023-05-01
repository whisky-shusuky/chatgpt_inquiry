import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InquiryList from './components/InquiryList';
import InquiryForm from './components/InquiryForm';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>めちゃくちゃ回答が早いお問い合わせフォーム</h1>
        <Routes>
          <Route path="/inquiry" element={<InquiryList />} />
          <Route path="/" element={<InquiryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

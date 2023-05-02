import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InquiryList from './components/InquiryList';
import InquiryForm from './components/InquiryForm';

function App() {
  const appStyle = {
    backgroundColor: 'white',
    height: '100vh',
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: 0,
  };

  return (
    <Router>
      <div style={appStyle}>
        <div className="container" style={containerStyle}>
          <h1>めちゃくちゃ回答が早い動画サイトお問い合わせフォーム</h1>
          <Routes>
            <Route path="/inquiry" element={<InquiryList />} />
            <Route path="/" element={<InquiryForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

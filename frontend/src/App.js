import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/completions', { prompt });
      setCompletion(response.data.completion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="submit">Complete</button>
      </form>
      <p>Completion: {completion}</p>
    </div>
  );
}

export default App;

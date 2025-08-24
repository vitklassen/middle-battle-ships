import { useEffect } from 'react';
import { Router } from './Router';
import { ErrorSnackbar } from './Components/ErrorSnackbar';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__ || 3000} `;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className="App">
      <Router />
      <ErrorSnackbar />
    </div>
  );
}

export default App;

import './App.css';
import AllRoutes from './components/AllRoutes/AllRoutes';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
        <div className="App">
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
        </div>
    </HelmetProvider>
  );
}

export default App;

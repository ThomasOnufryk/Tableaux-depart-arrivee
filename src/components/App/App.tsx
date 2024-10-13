import './App.scss';
import Home from '../Home/Home';
import City from '../City/City';
import TrainStation from '../TrainStation/TrainStation';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":city" element={<City />}>
          <Route
            path=":codeStation"
            element={<TrainStation key={location.pathname} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

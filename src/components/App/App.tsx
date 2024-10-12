import './App.scss';
import Home from '../Home/Home';
import City from '../City/City';
import TrainStation from '../TrainStation/TrainStation';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":city" element={<City />}>
          <Route path=":codeStation" element={<TrainStation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

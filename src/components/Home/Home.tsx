import './Home.scss';
import CityCards from '../CityCards/CityCards';

function Home() {
  return (
    <div className="home">
      <div className="home__content-wrapper">
        <CityCards />
      </div>
    </div>
  );
}

export default Home;

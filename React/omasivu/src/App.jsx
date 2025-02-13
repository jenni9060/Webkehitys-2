
import './App.css';

// Tuodaan komponentit
import Header from './components/Header.jsx';
import Intro from './components/Intro.jsx';
import Info from './components/Info.jsx';
import Speakers from './components/Speakers.jsx';
import Schedule from './components/Schedule.jsx';
import SignUp from './components/SignUp.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Intro />
      <Info />
      <Speakers />
      <Schedule />
      <SignUp />
    </div>
  );
}

export default App;

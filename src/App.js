import logo from './logo.svg';
import './App.css';
import NotStarted from './components/NotStarted';
import InProgress from './components/InProgress';
import Completed from './components/Completed';

function App() {
  return (
    <div className="App">
      <img src='/airellologo.svg' width={100}/>
      <p style={{fontStyle: 'italic', fontWeight: '500'}}>Get things going!</p>
      {/* <header className="App-header">
        <h2>Airello</h2>
      </header> */}
      <div style={{flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}>
      <NotStarted/>
      <InProgress/>
      <Completed/>
      </div>

    </div>
  );
}

export default App;

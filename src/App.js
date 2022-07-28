import NextLaunch from "./NextLaunch";
import PastLaunch from "./PastLaunch";
import './App.css'

function App() {

  return (
    <div className="App">
      <span className="title-launch">Past Launches:</span>
      <PastLaunch />
      <span style={{ display: 'block', marginTop: '30px' }} className="title-launch">Next Launches:</span>
      <NextLaunch />
    </div>
  );
}

export default App;

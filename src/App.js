import Chart from "./views/Chart/Chart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<div className="App">HomePage</div>} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;

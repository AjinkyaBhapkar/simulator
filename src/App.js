import Chart from "./views/Chart/Chart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from "react-router-dom";
import Homepage from "./views/Chart/Homepage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;

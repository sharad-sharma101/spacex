import Header from './components/Header'
import Dashboard from './components/Dashboard'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
          <Route exact path='/' element={<Dashboard/>} >
          </Route>
          <Route exact path='/:id' element={<Dashboard/>} >
          </Route>
        </Routes>
      </Router>
   
    </div>
  )
}

export default App;

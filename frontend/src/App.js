import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/navbar'
import EventList from './components/eventList'
import Edit from './components/edit'
import Create from './components/create'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="home-start-page">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<EventList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;

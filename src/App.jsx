
import './App.css';
import Header from './shared/Header';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    
      <div>
        <Header></Header>
        <Outlet></Outlet>
      </div>

  );
}

export default App;

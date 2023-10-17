
import './App.css';
import Header from './shared/Header';
import { Outlet } from 'react-router-dom';

// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
// import { firebaseConfig } from './firebase';
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

function App() {
  return (
    
      <div>
        <Header></Header>
        <Outlet></Outlet>
      </div>

  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './shared/Header';
import { Outlet } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import {getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <h1 style={{textAlign:'center',color:'goldenrod'}}>Hospital Management System</h1>
        <Outlet></Outlet>
      </div>
    </Provider>
    
  );
}

export default App;

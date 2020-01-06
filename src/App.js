import React, {useState} from 'react';
import { MainView } from './components/MainView';
import { LoginView } from './components/LoginView';
import './styles/global.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In a production app, login would typically be at a separate route
  return (
    <div className="App">
      {isLoggedIn ? <MainView /> : <LoginView setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;

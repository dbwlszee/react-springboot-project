import './App.css';
import AppRouter from './component/route/RouterComponent';
import UserNav from './component/user/UserNav';

function App() {
  return (
    <div className="App">
      <UserNav/>
      <AppRouter/>
    </div>
  );
}

export default App;

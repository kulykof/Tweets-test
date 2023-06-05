import { Routes, Route } from 'react-router-dom';
import './App.css';
import TweetsList from './pages/TweetsList/TweetsList';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets" element={<TweetsList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

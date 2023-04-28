import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [val, setval] = useState("");
  const [vals, setvals] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempid, setTempid] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  const handlevalChange = (e) => {
    setval(e.target.value);
  };

  // read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setvals([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((val) => {
          setvals((oldArray) => [...oldArray, val]);
        });
      }
      setCountdown(300); // reset countdown timer after new value is read
    });
  }, []);

  // countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      alert("นั่งนานไปแล้ว! ลุกออกไปเดินบ้างง");
    }
  }, [countdown]);

  const handleResetTimer = () => {
    setCountdown(5);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Demo เก้าอี้หรรษา by Vite + React</h1>
      <div className="card">
        {vals.map((val) => (
          <div key={val.id}>
            <h1>ค่าน้ำหนักจาก Load Cell = {val.value} KG</h1>
          </div>
        ))}
      </div>
      <div>
        {countdown > 0 ? (
          <h1 style={{ color: 'pink' }}>Countdown: {Math.floor(countdown / 60)}:{countdown % 60}</h1>
        ) : (
          <button onClick={handleResetTimer}>Reset Timer</button>
        )}
      </div>
      <h2 style={{ color: "red" }}>Debug zone</h2>
      <button onClick={() => alert('นั่งนานไปแล้ว! ลุกออกไปเดินบ้างง')}>Activate Alert</button>
      <button onClick={() => setCountdown(5)}>Set Timer to 5 Seconds</button>
    </div>
  );
}

export default App;

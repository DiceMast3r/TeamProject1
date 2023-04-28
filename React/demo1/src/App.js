import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

function App() {
  const [val, setval] = useState("");
  const [vals, setvals] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempid, setTempid] = useState("");

  const handlevalChange = (e) => {
    setval(e.target.value);
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setvals([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((val) => {
          setvals((oldArray) => [...oldArray, val]);
        });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const id = uid();
    set(ref(db, `test_sensorval_sensorval`), {
      val,
      id,
    });

    setval("");
  };

  //update
  const handleUpdate = (val) => {
    setIsEdit(true);
    setTempid(val.id);
    setval(val.val);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/test_sensorval`), {
      val,
      id: tempid,
    });

    setval("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (val) => {
    remove(ref(db, `/test_sensorval`));
  };

  return (
    <div className="App">
      <input type="text" value={val} onChange={handlevalChange} />
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setval("");
            }}
          >
            X
          </button>
        </>
      ) : (
        <button onClick={writeToDatabase}>submit</button>
      )}
      {vals.map((val) => (
        <>
          <h1>{val.val} KG</h1>
          <button onClick={() => handleUpdate(val)}>update</button>
          <button onClick={() => handleDelete(val)}>delete</button>
        </>
      ))}
    </div>
  );
}

export default App;

// npm install firebase
// npm install uid
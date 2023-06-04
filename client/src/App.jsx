import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [blockchain, setBlockchain] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const url = "http://localhost:5000/api/1/blocks";

  const getBlockchain = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data.data);
      setBlockchain(data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid request. Please provide valid data.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getBlockchain();
  }, []);

  const handleChange = () => {
    setErrorMessage(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target.data.value;

    if (!data || data.trim() === "") {
      setErrorMessage("Data cannot be empty!");
      setIsDataEmpty(true);
      return;
    }

    const newBlock = { data };
    try {
      setIsDataEmpty(false);
      await axios.post(url, newBlock);
      getBlockchain();
      e.target.reset();
    } catch (error) {
      if (error.response && error.response.data &&) {
        setErrorMessage("Invalid request. Please provide valid data.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="App">
      <h3 className="title">Blockchain Client</h3>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="addBlock">
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="add block"
              name="data"
              id="name"
              onChange={handleChange}
            />
            <label htmlFor="name" className="form__label">
              Add block
            </label>
            <button className="submit-btn">Add</button>
          </div>
        </form>
        {isDataEmpty
          ? errorMessage && <p className="error">{errorMessage}</p>
          : ""}
      </div>
      <ul>
        {blockchain.map((block) => (
          <li className="block" key={block.hash}>
            <p className="block-text">{block.data}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

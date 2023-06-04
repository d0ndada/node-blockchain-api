import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [blockchain, setBlockchain] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const url = "http://localhost:5000/api/1/blocks";

  const getBlockchain = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data.data);
      setBlockchain(data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getBlockchain();
  }, []);

  const handleChange = () => {
    setErrorMessage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target.data.value;

    const newBlock = { data };
    try {
      await axios.post(url, newBlock);
      getBlockchain();
      e.target.reset();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        console.log(errorMessage);
        console.log(error.response.data.error.status);
      } else {
        setErrorMessage("An unexpected error occurred.");
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
        {errorMessage && <p className="error">{errorMessage}</p>}
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

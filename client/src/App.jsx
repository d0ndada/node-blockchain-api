import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [blockchain, setBlockchain] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false); // state to control arrow display
  const blockContainerRef = useRef(null);

  const url = "http://localhost:5000/api/1/blocks";

  const getBlockchain = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data.data);
      setBlockchain(data.data);
      handleScroll();
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
      if (error.response) {
        setErrorMessage(error.response.data.error);
        // console.log(errorMessage);
        // console.log(error.response.data.error.status);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  const handleScroll = () => {
    if (blockContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } =
        blockContainerRef.current;
      setShowScrollArrow(scrollTop < clientHeight + scrollHeight);
    }
  };

  useEffect(() => {
    if (blockContainerRef.current) {
      blockContainerRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up - remove the event listener
    return () => {
      if (blockContainerRef.current) {
        blockContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [blockchain]);
  return (
    <div className="App">
      <header className="header">
        <h3 className="title">Blockchain Client</h3>
      </header>
      <main className="main">
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
        <div className="block-container" ref={blockContainerRef}>
          <ul>
            {blockchain.map((block) => (
              <li className="block" key={block.hash}>
                <p className="block-text">{block.data}</p>
              </li>
            ))}
          </ul>
          {showScrollArrow && (
            <div id="scrollArrow" className="scroll-arrow">
              ↓
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <p className="footer-text">&copy; 2023 d0ndada </p>
        <a
          className="link"
          href="https://github.com/d0ndada"
          target="_blank"
          rel="noopener noreferrer">
          <img className="GithubLogo" alt="github" src="/github-mark.png" />
        </a>
      </footer>
    </div>
  );
}

export default App;

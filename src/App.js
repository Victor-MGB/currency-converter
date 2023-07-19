import { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "react-dropdown";
import { FaExchangeAlt } from "react-icons/fa";
import Axios from "axios";

function App() {
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("GHc");
  const [to, setTo] = useState("NGN");
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      "https://v6.exchangerate-api.com/v6/bb273b684104028a7da8ab9c/latest/USD"
    ).then((res) => {
      setInfo(res.data.conversion_rates);
    });
  }, []);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info, convert]); // Add 'convert' to the dependency array

  function convert() {
    let rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency Converter</h1>
      </div>

      <div className="container">
        <div className="l">
          <h3>Amount</h3>
          <input
            type="text"
            placeholder="Enter the Amount"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="middle">
          <h3>From</h3>
          <Dropdown
            options={options}
            onChange={(e) => setFrom(e.value)}
            value={from}
            placeholder="from"
          />
        </div>

        <div className="switch" onClick={() => flip()}>
          <FaExchangeAlt size={30} />
        </div>

        <div className="right">
          <h3>To</h3>
          <Dropdown
            options={options}
            onChange={(e) => setTo(e.value)}
            value={to}
            placeholder="to"
          />
        </div>

        <div className="result">
          <button onClick={() => convert()}>Convert</button>
          <h2>Convert Amount</h2>
          <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

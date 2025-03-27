import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar2 from "../components/Navbar2";
import Axios from "axios";
import spinner from "../assets/Spinner.svg";
import Navbar from "../components/Navbar";

import "../pages/CodeCompiler.css";

const apiKey = "d3e4ee7a9emsha45d05810b4c0f8p1cbe4ejsncb947d65b3e2";
const appURL = "https://judge0-ce.p.rapidapi.com/submissions";

function CodeCompiler() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [timer, setTimer] = useState(45 * 60); // 45 minutes in seconds
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const options = {
    fontSize: fontSize,
  };

  useEffect(() => {
    let interval;
    if (testStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      alert("Time's up! Submitting your code...");
      navigate(`/results`, { state: { companyId, round: 'coding' } });
    }
    return () => clearInterval(interval);
  }, [testStarted, timer, navigate, companyId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function Compile() {
    setLoading(true);
    let languageId;
    if (userLanguage === "java") {
      languageId = 62;
    } else if (userLanguage === "c") {
      languageId = 50;
    } else if (userLanguage === "cpp") {
      languageId = 54;
    } else if (userLanguage === "python") {
      languageId = 71;
    } else if(userLanguage === "javascript") {
      languageId = 63;
    }

    const formData = {
      language_id: languageId,
      source_code: btoa(userCode),
      stdin: btoa(userInput),
    };
    const options = {
      method: "POST",
      url: appURL,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        base64_encoded: "true",
        fields: "*",
        ...formData,
      },
    };
    
    console.log("Axios Request Options:", options);
    Axios
    .request(options)
    .then(function response(response) {
        console.log("res.data", response.data)
        const token = response.data.token;
        checkStatus(token);
    })
    .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
    })
  }

  const checkStatus = async (token) => {
    const options = {
        method: "GET",
        url: appURL + "/" + token,
        params: {
            base64_encoded: "true",
            fields: "*",
          },
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
    };
    try {
        console.log(options)
        let response = await Axios.request(options);
        console.log(response)
        let statusId = response.data.status?.id;
        if(statusId === 1 || statusId === 2) {
            setTimeout(() => {
                checkStatus(token)
            }, 2000)
            return;
        } else {
            setLoading(false);
            console.log("res.data", response.data)
            if (response.data.compile_output) {
              setUserOutput(atob(response.data.compile_output));
            } else if (response.data.stderr) { 
              setUserOutput(atob(response.data.stderr)); 
            } else {
              setUserOutput(atob(response.data.stdout));
            }
        }
    } catch(err) {
        console.log(err);
    }
}

  const handleEndTest = () => {
    if (window.confirm("Are you sure you want to end the test?")) {
      navigate(`/results`, { state: { companyId, round: 'coding' } });
    }
  };

  function clearOutput() {
    setUserOutput("");
  }

  if (!testStarted) {
    return (
      <div className="container mt-5 text-center">
        <h1>Coding Round</h1>
        <p>Duration: 45 minutes</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setTestStarted(true)}
        >
          Start Test
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Time Remaining: {formatTime(timer)}</h4>
          <button
            className="btn btn-danger"
            onClick={handleEndTest}
          >
            End Test
          </button>
        </div>
      </div>
      <Navbar2
        userLanguage={userLanguage}
        setUserLanguage={setUserLanguage}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <div className="editor-container">
            <Editor
              options={options}
              width={`100%`}
              theme={userTheme}
              language={userLanguage}
              defaultLanguage="java"
              defaultValue="//Start Coding Here....."
              onChange={(value) => {
                setUserCode(value);
              }}
            />
          </div>
          <button className="run-btn" onClick={() => Compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <div className="input-box">
            <h4>Input: </h4>
            <textarea
              id="code-input"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          {loading ? (
            <div className="output-box">
              <h4>Output: </h4>
              <div className="spinner-box">
                <img src={spinner} alt="Loading....." />
              </div>
            </div>
          ) : (
            <div className="output-box">
              <h4>Output: </h4>
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;

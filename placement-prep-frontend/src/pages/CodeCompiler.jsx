import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar2 from "../components/Navbar2";
import Axios from "axios";
import spinner from "../assets/Spinner.svg";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../redux/testSlice";

import "../pages/CodeCompiler.css";

const apiKey = "d3e4ee7a9emsha45d05810b4c0f8p1cbe4ejsncb947d65b3e2";
const appURL = "https://judge0-ce.p.rapidapi.com/submissions";

function CodeCompiler() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
      navigate(`/results`, { state: { companyId, round: "coding" } });
    }
    return () => clearInterval(interval);
  }, [testStarted, timer, navigate, companyId]);

  useEffect(() => {
    const fetchCodingQuestions = async () => {
      try {
        const result = await dispatch(fetchQuestions({ companyId, round: "coding" })).unwrap();
        console.log("Fetched Questions:", result); // Log the API response
        setQuestions(result);
      } catch (error) {
        console.error("Error fetching questions:", error); // Log any errors
      }
    };
    fetchCodingQuestions();
  }, [dispatch, companyId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    } else if (userLanguage === "javascript") {
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

    Axios.request(options)
      .then(function response(response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
      });
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
      let response = await Axios.request(options);
      let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setLoading(false);
        if (response.data.compile_output) {
          setUserOutput(atob(response.data.compile_output));
        } else if (response.data.stderr) {
          setUserOutput(atob(response.data.stderr));
        } else {
          setUserOutput(atob(response.data.stdout));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndTest = () => {
    if (window.confirm("Are you sure you want to end the test?")) {
      navigate(`/results`, { state: { companyId, round: "coding" } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
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
        <button className="btn btn-primary btn-lg" onClick={() => setTestStarted(true)}>
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
          <button className="btn btn-danger" onClick={handleEndTest}>
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
      <div className="container mt-3">
        <div className="row">
          {/* Left Section: Questions */}
          <div className="col-md-4">
            <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8", border: "1px solid #d1d9e6" }}>
              <div className="card-body">
                <h4 className="card-title text-center mb-4" style={{ color: "#007bff" }}>Questions</h4>
                {questions.length > 0 ? (
                  <div className="question-box">
                    <h5 className="mb-3" style={{ color: "#333" }}>Question {currentQuestionIndex + 1}:</h5>
                    <p className="mb-4" style={{ color: "#555" }}>{questions[currentQuestionIndex].question}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <img src={spinner} alt="Loading..." style={{ width: "50px", height: "50px" }} />
                    <p className="text-center" style={{ color: "#888" }}>Loading questions...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Code Editor with Input/Output */}
          <div className="col-md-8">
            <div className="card shadow-sm mb-4" style={{ backgroundColor: "#f0f4f8", border: "1px solid #d1d9e6" }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-3" style={{ color: "#007bff" }}>Code Editor</h5>
                <Editor
                  options={options}
                  width="100%"
                  height="300px"
                  theme={userTheme}
                  language={userLanguage}
                  defaultLanguage="java"
                  defaultValue="//Start Coding Here....."
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                />
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-primary" style={{ backgroundColor: "#007bff", borderColor: "#0056b3" }} onClick={() => Compile()}>
                    Run
                  </button>
                  <button className="btn btn-secondary" style={{ backgroundColor: "#6c757d", borderColor: "#5a6268" }} onClick={() => clearOutput()}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Input Box */}
              <div className="col-md-6">
                <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8", border: "1px solid #d1d9e6" }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#007bff" }}>Input</h5>
                    <textarea
                      id="code-input"
                      className="form-control"
                      rows="6"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter input here..."
                      style={{ backgroundColor: "#ffffff", color: "#333", border: "1px solid #d1d9e6" }}
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* Output Box */}
              <div className="col-md-6">
                <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8", border: "1px solid #d1d9e6" }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#007bff" }}>Output</h5>
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                        <img src={spinner} alt="Loading..." />
                      </div>
                    ) : (
                      <pre className="p-2" style={{ height: "150px", overflowY: "auto", backgroundColor: "#ffffff", color: "#333", border: "1px solid #d1d9e6" }}>
                        {userOutput || "Output will appear here..."}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;

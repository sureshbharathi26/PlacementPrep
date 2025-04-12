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
  const [timer, setTimer] = useState(45 * 60);
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const options = { fontSize };

  useEffect(() => {
    let interval;
    if (testStarted && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      navigate(`/results`, { 
        state: { 
          companyId, 
          round: "coding",
          score: correctQuestions.length,
          totalQuestions: questions.length
        } 
      });
    }
    return () => clearInterval(interval);
  }, [testStarted, timer, navigate, companyId, correctQuestions, questions.length]);

  useEffect(() => {
    const fetchCodingQuestions = async () => {
      try {
        const result = await dispatch(fetchQuestions({ companyId, round: "coding" })).unwrap();
        setQuestions(result);
      } catch (error) {
        console.error("Error fetching questions:", error);
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
    if (!userCode.trim()) {
      setUserOutput("Please write some code before compiling.");
      return;
    }
    
    setLoading(true);
    setUserOutput("");
    setShowSuccess(false);
    
    let languageId;
    switch (userLanguage) {
      case "java": languageId = 62; break;
      case "c": languageId = 50; break;
      case "cpp": languageId = 54; break;
      case "python": languageId = 71; break;
      case "javascript": languageId = 63; break;
      default: languageId = 62;
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
      .then(response => {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch(err => {
        setLoading(false);
        setUserOutput(err.response ? err.response.data : err.message);
      });
  }

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${appURL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    
    try {
      let response = await Axios.request(options);
      let statusId = response.data.status?.id;
      
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => checkStatus(token), 2000);
        return;
      }
      
      setLoading(false);
      let output = "";
      
      if (response.data.compile_output) {
        output = atob(response.data.compile_output);
      } else if (response.data.stderr) {
        output = atob(response.data.stderr);
      } else {
        output = atob(response.data.stdout);
      }
      
      setUserOutput(output);
      validateOutput(output);
    } catch (err) {
      setLoading(false);
      setUserOutput(err.message);
    }
  };

  const validateOutput = (output) => {
    if (!questions.length) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion.sampleOutput) return;
    
    const expectedOutput = currentQuestion.sampleOutput.toString().trim();
    const actualOutput = output.toString().trim();
    
    if (actualOutput === expectedOutput && !correctQuestions.includes(currentQuestion.id)) {
      setCorrectQuestions([...correctQuestions, currentQuestion.id]);
      setShowSuccess(true);
    }
  };

  const handleEndTest = () => {
    if (window.confirm(`End test? Solved ${correctQuestions.length}/${questions.length}`)) {
      navigate(`/results`, { 
        state: { 
          companyId, 
          round: "coding",
          score: correctQuestions.length,
          totalQuestions: questions.length,
          correctQuestions
        } 
      });
    }
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
    setUserOutput("");
    setUserInput("");
    setShowSuccess(false);
  };

  const clearOutput = () => {
    setUserOutput("");
    setShowSuccess(false);
  };

  const isCurrentQuestionCorrect = (questionId) => {
    return correctQuestions.includes(questionId);
  };

  if (!testStarted) {
    return (
      <div className="container mt-5 text-center">
        <h1>Coding Round</h1>
        <p>Duration: 45 minutes</p>
        <p>Total Questions: {questions.length}</p>
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
          <div>
            <h4>Time Remaining: {formatTime(timer)}</h4>
            <p className="mb-0">Progress: {correctQuestions.length}/{questions.length} correct</p>
          </div>
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
      
      {showSuccess && (
        <div className="container mt-3">
          <div className="alert alert-success">
            <strong>Congratulations!</strong> Your answer is correct!
            {currentQuestionIndex < questions.length - 1 && (
              <button 
                className="btn btn-success ms-3"
                onClick={() => handleQuestionNavigation(currentQuestionIndex + 1)}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      )}

      <div className="container mt-3">
        <div className="row">
          {/* Left Section: Questions */}
          <div className="col-md-4">
            <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8", border: "1px solid #d1d9e6" }}>
              <div className="card-body">
                <h4 className="card-title text-center mb-4" style={{ color: "#007bff" }}>Questions</h4>
                
                {/* Question Navigation Numbers */}
                <div className="d-flex flex-wrap mb-3">
                  {questions.map((q, index) => (
                    <button
                      key={q.id}
                      className={`btn btn-sm m-1 ${isCurrentQuestionCorrect(q.id) ? 'btn-success' : 
                        currentQuestionIndex === index ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => handleQuestionNavigation(index)}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                {questions.length > 0 ? (
                  <div className="question-box">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 style={{ color: "#333" }}>
                        Question {currentQuestionIndex + 1}
                        {isCurrentQuestionCorrect(questions[currentQuestionIndex].id) && (
                          <span className="ms-2 text-success">✓</span>
                        )}
                      </h5>
                    </div>
                    <p className="mb-4" style={{ color: "#555" }}>
                      {questions[currentQuestionIndex].question}
                    </p>
                    <div className="mt-3">
                      <h6>Sample Input:</h6>
                      <pre className="p-2 bg-light rounded">
                        {questions[currentQuestionIndex].sampleInput || 'No sample input'}
                      </pre>
                      <h6>Sample Output:</h6>
                      <pre className="p-2 bg-light rounded">
                        {questions[currentQuestionIndex].sampleOutput || 'No sample output'}
                      </pre>
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

          {/* Right Section: Code Editor */}
          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">Code Editor</h5>
                <Editor
                  options={options}
                  width="100%"
                  height="300px"
                  theme={userTheme}
                  language={userLanguage}
                  defaultValue="// Start Coding Here..."
                  onChange={setUserCode}
                />
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-primary" 
                    onClick={Compile}
                    disabled={loading}
                  >
                    {loading ? 'Running...' : 'Run'}
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={clearOutput}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Input</h5>
                    <textarea
                      className="form-control"
                      rows="6"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter input here..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Output</h5>
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                        <img src={spinner} alt="Loading..." />
                      </div>
                    ) : (
                      <pre style={{ 
                        height: "150px", 
                        overflowY: "auto",
                        whiteSpace: "pre-wrap"
                      }}>
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
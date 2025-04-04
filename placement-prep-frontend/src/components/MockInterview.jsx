import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import './MockInterview.css';

const MockInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // Fetch questions from the database
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/tests/1/interview`); // Replace '1' with the actual companyId
        console.log('Fetched questions:', response.data); // Log fetched questions
        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error); // Log error details
        alert('Failed to load interview questions. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchQuestions();

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isListening]);

  useEffect(() => {
    const initAudioAnalyser = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        visualizeSpectrum();
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    if (isListening) {
      initAudioAnalyser();
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isListening]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const visualizeSpectrum = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      // Gradient background
      const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Create gradient for each bar
        const barGradient = canvasCtx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        barGradient.addColorStop(0, '#4e54c8');
        barGradient.addColorStop(1, '#8f94fb');
        
        canvasCtx.fillStyle = barGradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        // Add subtle reflection
        canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, 2);
        
        x += barWidth + 1;
      }
    };

    draw();
  };

  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const handleNextQuestion = () => {
    if (transcript.trim()) {
      const newResponses = [...responses, { 
        question: questions[questionIndex]?.question, 
        answer: transcript,
        duration: formatTime(timer)
      }];
      setResponses(newResponses);
      resetTranscript();
      setTimer(0);
      
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setInterviewCompleted(true);
      }
    } else {
      alert('Please provide an answer before proceeding.');
    }
  };

  const handleRestartInterview = () => {
    setQuestionIndex(0);
    setResponses([]);
    setInterviewCompleted(false);
    resetTranscript();
    setTimer(0);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="error-message">
        <h3>Browser Not Supported</h3>
        <p>Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading interview questions...</p>
      </div>
    );
  }

  return (
    <div className="mock-interview-container">
      <header className="interview-header">
        <h1>AI Mock Interview</h1>
        <p>Practice your interview skills with AI-powered questions</p>
      </header>

      <div className="interview-content">
        {interviewCompleted ? (
          <div className="completion-screen">
            <div className="completion-card">
              <h2>Interview Completed!</h2>
              <p>You've answered all {questions.length} questions.</p>
              <button 
                className="btn-restart"
                onClick={handleRestartInterview}
              >
                Start New Interview
              </button>
            </div>
          </div>
        ) : (
          <div className="interview-card">
            <div className="question-section">
              <div className="question-header">
                <span className="question-count">Question {questionIndex + 1} of {questions.length}</span>
                <span className="timer">{formatTime(timer)}</span>
              </div>
              <div className="question-text">
                <p>{questions[questionIndex]?.question}</p>
              </div>
            </div>

            <div className="visualization-section">
              <canvas 
                ref={canvasRef} 
                className="voice-spectrum"
                width="600"
                height="150"
              ></canvas>
              <div className={`pulse-indicator ${isListening ? 'active' : ''}`}>
                <div className="pulse-circle"></div>
                <span>{isListening ? 'Listening...' : 'Paused'}</span>
              </div>
            </div>

            <div className="answer-section">
              <div className="answer-header">
                <h3>Your Answer</h3>
                <div className="recording-controls">
                  <button
                    className={`btn-record ${isListening ? 'active' : ''}`}
                    onClick={isListening ? handleStopListening : handleStartListening}
                  >
                    {isListening ? (
                      <>
                        <span className="recording-dot"></span>
                        Stop Recording
                      </>
                    ) : 'Start Recording'}
                  </button>
                </div>
              </div>
              <div className="answer-text">
                {transcript ? (
                  <p>{transcript}</p>
                ) : (
                  <p className="placeholder">Your answer will appear here as you speak...</p>
                )}
              </div>
            </div>

            <div className="navigation-buttons">
              <button
                className="btn-next"
                onClick={handleNextQuestion}
                disabled={!transcript.trim()}
              >
                {questionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>
        )}

        {responses.length > 0 && (
          <div className="responses-section">
            <h3>Your Responses</h3>
            <div className="responses-list">
              {responses.map((response, index) => (
                <div key={index} className="response-card">
                  <div className="response-header">
                    <span className="response-number">Q{index + 1}</span>
                    <span className="response-duration">{response.duration}</span>
                  </div>
                  <div className="response-question">
                    <p>{response.question}</p>
                  </div>
                  <div className="response-answer">
                    <p>{response.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
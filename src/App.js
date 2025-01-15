import React, { useState } from "react";
import { decisionTrees } from "./decisionTree";
import "./App.css";

// Custom messages for DIY and DIFY
const productMessages = {
  DIY: `Determining when to submit a W-2/W-2C request to BOT Testing, Creating Manually via Sentinel, Keying Request via Superforms.

Overview:
Use the following table to help you determine whether the W-2/W-2C request can be done through BOT Testing, Creating Manually the W-2C through Sentinel, or providing an original W-2 from QBOP expert access.

If you have a case that does not fit into these scenarios please reach out to your T2, SME, TP3 or in the DIY to DIFY corrections room for additional support.

If you are submitting your case to the BOT for W-2Cs and it fails, please make sure to review the Fail reason to see if you need to update your excel file. If you do not understand the Fail reason please reach out to your SME or Lead. Do not resubmit your case without first checking the reason and making the necessary updates. Remember that the BOT does not currently handle all scenarios and you may have to create the W-2Cs in Sentinel.`,
  DIFY: `Determining when to submit a W-2/W-2C request to BOT Testing, Creating Manually via Sentinel, Keying Request via Superforms.

Overview:
Use the following table to help you determine whether the W-2/W-2C request can be done through BOT Testing, Creating Manually the W-2C through Sentinel, or submitting a Keying Request to Superforms. If you have a case that does not fit into these scenarios please reach out to your T2, SME, TP3 or in the DIY to DIFY corrections room for additional support.

If you are submitting your case to the BOT for W-2Cs and it fails, please make sure to review the Fail reason to see if you need to update your excel file. If you do not understand the Fail reason please reach out to your SME or Lead. Do not resubmit your case without first checking the reason and making the necessary updates. Remember that the BOT does not currently handle all scenarios and you may have to create the W-2Cs in Sentinel.`,
};

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState([]); // Track history for back navigation
  const [selectionHistory, setSelectionHistory] = useState([]); // Track user selections and questions

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    setCurrentStep("start");
    setHistory([]);
    // Add the first question and selected product to the history
    setSelectionHistory([
      {
        question: "Is the product DIY (Do It Yourself) or DIFY (Do It For You)?",
        selection: product,
      },
    ]);
  };

  const handleOptionClick = (nextStep, optionText, question) => {
    setHistory([...history, currentStep]); // Add current step to history
    setCurrentStep(nextStep);
    setSelectionHistory([
      ...selectionHistory,
      { question, selection: optionText }, // Add question and user's choice to history
    ]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setCurrentStep(previousStep);
      setHistory(history.slice(0, -1)); // Remove last step from history
      setSelectionHistory(selectionHistory.slice(0, -1)); // Remove last selection from history
    } else {
      // If no history, go back to product selection
      setSelectedProduct(null);
      setCurrentStep("start");
      setSelectionHistory([]); // Clear selection history
    }
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setCurrentStep("start");
    setHistory([]);
    setSelectionHistory([]); // Clear selection history
  };

  const renderResultAsList = (result) => {
    const lines = result.split("\n").filter((line) => line.trim() !== "");
    return (
      <ul className="result-list">
        {lines.map((line, index) => (
          <li key={index} className="result-item">
            {line}
          </li>
        ))}
      </ul>
    );
  };

  const renderStep = () => {
    if (!selectedProduct) {
      return (
        <div className="step space-y-4">
          <h3>Is the product DIY (Do It Yourself) or DIFY (Do It For You)?</h3>
          <div className="options space-x-4">
            <button onClick={() => handleProductSelection("DIY")}>DIY</button>
            <button onClick={() => handleProductSelection("DIFY")}>DIFY</button>
          </div>
        </div>
      );
    }

    const step = decisionTrees[selectedProduct][currentStep];

    if (step.result) {
      return (
        <div className="space-y-4">
          <div className="result">{renderResultAsList(step.result)}</div>
          <div className="options">
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="step space-y-4">
        <h3>{step.question}</h3>
        <div className="options space-x-4">
          {step.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.next, option.text, step.question)}
              className="option-button"
            >
              {option.text}
            </button>
          ))}
        </div>
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>W2/W2C Decision Tree</h1>
      {selectedProduct && (
        <div className="product-message">
          <div className="message-text">{productMessages[selectedProduct]}</div>
        </div>
      )}
      <div className="app-container">
        <div className="history-panel">
          <h3>Selection History</h3>
          <ul>
            {selectionHistory.map((item, index) => (
              <li key={index}>
                <strong>Question:</strong> {item.question}
                <br />
                <strong>Selection:</strong> {item.selection}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">{renderStep()}</div>
      </div>
    </div>
  );
}

export default App;
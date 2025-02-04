import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [fadeOutCentralBox, setFadeOutCentralBox] = useState(false);
  const [currentImageShe, setCurrentImageShe] = useState(0);
  const [currentImageHe, setCurrentImageHe] = useState(0);
  const [isFadingOutShe, setIsFadingOutShe] = useState(false);
  const [isFadingOutHe, setIsFadingOutHe] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNewText, setShowNewText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showBlueBox, setShowBlueBox] = useState(false);
  const [showLoveSection, setShowLoveSection] = useState(false); // Nuevo estado
  const [noClickCount, setNoClickCount] = useState(0); // Cuenta los clics en el botón "No"
  const [noButtonMessage, setNoButtonMessage] = useState(""); // Mensaje dinámico para el botón "No"
  const imagesShe = [
    "/images/she1.jpeg",
    "/images/she2.jpeg",
    "/images/she3.jpeg",
    "/images/she4.jpeg",
    "/images/she5.jpeg",
    "/images/she6.jpeg",
    "/images/she7.jpeg",
  ];
  const imagesHe = [
    "/images/he1.jpeg",
    "/images/he2.jpeg",
    "/images/he3.jpeg",
    "/images/he4.jpeg",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^(|[1-9]|1[0-9]|2[0-9]|30)$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleButtonClick = () => {
    if (inputValue === "16") {
      setFadeOutCentralBox(true);
      setTimeout(() => {
        setStep(1);
      }, 1000);
    }
  };

  const handleNoButtonClick = () => {
    if (noClickCount === 0) {
      setNoButtonMessage(
        "bonita, como que no? :0 yo voy a creeeeeeeeeeeeeeer nomas que te has confudido..."
      );
      setNoClickCount(1);
    } else if (noClickCount === 1) {
      setNoButtonMessage(
        "bonita, una vez mas y me rayo! >>:|, avisada estás!!"
      );
      setNoClickCount(2);
    } else if (noClickCount === 2) {
      setNoButtonMessage("");
      setNoClickCount(3);
    }
  };

  const handleYesButtonClick = () => {
    setShowBlueBox(false);
    setShowLoveSection(true); // Muestra la sección de "love"
  };

  useEffect(() => {
    let timer;
    if (step === 1) {
      timer = setTimeout(() => setStep(2), 3000);
    } else if (step === 2) {
      setShowText(true);
      setStep(3);
    } else if (step === 3 && currentImageShe < imagesShe.length) {
      setIsFadingOutShe(false);
      timer = setTimeout(() => {
        setIsFadingOutShe(true);
        setTimeout(() => {
          if (currentImageShe === imagesShe.length - 1) {
            setShowText(false);
            setShowNewText(true);
            setStep(4);
          } else {
            setCurrentImageShe((prev) => prev + 1);
          }
        }, 1000);
      }, 4000);
    } else if (step === 4 && currentImageHe < imagesHe.length) {
      setIsFadingOutHe(false);
      timer = setTimeout(() => {
        setIsFadingOutHe(true);
        setTimeout(() => {
          if (currentImageHe === imagesHe.length - 1) {
            setShowNewText(false);
            setShowFinalText(true);
            setStep(5);
          } else {
            setCurrentImageHe((prev) => prev + 1);
          }
        }, 1000);
      }, 2000);
    } else if (step === 5) {
      timer = setTimeout(() => {
        setShowFinalText(false);
        setShowBlueBox(true);
      }, 14000);
    }
    return () => clearTimeout(timer);
  }, [step, currentImageShe, imagesShe.length, currentImageHe, imagesHe.length]);

  return (
    <div className="app-container">
      {step === 0 && (
        <div className={`center-box ${fadeOutCentralBox ? "fade-out" : ""}`}>
          <h2>This detail is made only for one person</h2>
          <input
            type="text"
            placeholder="Coloque su fecha"
            value={inputValue}
            onChange={handleInputChange}
            className="date-input"
          />
          <button
            onClick={handleButtonClick}
            disabled={inputValue !== "16"}
            className="start-button"
          >
            Iniciar
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="top-left-text fade-in-out">
          <p>Bonito, no?</p>
          <p>Pero, mira...</p>
        </div>
      )}

      {showText && (
        <div className={`top-left-text fade-in ${step === 4 ? "fade-out" : ""}`}>
          <p>Que hermosa...</p>
        </div>
      )}

      {step === 3 && (
        <img
          src={imagesShe[currentImageShe]}
          alt={`Slide ${currentImageShe + 1}`}
          className={`center-image ${isFadingOutShe ? "fade-out" : "fade-in"}`}
        />
      )}

      {showNewText && (
        <div className="top-left-text fade-in-out">
          <p>Y un bobo</p>
        </div>
      )}

      {step === 4 && (
        <img
          src={imagesHe[currentImageHe]}
          alt={`Slide ${currentImageHe + 1}`}
          className={`center-image ${isFadingOutHe ? "fade-out" : "fade-in"}`}
        />
      )}

      {showFinalText && (
        <div className="final-text fade-in-out">
          <p>
            Pero... lo que quiero decir es... que esa chica me encanta... mucho...
            y quisiera pedirle que sea mi valentine...
          </p>
          <p>Or... maybe I can get something bettah.</p>
        </div>
      )}

      {showBlueBox && (
        <div className="blue-box fade-in">
          <h2>U wanna be my fourteen and sixteen?</h2>
          <h2>¿Quieres ser mi 14 y 16?</h2>
          <p className="subtitle">
            Sí... both, las 2 fechas... ambas. Sixteen podría ser que suene mejor que
            fourteen, u know?
          </p>
          <div className="button-group">
            <button
              className={`yes-button ${noClickCount === 3 ? "centered" : ""}`}
              onClick={handleYesButtonClick}
            >
              Sí
            </button>
            {noClickCount < 3 && (
              <button className="no-button" onClick={handleNoButtonClick}>
                No
              </button>
            )}
          </div>
          <p className="no-message">{noButtonMessage}</p>
        </div>
      )}

      {showLoveSection && (
        <div className="love-section fade-in">
          <img
            src="/images/she_and_him.jpeg"
            alt="She and Him"
            className="small-image"
          />
          <p>&lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3</p>
          <p>&lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3</p>
          <p>&lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3</p>
          <p>&lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3 &lt;3</p>
        </div>
      )}
    </div>
  );
}

export default App;
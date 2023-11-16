import React, { useState } from "react";
import styles from "./style.module.scss";
import {useNavigate} from 'react-router-dom'

const NotFoundPage = () => {
  const navigation = useNavigate()
  const [isGlitchPaused, setGlitchPaused] = useState(false);

  const handleButtonClick = () => {
    setGlitchPaused((prevState) => !prevState);

    navigation("/")
  };

  return (
    <div className={`${styles.saada} ${styles.glitchWrapper} ${isGlitchPaused ? styles.paused : ""}`}>
      <div className={styles.glitchText}>ERROR 404: Not found</div>
      <button
        className={styles.notFound_btn}
        type="button"
        onClick={handleButtonClick}
      >
        Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;

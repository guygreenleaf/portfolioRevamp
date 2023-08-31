import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  style?: React.CSSProperties;
  onFinish?: () => void;
}

export default function TypingEffect({ text, style, onFinish }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(intervalId);
        onFinish && onFinish();
      }
    }, 70);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <h1 style={style}>
      <span style={{ borderBottom: "2.5px solid black" }}>{displayedText}</span>
    </h1>
  );
}

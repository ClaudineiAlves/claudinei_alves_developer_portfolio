// src/components/TypeWriter.tsx
"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursor = true,
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setShowCursor(false);
      onComplete?.();
    }
  }, [displayText, isTyping, text, speed, onComplete]);

  // O leitor de tela lê o texto inteiro de uma vez, não a digitação letra a letra
  return (
    <span className={className}>
      <span aria-hidden="true">
        {displayText}
        {showCursor && cursor && (
          <span className="animate-pulse text-primary-500">|</span>
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

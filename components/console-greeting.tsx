'use client';

import { useEffect } from 'react';

export function ConsoleGreeting() {
  useEffect(() => {
    console.log("%c█   █ █████ █     █     █████", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c█   █ █     █     █     █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c█████ █████ █     █     █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c█   █ █     █     █     █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c█   █ █████ █████ █████ █████", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c         ███ █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c          █  ██ ██", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c          █  █ █ █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c          █  █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c         ███ █   █", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c    █  █████ █████ █████", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c    █  █     █     █    ", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c    █  █████ █████ █████", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c    █  █     █     █    ", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c ████  █████ █     █    ", "color: #FF4500; font-family: monospace; font-size: 14px;")
    console.log("%c", "color: #FF4500;")
    console.log("%cWelcome to my portfolio!", "color: #0066CC; font-size: 16px; font-weight: bold;")
    console.log("%cWhatcha looking for over here? 👀", "color: #0066CC; font-size: 12px;")
  }, [])

  return null;
}

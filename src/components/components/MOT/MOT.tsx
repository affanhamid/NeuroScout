"use client";
import React, { useRef, useEffect, useState } from "react";
import { Ball, createBalls, drawBall, HIGHLIGHT_COLOR } from "./Ball";
import { resolveCollisions, resolveCollisionsWithWalls } from "./collision";
import { calculateScore } from "./scoring";
import {
  MOTDialog,
  ThankYouDialog,
  PracticeCompleteDialog,
  ResultsDialog,
} from "./MOTDialog";
import Countdown from "../Countdown";
import { Data, insertMOTData } from "@/database/MOT";

const MOT = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const highlightedBallsRef = useRef<number[]>([]);
  const actualBallsRef = useRef<number[]>([]);
  const clickedBallsRef = useRef<Set<number>>(new Set());
  const isClickableRef = useRef<boolean>(false);
  const trialsRef = useRef<number>(0);
  const practiceTrialsRef = useRef<number>(0);
  const totalPracticeTrialsRef = useRef<number>(1);
  const totalTrialsRef = useRef<number>(2);
  const isPracticeRef = useRef<boolean>(true);
  const durationRef = useRef<number>(5);
  const ballRadiusRef = useRef<number>(70);
  const startingVtsRef = useRef<number>(3);
  const dataRef = useRef<Data>({
    timeOfData: Date.now(),
    vts: startingVtsRef.current,
    scores: [],
    age: 0,
    yearsPlayingFootball: 0,
    timeToClicks: [],
    email: "",
    screenWidth: 0,
    screenHeight: 0,
    ballSize: 0,
    duration: durationRef.current,
    practiceRounds: totalPracticeTrialsRef.current,
  });
  const gameEndTimeRef = useRef<number>(0);

  const [vts, setVts] = useState<number>(3);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showPracticeComplete, setShowPracticeComplete] =
    useState<boolean>(false); // To show practice complete dialog

  const submit = async () => {
    dataRef.current.vts = vts;
    const data = dataRef.current;
    insertMOTData(data);
    setShowResults(true);
  };

  const begin = (canvas: HTMLCanvasElement) => {
    let currentSpeed = 0.01;
    if (window.innerWidth < 768) {
      ballRadiusRef.current = 40;
    } else if (window.innerWidth < 1024) {
      ballRadiusRef.current = 50;
    } else if (window.innerWidth < 1440) {
      ballRadiusRef.current = 60;
    } else {
      ballRadiusRef.current = 60;
    }
    dataRef.current.ballSize = ballRadiusRef.current;
    const balls = createBalls(canvas, ballRadiusRef.current);

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(Math.floor(Math.random() * balls.length));
    }
    highlightedBallsRef.current = Array.from(uniqueIndices);
    actualBallsRef.current = highlightedBallsRef.current;

    return { currentSpeed, balls };
  };

  const update = (
    balls: Ball[],
    currentSpeed: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    resolveCollisionsWithWalls(balls, currentSpeed, canvas);
    resolveCollisions(balls, currentSpeed);

    balls.forEach((ball, index) =>
      drawBall(ball, highlightedBallsRef.current.includes(index), ctx)
    );
  };

  const end = (timerId: NodeJS.Timeout) => {
    clearTimeout(timerId);
  };

  const handleGameComplete = () => {
    setShowThankYou(true);
  };

  const handlePracticeComplete = () => {
    setShowPracticeComplete(true); // Show practice complete dialog
  };

  const startActualGame = () => {
    isPracticeRef.current = false;
    setIsRunning(false);
    setVts(startingVtsRef.current);
    isClickableRef.current = false;
    clickedBallsRef.current.clear();
    highlightedBallsRef.current = [];
    setTimeout(() => {
      setGameStarted(true);
    }, 1000);
  };

  useEffect(() => {
    if (!isRunning) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let { currentSpeed, balls } = begin(canvas);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1B1B1B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      update(balls, currentSpeed, canvas, ctx);

      animationFrameId.current = requestAnimationFrame(animate);
    }

    animate();

    setTimeout(() => {
      currentSpeed = vts;
      highlightedBallsRef.current = [];
    }, 1000);

    const timerId = setTimeout(() => {
      if (animationFrameId.current) {
        currentSpeed = 0;
      }
      isClickableRef.current = true;
      gameEndTimeRef.current = Date.now();
    }, durationRef.current * 1000);

    function handleClick(event: MouseEvent) {
      if (!isClickableRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      balls.forEach((ball, index) => {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius) {
          ball.color = HIGHLIGHT_COLOR;
          setTimeout(() => {
            clickedBallsRef.current.add(index);
            dataRef.current.timeToClicks.push(
              Date.now() - gameEndTimeRef.current
            );

            if (clickedBallsRef.current.size === 4) {
              canvas.removeEventListener("click", handleClick);

              const score = calculateScore(
                Array.from(clickedBallsRef.current),
                actualBallsRef.current
              );
              if (score === 4) {
                setVts(vts + 1);
              } else {
                setVts(vts - 1);
              }
              dataRef.current.scores.push(score);

              if (isPracticeRef.current) {
                practiceTrialsRef.current += 1;
                if (
                  practiceTrialsRef.current < totalPracticeTrialsRef.current
                ) {
                  setIsRunning(false);
                  isClickableRef.current = false;
                  clickedBallsRef.current.clear();
                  highlightedBallsRef.current = [];

                  setTimeout(() => {
                    setGameStarted(true);
                  }, 1000);
                } else {
                  handlePracticeComplete(); // Show practice complete dialog
                }
              } else {
                trialsRef.current += 1;

                if (trialsRef.current < totalTrialsRef.current) {
                  setIsRunning(false);
                  isClickableRef.current = false;
                  clickedBallsRef.current.clear();
                  highlightedBallsRef.current = [];

                  setTimeout(() => {
                    setGameStarted(true);
                  }, 1000);
                } else {
                  handleGameComplete();
                  trialsRef.current = 0;

                  setIsRunning(false);
                  isClickableRef.current = false;
                  clickedBallsRef.current.clear();
                  highlightedBallsRef.current = [];
                }
              }
            }
          }, 500);
        }
      });
    }

    canvas.addEventListener("click", handleClick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      end(timerId);
    };
  }, [isRunning, vts]);

  return (
    <div className="bg-game-background h-screen w-screen flex flex-col items-center justify-center">
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${
          gameStarted ? "" : "hidden"
        }`}
      >
        {gameStarted && (
          <Countdown
            onComplete={() => {
              setTimeout(() => {
                setGameStarted(false);
                setIsRunning(true);
              }, 1000);
            }}
          />
        )}
      </div>
      <canvas ref={canvasRef} className="block" />
      <div
        className={`absolute top-10 right-10 text-white text-2xl ${
          !isRunning ? "" : "hidden"
        }`}
      >
        {isPracticeRef.current
          ? `Practice Trial: ${practiceTrialsRef.current}/${totalPracticeTrialsRef.current}`
          : `Trial: ${trialsRef.current}/${totalTrialsRef.current}`}
      </div>
      <div className="absolute top-3 left-3 text-white flex items-center">
        <MOTDialog startGame={() => setGameStarted(true)} />
        <ThankYouDialog
          showThankYou={showThankYou}
          setShowThankYou={setShowThankYou}
          dataRef={dataRef}
          submit={submit}
        />
        <PracticeCompleteDialog
          showPracticeComplete={showPracticeComplete}
          setShowPracticeComplete={setShowPracticeComplete}
          startActualGame={startActualGame}
        />
        <ResultsDialog
          showResults={showResults}
          setShowResults={setShowResults}
          scores={dataRef.current.scores}
          practiceRounds={practiceTrialsRef.current}
          vts={dataRef.current.vts}
        />
      </div>
    </div>
  );
};

export default MOT;

"use client";
import React, { useRef, useEffect, useState } from "react";
import { Ball, createBalls, drawBall } from "./Ball";
import { resolveCollisions, resolveCollisionsWithWalls } from "./collision";
import { calculateScore } from "./scoring";
import { MOTDialog, ThankYouDialog } from "./MOTDialog";
import Navbar from "../Navbar";
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
  const totalTrialsRef = useRef<number>(10);
  const durationRef = useRef<number>(10);
  const ballRadiusRef = useRef<number>(70);
  const dataRef = useRef<Data>({
    timeOfData: Date.now(),
    vts: 5,
    scores: [],
    age: 0,
    yearsPlayingFootball: 0,
    timeToClicks: [],
    email: "",
    screenWidth: 0,
    screenHeight: 0,
    ballSize: ballRadiusRef.current,
    duration: durationRef.current,
  });
  const gameEndTimeRef = useRef<number>(0);

  const [vts, setVts] = useState<number>(5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showUI, setShowUI] = useState<boolean>(true);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const submit = async () => {
    dataRef.current.vts = vts;
    const data = dataRef.current;
    insertMOTData(data);
  };

  const begin = (canvas: HTMLCanvasElement) => {
    let currentSpeed = 0.01;
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
    setShowUI(true);
  };

  useEffect(() => {
    if (!isRunning) return;
    setShowUI(false);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let { currentSpeed, balls } = begin(canvas);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
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
          ball.color = "green";
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
                setShowUI(true);
                trialsRef.current = 0;

                setIsRunning(false);
                isClickableRef.current = false;
                clickedBallsRef.current.clear();
                highlightedBallsRef.current = [];
                setVts(7);
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
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
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
      <div className={`absolute top-0 h-max ${showUI ? "" : "hidden"}`}>
        <Navbar />
      </div>
      <div
        className={`absolute top-10 right-10 text-white text-2xl ${
          !isRunning ? "" : "hidden"
        }`}
      >
        Trial: {trialsRef.current}/{totalTrialsRef.current}
      </div>
      <div className="absolute top-3 left-3 text-white flex items-center">
        <MOTDialog startGame={() => setGameStarted(true)} />
        <ThankYouDialog
          showThankYou={showThankYou}
          setShowThankYou={setShowThankYou}
          dataRef={dataRef}
          submit={submit}
        />
      </div>
    </div>
  );
};

export default MOT;

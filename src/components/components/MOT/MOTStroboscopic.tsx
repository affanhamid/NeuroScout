"use client";
import React, { useRef, useState } from "react";
import {
  StrobeBall,
  createStrobeBalls,
  HIGHLIGHT_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls,
} from "../games/Ball";

import { Data, insertMOTData } from "@/database/MOT";
import { MOTCalculateScore } from "../games/scoring";
import { instructions, formFields } from "./metaData";
import Game from "../games/Game/Game";
import { useSession } from "next-auth/react";

interface Params {
  vts: number;
}

const MOTStroboscopicGame = ({
  strobeA,
  strobeB,
  isRandom,
}: {
  strobeA: number;
  strobeB: number;
  isRandom: boolean;
}) => {
  const highlightedBallsRef = useRef<number[]>([]);
  const actualBallsRef = useRef<number[]>([]);
  const clickedBallsRef = useRef<Set<number>>(new Set());
  const wrongBallsRef = useRef<number[]>([]);
  const correctBallsRef = useRef<number[]>([]);
  const isClickableRef = useRef<boolean>(false);
  const durationRef = useRef<number>(10);
  const ballRadiusRef = useRef<number>(70);
  const startingVtsRef = useRef<number>(3);
  const gameEndTimeRef = useRef<number>(0);
  const totalPracticeTrialsRef = useRef<number>(2);
  const totalTrialsRef = useRef<number>(6);
  const dataRef = useRef<Data>({
    timeOfData: Date.now(),
    params: { vts: startingVtsRef.current },
    scores: [],
    age: 0,
    highestLevel: "",
    timeToClicks: [],
    email: "",
    screenWidth: 0,
    screenHeight: 0,
    ballSize: 0,
    duration: durationRef.current,
    practiceRounds: totalPracticeTrialsRef.current,
    trialRounds: totalTrialsRef.current,
    isStrobe: true,
    strobeA: strobeA,
    strobeB: strobeB,
  });
  const { data: session } = useSession();
  const [vts, setVts] = useState(startingVtsRef.current);

  const setup = (canvas: HTMLCanvasElement) => {
    let currentSpeed = 0.01;
    if (window.innerWidth < 768) {
      ballRadiusRef.current = 40;
    } else if (window.innerWidth < 1024) {
      ballRadiusRef.current = 50;
    } else if (window.innerWidth < 1440) {
      ballRadiusRef.current = 50;
    } else {
      ballRadiusRef.current = 60;
    }
    dataRef.current.ballSize = ballRadiusRef.current;
    const balls = createStrobeBalls(
      canvas,
      ballRadiusRef.current,
      8,
      strobeA,
      strobeB,
      isRandom,
      true
    );

    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < 4) {
      uniqueIndices.add(Math.floor(Math.random() * balls.length));
    }
    highlightedBallsRef.current = Array.from(uniqueIndices);
    actualBallsRef.current = highlightedBallsRef.current;

    return { currentSpeed, balls };
  };

  const update = (
    balls: StrobeBall[],
    currentSpeed: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    resolveCollisionsWithWalls(balls, currentSpeed, canvas);
    resolveCollisions(balls, currentSpeed);

    balls.forEach((ball, index) =>
      ball.drawBall(
        ball,
        highlightedBallsRef.current.includes(index),
        ctx,
        wrongBallsRef.current && wrongBallsRef.current.includes(index),
        correctBallsRef.current && correctBallsRef.current.includes(index)
      )
    );
  };

  const calculateScore = (
    selected: number[],
    actual: number[]
  ): { score: number; wrongBalls: number[]; correctBalls: number[] } => {
    let score = 0;
    const wrongBalls: number[] = [];
    const correctBalls: number[] = [];
    selected.forEach((selectedBall) => {
      if (actual.includes(selectedBall)) {
        score++;
        correctBalls.push(selectedBall);
      } else {
        wrongBalls.push(selectedBall);
      }
    });
    return { score: score, wrongBalls: wrongBalls, correctBalls: correctBalls };
  };

  const render = (
    canvas: HTMLCanvasElement,
    animationFrameIdRef: React.MutableRefObject<number | null>,
    setTrial: React.Dispatch<React.SetStateAction<number>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
    trial: number,
    isPractice: boolean
  ) => {
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let { currentSpeed, balls } = setup(canvas);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1B1B1B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      update(balls, currentSpeed, canvas, ctx);

      animationFrameIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
      currentSpeed = vts;
      highlightedBallsRef.current = [];
    }, 1000);

    const timerId = setTimeout(() => {
      if (animationFrameIdRef.current) {
        currentSpeed = 0;
      }
      isClickableRef.current = true;
      gameEndTimeRef.current = Date.now();
      balls.forEach((ball) => ball.reset());
    }, durationRef.current * 1000);

    const handleClick = (event: MouseEvent) => {
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
          clickedBallsRef.current.add(index);
          dataRef.current.timeToClicks.push(
            Date.now() - gameEndTimeRef.current
          );

          if (clickedBallsRef.current.size === 4) {
            canvas.removeEventListener("click", handleClick);

            const { score, wrongBalls, correctBalls } = calculateScore(
              Array.from(clickedBallsRef.current),
              actualBallsRef.current
            );

            wrongBallsRef.current = wrongBalls;
            correctBallsRef.current = correctBalls;

            setTimeout(() => {
              update(balls, currentSpeed, canvas, ctx);
            }, 10);

            if (score === 4) {
              setVts((vts) => vts + 1);
            } else {
              if (vts > 2) {
                setVts((vts) => vts - 1);
              }
            }
            dataRef.current.scores.push(score);
            isClickableRef.current = false;
            clickedBallsRef.current.clear();
            highlightedBallsRef.current = [];

            setTimeout(() => {
              wrongBallsRef.current = [];
              correctBallsRef.current = [];
              setTimeout(() => {
                setTrial((value) => value + 1);

                if (isPractice && trial + 1 >= dataRef.current.practiceRounds) {
                  setVts(startingVtsRef.current);
                }
                setIsRunning(false);
              }, 500);
            }, 1000);
          }
        }
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      clearTimeout(timerId);
    };
  };

  const submitData = async (formData: Record<string, any>) => {
    dataRef.current.age = parseInt(formData.age);
    dataRef.current.highestLevel = formData.highestLevel;
    dataRef.current.email = session?.user?.email as string;
    dataRef.current.screenWidth = window.innerWidth;
    dataRef.current.screenHeight = window.innerHeight;
    dataRef.current.params.vts = vts;
    insertMOTData(dataRef.current);
  };

  return (
    <div>
      <Game<Data, Params>
        submitData={submitData}
        instructions={instructions}
        formFields={formFields}
        calculateScores={MOTCalculateScore}
        render={render}
        dataRef={dataRef}
      />
    </div>
  );
};

export default MOTStroboscopicGame;

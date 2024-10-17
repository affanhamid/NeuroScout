"use client";
import React, { useRef, useState } from "react";
import {
  Ball,
  createBalls,
  createBall,
  HIGHLIGHT_COLOR,
  resolveCollisions,
  resolveCollisionsWithWalls,
} from "../games/Ball";

import { Data, insertAnticipationData } from "@/database/Anticipation";
import { instructions, formFields } from "./metaData";
import Game from "../games/Game/Game";
import { useSession } from "next-auth/react";

interface Params {
  vts: number;
}

const AnticipationGame = () => {
  const isClickableRef = useRef<boolean>(false);
  const durationRef = useRef<number>(5);
  const ballRadiusRef = useRef<number>(70);
  const gameEndTimeRef = useRef<number>(0);
  const totalPracticeTrialsRef = useRef<number>(2);
  const totalTrialsRef = useRef<number>(6);
  const targetBallRef = useRef<number>(0);
  const startingVtsRef = useRef<number>(15);
  const isHiddenRef = useRef<boolean>(false);
  const dataRef = useRef({
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
  });

  const [vts, setVts] = useState(startingVtsRef.current);
  const showResultsRef = useRef<boolean>(false);
  const displayMessageRef = useRef<boolean>(false);
  const { data: session } = useSession();

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
    showResultsRef.current = false;
    const balls = createBalls(canvas, ballRadiusRef.current, 15);

    const randomIndex = Math.floor(Math.random() * balls.length);
    targetBallRef.current = randomIndex;

    return { currentSpeed, balls };
  };
  const drawBall = (
    ball: Ball,
    ctx: CanvasRenderingContext2D,
    isHighlighted: boolean,
    isHidden: boolean,
    index: number
  ): void => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle =
      isHidden && ball ? "#1B1B1B" : isHighlighted ? "#007FFF" : ball.color;
    ctx.fill();
    ctx.closePath();

    // Set the font size based on the ball radius
    ctx.font = `${ball.radius}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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
      drawBall(
        ball,
        ctx,
        targetBallRef.current === index,
        isHiddenRef.current,
        index
      )
    );
  };

  function drawLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath(); // Close the path
  }

  const render = (
    canvas: HTMLCanvasElement,
    animationFrameIdRef: React.MutableRefObject<number | null>,
    setTrial: React.Dispatch<React.SetStateAction<number>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let { currentSpeed, balls } = setup(canvas);
    let distance = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1B1B1B"; // Game background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      update(balls, currentSpeed, canvas, ctx);

      if (displayMessageRef.current) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Where is the ball?", canvas.width / 2, canvas.height / 2);
      }

      if (showResultsRef.current) {
        drawLine(
          ctx,
          mouseX,
          mouseY,
          balls[targetBallRef.current].x,
          balls[targetBallRef.current].y
        );

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          `Distance: ${Math.round(distance)}px`,
          canvas.width / 2,
          50
        );
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
      currentSpeed = dataRef.current.params.vts;
    }, 1000);

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const timerId = setTimeout(() => {
      if (animationFrameIdRef.current) {
        currentSpeed = 0;
      }
      isClickableRef.current = true;
      gameEndTimeRef.current = Date.now();

      displayMessageRef.current = true;

      isHiddenRef.current = true;

      canvas.addEventListener("mousemove", onMouseMove);

      setTimeout(() => {
        cancelAnimationFrame(animationFrameIdRef.current!);
      }, 2000);
    }, durationRef.current * 1000);

    const handleClick = (event: MouseEvent) => {
      if (!isClickableRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const ball = balls[targetBallRef.current];
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      distance = Math.sqrt(dx * dx + dy * dy);

      canvas.removeEventListener("mousemove", onMouseMove);

      canvas.removeEventListener("click", handleClick);

      isHiddenRef.current = false;
      showResultsRef.current = true;
      displayMessageRef.current = false;

      setTimeout(() => {
        setTrial((value) => value + 1);
        setIsRunning(false);
      }, 2000);
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
    console.log(dataRef.current);
  };

  return (
    <div>
      <Game<Data, Params>
        submitData={submitData}
        instructions={instructions}
        formFields={formFields}
        calculateScores={(scores, params, practiceRounds) => {
          return {
            currentScore: 0,
            perfectScore: 0,
          };
        }}
        render={render}
        dataRef={dataRef}
      />
    </div>
  );
};

export default AnticipationGame;

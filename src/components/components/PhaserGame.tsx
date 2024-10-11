"use client";
import React, { useEffect, useRef } from "react";
import * as Phaser from "phaser";

// Create a custom scene class
class MyScene extends Phaser.Scene {
  balls!: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: "MyScene" });
  }
  createWalls() {
    const width = this.scale.width;
    const height = this.scale.height;
    const thickness = 50; // Adjust as needed

    // Left wall
    this.matter.add.rectangle(-thickness / 2, height / 2, thickness, height, {
      isStatic: true,
      label: "wall",
    });

    // Right wall
    this.matter.add.rectangle(
      width + thickness / 2,
      height / 2,
      thickness,
      height,
      {
        isStatic: true,
        label: "wall",
      }
    );

    // Top wall
    this.matter.add.rectangle(width / 2, -thickness / 2, width, thickness, {
      isStatic: true,
      label: "wall",
    });

    // Bottom wall
    this.matter.add.rectangle(
      width / 2,
      height + thickness / 2,
      width,
      thickness,
      {
        isStatic: true,
        label: "wall",
      }
    );
  }

  create = function (this: MyScene) {
    const width = this.scale.width;
    const height = this.scale.height;
    const speed = 5; // Desired constant speed
    const ballRadius = 50;

    // Enable Matter.js physics with bounds
    this.matter.world.setBounds(0, 0, width, height);

    // Store references to the balls for easy access in the update function
    this.balls = [];

    // Define 8 regions of the screen
    const regions = [
      { x: width * 0.25, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.25 },
      { x: width * 0.25, y: height * 0.5 },
      { x: width * 0.75, y: height * 0.5 },
      { x: width * 0.25, y: height * 0.75 },
      { x: width * 0.75, y: height * 0.75 },
      { x: width * 0.5, y: height * 0.25 },
      { x: width * 0.5, y: height * 0.75 },
    ];

    // Create a ball in each region with some randomness in their positions
    regions.forEach((region) => {
      const randomX = Phaser.Math.Between(-50, 50);
      const randomY = Phaser.Math.Between(-50, 50);

      // Draw the ball using Phaser graphics
      const graphics = this.add.graphics({ fillStyle: { color: 0xffff00 } });
      graphics.fillCircle(ballRadius, ballRadius, ballRadius);
      graphics.generateTexture("ballTexture", ballRadius * 2, ballRadius * 2);
      graphics.destroy();

      // Create the ball as a Phaser image using the generated texture
      const ball = this.matter.add.image(
        region.x + randomX,
        region.y + randomY,
        "ballTexture",
        undefined,
        {
          shape: { type: "circle", radius: ballRadius },
          restitution: 1,
          friction: 0,
          frictionStatic: 0,
          frictionAir: 0,
          inertia: Infinity,
          sleepThreshold: 0,
          label: "ball",
        }
      );

      // Adjust the display size to match the physics body
      ball.setDisplaySize(ballRadius * 2, ballRadius * 2);

      // Set initial velocity for the ball in a random direction
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      ball.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

      // Store the ball for use in the update loop
      this.balls.push(ball);
    });

    this.createWalls();
    this.matter.world.createDebugGraphic();

    // Event listener to maintain constant speed after collisions
    this.matter.world.on("collisionstart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        [bodyA, bodyB].forEach((body) => {
          if (body.label === "ball") {
            const velocity = body.velocity;
            const currentSpeed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
            const desiredSpeed = 5; // Your desired constant speed
            const scale = desiredSpeed / currentSpeed;

            // Use Phaser's Matter alias to set the velocity
            this.matter.body.setVelocity(body, {
              x: velocity.x * scale,
              y: velocity.y * scale,
            });
          }
        });
      });
    });
  };

  update = function (this: MyScene) {};
}

const PhaserGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const phaserContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadPhaser = async () => {
      if (!phaserContainerRef.current) return;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: "matter", // Use Matter.js instead of 'arcade'
          matter: {
            gravity: { x: 0, y: 0 },
          },
        },
        scene: MyScene,
        parent: phaserContainerRef.current,
      };

      // Handle HMR by checking if a Phaser instance already exists
      if (process.env.NODE_ENV === "development") {
        if (!window.__PHASER_GAME__) {
          window.__PHASER_GAME__ = new Phaser.Game(config);
          gameRef.current = window.__PHASER_GAME__;
        } else {
          gameRef.current = window.__PHASER_GAME__;
        }
      } else {
        gameRef.current = new Phaser.Game(config);
      }
    };

    loadPhaser();

    // Clean up to destroy the Phaser instance on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
        if (process.env.NODE_ENV === "development") {
          window.__PHASER_GAME__ = null;
        }
      }
    };
  }, []);

  return (
    <div ref={phaserContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default PhaserGame;

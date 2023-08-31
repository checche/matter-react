/** https://paulie.dev/posts/2020/08/react-hooks-and-matter-js/ */
import Matter from 'matter-js';
import { useEffect, useRef } from 'react';

export const MatterStepOne = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    const engine = Engine.create({});

    const render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 300,
        height: 300,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false
      }
    });

    const floor = Bodies.rectangle(150, 300, 300, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue'
      }
    });

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow'
      }
    });

    World.add(engine.world, [floor, ball]);

    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: 300,
        height: 300
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

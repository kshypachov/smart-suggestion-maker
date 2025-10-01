import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle";
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const AnimatedGeometricBackground = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      const shapeTypes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
      
      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 40,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
          rotation: Math.random() * 360,
        });
      }
      
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape: Shape) => {
    const baseClasses = "absolute opacity-10 dark:opacity-5";
    const animationStyle = {
      animation: `float-${shape.id} ${shape.duration}s ease-in-out infinite`,
      animationDelay: `${shape.delay}s`,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `rotate(${shape.rotation}deg)`,
    };

    switch (shape.type) {
      case "circle":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full bg-primary`}
            style={animationStyle}
          />
        );
      case "square":
        return (
          <div
            key={shape.id}
            className={`${baseClasses} bg-secondary`}
            style={animationStyle}
          />
        );
      case "triangle":
        return (
          <div
            key={shape.id}
            className={`${baseClasses}`}
            style={{
              ...animationStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid hsl(var(--accent))`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {shapes.map((shape) => renderShape(shape))}
      </div>
      
      <style>
        {shapes.map((shape) => `
          @keyframes float-${shape.id} {
            0%, 100% {
              transform: translate(0, 0) rotate(${shape.rotation}deg);
            }
            25% {
              transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(${shape.rotation + 90}deg);
            }
            50% {
              transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) rotate(${shape.rotation + 180}deg);
            }
            75% {
              transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(${shape.rotation + 270}deg);
            }
          }
        `).join('\n')}
      </style>
    </>
  );
};

export default AnimatedGeometricBackground;

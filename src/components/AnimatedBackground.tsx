import { useEffect, useState, useRef } from "react";

interface AnimatedBackgroundProps {
  onFocus?: 'username' | 'password' | null;
  hasError?: boolean;
}

interface Creature {
  id: number;
  x: number;
  y: number;
  size: number;
}

const AnimatedBackground = ({ onFocus, hasError }: AnimatedBackgroundProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [creatures] = useState<Creature[]>([
    { id: 1, x: 15, y: 20, size: 60 },
    { id: 2, x: 85, y: 15, size: 50 },
    { id: 3, x: 10, y: 70, size: 55 },
    { id: 4, x: 88, y: 75, size: 65 },
    { id: 5, x: 50, y: 10, size: 45 },
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateEyePosition = (creatureX: number, creatureY: number) => {
    const creatureScreenX = (window.innerWidth * creatureX) / 100;
    const creatureScreenY = (window.innerHeight * creatureY) / 100;
    
    const angle = Math.atan2(
      mousePos.y - creatureScreenY,
      mousePos.x - creatureScreenX
    );
    
    const distance = 8;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  const getCreatureExpression = () => {
    if (hasError) return "scared";
    if (onFocus === "password") return "curious";
    if (onFocus === "username") return "excited";
    return "normal";
  };

  const expression = getCreatureExpression();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {creatures.map((creature) => {
        const eyePos = calculateEyePosition(creature.x, creature.y);
        
        return (
          <div
            key={creature.id}
            className="absolute transition-transform duration-300"
            style={{
              left: `${creature.x}%`,
              top: `${creature.y}%`,
              transform: `translate(-50%, -50%) scale(${
                expression === "scared" ? 0.85 : expression === "excited" ? 1.1 : 1
              })`,
            }}
          >
            {/* Body */}
            <div
              className={`rounded-full transition-all duration-500 ${
                expression === "scared"
                  ? "bg-destructive/20"
                  : expression === "excited"
                  ? "bg-primary/20"
                  : expression === "curious"
                  ? "bg-accent/20"
                  : "bg-muted/30"
              }`}
              style={{
                width: creature.size,
                height: creature.size,
                animation: `float ${3 + creature.id * 0.5}s ease-in-out infinite`,
              }}
            >
              {/* Eyes container */}
              <div className="relative w-full h-full flex items-center justify-center gap-2">
                {/* Left Eye */}
                <div className="relative w-4 h-4 bg-background rounded-full shadow-inner">
                  <div
                    className="absolute w-2 h-2 bg-foreground rounded-full top-1/2 left-1/2 transition-all duration-200"
                    style={{
                      transform: `translate(calc(-50% + ${eyePos.x}px), calc(-50% + ${eyePos.y}px))`,
                    }}
                  />
                </div>
                
                {/* Right Eye */}
                <div className="relative w-4 h-4 bg-background rounded-full shadow-inner">
                  <div
                    className="absolute w-2 h-2 bg-foreground rounded-full top-1/2 left-1/2 transition-all duration-200"
                    style={{
                      transform: `translate(calc(-50% + ${eyePos.x}px), calc(-50% + ${eyePos.y}px))`,
                    }}
                  />
                </div>
              </div>

              {/* Mouth */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                {expression === "scared" && (
                  <div className="w-4 h-4 border-2 border-destructive rounded-full" />
                )}
                {expression === "excited" && (
                  <div className="w-5 h-2 border-b-2 border-primary rounded-b-full" />
                )}
                {expression === "curious" && (
                  <div className="w-3 h-3 bg-accent/50 rounded-full" />
                )}
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;

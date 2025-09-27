import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Power, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelayCardProps {
  id: number;
  name: string;
  isActive: boolean;
  onToggle: (id: number, state: boolean) => void;
}

const RelayCard = ({ id, name, isActive, onToggle }: RelayCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onToggle(id, checked);
      setIsLoading(false);
    }, 300);
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      isActive ? "border-success" : "border-muted"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-full",
              isActive ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
            )}>
              {isActive ? <Zap className="h-4 w-4" /> : <Power className="h-4 w-4" />}
            </div>
            <span className="text-lg font-semibold">{name}</span>
          </div>
          <Badge variant={isActive ? "default" : "secondary"} className={cn(
            isActive ? "bg-success text-success-foreground" : ""
          )}>
            {isActive ? "ВКЛ" : "ВЫКЛ"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full transition-colors",
              isActive ? "bg-success animate-pulse" : "bg-muted-foreground"
            )}></div>
            <span className="text-sm text-muted-foreground">
              Статус: {isActive ? "Активно" : "Неактивно"}
            </span>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={handleToggle}
            disabled={isLoading}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RelayCard;
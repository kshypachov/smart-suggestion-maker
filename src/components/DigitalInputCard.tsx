import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignalHigh, SignalLow } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface DigitalInputCardProps {
  id: number;
  name: string;
  isActive: boolean;
}

const DigitalInputCard = ({ id, name, isActive }: DigitalInputCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className={cn(
      "transition-all duration-200",
      isActive ? "border-success" : "border-muted"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-full",
              isActive ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
            )}>
              {isActive ? <SignalHigh className="h-4 w-4" /> : <SignalLow className="h-4 w-4" />}
            </div>
            <span className="text-lg font-semibold">{name}</span>
          </div>
          <Badge variant={isActive ? "default" : "secondary"} className={cn(
            isActive ? "bg-success text-success-foreground" : ""
          )}>
            {isActive ? t('active') : t('inactive')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full transition-colors",
            isActive ? "bg-success animate-pulse" : "bg-muted-foreground"
          )}></div>
          <span className="text-sm text-muted-foreground">
            {t('system_status')}: {isActive ? t('active') : t('inactive')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalInputCard;

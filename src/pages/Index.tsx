import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RelayCard from "@/components/RelayCard";
import { Settings, Wifi, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RelayState {
  id: number;
  name: string;
  isActive: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [mqttConnected, setMqttConnected] = useState(true);
  const [relays, setRelays] = useState<RelayState[]>([
    { id: 1, name: "Реле 1", isActive: false },
    { id: 2, name: "Реле 2", isActive: true },
    { id: 3, name: "Реле 3", isActive: false },
  ]);

  const handleRelayToggle = (id: number, state: boolean) => {
    setRelays(prev => prev.map(relay => 
      relay.id === id ? { ...relay, isActive: state } : relay
    ));
    
    toast({
      title: `Реле ${id} ${state ? 'включено' : 'выключено'}`,
      description: `Команда отправлена на устройство`,
    });
  };

  const activeCount = relays.filter(relay => relay.isActive).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
            <p className="text-muted-foreground mt-1">Управление embedded устройством</p>
          </div>
          <Link to="/settings">
            <Button variant="outline" size="lg" className="gap-2">
              <Settings className="h-4 w-4" />
              Настройки
            </Button>
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {mqttConnected ? (
                  <>
                    <Wifi className="h-4 w-4 text-success" />
                    MQTT Соединение
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-destructive" />
                    MQTT Соединение
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant={mqttConnected ? "default" : "destructive"} className={
                mqttConnected ? "bg-success text-success-foreground" : ""
              }>
                {mqttConnected ? "Подключено" : "Отключено"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Активные реле</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{activeCount}</div>
              <p className="text-xs text-muted-foreground">из {relays.length} реле</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Состояние системы</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="default" className="bg-success text-success-foreground">
                Готова к работе
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Relay Controls */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Управление реле</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relays.map((relay) => (
              <RelayCard
                key={relay.id}
                id={relay.id}
                name={relay.name}
                isActive={relay.isActive}
                onToggle={handleRelayToggle}
              />
            ))}
          </div>
        </div>

        {/* Device Info */}
        <Card>
          <CardHeader>
            <CardTitle>Информация об устройстве</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Версия прошивки</h4>
                <p className="text-foreground">v1.2.3</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Время работы</h4>
                <p className="text-foreground">2д 14ч 32м</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">IP адрес</h4>
                <p className="text-foreground">192.168.1.100</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">MAC адрес</h4>
                <p className="text-foreground">AA:BB:CC:DD:EE:FF</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

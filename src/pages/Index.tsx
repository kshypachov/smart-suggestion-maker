import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RelayCard from "@/components/RelayCard";
import EnergyMonitor from "@/components/EnergyMonitor";
import { Settings, Wifi, WifiOff, LogOut, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

interface RelayState {
  id: number;
  name: string;
  isActive: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [mqttConnected, setMqttConnected] = useState(true);
  const [relays, setRelays] = useState<RelayState[]>([
    { id: 1, name: `${t('relay')} 1`, isActive: false },
    { id: 2, name: `${t('relay')} 2`, isActive: true },
    { id: 3, name: `${t('relay')} 3`, isActive: false },
  ]);

  const handleRelayToggle = (id: number, state: boolean) => {
    setRelays(prev => prev.map(relay => 
      relay.id === id ? { ...relay, isActive: state } : relay
    ));
    
    toast({
      title: `${t('relay')} ${id} ${state ? t('turned_on') : t('turned_off')}`,
      description: t('command_sent'),
    });
  };

  const activeCount = relays.filter(relay => relay.isActive).length;

  const handleLogout = () => {
    toast({
      title: t('logout'),
      description: t('command_sent'),
    });
    // Здесь можно добавить логику выхода из системы
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('dashboard')}</h1>
            <p className="text-muted-foreground mt-1">{t('device_control')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" className="gap-2" onClick={toggleLanguage}>
              <Languages className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
            <Link to="/settings">
              <Button variant="outline" size="lg" className="gap-2">
                <Settings className="h-4 w-4" />
                {t('settings')}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {mqttConnected ? (
                  <>
                    <Wifi className="h-4 w-4 text-success" />
                    {t('mqtt_connection')}
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-destructive" />
                    {t('mqtt_connection')}
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant={mqttConnected ? "default" : "destructive"} className={
                mqttConnected ? "bg-success text-success-foreground" : ""
              }>
                {mqttConnected ? t('connected') : t('disconnected')}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('active_relays')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{activeCount}</div>
              <p className="text-xs text-muted-foreground">{t('of')} {relays.length} {t('relays')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('system_status')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="default" className="bg-success text-success-foreground">
                {t('ready')}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Relay Controls */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">{t('relay_control')}</h2>
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

        {/* Energy Monitoring */}
        <EnergyMonitor />

        {/* Device Info */}
        <Card>
          <CardHeader>
            <CardTitle>{t('device_info')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">{t('firmware_version')}</h4>
                <p className="text-foreground">v1.2.3</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">{t('uptime')}</h4>
                <p className="text-foreground">2{t('days')} 14{t('hours')} 32{t('minutes')}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">{t('ip_address')}</h4>
                <p className="text-foreground">192.168.1.100</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">{t('mac_address')}</h4>
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

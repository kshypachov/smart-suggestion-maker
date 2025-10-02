import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown, ChevronUp, Zap, Activity, TrendingUp, Power, RotateCcw, BatteryCharging } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface EnergyData {
  voltage: number;
  current: number;
  powerFactor: number;
  activePower: number;
  reactivePower: number;
  accumulatedEnergy: number;
}

interface ChartData {
  time: string;
  value: number;
}

const EnergyMonitor = () => {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  // Mock data для текущих значений
  const currentData: EnergyData = {
    voltage: 230.5,
    current: 2.3,
    powerFactor: 0.92,
    activePower: 529.15,
    reactivePower: 213.8,
    accumulatedEnergy: 1247.6
  };

  // Mock data для графиков
  const generateChartData = (baseValue: number, variance: number): ChartData[] => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: `${String(i + 1).padStart(2, '0')}:00`,
      value: Math.max(0, baseValue + (Math.random() - 0.5) * variance)
    }));
  };

  // Функция для вычисления масштабированного домена
  const getScaleDomain = (data: ChartData[]): [number, number] => {
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Вычисляем диапазон так, чтобы среднее значение было по центру
    const maxDeviation = Math.max(max - avg, avg - min);
    const domainMin = Math.max(0, avg - maxDeviation * 1.2);
    const domainMax = avg + maxDeviation * 1.2;
    
    return [domainMin, domainMax];
  };

  const chartData = {
    voltage: generateChartData(230, 10),
    current: generateChartData(2.3, 0.5),
    powerFactor: generateChartData(0.92, 0.1),
    activePower: generateChartData(529, 100),
    reactivePower: generateChartData(213, 50),
    accumulatedEnergy: generateChartData(1247, 10)
  };

  const energyParams = [
    {
      id: "voltage",
      title: t('voltage'),
      value: `${currentData.voltage.toFixed(1)} ${t('volts')}`,
      icon: Zap,
      color: "hsl(var(--chart-1))",
      data: chartData.voltage
    },
    {
      id: "current",
      title: t('current'),
      value: `${currentData.current.toFixed(2)} ${t('amperes')}`,
      icon: Activity,
      color: "hsl(var(--chart-2))",
      data: chartData.current
    },
    {
      id: "powerFactor",
      title: t('power_factor'),
      value: `${currentData.powerFactor.toFixed(2)}`,
      icon: TrendingUp,
      color: "hsl(var(--chart-3))",
      data: chartData.powerFactor
    },
    {
      id: "activePower",
      title: t('active_power'),
      value: `${currentData.activePower.toFixed(1)} ${t('watts')}`,
      icon: Power,
      color: "hsl(var(--chart-4))",
      data: chartData.activePower
    },
    {
      id: "reactivePower",
      title: t('reactive_power'),
      value: `${currentData.reactivePower.toFixed(1)} ${t('vars')}`,
      icon: RotateCcw,
      color: "hsl(var(--chart-5))",
      data: chartData.reactivePower
    },
    {
      id: "accumulatedEnergy",
      title: t('accumulated_energy'),
      value: `${currentData.accumulatedEnergy.toFixed(1)} ${t('kwh')}`,
      icon: BatteryCharging,
      color: "hsl(var(--primary))",
      data: chartData.accumulatedEnergy
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItem(prev => prev === itemId ? null : itemId);
  };

  const openParam = energyParams.find(param => param.id === openItem);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">{t('energy_monitoring')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {energyParams.map((param) => {
          const Icon = param.icon;
          const isOpen = openItem === param.id;
          
          return (
            <Card 
              key={param.id}
              className={`relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer ${
                isOpen ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => toggleItem(param.id)}
            >
              {/* Background mini chart */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={param.data}>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={getScaleDomain(param.data)} hide />
                    <Bar dataKey="value" fill={param.color} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: param.color }} />
                    {param.title}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 relative z-10">
                <div className="text-2xl font-bold text-foreground">
                  {param.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Full-width expanded chart */}
      {openParam && (
        <div key={openParam.id} className="animate-fade-in">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <openParam.icon className="h-5 w-5" style={{ color: openParam.color }} />
                {openParam.title} - {t('detailed_chart')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={openParam.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      width={50}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelFormatter={(value) => `${t('time')}: ${value}`}
                    />
                    <Bar
                      dataKey="value" 
                      fill={openParam.color}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnergyMonitor;
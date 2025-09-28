import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, Zap, Activity, TrendingUp, Power, RotateCcw, BatteryCharging } from "lucide-react";

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
  const [openItems, setOpenItems] = useState<string[]>([]);
  
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
      title: "Напряжение сети",
      value: `${currentData.voltage.toFixed(1)} В`,
      icon: Zap,
      color: "hsl(var(--chart-1))",
      data: chartData.voltage
    },
    {
      id: "current",
      title: "Сила тока",
      value: `${currentData.current.toFixed(2)} А`,
      icon: Activity,
      color: "hsl(var(--chart-2))",
      data: chartData.current
    },
    {
      id: "powerFactor",
      title: "Коэффициент мощности",
      value: `${currentData.powerFactor.toFixed(2)}`,
      icon: TrendingUp,
      color: "hsl(var(--chart-3))",
      data: chartData.powerFactor
    },
    {
      id: "activePower",
      title: "Активная мощность",
      value: `${currentData.activePower.toFixed(1)} Вт`,
      icon: Power,
      color: "hsl(var(--chart-4))",
      data: chartData.activePower
    },
    {
      id: "reactivePower",
      title: "Реактивная мощность",
      value: `${currentData.reactivePower.toFixed(1)} ВАР`,
      icon: RotateCcw,
      color: "hsl(var(--chart-5))",
      data: chartData.reactivePower
    },
    {
      id: "accumulatedEnergy",
      title: "Накопленная энергия",
      value: `${currentData.accumulatedEnergy.toFixed(1)} кВт·ч`,
      icon: BatteryCharging,
      color: "hsl(var(--primary))",
      data: chartData.accumulatedEnergy
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const openParam = energyParams.find(param => openItems.includes(param.id));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Энергомониторинг</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {energyParams.map((param) => {
          const Icon = param.icon;
          const isOpen = openItems.includes(param.id);
          
          return (
            <Card 
              key={param.id}
              className="relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
              onClick={() => toggleItem(param.id)}
            >
              {/* Background mini chart */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={param.data}>
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
        <div className="animate-fade-in">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <openParam.icon className="h-5 w-5" style={{ color: openParam.color }} />
                {openParam.title} - Детальный график
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
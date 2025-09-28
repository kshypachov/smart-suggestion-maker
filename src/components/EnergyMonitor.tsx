import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
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
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      value: baseValue + (Math.random() - 0.5) * variance
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Энергомониторинг</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {energyParams.map((param) => {
          const Icon = param.icon;
          const isOpen = openItems.includes(param.id);
          
          return (
            <Collapsible
              key={param.id}
              open={isOpen}
              onOpenChange={() => toggleItem(param.id)}
            >
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-3">
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
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-foreground">
                      {param.value}
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="animate-accordion-down">
                  <CardContent className="pt-0">
                    <div className="h-32 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={param.data}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                          <XAxis 
                            dataKey="time" 
                            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                            interval="preserveStartEnd"
                          />
                          <YAxis 
                            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                            width={40}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={param.color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: param.color }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default EnergyMonitor;
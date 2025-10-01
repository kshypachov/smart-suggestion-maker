import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Trash2, 
  Download,
  ArrowLeft,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error";
  source: string;
  message: string;
}

const Logs = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | "info" | "warning" | "error">("all");
  
  // Mock data - в реальном приложении это будет приходить с устройства
  const [logs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2025-01-01 10:30:45",
      level: "info",
      source: "System",
      message: t('system_started')
    },
    {
      id: "2",
      timestamp: "2025-01-01 10:31:12",
      level: "info",
      source: "MQTT",
      message: t('mqtt_connected_broker')
    },
    {
      id: "3",
      timestamp: "2025-01-01 10:32:03",
      level: "warning",
      source: "Relay 2",
      message: t('relay_high_temperature')
    },
    {
      id: "4",
      timestamp: "2025-01-01 10:33:45",
      level: "info",
      source: "Digital Input 1",
      message: t('input_state_changed')
    },
    {
      id: "5",
      timestamp: "2025-01-01 10:35:22",
      level: "error",
      source: "Energy Monitor",
      message: t('voltage_out_of_range')
    },
    {
      id: "6",
      timestamp: "2025-01-01 10:36:15",
      level: "info",
      source: "Relay 1",
      message: t('relay_turned_on')
    },
    {
      id: "7",
      timestamp: "2025-01-01 10:37:48",
      level: "warning",
      source: "System",
      message: t('high_memory_usage')
    },
    {
      id: "8",
      timestamp: "2025-01-01 10:38:33",
      level: "info",
      source: "Relay 3",
      message: t('relay_turned_off')
    },
  ]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "info":
      default:
        return "bg-info text-info-foreground";
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesSearch = 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const levelCounts = {
    info: logs.filter(log => log.level === "info").length,
    warning: logs.filter(log => log.level === "warning").length,
    error: logs.filter(log => log.level === "error").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('device_logs')}</h1>
              <p className="text-muted-foreground mt-1">{t('view_system_logs')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              {t('export')}
            </Button>
            <Button variant="destructive" size="lg" className="gap-2">
              <Trash2 className="h-4 w-4" />
              {t('clear_logs')}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('total_logs')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{logs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-info" />
                {t('info')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{levelCounts.info}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                {t('warnings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{levelCounts.warning}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                {t('errors')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{levelCounts.error}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>{t('filters')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search_logs')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterLevel === "all" ? "default" : "outline"}
                  onClick={() => setFilterLevel("all")}
                >
                  {t('all')}
                </Button>
                <Button
                  variant={filterLevel === "info" ? "default" : "outline"}
                  onClick={() => setFilterLevel("info")}
                  className={filterLevel === "info" ? "bg-info text-info-foreground" : ""}
                >
                  {t('info')}
                </Button>
                <Button
                  variant={filterLevel === "warning" ? "default" : "outline"}
                  onClick={() => setFilterLevel("warning")}
                  className={filterLevel === "warning" ? "bg-warning text-warning-foreground" : ""}
                >
                  {t('warnings')}
                </Button>
                <Button
                  variant={filterLevel === "error" ? "default" : "outline"}
                  onClick={() => setFilterLevel("error")}
                  className={filterLevel === "error" ? "bg-destructive text-destructive-foreground" : ""}
                >
                  {t('errors')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t('log_entries')} ({filteredLogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">{t('timestamp')}</TableHead>
                    <TableHead className="w-[100px]">{t('level')}</TableHead>
                    <TableHead className="w-[150px]">{t('source')}</TableHead>
                    <TableHead>{t('message')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(log.level)}>
                          <span className="flex items-center gap-1">
                            {getLevelIcon(log.level)}
                            {t(log.level)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.source}
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logs;

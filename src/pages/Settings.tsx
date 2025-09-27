import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const mqttSchema = z.object({
  enabled: z.boolean(),
  hostname: z.string().min(1, "Hostname required"),
  port: z.number().min(1, "Port must be positive").max(65535, "Invalid port"),
  username: z.string(),
  password: z.string(),
});

const safetySchema = z.object({
  enabled: z.boolean(),
  relay1Default: z.boolean(),
  relay2Default: z.boolean(),
  relay3Default: z.boolean(),
});

const Settings = () => {
  const { toast } = useToast();
  
  const mqttForm = useForm<z.infer<typeof mqttSchema>>({
    resolver: zodResolver(mqttSchema),
    defaultValues: {
      enabled: true,
      hostname: "localhost",
      port: 1883,
      username: "",
      password: "",
    },
  });

  const safetyForm = useForm<z.infer<typeof safetySchema>>({
    resolver: zodResolver(safetySchema),
    defaultValues: {
      enabled: false,
      relay1Default: false,
      relay2Default: false,
      relay3Default: false,
    },
  });

  const onMqttSubmit = (values: z.infer<typeof mqttSchema>) => {
    console.log("MQTT settings:", values);
    toast({
      title: "MQTT настройки сохранены",
      description: "Настройки подключения к MQTT серверу обновлены",
    });
  };

  const onSafetySubmit = (values: z.infer<typeof safetySchema>) => {
    console.log("Safety settings:", values);
    toast({
      title: "Настройки безопасности сохранены",
      description: "Безопасные состояния реле обновлены",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* MQTT Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-info"></div>
                Настройки MQTT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...mqttForm}>
                <form onSubmit={mqttForm.handleSubmit(onMqttSubmit)} className="space-y-4">
                  <FormField
                    control={mqttForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Включить MQTT</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="hostname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя хоста</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="localhost" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Порт</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1883"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логин пользователя</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="username" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="password" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Сохранить MQTT настройки
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Safety Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                Безопасное состояние реле
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...safetyForm}>
                <form onSubmit={safetyForm.handleSubmit(onSafetySubmit)} className="space-y-4">
                  <FormField
                    control={safetyForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Включить функцию</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Дефолтные состояния реле:</Label>
                    
                    <FormField
                      control={safetyForm.control}
                      name="relay1Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Реле 1</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={safetyForm.control}
                      name="relay2Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Реле 2</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={safetyForm.control}
                      name="relay3Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Реле 3</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Сохранить настройки безопасности
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
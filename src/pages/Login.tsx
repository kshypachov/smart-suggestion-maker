import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(1, "Логин обязателен").max(50, "Логин не может быть длиннее 50 символов"),
  password: z.string().min(4, "Пароль должен содержать минимум 4 символа").max(100, "Пароль слишком длинный"),
});

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Имитация отправки данных на устройство
    setTimeout(() => {
      console.log("Login attempt:", values);
      toast({
        title: "Авторизация",
        description: "Данные отправлены на устройство для проверки",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header Card */}
        <Card className="animate-scale-in">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Авторизация
            </CardTitle>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Вход в панель управления embedded устройством
            </p>
          </CardHeader>
        </Card>

        {/* Login Form */}
        <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Данные для входа
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Логин
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Введите логин" 
                          {...field}
                          className="transition-all duration-300 focus:scale-[1.02]"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Пароль
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Введите пароль" 
                          {...field}
                          className="transition-all duration-300 focus:scale-[1.02]"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full animate-fade-in hover-scale transition-all duration-300" 
                  style={{ animationDelay: "0.6s" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Проверка...
                    </div>
                  ) : (
                    "Войти в систему"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Device Status */}
        <Card className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Устройство готово к авторизации
              </div>
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline story-link animate-fade-in inline-block" 
                style={{ animationDelay: "0.8s" }}
              >
                Вернуться на главную
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
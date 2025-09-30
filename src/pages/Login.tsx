import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Lock, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const loginSchema = z.object({
    username: z.string().min(1, t('login_username_required')).max(50, t('login_username_max')),
    password: z.string().min(4, t('login_password_min')).max(100, t('login_password_max')),
  });
  
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
        title: t('login_toast_title'),
        description: t('login_toast_description'),
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
              {t('login_title')}
            </CardTitle>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {t('login_subtitle')}
            </p>
          </CardHeader>
        </Card>

        {/* Login Form */}
        <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              {t('login_form_title')}
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
                        {t('login_username')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('login_username_placeholder')} 
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
                        {t('login_password')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t('login_password_placeholder')} 
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
                      {t('login_checking')}
                    </div>
                  ) : (
                    t('login_button')
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
                {t('login_device_ready')}
              </div>
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline story-link animate-fade-in inline-block" 
                style={{ animationDelay: "0.8s" }}
              >
                {t('login_back_home')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
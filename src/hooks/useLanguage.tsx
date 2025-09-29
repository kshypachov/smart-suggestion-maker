import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    'dashboard': 'Панель управления',
    'device_control': 'Управление embedded устройством',
    'settings': 'Настройки',
    'logout': 'Выход',
    
    // Settings page
    'mqtt_settings': 'Настройки MQTT',
    'safety_settings': 'Безопасное состояние реле',
    'enable_mqtt': 'Включить MQTT',
    'hostname': 'Имя хоста',
    'port': 'Порт',
    'username': 'Логин пользователя',
    'password': 'Пароль',
    'enable_tls': 'Включить TLS',
    'enable_cert_validation': 'Валидация сертификата сервера',
    'enable_function': 'Включить функцию',
    'default_relay_states': 'Дефолтные состояния реле',
    'save_mqtt_settings': 'Сохранить MQTT настройки',
    'save_safety_settings': 'Сохранить настройки безопасности',
    'mqtt_settings_saved': 'MQTT настройки сохранены',
    'mqtt_settings_updated': 'Настройки подключения к MQTT серверу обновлены',
    'safety_settings_saved': 'Настройки безопасности сохранены',
    'safety_settings_updated': 'Безопасные состояния реле обновлены',
    
    // Status
    'mqtt_connection': 'MQTT Соединение',
    'connected': 'Подключено',
    'disconnected': 'Отключено',
    'active_relays': 'Активные реле',
    'system_status': 'Состояние системы',
    'ready': 'Готова к работе',
    
    // Relay control
    'relay_control': 'Управление реле',
    'relay': 'Реле',
    'turned_on': 'включено',
    'turned_off': 'выключено',
    'command_sent': 'Команда отправлена на устройство',
    
    // Energy monitoring
    'energy_monitoring': 'Энергомониторинг',
    'voltage': 'Напряжение сети',
    'current': 'Сила тока',
    'power_factor': 'Коэффициент мощности',
    'active_power': 'Активная мощность',
    'reactive_power': 'Реактивная мощность',
    'accumulated_energy': 'Накопленная энергия',
    'detailed_chart': 'Детальный график',
    
    // Device info
    'device_info': 'Информация об устройстве',
    'firmware_version': 'Версия прошивки',
    'uptime': 'Время работы',
    'ip_address': 'IP адрес',
    'mac_address': 'MAC адрес',
    
    // Units
    'volts': 'В',
    'amperes': 'А',
    'watts': 'Вт',
    'vars': 'ВАР',
    'kwh': 'кВт·ч',
    'of': 'из',
    'relays': 'реле',
    'days': 'д',
    'hours': 'ч',
    'minutes': 'м'
  },
  en: {
    // Header
    'dashboard': 'Dashboard',
    'device_control': 'Embedded device control',
    'settings': 'Settings',
    'logout': 'Logout',
    
    // Settings page
    'mqtt_settings': 'MQTT Settings',
    'safety_settings': 'Safety Relay States',
    'enable_mqtt': 'Enable MQTT',
    'hostname': 'Hostname',
    'port': 'Port',
    'username': 'Username',
    'password': 'Password',
    'enable_tls': 'Enable TLS',
    'enable_cert_validation': 'Server Certificate Validation',
    'enable_function': 'Enable Function',
    'default_relay_states': 'Default Relay States',
    'save_mqtt_settings': 'Save MQTT Settings',
    'save_safety_settings': 'Save Safety Settings',
    'mqtt_settings_saved': 'MQTT Settings Saved',
    'mqtt_settings_updated': 'MQTT server connection settings updated',
    'safety_settings_saved': 'Safety Settings Saved',
    'safety_settings_updated': 'Safe relay states updated',
    
    // Status
    'mqtt_connection': 'MQTT Connection',
    'connected': 'Connected',
    'disconnected': 'Disconnected',
    'active_relays': 'Active relays',
    'system_status': 'System status',
    'ready': 'Ready',
    
    // Relay control
    'relay_control': 'Relay Control',
    'relay': 'Relay',
    'turned_on': 'turned on',
    'turned_off': 'turned off',
    'command_sent': 'Command sent to device',
    
    // Energy monitoring
    'energy_monitoring': 'Energy Monitoring',
    'voltage': 'Network voltage',
    'current': 'Current',
    'power_factor': 'Power factor',
    'active_power': 'Active power',
    'reactive_power': 'Reactive power',
    'accumulated_energy': 'Accumulated energy',
    'detailed_chart': 'Detailed chart',
    
    // Device info
    'device_info': 'Device Information',
    'firmware_version': 'Firmware version',
    'uptime': 'Uptime',
    'ip_address': 'IP address',
    'mac_address': 'MAC address',
    
    // Units
    'volts': 'V',
    'amperes': 'A',
    'watts': 'W',
    'vars': 'VAR',
    'kwh': 'kWh',
    'of': 'of',
    'relays': 'relays',
    'days': 'd',
    'hours': 'h',
    'minutes': 'm'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'ru';
  });
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
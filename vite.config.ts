import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Автоматически подключает глобальные переменные (test, expect, describe и т.д.)
    globals: true,
    // Используем jsdom как окружение, если тестируем компоненты React
    environment: 'jsdom',
    // Файл, где можно настроить глобальные импорты или подключить расширения (например, jest-dom)
    setupFiles: './src/setupTests.ts',
    // Включение подробного вывода
    reporters: 'verbose'
  },
});

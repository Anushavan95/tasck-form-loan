/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Добавьте сюда другие переменные, если они есть
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

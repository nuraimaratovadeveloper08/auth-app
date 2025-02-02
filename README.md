## 📘 Auth-App
Auth-App – это примерное приложение для авторизации, демонстрирующее современные подходы в разработке с использованием Next.js, Redux Toolkit, React Query, ShadCN, TailwindCSS и имитации серверной стороны через BFF (Backend for Frontend). Этот проект поддерживает рендеринг на стороне сервера (SSR), валидацию форм, обработку ошибок и управление состоянием с использованием Redux. 

## ✨ Функционал
### 📜 Авторизация:

Валидация формы с помощью zod и react-hook-form.
4 состояния UI: загрузка, пустые данные, данные, ошибка.
Отправка данных на сервер с проверкой username и password.
### 🌐 Рендеринг на стороне сервера (SSR):

Асинхронное получение данных через BFF (/pages/api/login.ts).
Обработка запросов с помощью fetch.
### 🔒 Управление сессией:

Хранение токена на стороне сервера через HttpOnly куки.
Безопасная работа с данными авторизации.
### 💅 Интерфейс:

Стилизация компонентов с помощью ShadCN и TailwindCSS.
Использование компонентов Input и Button.
## 🚀 Современные технологии:

Redux Toolkit для управления состоянием.
TanStack Query для обработки запросов и кеширования данных.

## ⚙️ Технологии
* Next.js – Фреймворк для React-приложений с поддержкой SSR.
* Redux Toolkit – Управление состоянием приложения.
* React Query – Удобная работа с асинхронными запросами.
* ShadCN – Библиотека UI-компонентов.
* TailwindCSS – Утилитарная CSS-библиотека для стилизации.
* Zod – Простая и мощная библиотека для валидации данных.
* React Hook Form – Удобная работа с формами.
## 📦 Установка и запуск
1. Клонируйте репозиторий:
```
git clone https://github.com/nuraimaratovadeveloper08/auth-app.git
cd auth-app
```
2. Установите зависимости:
```
npm install
```
## Запустите проект:

```
npm run dev
```
Проект будет доступен по адресу: http://localhost:3000/auth

## 🚀 Как работает /login API
URL: POST /api/login
Тело запроса:
```
{
  "username": "example",
  "password": "password123"
}
```
Ответы:
Успешная авторизация:
```
{
  "message": "Login successful",
  "token": "your-auth-token"
}
```
Ошибка:
```
{
  "message": "Login failed"
}
```


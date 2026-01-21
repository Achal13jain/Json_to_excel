# Intelligent JSON to Excel Converter

A premium, high-performance web application designed to convert JSON data into formatted Excel Spreadsheets. Features an intelligent AI-powered processing engine (using Google Gemini) to clean data, suggest headers, and optimize layout automatically.

## 🚀 Features

- **Drag & Drop Interface**: Seamless file upload with validation.
- **Intelligent Parsing**: AI-assisted structure detection for complex nested JSON.
- **Instant Preview**: Live data grid view before export.
- **Customizable Export**: Flatten nested objects, filter columns, and format output.
- **Privacy First**: Processing happens locally (unless AI features are enabled).
- **Responsive Design**: Fully responsive UI working on all devices.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Modern CSS3 (Glassmorphism, CSS Variables, Animations)
- **Sheet Processing**: XLSX / SheetJS
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Achal13jain/Json_to_excel.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

The project follows a modular architecture:
- `/src/components`: Reusable UI components.
- `/src/services`: Business logic (File processing, AI integration).
- `/src/styles`: Global design system and themes.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

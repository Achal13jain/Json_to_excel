# Intelligent JSON to Excel Converter 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Version](https://img.shields.io/badge/version-1.1.0-green.svg) ![React](https://img.shields.io/badge/built%20with-React-61dafb.svg) ![AI](https://img.shields.io/badge/AI-Gemini%202.5-orange.svg)

> **Transform messy JSON into beautiful Excel sheets in seconds.**  
> Powered by AI to automatically detect headers, flatten nested structures, and clean your data.

[**Try Live Demo**](https://json-to-excel-converter.vercel.app/) <!-- Update this link when deployed -->
<!-- Add screenshot here when available -->

---

## ✨ Why this tool?

Most converters just dump your keys into columns. **We do better.**
*   **🧠 AI-Powered**: Uses Google Gemini to understand your data context (e.g. knowing that `user.geo.lat` should just be "Latitude").
*   **⚡ Instant Preview**: See your data in a clean table before you download.
*   **🔒 Privacy First**: Your data stays in your browser. We only send samples to AI if you validly click "Analyze".
*   **🎨 Premium UI**: A joy to use with Glassmorphism design and smooth animations.

## 🚀 Features

### **1. Instant Gratification**
Don't have a file handy? Click **"Try Example"** to load sample E-commerce or Analytics data instantly.

### **2. Drag, Drop, Done**
Simply drag your `.json` file or paste raw text. We handle the rest.

### **3. Smart Flattening**
Nested objects? Arrays? No problem.
```json
// Input
{ "user": { "name": "John", "address": { "city": "NY" } } }
```
⬇️
**Output Excel Columns**: `User Name` | `Address City`

---

## 🛠️ Tech Stack

*   **Core**: React + Vite
*   **Styling**: Vanilla CSS (Glassmorphism)
*   **Logic**: SheetJS (XLSX)
*   **Intelligence**: Google Gemini API (v1beta)

---

## 🏃‍♂️ Quick Start

1.  **Clone & Install**
    ```bash
    git clone https://github.com/Achal13jain/Json_to_excel.git
    cd Json_to_excel
    npm install
    ```

2.  **Setup AI (Optional)**
    To use the "Analyze" feature, create a `.env` file:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_key
    ```

3.  **Run**
    ```bash
    npm run dev
    ```

---

## 🤝 Contributing

We love contributions!
1.  Fork it.
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request.

## 📄 License

MIT License - feel free to use this in your own projects!


# **Chrome Extension - AI Text Summarizer**  
A **modern and stylish** Chrome extension that summarizes **entire webpages** or **selected text** using a locally hosted Ollama API. This extension empowers you to leverage your **own local running model** for fast, private, and customizable text summarization.  

## 🚀 **Features**  
✅ **Summarize Entire Webpage** – Quickly generate a summary of any webpage.  
✅ **Summarize Highlighted Text** – Select text, click the floating button, and get an instant summary.  
✅ **Use Your Own Local Model** – Run the extension with your own locally hosted **Ollama model** for private, fast summarization.  
✅ **Fast & Private** – No data is sent to external servers, ensuring complete privacy.  
✅ **Modern UI** – Stylish and user-friendly interface for a seamless experience.  

---

## 🛠️ **Setup & Installation**  

### **1️⃣ Set Up Ollama API Locally**  
One of the key highlights of this extension is the ability to **use your own local running Ollama model**!  

To allow requests from the Chrome extension to your local Ollama API, set the environment variable:  

```bash
export OLLAMA_ORIGINS="chrome-extension://*"
```

Then, serve the model locally by running:  

```bash
ollama serve
```

---

### **2️⃣ Install the Extension**  

1️⃣ Open **Chrome** and navigate to:  
   👉 `chrome://extensions/`  

2️⃣ Enable **Developer Mode** (toggle switch in the top-right corner).  

3️⃣ Click **Load Unpacked** and select the extension folder.  

4️⃣ The extension is now installed and ready to use! 🎉  

---

## 📌 **How to Use**  

### **🔹 Summarizing a Webpage**  
1. Open any webpage.  
2. Click the **Summarizer Extension Icon** in the Chrome toolbar.  
3. The extension will generate a concise summary instantly using your local Ollama model.  

### **🔹 Summarizing Highlighted Text**  
1. Select any text on a webpage.  
2. A **floating "Summarize" button** will appear near the selection.  
3. Click the button to get an instant summary from your local model.  

---

## ❗ **Troubleshooting**  

### **Problem: "Error Fetching Summary"**  
🔹 **Solution:** Make sure your Ollama API is running locally:  
```bash
ollama serve
```

### **Problem: No Floating Button After Selecting Text**  
🔹 **Solution:** Refresh the webpage and try selecting the text again.  

### **Problem: Extension Not Working Properly**  
🔹 **Solution:**  
1. Remove the extension from Chrome.  
2. Reinstall it using the **"Load Unpacked"** method.  

---

## 🏆 **Contributing**  
Feel free to contribute by **reporting issues** or **suggesting improvements**! 🚀  

---

## 📜 **License**  
This project is **open-source** and available under the **MIT License**.  

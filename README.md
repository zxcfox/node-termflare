# TermFlare
**TermFlare** is a lightweight Node.js module for printing **stylized messages** to the console.  
It helps to clearly separate **messages**, **warnings**, and **errors** using colorful and structured output.

# Installation
```bash
npm install termflare
```

# Usage
### CommonJS
```javascript
const { Terminal } = require("termflare");
const terminal = new Terminal();

try {
    terminal.Message("Foxes are so cute!");
    terminal.Warning("Capybara alert! 🦫");
    terminal.Error("An unknown error occurred.");
} catch (err) {
    terminal.Error("Caught error:", err);
}
```

### ESM
```javascript
import { Terminal } from "termflare";
const terminal = new Terminal();

try {
    terminal.Message("Foxes are so cute!");
    terminal.Warning("Capybara alert! 🦫");
    terminal.Error("An unknown error occurred.");
} catch (err) {
    terminal.Error("Caught error:", err);
}
```
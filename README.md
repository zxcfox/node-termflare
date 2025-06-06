# TermFlare  
**TermFlare** is a lightweight Node.js module for printing **stylized messages** to the console.  
It helps to clearly separate **messages**, **warnings**, and **errors** using colorful and structured output.  
Now supports **inline color markup** using `/color(text)/` format with **nested** styling.

---

# Installation  
```bash
npm install termflare
```

---

# Usage

### CommonJS
```javascript
const { Terminal } = require("termflare");
const terminal = new Terminal();

terminal.Message("Foxes are /yellow(super cute)/!");
terminal.Warning("Capybara alert! /magenta(Situation escalating)/ 🦫");
terminal.Error("An /red(unknown error)/ occurred with /yellow(code: 500)/.");

terminal.Message("Nested example: /cyan(Outer /green(Inner /blue(Core)/)/ text)/");
```

### ESM
```javascript
import { Terminal } from "termflare";
const terminal = new Terminal();

terminal.Message("Foxes are /yellow(super cute)/!");
terminal.Warning("Capybara alert! /magenta(Situation escalating)/ 🦫");
terminal.Error("An /red(unknown error)/ occurred with /yellow(code: 500)/.");

terminal.Message("Nested example: /cyan(Outer /green(Inner /blue(Core)/)/ text)/");
```

---

# Inline Color Syntax

Use the `/color(text)/` format to color parts of your message.  
Supports **nesting** and all basic [chalk](https://github.com/chalk/chalk#colors) colors.

✅ Examples:
- `/green(Successful connection)/`
- `/red(Error: /yellow(code 403)/)/`
- `/cyan(Info: /blue(Details inside)/)/`

❌ Incorrect:
- Unclosed or mismatched parentheses
- Unknown color names (will default to gray and show a warning)

---

# ✅ Available Colors

You can use any of the following color names in `/color(text)/` markup:

| Basic        | Bright         | Other             |
|--------------|----------------|-------------------|
| `red`        | `redBright`    | `gray` / `grey`   |
| `green`      | `greenBright`  | `white`           |
| `yellow`     | `yellowBright` | `black`           |
| `blue`       | `blueBright`   | `blackBright`     |
| `magenta`    | `magentaBright`| `whiteBright`     |
| `cyan`       | `cyanBright`   |                   |

> **Note:** Unsupported color names will render text in gray and emit a warning in the console.

---

# Output Example

```bash
[06.06.2025 || 14:23:08] INFO -> Foxes are super cute!
[06.06.2025 || 14:23:08] WARNING -> Capybara alert! Situation escalating 🦫
[06.06.2025 || 14:23:08] ERROR -> An unknown error occurred with code: 500.
[06.06.2025 || 14:23:08] INFO -> Nested example: Outer Inner Core text
```

*(Colors are rendered properly in the terminal; nesting works recursively.)*

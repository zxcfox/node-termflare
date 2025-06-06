<p align="center">
  <img src="https://i.postimg.cc/bJQtqCcP/image.png" alt="Logo"/>
</p>

<div align="center">

**TermFlare** is a lightweight Node.js module for displaying ***stylized*** messages in the console.  
It helps clearly distinguish between ***messages***, ***warnings***, and ***errors*** through colorful and structured output.  
Now supports ***inline color markup*** in the /color(text)/ format with ***nested*** styling.

</div>

---

# Installation  
```bash
npm install termflare
```

---

# Usage

### ESM
```javascript
import TermFlare from "termflare";

const Terminal = new TermFlare();

Terminal.Message("Foxes are /yellow(super cute)/!");
Terminal.Warning("Capybara alert! /magenta(Situation escalating)/ 🦫");
Terminal.Error("An /red(unknown error)/ occurred with /yellow(code: 500)/.");

// You can also pass a second argument to Error() for additional debug info,
// which will be displayed in gray (e.g., stack trace or error details).

Terminal.Message("Nested example: /cyan(Outer /green(Inner /blue(Core)/)/ text)/");
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

# Available Colors

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

# Features

- 📅 Timestamped and structured logs (date + time prefix)
- 🎨 Inline color markup via `/color(text)/` syntax
- 🔄 Full support for nested color formatting
- 🎯 Distinction between **info**, **warning**, and **error** messages
- 🧼 Utility to strip color codes (e.g., for logs or files)
- 🌍 Configurable timezone (defaults to `Europe/Moscow`)
- 🔧 Lightweight and ESM-compatible

---

# Output Example

[![photo-2025-06-06-16-56-15.jpg](https://i.postimg.cc/BvqrJ9BJ/photo-2025-06-06-16-56-15.jpg)](https://postimg.cc/3kcSZqqq)
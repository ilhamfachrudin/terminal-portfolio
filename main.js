const output = document.getElementById('output');
const cmd = document.getElementById('cmd');
const history = [];
let historyIndex = -1;

const BANNER = `
<span class="success">
██╗  ██╗███████╗██████╗  █████╗ ███╗   ██╗
╚██╗██╔╝██╔════╝██╔══██╗██╔══██╗████╗  ██║
 ╚███╔╝ █████╗  ██████╔╝███████║██╔██╗ ██║
 ██╔██╗ ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║
██╔╝ ██╗███████╗██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
</span>
<span class="info">Type <strong>help</strong> to see available commands.</span>`;

const COMMANDS = {
  help() {
    return `<span class="info">Available commands:</span>
  <span class="success">about</span>      — About me
  <span class="success">skills</span>     — Technical skills
  <span class="success">projects</span>   — My projects
  <span class="success">contact</span>    — Contact info
  <span class="success">social</span>     — Social links
  <span class="success">clear</span>      — Clear terminal
  <span class="success">banner</span>     — Show banner`;
  },
  about() {
    return `<span class="info">⬡ About Xeran</span>
Full-stack engineer & systems architect. I build things for the web,
specialize in TypeScript, React, Node.js, and love cyberpunk aesthetics.
Currently exploring Web3 and generative AI.`;
  },
  skills() {
    return `<span class="info">⬡ Technical Skills</span>
Languages  → JavaScript, TypeScript, Python, Go, Rust
Frontend   → React, Next.js, Tailwind CSS, Framer Motion
Backend    → Node.js, Express, PostgreSQL, Redis
DevOps     → Docker, Kubernetes, AWS, CI/CD
Other      → Web3, Machine Learning, Web Audio API`;
  },
  projects() {
    return `<span class="info">⬡ Projects</span>
1. Terminal Portfolio     — This very terminal (JS, CSS)
2. Crypto Tracker         — Real-time crypto prices (React, API)
3. Vim Configuration      — Neovim config for web dev (Lua)
4. Neural Net Visualizer  — Interactive ML visualizer (Canvas API)
5. Dark Mode Switcher     — Zero-dep theme library (TypeScript)

→ GitHub: <a href="https://github.com/ilhamfachrudin" target="_blank" style="color:#bd93f9">github.com/ilhamfachrudin</a>`;
  },
  contact() {
    return `<span class="info">⬡ Contact</span>
Email  → <a href="mailto:novi240397@gmail.com" style="color:#bd93f9">novi240397@gmail.com</a>
GitHub → <a href="https://github.com/ilhamfachrudin" target="_blank" style="color:#bd93f9">github.com/ilhamfachrudin</a>`;
  },
  social() {
    return `<span class="info">⬡ Social</span>
Twitter/X → <a href="https://x.com/Xeran24" target="_blank" style="color:#bd93f9">x.com/Xeran24</a>
LinkedIn  → <a href="https://www.linkedin.com/in/xeran24/" target="_blank" style="color:#bd93f9">linkedin.com/in/xeran24</a>
GitHub    → <a href="https://github.com/ilhamfachrudin" target="_blank" style="color:#bd93f9">github.com/ilhamfachrudin</a>`;
  },
  banner() { return BANNER; },
  clear() { output.innerHTML = ''; return null; },
};

function print(html, cls = 'line') {
  const div = document.createElement('div');
  div.className = cls;
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function run(input) {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return;

  print(`<span class="cmd-echo">xeran@portfolio:~$ ${input}</span>`);
  history.unshift(input);
  historyIndex = -1;

  if (trimmed in COMMANDS) {
    const result = COMMANDS[trimmed]();
    if (result !== null) print(result);
  } else {
    print(`<span class="error">Command not found: ${trimmed}. Type <strong>help</strong> for available commands.</span>`);
  }
}

cmd.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = cmd.value;
    cmd.value = '';
    run(val);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      cmd.value = history[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      cmd.value = history[historyIndex];
    } else {
      historyIndex = -1;
      cmd.value = '';
    }
  }
});

document.addEventListener('click', () => cmd.focus());
print(BANNER);
print('<span class="muted">─────────────────────────────────────────</span>');

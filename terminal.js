/* terminal.js
   Interactive terminal: handles welcome typing + command parsing + outputs
*/
(() => {
  const bodyEl = document.getElementById('terminal-body');
  const inputEl = document.getElementById('terminal-input');

  // Fake filesystem contents
  const files = {
    "AbouteMe.txt": `About Me

I’m Hadir Ben Arbia, a cybersecurity engineering student at Polytechnique Sousse with a background in Computer Systems Engineering and certifications in Python and CCNA 1. I’m currently interning at The Red User’s, working on SOC environments, SIEM tuning, and network security tasks.

Skills

Networking & systems (Linux, Windows, macOS)

Security tools: Wazuh, Suricata, Fortinet SIEM, Burp Suite

Python scripting & automation

Packet analysis (Wireshark, PyShark)

Virtualization: Docker, VirtualBox, VMs

Projects

Python-based network sniffer (TLS/HTTPS aware)

SOC mini-architecture & segmentation labs

Network & communication security cheatsheet

SIEM event-correlation setup during internship

Regular CTF participation on Hack The Box
`,
    "flag.txt": `so the flag will not be easy to get ;)\nRmxhZ3tOaWMzX3RSeV91X29ubHlfbjMzRF9Ub19rbm93X015X05BTUVfUmlndGg/\nfQogICAgdGhpcyBpcyBteSBsaXR0bGUgZ2lmdCBmb3IgeW91IPCfjoHwn46JC\niAgICBodHRwczovL2dpdGh1Yi5jb20vYmhlZGlyCiAgIGh0dHBzOi8vZ2lwaHkuY29tL2dpZnMvdGhl\nb2ZmaWNlLW5iYy10aGUtb2ZmaWNlLXR2LUZlcmpxUEhZMk9HRFBKUHdFaw==\n`
  };

  // cowsay ASCII
  const cowsayArt = `
 ________________________
< I am just a girl ! >
 ------------------------
        \\
         \\
          ^__^
          (oo)\\_______
          (__)\\       )\\/\\
              ||----w |
              ||     ||
`;

  // Typing effect for elements
  function typeText(targetEl, text, speed = 20) {
    return new Promise(resolve => {
      targetEl.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        targetEl.textContent += text.charAt(i);
        i++;
        bodyEl.scrollTop = bodyEl.scrollHeight;
        if (i >= text.length) {
          clearInterval(t);
          resolve();
        }
      }, speed);
    });
  }

  // Print single line
  async function print(text, speed = 18, addClass = '') {
  const el = document.createElement('div');
  if (addClass) el.className = addClass;
  bodyEl.appendChild(el);
  el.innerHTML = text; // <-- allow HTML (links, emojis)
  bodyEl.scrollTop = bodyEl.scrollHeight;
}


  // Print multiple lines keeping newlines
  async function printBlock(block, speed = 6, addClass = '') {
    const lines = block.split('\n');
    for (let i = 0; i < lines.length; i++) {
      await print(lines[i], speed, addClass);
    }
  }

  // Append line to terminal
  function appendLine(text = '', className = '') {
    const line = document.createElement('div');
    line.className = className || '';
    line.textContent = text;
    bodyEl.appendChild(line);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return line;
  }

  // Clear terminal
  function clearTerminal() {
    bodyEl.innerHTML = '';
  }

  // Welcome and help text
  const welcomeText = `👋 Welcome to developer mode! I created this mode for my IT friends 💻 who don’t have time for fancy design.  
This is your friendly spice 🌶️ to know me better.  

If you are new with commands, write "help" 📝.  
If you are not a beginner, you can try to find who I am 😉🕵️‍♂️`;

  const helpText = `Available commands:
help       - Show this help message
ls         - list the contents of a directory
cat <file> - used to view what is inside the file 
clear      - Clear the terminal
about      - Learn about me
hack       - Hacker mode activated
cowsay     - cute cow message<br><br>
`;

  const lsText = `AbouteMe.txt  flag.txt`;

  // Command handlers
  const commands = {
    help: async () => printBlock(helpText, 8),
    ls: async () => print(lsText, 6),
    cat: async (args) => {
      if (!args || args.length === 0) {
        await print('Usage: cat <filename>');
        return;
      }
      const filename = args[0];
      if (files[filename]) {
        await printBlock(files[filename], 6);
      } else {
        await print(`cat: ${filename}: No such file or directory`);
      }
    },
    clear: async () => { clearTerminal(); },
    about: async () => { await printBlock(files["AbouteMe.txt"], 6); },
    hack: async () => {
      await print('Hacker mode activated...', 10, 'hacker-output');
      await new Promise(r => setTimeout(r, 400));
      await print('system: elevating privileges...', 18, 'hacker-output');
      await new Promise(r => setTimeout(r, 500));
      await print('>>> root shell unavailable in browser, but nice try 😉', 10);
    },
    cowsay: async () => { await printBlock(cowsayArt, 4); }
  };

  // Parse and run command
  async function runCommand(cmdLine) {
    if (!cmdLine.trim()) return;
    appendLine(`$ ${cmdLine}`, 'user-cmd'); 
    bodyEl.scrollTop = bodyEl.scrollHeight;

    const parts = cmdLine.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd in commands) {
      try {
        await commands[cmd](args);
      } catch (e) {
        await print('Error running command.');
        console.error(e);
      }
    } else {
      await print(`${cmd}: command not found. Try "help".`);
    }
  }

  // Input handling
  inputEl.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      inputEl.disabled = true;
      await runCommand(val);
      inputEl.disabled = false;
      inputEl.focus();
    } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      inputEl.value = '';
    }
  });

  inputEl.addEventListener('paste', (e) => {
    e.preventDefault();
    const txt = (e.clipboardData || window.clipboardData).getData('text');
    inputEl.value += txt.replace(/\r?\n/g, ' ');
  });

  document.getElementById('dev-terminal').addEventListener('click', () => inputEl.focus());

  // Initialization
  (async function init() {
    inputEl.disabled = true;
    await print('');
    const welcomeLine = appendLine('');
    await typeText(welcomeLine, welcomeText, 14);
    await print('');
    await print('Type "help" to see available commands.', 12);
    inputEl.disabled = false;
    inputEl.focus();
  })();

})();

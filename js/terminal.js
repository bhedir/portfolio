/* terminal.js
   Interactive terminal: handles welcome typing + command parsing + outputs
*/
(() => {
  const bodyEl = document.getElementById('terminal-body');
  const inputEl = document.getElementById('terminal-input');

  // ======================
  //  FAKE FILESYSTEM TREE
  // ======================
  const FS = {
    "/": {
      type: "dir",
      children: {
        "home": {
          type: "dir",
          children: {
            "visitor": {
              type: "dir",
              children: {
                "AbouteMe.txt": {
                  type: "file",
                  content: `About Me

<p><strong>If you are not a beginner, you can try to find who I am</strong><br>
I’m <strong>Hadir Ben Arbia</strong>, a cybersecurity engineering student at Polytechnique Sousse, specializing in SOC operations, network security, and Purple Team methodologies. I have a background in Computer Systems Engineering and hold certifications in Python, CCNA 1, and Fortinet technologies. I’m currently interning at <strong>The Red User’s</strong>, working on SOC environments, SIEM tuning, log analysis, and security automation.</p>

<br>

<h3>Skills</h3>
<ul>
  <li><strong>Networking & Systems:</strong> Linux, Windows Server, Active Directory, VLAN, ACL, OSPF, NAT</li>
  <li><strong>Security Tools:</strong> Fortinet (FortiGate / FortiSIEM / FortiManager), Wazuh, Suricata, Burp Suite, Nmap, Wireshark, OpenVAS</li>
  <li><strong>Automation:</strong> Python scripting, log parsing, security automation</li>
  <li><strong>Packet & Log Analysis:</strong> Wireshark, PyShark, SOC monitoring</li>
  <li><strong>Virtualization:</strong> Docker, VirtualBox, multi-zone VM setups</li>
</ul>

<br>

<h3>Projects</h3>
<ul>
  <li>Automated SOC Lab (FortiGate, Suricata, Wazuh, Shuffle)</li>
  <li>Secure Network Architecture with Multi-Admin (FortiGate)</li>
  <li>Real-time Python IDS (log analysis & alerting)</li>
  <li>Multi-zone SOC segmentation lab</li>
  <li>Regular CTF participation (Hack The Box, Securinets)</li>
</ul`
                },
                "flag.txt": {
                  type: "file",
                  content: `so the flag will not be easy to get ;)
RmxhZ3tOaWMzX3RSeV91X29ubHlfbjMzRF9Ub19rbm93X015X05BTUVfUmlndGg/\nfQogICAgdGhpcyBpcyBteSBsaXR0bGUgZ2\nlmdCBmb3IgeW91IPCfjoHwn46JC\niAgICBodHRwczovL2dpdGh1Yi5jb20vYmhlZGlyCiAgIGh0dHBzOi8vZ2lwaHkuY29\ntL2dpZnMvdGhlb2ZmaWNlLW5iYy10aGUtb2ZmaWNlLXR2LUZlcmpxUEhZMk9HRFBKUHdFaw==`
                },
                "secrets": {
                  type: "dir",
                  children: {
                    "nothingHere.txt": {
                      type: "file",
                      content: "😴 keep searching…"
                    }
                  }
                }
              }
            }
          }
        },
        "etc": {
          type: "dir",
          children: {
            "config.txt": {
              type: "file",
              content: "system=online\ntracking=disabled\nuser=visitor"
            }
          }
        }
      }
    }
  };

  // Current working directory
  let cwd = "/home/visitor";

  // cowsay ASCII
  const cowsayArt = `
 ________________________
< I am just a girl 🎀! >
 ------------------------
        \\
         \\
          ^__^
          (oo)\\_______
          (__)\\       )\\/\\
              ||----w |
              ||     ||
`;

  function resolvePath(path) {
    if (path.startsWith("/")) return path; // absolute

    const stack = cwd.split("/").filter(p => p);
    const parts = path.split("/");

    for (const p of parts) {
      if (p === "." || p === "") continue;
      if (p === "..") { stack.pop(); continue; }
      stack.push(p);
    }
    return "/" + stack.join("/");
  }

  function fsGet(path) {
    const parts = path.split("/").filter(p => p);
    let cur = FS["/"];
    for (const p of parts) {
      if (!cur.children || !cur.children[p]) return null;
      cur = cur.children[p];
    }
    return cur;
  }

  // Typing effect
  function typeText(targetEl, text, speed = 20) {
    return new Promise(resolve => {
      targetEl.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        targetEl.textContent += text[i];
        i++;
        bodyEl.scrollTop = bodyEl.scrollHeight;
        if (i >= text.length) {
          clearInterval(t);
          resolve();
        }
      }, speed);
    });
  }

  async function print(text, speed = 18, addClass = '') {
    const el = document.createElement('div');
    if (addClass) el.className = addClass;
    bodyEl.appendChild(el);
    el.innerHTML = text;
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  async function printBlock(block, speed = 6, addClass = '') {
    const lines = block.split('\n');
    for (let i = 0; i < lines.length; i++) {
      await print(lines[i], speed, addClass);
    }
  }

  function appendLine(text = '', className = '') {
    const line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    bodyEl.appendChild(line);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return line;
  }

  function clearTerminal() {
    bodyEl.innerHTML = '';
  }

  const welcomeText = `👋 Welcome to developer mode! I created this mode for my IT friends 💻 who don’t have time for fancy design.  
This is your friendly spice 🌶️ to know me better.  

If you are new with commands, write "help" 📝.  
If you are not a beginner, you can try to find who I am 😉🕵️‍♂️`;

  const helpText =
`Available commands:
help        - Show this help message
ls          - List directory contents
cat &lt;file&gt;  - Read a file
cd &lt;dir&gt;    - Change directory
pwd         - Print working directory
clear       - Clear terminal
about       - Learn about me
hack        - Hacker mode activated
cowsay      - Cute cow message
ufoundme     - Open my profile in a new tab
`;

  // ================
  //   COMMANDS
  // ================
  const commands = {
    help: async () => printBlock(helpText, 6),

    pwd: async () => print(cwd),

    ufoundme: async () => {
      print("Opening profile...");
      window.open("https://www.youtube.com/watch?v=xlkDgyQu3_8", "_blank");
    },

    ls: async () => {
      const node = fsGet(cwd);
      if (!node || node.type !== "dir") return print("ls: not a directory");

      const names = Object.keys(node.children).join("  ");
      print(names);
    },

    cd: async (args) => {
      if (!args || !args[0]) return;

      const newPath = resolvePath(args[0]);
      const node = fsGet(newPath);

      if (!node) return print(`cd: no such file or directory: ${args[0]}`);
      if (node.type !== "dir") return print(`cd: not a directory: ${args[0]}`);

      cwd = newPath;
    },

    cat: async (args) => {
      if (!args || args.length === 0) return print("Usage: cat <filename>");

      const path = resolvePath(args[0]);
      const node = fsGet(path);

      if (!node) return print(`cat: ${args[0]}: No such file`);
      if (node.type !== "file") return print(`cat: ${args[0]}: Not a file`);

      await printBlock(node.content, 6);
    },

    clear: async () => clearTerminal(),

    about: async () => {
      const path = "/home/visitor/AbouteMe.txt";
      await printBlock(fsGet(path).content, 6);
    },

    hack: async () => {
      await print('Hacker mode activated...', 10, 'hacker-output');
      await new Promise(r => setTimeout(r, 400));
      await print('system: elevating privileges...', 18, 'hacker-output');
      await new Promise(r => setTimeout(r, 500));
      await print('>>> root shell unavailable in browser, but nice try 😉', 10);
    },

    cowsay: async () => printBlock(cowsayArt, 4)
  };

  // =====================
  //   COMMAND EXECUTION
  // =====================
  async function runCommand(cmdLine) {
    if (!cmdLine.trim()) return;

    appendLine(`visitor@hadir:${cwd}$ ${cmdLine}`, 'user-cmd');

    const parts = cmdLine.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd in commands) return commands[cmd](args);

    print(`${cmd}: command not found`);
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

  document.getElementById('dev-terminal').addEventListener('click', () => inputEl.focus());

  // Initialization
  (async function init() {
    inputEl.disabled = true;
    await print('');
    const wl = appendLine('');
    await typeText(wl, welcomeText, 14);
    await print('');
    await print('Type "help" to see available commands.');
    inputEl.disabled = false;
    inputEl.focus();
  })();

})();

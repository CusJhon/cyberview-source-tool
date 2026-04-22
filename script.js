/* ============================================
   SCRIPT.JS - CYBER EXTRACTOR ULTRA
   WITH ANTI-THIEVING SECURITY SYSTEM
   ============================================ */

(function(){
  "use strict";

  // ==========================================
  // ANTI-THIEVING SECURITY SYSTEM
  // ==========================================
  
  const SecuritySystem = {
    initialized: false,
    watermark: '',
    securityLogs: [],
    
    // Initialize all security measures
    init: function() {
      if(this.initialized) return;
      
      this.generateWatermark();
      this.disableRightClick();
      this.disableKeyboardShortcuts();
      this.detectDevTools();
      this.antiDebugger();
      this.injectWatermarks();
      this.consoleWarning();
      this.enforceSelectionProtection();
      this.observeDOMMutations();
      this.preventIframeEmbedding();
      this.disableDragDrop();
      
      this.initialized = true;
      this.logSecurityEvent('SECURITY SYSTEM ACTIVATED');
      
      // Console warning dengan styling khusus
      console.log('%c🔒 CYBER-SHIELD ACTIVE 🔒', 'color: #00ff9f; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00ff9f');
      console.log('%c⚠️ WARNING: This system is protected against theft and unauthorized access.', 'color: #ff0066; font-size: 14px');
      console.log('%cAll suspicious activities are logged and monitored.', 'color: #ff9900; font-size: 12px');
    },
    
    // Generate unique watermark
    generateWatermark: function() {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      this.watermark = `CYBER-EXTRACTOR-PROTECTED-${btoa(timestamp + random)}`;
    },
    
    // Disable right-click context menu
    disableRightClick: function() {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.triggerAlarm('RIGHT-CLICK BLOCKED', 'warning');
        return false;
      });
    },
    
    // Disable keyboard shortcuts
    disableKeyboardShortcuts: function() {
      document.addEventListener('keydown', (e) => {
        const blockedCombos = [
          // Save (Ctrl+S / Cmd+S)
          (e.ctrlKey || e.metaKey) && e.key === 's',
          // View Source (Ctrl+U)
          (e.ctrlKey || e.metaKey) && e.key === 'u',
          // DevTools (F12)
          e.key === 'F12',
          // DevTools (Ctrl+Shift+I / Cmd+Shift+I)
          (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I',
          // DevTools (Ctrl+Shift+J)
          (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J',
          // DevTools (Ctrl+Shift+C)
          (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C',
          // Print (Ctrl+P)
          (e.ctrlKey || e.metaKey) && e.key === 'p'
        ];
        
        if(blockedCombos.some(combo => combo)) {
          e.preventDefault();
          this.triggerAlarm('SHORTCUT BLOCKED: ' + e.key, 'critical');
          return false;
        }
      });
    },
    
    // Detect DevTools opening
    detectDevTools: function() {
      let devtoolsOpen = false;
      const threshold = 160;
      
      const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if(widthThreshold || heightThreshold) {
          if(!devtoolsOpen) {
            this.triggerAlarm('DEVTOOLS OPENED', 'critical');
            devtoolsOpen = true;
            
            // Anti-debugging loop
            const startDebuggerLoop = () => {
              if(devtoolsOpen) {
                debugger;
                setTimeout(startDebuggerLoop, 100);
              }
            };
            startDebuggerLoop();
          }
        } else {
          devtoolsOpen = false;
        }
      };
      
      setInterval(checkDevTools, 1000);
    },
    
    // Anti-debugger detection
    antiDebugger: function() {
      setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if(end - start > 100) {
          this.triggerAlarm('DEBUGGER DETECTED', 'critical');
        }
      }, 1000);
    },
    
    // Inject visible and invisible watermarks
    injectWatermarks: function() {
      // Invisible pattern watermark
      const watermarkDiv = document.createElement('div');
      watermarkDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999997;
        opacity: 0.002;
        background: repeating-linear-gradient(45deg, #0f0, #0f0 15px, transparent 15px, transparent 30px);
      `;
      document.body.appendChild(watermarkDiv);
      
      // Text watermark in security element
      const securityEl = document.getElementById('securityWatermark');
      if(securityEl) {
        securityEl.setAttribute('data-watermark', this.watermark);
      }
      
      // Add to protected badge
      const badge = document.querySelector('.protected-badge');
      if(badge) {
        badge.setAttribute('data-secure-id', this.watermark.substring(0, 20));
      }
    },
    
    // Console warning messages
    consoleWarning: function() {
      console.clear();
      console.log('%c🛡️ SECURITY ALERT 🛡️', 'color: #ff0066; font-size: 20px; font-weight: bold');
      console.log('%cThis website is protected by Cyber-Shield Anti-Theft System', 'color: #00ff9f; font-size: 14px');
      console.log('%cAny attempt to copy, save, or inspect this code is being logged.', 'color: #ff9900');
      console.log(`%c🔑 SECURITY ID: ${this.watermark}`, 'color: #00eaff');
    },
    
    // Enforce text selection protection
    enforceSelectionProtection: function() {
      document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if(selection && selection.toString().length > 0) {
          const container = selection.anchorNode?.parentElement?.closest('.code-container');
          if(!container) {
            selection.removeAllRanges();
            this.triggerAlarm('TEXT SELECTION BLOCKED', 'warning');
          }
        }
      });
      
      // Block copy event outside code viewer
      document.addEventListener('copy', (e) => {
        const container = e.target.closest('.code-container');
        if(!container) {
          e.preventDefault();
          this.triggerAlarm('COPY ATTEMPT BLOCKED', 'warning');
        }
      });
      
      // Block cut event
      document.addEventListener('cut', (e) => {
        const container = e.target.closest('.code-container');
        if(!container) {
          e.preventDefault();
          this.triggerAlarm('CUT ATTEMPT BLOCKED', 'warning');
        }
      });
      
      // Block paste in non-input areas
      document.addEventListener('paste', (e) => {
        if(!e.target.matches('input, textarea, [contenteditable="true"]')) {
          e.preventDefault();
        }
      });
    },
    
    // Observe DOM for security breaches
    observeDOMMutations: function() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Check for removed security elements
          if(mutation.removedNodes.length) {
            mutation.removedNodes.forEach(node => {
              if(node.classList?.contains('security-watermark') || 
                 node.classList?.contains('protected-badge')) {
                this.triggerAlarm('SECURITY ELEMENT REMOVED', 'critical');
              }
            });
          }
          
          // Check for added scripts
          if(mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
              if(node.tagName === 'SCRIPT' && !node.src.includes('cdnjs')) {
                this.triggerAlarm('UNAUTHORIZED SCRIPT INJECTION', 'critical');
                node.remove();
              }
            });
          }
        });
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    },
    
    // Prevent iframe embedding
    preventIframeEmbedding: function() {
      if(window.top !== window.self) {
        window.top.location = window.self.location;
        document.body.innerHTML = '<h1 style="color:red;text-align:center;margin-top:100px;">🚫 ACCESS DENIED - IFRAME NOT ALLOWED 🚫</h1>';
        throw new Error('Iframe embedding blocked by security policy');
      }
    },
    
    // Disable drag and drop
    disableDragDrop: function() {
      document.addEventListener('dragstart', (e) => e.preventDefault());
      document.addEventListener('drop', (e) => e.preventDefault());
    },
    
    // Trigger security alarm
    triggerAlarm: function(reason, level = 'warning') {
      const statusEl = document.getElementById('connectionStatus');
      if(statusEl) {
        const originalText = statusEl.textContent;
        const originalColor = statusEl.style.color;
        
        statusEl.style.color = level === 'critical' ? '#ff0066' : '#ff9900';
        statusEl.textContent = `SECURITY: ${reason}`;
        
        setTimeout(() => {
          statusEl.style.color = originalColor;
          statusEl.textContent = originalText;
        }, 3000);
      }
      
      this.logSecurityEvent(reason);
      
      // Visual feedback in console
      console.log(`%c[SECURITY] ${reason}`, `color: ${level === 'critical' ? '#ff0066' : '#ff9900'}; font-weight: bold`);
    },
    
    // Log security events
    logSecurityEvent: function(event) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        event: event,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      this.securityLogs.push(logEntry);
      
      // Keep only last 50 events
      if(this.securityLogs.length > 50) {
        this.securityLogs.shift();
      }
      
      // Store in sessionStorage
      try {
        sessionStorage.setItem('_sec_logs', JSON.stringify(this.securityLogs));
      } catch(e) {}
    }
  };

  // Initialize security immediately
  SecuritySystem.init();

  // ==========================================
  // MATRIX RAIN BACKGROUND ANIMATION
  // ==========================================
  
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let drops = [];
  const fontSize = 16;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ";
  
  function initMatrix() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const colCount = Math.floor(width / fontSize) + 1;
    drops = [];
    for(let i = 0; i < colCount; i++) {
      drops[i] = Math.random() * -100;
    }
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    
    for(let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      ctx.fillText(text, x, y);
      
      if(y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  window.addEventListener('resize', initMatrix);
  initMatrix();
  setInterval(drawMatrix, 50);

  // ==========================================
  // GLOBAL VARIABLES & DOM ELEMENTS
  // ==========================================
  
  const statusText = document.getElementById('connectionStatus');
  const hackerLog = document.getElementById('hackerLog');
  const dlHackerLog = document.getElementById('dlHackerLog');
  const urlInput = document.getElementById('urlInput');
  const fetchBtn = document.getElementById('fetchBtn');
  const codeViewer = document.getElementById('htmlCodeViewer');
  const livePreview = document.getElementById('livePreview');
  const previewUrlDisplay = document.getElementById('previewUrlDisplay');
  const copyBtn = document.getElementById('copyBtn');
  const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
  const beautifyBtn = document.getElementById('beautifyBtn');
  const minifyBtn = document.getElementById('minifyBtn');
  
  const dlUrlInput = document.getElementById('dlUrlInput');
  const downloadSiteBtn = document.getElementById('downloadSiteBtn');
  const dlProgress = document.getElementById('dlProgress');
  const dlMessage = document.getElementById('dlMessage');
  const assetList = document.getElementById('assetList');
  
  // CORS Proxy
  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  
  // ==========================================
  // TAB SYSTEM
  // ==========================================
  
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      
      tabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');
      
      panels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(`panel-${tabId}`).classList.add('active');
    });
  });

  // ==========================================
  // CLOCK UPDATE
  // ==========================================
  
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('timeDisplay').innerText = timeStr;
  }
  
  setInterval(updateTime, 1000);
  updateTime();

  // ==========================================
  // LOGGING SYSTEM
  // ==========================================
  
  function addLog(container, message) {
    const line = document.createElement('div');
    line.className = 'log-line';
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const time = `[${hours}:${minutes}:${seconds}]`;
    
    line.innerHTML = `<span class="timestamp">${time}</span> > ${message}`;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }

  // ==========================================
  // SOUND EFFECTS (WEB AUDIO API)
  // ==========================================
  
  function playBeep(type = 'click') {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.frequency.value = type === 'click' ? 800 : 1200;
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) {
      // Audio context might require user interaction first
    }
  }

  // ==========================================
  // FAKE HACKER SEQUENCE
  // ==========================================
  
  function fakeHackerSequence(container) {
    const messages = [
      'Initializing connection...',
      'Bypassing firewall...',
      'Injecting payload...',
      'Access granted...',
      'Extracting HTML source...'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if(index < messages.length) {
        addLog(container, messages[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 250);
  }

  // ==========================================
  // HTML FETCH AND DISPLAY
  // ==========================================
  
  async function fetchAndDisplay(url) {
    if(!url) return;
    
    statusText.innerText = 'CONNECTION: FETCHING...';
    hackerLog.innerHTML = '';
    fakeHackerSequence(hackerLog);
    playBeep('click');
    
    try {
      const response = await fetch(CORS_PROXY + encodeURIComponent(url));
      
      if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const html = await response.text();
      
      // Display in code viewer
      codeViewer.textContent = html;
      hljs.highlightElement(codeViewer);
      
      // Create preview
      const blob = new Blob([html], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      livePreview.src = blobUrl;
      previewUrlDisplay.innerText = url;
      
      addLog(hackerLog, `✅ Success: ${html.length} bytes extracted`);
      statusText.innerText = 'CONNECTION: ACTIVE';
      playBeep('success');
      
      return html;
      
    } catch(err) {
      addLog(hackerLog, `❌ ERROR: ${err.message}`);
      statusText.innerText = 'CONNECTION: BLOCKED';
      codeViewer.textContent = `// Failed to fetch: ${err.message}\n// Try using a different URL or check CORS settings`;
      hljs.highlightElement(codeViewer);
    }
  }

  // ==========================================
  // BUTTON EVENT LISTENERS
  // ==========================================
  
  fetchBtn.addEventListener('click', () => {
    const url = urlInput.value.trim() || 'https://example.com';
    fetchAndDisplay(url);
  });
  
  // Copy button
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeViewer.textContent);
      addLog(hackerLog, '📋 HTML copied to clipboard');
      playBeep('click');
    } catch(err) {
      alert('Failed to copy');
    }
  });
  
  // Download HTML button
  downloadHtmlBtn.addEventListener('click', () => {
    const content = codeViewer.textContent;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted.html';
    a.click();
    URL.revokeObjectURL(url);
    addLog(hackerLog, '⬇ HTML file downloaded');
    playBeep('click');
  });
  
  // Beautify button
  beautifyBtn.addEventListener('click', () => {
    try {
      let formatted = html_beautify(codeViewer.textContent);
      codeViewer.textContent = formatted;
      hljs.highlightElement(codeViewer);
      addLog(hackerLog, '✨ Code beautified');
      playBeep('click');
    } catch(e) {
      alert('Beautify error');
    }
  });
  
  // Minify button
  minifyBtn.addEventListener('click', () => {
    try {
      let minified = codeViewer.textContent
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
      codeViewer.textContent = minified;
      hljs.highlightElement(codeViewer);
      addLog(hackerLog, '⚡ Code minified');
      playBeep('click');
    } catch(e) {
      alert('Minify error');
    }
  });
  
  // Simple beautify function
  function html_beautify(html) {
    let result = '';
    let indent = 0;
    const tab = '  ';
    
    html.split(/>\s*</).forEach(element => {
      if(element.match(/^\/\w/)) {
        indent = Math.max(0, indent - 1);
      }
      
      result += tab.repeat(indent) + '<' + element + '>\n';
      
      if(element.match(/^<?\w[^>]*[^\/]$/) && 
         !element.startsWith('input') && 
         !element.startsWith('br') && 
         !element.startsWith('hr') && 
         !element.startsWith('img')) {
        indent++;
      }
    });
    
    return result;
  }

  // ==========================================
  // DOWNLOAD WEBSITE AS ZIP
  // ==========================================
  
  downloadSiteBtn.addEventListener('click', async () => {
    const baseUrl = dlUrlInput.value.trim() || 'https://example.com';
    
    dlHackerLog.innerHTML = '';
    fakeHackerSequence(dlHackerLog);
    assetList.innerHTML = '';
    dlMessage.innerText = '⚡ Scanning assets...';
    dlProgress.style.width = '10%';
    playBeep('click');
    
    try {
      // Fetch main HTML
      const mainResponse = await fetch(CORS_PROXY + encodeURIComponent(baseUrl));
      const mainHtml = await mainResponse.text();
      addLog(dlHackerLog, `📄 Base HTML: ${mainHtml.length} chars`);
      
      // Parse HTML to find assets
      const parser = new DOMParser();
      const doc = parser.parseFromString(mainHtml, 'text/html');
      
      const cssLinks = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href);
      const jsScripts = [...doc.querySelectorAll('script[src]')].map(s => s.src);
      
      // Create ZIP
      const zip = new JSZip();
      zip.file('index.html', mainHtml);
      
      let progress = 20;
      dlProgress.style.width = progress + '%';
      
      // Fetch all assets
      const allAssets = [...cssLinks, ...jsScripts].filter(href => 
        href && !href.startsWith('data:') && !href.startsWith('blob:')
      );
      
      const fetchedAssets = [];
      
      for(let assetUrl of allAssets) {
        try {
          const absoluteUrl = new URL(assetUrl, baseUrl).href;
          const response = await fetch(CORS_PROXY + encodeURIComponent(absoluteUrl));
          
          if(response.ok) {
            const blob = await response.blob();
            let fileName = absoluteUrl.replace(baseUrl, '').replace(/^\//, '');
            
            if(!fileName || fileName === '') {
              fileName = 'asset_' + Date.now();
            }
            
            if(!fileName.includes('.')) {
              fileName += assetUrl.includes('.css') ? '.css' : '.js';
            }
            
            zip.file(fileName, blob);
            fetchedAssets.push(fileName);
            
            addLog(dlHackerLog, `✅ Fetched: ${fileName}`);
            assetList.innerHTML += `<div>📄 ${fileName}</div>`;
          }
        } catch(err) {
          addLog(dlHackerLog, `⚠️ Failed: ${assetUrl}`);
        }
        
        progress = Math.min(95, progress + 8);
        dlProgress.style.width = progress + '%';
      }
      
      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = 'website_extract.zip';
      a.click();
      URL.revokeObjectURL(zipUrl);
      
      dlProgress.style.width = '100%';
      dlMessage.innerText = `✅ ZIP ready (${fetchedAssets.length} assets)`;
      addLog(dlHackerLog, `🎉 Extraction complete! ${fetchedAssets.length} files zipped.`);
      playBeep('success');
      
    } catch(err) {
      dlMessage.innerText = '❌ Extraction failed';
      addLog(dlHackerLog, `❌ ERROR: ${err.message}`);
    }
  });

  // ==========================================
  // INITIAL LOAD
  // ==========================================
  
  window.addEventListener('load', () => {
    fetchAndDisplay('https://example.com');
  });

  // ==========================================
  // ADD SOUND TO ALL BUTTONS
  // ==========================================
  
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => playBeep('click'));
  });

  // ==========================================
  // KEYBOARD SHORTCUT FOR EXECUTE (Ctrl+Enter)
  // ==========================================
  
  urlInput.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      fetchBtn.click();
    }
  });
  
  dlUrlInput.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      downloadSiteBtn.click();
    }
  });

})();
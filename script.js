/* ============================================
   SCRIPT.JS - CYBER EXTRACTOR ULTRA
   WITH MULTI CORS PROXY FALLBACK
   + TIMEOUT HANDLING
   + BETTER ERROR MESSAGES
   ============================================ */

(function(){
  "use strict";

  // ==========================================
  // MULTIPLE CORS PROXY LIST (AUTO FALLBACK)
  // ==========================================
  
  const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.codetabs.com/v1/proxy?quest='
  ];
  
  let currentProxyIndex = 0;
  
  // ==========================================
  // ANTI-THIEVING SECURITY SYSTEM
  // ==========================================
  
  const SecuritySystem = {
    initialized: false,
    watermark: '',
    securityLogs: [],
    
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
      
      console.log('%c🔒 CYBER-SHIELD ACTIVE 🔒', 'color: #00ff9f; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00ff9f');
    },
    
    generateWatermark: function() {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      this.watermark = `CYBER-EXTRACTOR-PROTECTED-${btoa(timestamp + random)}`;
    },
    
    disableRightClick: function() {
      document.addEventListener('contextmenu', (e) => {
        if(e.target.matches('input, textarea')) return true;
        e.preventDefault();
        return false;
      });
    },
    
    disableKeyboardShortcuts: function() {
      document.addEventListener('keydown', (e) => {
        if(e.target.matches('input, textarea')) {
          if((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a', 'z', 'y'].includes(e.key.toLowerCase())) {
            return true;
          }
        }
        
        const blockedCombos = [
          (e.ctrlKey || e.metaKey) && e.key === 's',
          (e.ctrlKey || e.metaKey) && e.key === 'u',
          e.key === 'F12',
          (e.ctrlKey || e.metaKey) && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase()),
          (e.ctrlKey || e.metaKey) && e.key === 'p'
        ];
        
        if(blockedCombos.some(combo => combo)) {
          e.preventDefault();
          return false;
        }
      });
    },
    
    detectDevTools: function() {
      let devtoolsOpen = false;
      const threshold = 160;
      
      setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if((widthThreshold || heightThreshold) && !devtoolsOpen) {
          devtoolsOpen = true;
          const loop = () => { if(devtoolsOpen) { debugger; setTimeout(loop, 100); } };
          loop();
        } else {
          devtoolsOpen = false;
        }
      }, 1000);
    },
    
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
    
    injectWatermarks: function() {
      const watermarkDiv = document.createElement('div');
      watermarkDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999997;opacity:0.002;background:repeating-linear-gradient(45deg,#0f0,#0f0 15px,transparent 15px,transparent 30px);';
      document.body.appendChild(watermarkDiv);
    },
    
    consoleWarning: function() {
      console.clear();
      console.log('%c🛡️ SECURITY ALERT 🛡️', 'color: #ff0066; font-size: 20px; font-weight: bold');
      console.log('%cThis website is protected by Cyber-Shield Anti-Theft System', 'color: #00ff9f; font-size: 14px');
    },
    
    enforceSelectionProtection: function() {
      document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if(selection && selection.toString().length > 0) {
          const container = selection.anchorNode?.parentElement?.closest('.code-container, input, textarea');
          if(!container) selection.removeAllRanges();
        }
      });
      
      document.addEventListener('copy', (e) => {
        if(!e.target.closest('.code-container, input, textarea')) e.preventDefault();
      });
      
      document.addEventListener('cut', (e) => {
        if(!e.target.closest('.code-container, input, textarea')) e.preventDefault();
      });
      
      document.addEventListener('paste', (e) => {
        if(!e.target.matches('input, textarea, [contenteditable="true"]')) e.preventDefault();
      });
    },
    
    observeDOMMutations: function() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if(mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
              if(node.tagName === 'SCRIPT' && !node.src.includes('cdnjs')) {
                node.remove();
              }
            });
          }
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
    },
    
    preventIframeEmbedding: function() {
      if(window.top !== window.self) {
        window.top.location = window.self.location;
        throw new Error('Iframe embedding blocked');
      }
    },
    
    disableDragDrop: function() {
      document.addEventListener('dragstart', (e) => e.preventDefault());
      document.addEventListener('drop', (e) => e.preventDefault());
    },
    
    triggerAlarm: function(reason, level = 'warning') {
      const statusEl = document.getElementById('connectionStatus');
      if(statusEl) {
        const originalText = statusEl.textContent;
        statusEl.style.color = level === 'critical' ? '#ff0066' : '#ff9900';
        statusEl.textContent = `SECURITY: ${reason}`;
        setTimeout(() => {
          statusEl.style.color = '';
          statusEl.textContent = originalText;
        }, 3000);
      }
    },
    
    logSecurityEvent: function(event) {
      this.securityLogs.push({
        timestamp: new Date().toISOString(),
        event: event
      });
    }
  };

  SecuritySystem.init();

  // ==========================================
  // MATRIX RAIN BACKGROUND
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
    for(let i = 0; i < colCount; i++) drops[i] = Math.random() * -100;
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    
    for(let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if(drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  
  window.addEventListener('resize', initMatrix);
  initMatrix();
  setInterval(drawMatrix, 50);

  // ==========================================
  // GLOBAL VARIABLES
  // ==========================================
  
  const statusText = document.getElementById('connectionStatus');
  const hackerLog = document.getElementById('hackerLog');
  const dlHackerLog = document.getElementById('dlHackerLog');
  const urlInput = document.getElementById('urlInput');
  const fetchBtn = document.getElementById('fetchBtn');
  const resetExtractorBtn = document.getElementById('resetExtractorBtn');
  const codeViewer = document.getElementById('htmlCodeViewer');
  const livePreview = document.getElementById('livePreview');
  const previewUrlDisplay = document.getElementById('previewUrlDisplay');
  const copyBtn = document.getElementById('copyBtn');
  const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
  const beautifyBtn = document.getElementById('beautifyBtn');
  const minifyBtn = document.getElementById('minifyBtn');
  
  const dlUrlInput = document.getElementById('dlUrlInput');
  const downloadSiteBtn = document.getElementById('downloadSiteBtn');
  const resetDownloaderBtn = document.getElementById('resetDownloaderBtn');
  const dlProgress = document.getElementById('dlProgress');
  const dlMessage = document.getElementById('dlMessage');
  const assetList = document.getElementById('assetList');
  
  // ==========================================
  // FETCH WITH TIMEOUT AND MULTI-PROXY
  // ==========================================
  
  async function fetchWithProxy(url, timeoutMs = 15000) {
    const errors = [];
    
    for(let i = 0; i < CORS_PROXIES.length; i++) {
      const proxy = CORS_PROXIES[i];
      const proxyUrl = proxy + encodeURIComponent(url);
      
      try {
        addLog(hackerLog, `🔄 Trying proxy ${i + 1}/${CORS_PROXIES.length}...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if(!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        addLog(hackerLog, `✅ Proxy ${i + 1} connected successfully`);
        currentProxyIndex = i;
        return response;
        
      } catch(err) {
        errors.push(`Proxy ${i + 1}: ${err.message}`);
        addLog(hackerLog, `⚠️ Proxy ${i + 1} failed: ${err.message}`);
      }
    }
    
    throw new Error(`All proxies failed:\n${errors.join('\n')}`);
  }
  
  async function fetchWithProxyForDownloader(url, logContainer, timeoutMs = 15000) {
    const errors = [];
    
    for(let i = 0; i < CORS_PROXIES.length; i++) {
      const proxy = CORS_PROXIES[i];
      const proxyUrl = proxy + encodeURIComponent(url);
      
      try {
        addLog(logContainer, `🔄 Trying proxy ${i + 1}/${CORS_PROXIES.length}...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        
        addLog(logContainer, `✅ Proxy ${i + 1} connected`);
        return response;
        
      } catch(err) {
        errors.push(`Proxy ${i + 1}: ${err.message}`);
        addLog(logContainer, `⚠️ Proxy ${i + 1} failed`);
      }
    }
    
    throw new Error(`All proxies failed. Try a different URL or check your connection.`);
  }

  // ==========================================
  // TAB SYSTEM
  // ==========================================
  
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`panel-${tabId}`).classList.add('active');
    });
  });

  // ==========================================
  // CLOCK
  // ==========================================
  
  function updateTime() {
    document.getElementById('timeDisplay').innerText = new Date().toLocaleTimeString('en-US', { hour12: false });
  }
  setInterval(updateTime, 1000);
  updateTime();

  // ==========================================
  // LOGGING
  // ==========================================
  
  function addLog(container, message) {
    const line = document.createElement('div');
    line.className = 'log-line';
    const now = new Date();
    const time = `[${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}]`;
    line.innerHTML = `<span class="timestamp">${time}</span> > ${message}`;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }
  
  function clearLog(container) { container.innerHTML = ''; }

  // ==========================================
  // SOUND
  // ==========================================
  
  function playBeep(type = 'click') {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.frequency.value = type === 'click' ? 800 : 1200;
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
      osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) {}
  }

  // ==========================================
  // HTML FETCH AND DISPLAY
  // ==========================================
  
  async function fetchAndDisplay(url) {
    if(!url) {
      addLog(hackerLog, '❌ ERROR: Please enter a URL');
      return;
    }
    
    if(!url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
      urlInput.value = url;
    }
    
    statusText.innerText = 'CONNECTION: FETCHING...';
    clearLog(hackerLog);
    addLog(hackerLog, `🎯 Target: ${url}`);
    addLog(hackerLog, '🔄 Initializing multi-proxy connection...');
    playBeep('click');
    
    try {
      const response = await fetchWithProxy(url, 20000);
      const html = await response.text();
      
      codeViewer.textContent = html;
      hljs.highlightElement(codeViewer);
      
      const blob = new Blob([html], { type: 'text/html' });
      livePreview.src = URL.createObjectURL(blob);
      previewUrlDisplay.innerText = url;
      
      addLog(hackerLog, `✅ SUCCESS: ${html.length.toLocaleString()} bytes extracted`);
      statusText.innerText = 'CONNECTION: ACTIVE';
      playBeep('success');
      
    } catch(err) {
      addLog(hackerLog, `❌ FAILED: ${err.message}`);
      addLog(hackerLog, '💡 TIPS:');
      addLog(hackerLog, '   • Try: example.com');
      addLog(hackerLog, '   • Try: httpbin.org/html');
      addLog(hackerLog, '   • Check your internet connection');
      addLog(hackerLog, '   • Some sites block CORS requests');
      
      statusText.innerText = 'CONNECTION: FAILED';
      codeViewer.textContent = `// FETCH FAILED\n// ${err.message}\n//\n// TIPS:\n// - Try: example.com\n// - Try: httpbin.org/html\n// - Some websites block CORS requests`;
      hljs.highlightElement(codeViewer);
      previewUrlDisplay.innerText = 'Connection failed';
    }
  }

  // ==========================================
  // RESET FUNCTIONS
  // ==========================================
  
  function resetExtractor() {
    urlInput.value = '';
    statusText.innerText = 'CONNECTION: STANDBY';
    clearLog(hackerLog);
    addLog(hackerLog, 'System initialized...');
    addLog(hackerLog, 'Security protocols active...');
    addLog(hackerLog, 'Enter URL and press EXECUTE...');
    codeViewer.textContent = `// Enter a URL above and click EXECUTE\n// HTML source will appear here...\n//\n// TIPS:\n// - Try: example.com\n// - Try: httpbin.org/html`;
    hljs.highlightElement(codeViewer);
    livePreview.src = 'about:blank';
    previewUrlDisplay.innerText = 'No URL loaded';
    addLog(hackerLog, '🔄 Reset to initial state');
    playBeep('click');
  }
  
  function resetDownloader() {
    dlUrlInput.value = '';
    clearLog(dlHackerLog);
    addLog(dlHackerLog, 'Ready for extraction...');
    addLog(dlHackerLog, 'Enter URL and press EXTRACT...');
    dlProgress.style.width = '0%';
    dlMessage.innerText = '⚡ Awaiting target URL ⚡';
    assetList.innerHTML = '';
    playBeep('click');
  }

  // ==========================================
  // DOWNLOAD WEBSITE AS ZIP
  // ==========================================
  
  async function downloadWebsite(url) {
    if(!url) {
      addLog(dlHackerLog, '❌ Please enter a URL');
      return;
    }
    
    if(!url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
      dlUrlInput.value = url;
    }
    
    clearLog(dlHackerLog);
    addLog(dlHackerLog, `🎯 Target: ${url}`);
    assetList.innerHTML = '';
    dlMessage.innerText = '⚡ Connecting...';
    dlProgress.style.width = '5%';
    playBeep('click');
    
    try {
      const response = await fetchWithProxyForDownloader(url, dlHackerLog, 20000);
      const html = await response.text();
      addLog(dlHackerLog, `📄 HTML: ${html.length} bytes`);
      dlProgress.style.width = '20%';
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const cssLinks = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href);
      const jsScripts = [...doc.querySelectorAll('script[src]')].map(s => s.src);
      
      const zip = new JSZip();
      zip.file('index.html', html);
      
      const allAssets = [...cssLinks, ...jsScripts].filter(h => h && !h.startsWith('data:'));
      let progress = 20;
      const fetched = [];
      
      for(let asset of allAssets) {
        try {
          const absolute = new URL(asset, url).href;
          const res = await fetchWithProxyForDownloader(absolute, dlHackerLog, 10000);
          if(res.ok) {
            const blob = await res.blob();
            let name = absolute.replace(url, '').replace(/^\//, '') || `asset_${Date.now()}`;
            if(!name.includes('.')) name += asset.includes('.css') ? '.css' : '.js';
            zip.file(name, blob);
            fetched.push(name);
            assetList.innerHTML += `<div>📄 ${name}</div>`;
          }
        } catch(e) {}
        progress = Math.min(95, progress + 8);
        dlProgress.style.width = progress + '%';
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `website_${Date.now()}.zip`;
      a.click();
      
      dlProgress.style.width = '100%';
      dlMessage.innerText = `✅ Downloaded ${fetched.length} files`;
      addLog(dlHackerLog, `🎉 Complete! ${fetched.length} files zipped.`);
      playBeep('success');
      
    } catch(err) {
      dlMessage.innerText = '❌ Extraction failed';
      addLog(dlHackerLog, `❌ ${err.message}`);
      addLog(dlHackerLog, '💡 Try: example.com or httpbin.org');
    }
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  
  fetchBtn.addEventListener('click', () => fetchAndDisplay(urlInput.value.trim()));
  resetExtractorBtn.addEventListener('click', resetExtractor);
  
  copyBtn.addEventListener('click', async () => {
    if(codeViewer.textContent.includes('Enter a URL')) {
      addLog(hackerLog, '⚠️ No content to copy');
      return;
    }
    await navigator.clipboard.writeText(codeViewer.textContent);
    addLog(hackerLog, '📋 Copied to clipboard');
    playBeep('click');
  });
  
  downloadHtmlBtn.addEventListener('click', () => {
    if(codeViewer.textContent.includes('Enter a URL')) {
      addLog(hackerLog, '⚠️ No content to download');
      return;
    }
    const blob = new Blob([codeViewer.textContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'extracted.html';
    a.click();
    addLog(hackerLog, '⬇ Downloaded HTML');
    playBeep('click');
  });
  
  beautifyBtn.addEventListener('click', () => {
    if(codeViewer.textContent.includes('Enter a URL')) return;
    try {
      let formatted = codeViewer.textContent;
      let indent = 0;
      let result = '';
      formatted.split(/>\s*</).forEach(el => {
        if(el.match(/^\/\w/)) indent--;
        result += '  '.repeat(Math.max(0, indent)) + '<' + el + '>\n';
        if(el.match(/^<?\w[^>]*[^\/]$/) && !el.startsWith('input')) indent++;
      });
      codeViewer.textContent = result;
      hljs.highlightElement(codeViewer);
      addLog(hackerLog, '✨ Beautified');
      playBeep('click');
    } catch(e) {}
  });
  
  minifyBtn.addEventListener('click', () => {
    if(codeViewer.textContent.includes('Enter a URL')) return;
    codeViewer.textContent = codeViewer.textContent.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    hljs.highlightElement(codeViewer);
    addLog(hackerLog, '⚡ Minified');
    playBeep('click');
  });
  
  downloadSiteBtn.addEventListener('click', () => downloadWebsite(dlUrlInput.value.trim()));
  resetDownloaderBtn.addEventListener('click', resetDownloader);
  
  urlInput.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') fetchBtn.click();
    if(e.key === 'Escape') resetExtractor();
  });
  
  dlUrlInput.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') downloadSiteBtn.click();
    if(e.key === 'Escape') resetDownloader();
  });
  
  document.querySelectorAll('button').forEach(b => b.addEventListener('click', () => playBeep('click')));

})();
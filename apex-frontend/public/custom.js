if (typeof window !== "undefined" && typeof document !== "undefined") {
    const tabs = document.querySelectorAll('.styled-tab');
    const bgImage = "url('./images/cardbg.svg')";
  
    function applyTabStyles() {
      tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
          tab.style.backgroundImage = "linear-gradient(160deg, #0093e9, #80d0c7)";
          tab.style.backgroundColor = "transparent";
          tab.style.color = "white";
          tab.style.fontWeight = "bold";
        } else {
          tab.style.backgroundColor = "#111827";
          tab.style.color = "white";
          tab.style.fontWeight = "normal";
          tab.style.backgroundImage = bgImage;
          tab.style.backgroundSize = "cover";
          tab.style.backgroundPosition = "center";
        }
        tab.style.padding = "1rem 2rem";
        tab.style.fontSize = "1.25rem";
        tab.style.borderRadius = "0.5rem";
        tab.style.margin = "0.5rem";
      });
    }
  
    tabs.forEach(tab => {
      tab.addEventListener('shown.bs.tab', applyTabStyles);
    });
  
    applyTabStyles(); // Initial styling
  }
  
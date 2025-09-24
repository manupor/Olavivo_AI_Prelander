import { BrandConfig } from '../../lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  // Safely extract brand data with fallbacks
  const brandName = brand.brandName || 'Casino Slots'
  const logoUrl = brand.logoUrl || ''
  const colors = {
    primary: brand.colors?.primary || '#FFD700',
    secondary: brand.colors?.secondary || '#FF6B35', 
    accent: brand.colors?.accent || '#FF1744'
  }
  const headline = brand.copy?.headline || 'WIN BIG WITH CASINO SLOTS!'
  const subheadline = brand.copy?.subheadline || 'Join thousands of winners playing the hottest slots!'
  const cta = brand.copy?.cta || 'PLAY NOW & WIN BIG!'

  const css = `
    :root {
      --brand-primary: ${colors.primary};
      --brand-secondary: ${colors.secondary};
      --brand-accent: ${colors.accent};
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Orbitron', monospace;
      background: linear-gradient(145deg, #1A0F08, #2C1810);
      color: white;
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .main-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--brand-primary);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: white;
      margin-bottom: 20px;
    }
    
    .bonus-timer {
      background: linear-gradient(45deg, var(--brand-secondary), var(--brand-accent));
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      font-weight: bold;
      display: inline-block;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
      animation: pulse 2s infinite;
    }
    
    .slot-machine {
      background: linear-gradient(145deg, #1A0F08, #2C1810);
      border: 6px solid var(--brand-primary);
      border-radius: 25px;
      padding: 40px;
      box-shadow: 0 0 50px rgba(255, 215, 0, 0.6);
      margin-bottom: 40px;
    }
    
    .prize-display {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 30px;
    }
    
    .prize-item {
      padding: 15px;
      border-radius: 15px;
      text-align: center;
      border: 3px solid;
      min-width: 100px;
      font-weight: bold;
    }
    
    .prize-item.green {
      background: #22c55e;
      border-color: #16a34a;
    }
    
    .prize-item.purple {
      background: #8b5cf6;
      border-color: #7c3aed;
    }
    
    .slot-game {
      background: rgba(0, 0, 0, 0.6);
      border-radius: 20px;
      padding: 30px;
    }
    
    .rollover-line {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 15px;
      padding: 15px;
      background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
      border: 3px solid var(--brand-primary);
      border-radius: 15px;
    }
    
    .rollover-symbol {
      width: 80px;
      height: 80px;
      background: linear-gradient(145deg, var(--brand-secondary), var(--brand-primary));
      border: 2px solid var(--brand-accent);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }
    
    .spin-button {
      width: 100%;
      background: linear-gradient(45deg, var(--brand-secondary), var(--brand-accent));
      color: white;
      border: 3px solid var(--brand-primary);
      border-radius: 15px;
      padding: 20px;
      font-size: 1.5rem;
      font-weight: 900;
      cursor: pointer;
      margin-top: 20px;
      animation: pulse 2s infinite;
    }
    
    .spin-button:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
    
    .features {
      display: flex;
      gap: 30px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .feature-item {
      background: rgba(0, 0, 0, 0.7);
      border: 2px solid var(--brand-primary);
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      min-width: 150px;
      color: var(--brand-primary);
      font-weight: bold;
    }
    
    .cta-section {
      text-align: center;
    }
    
    .cta-button {
      background: linear-gradient(45deg, var(--brand-primary), var(--brand-accent));
      color: #000;
      border: 3px solid var(--brand-primary);
      border-radius: 15px;
      padding: 20px 40px;
      font-size: 1.5rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
      animation: pulse 2s infinite;
    }
    
    .cta-button:hover {
      transform: scale(1.05);
      opacity: 0.9;
    }
    
    .disclaimer {
      color: #888;
      font-size: 0.8rem;
      margin-top: 20px;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes spin {
      0% { transform: rotateY(0deg); }
      25% { transform: rotateY(90deg); }
      50% { transform: rotateY(180deg); }
      75% { transform: rotateY(270deg); }
      100% { transform: rotateY(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
      40%, 43% { transform: translateY(-30px); }
      70% { transform: translateY(-15px); }
      90% { transform: translateY(-4px); }
    }
    
    .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
    .animate-bounce { animation: bounce 1s infinite; }
    .spinning { animation: spin 0.1s linear infinite; }
    
    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .modal.show {
      display: flex;
    }
    
    .win-content {
      background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
      max-width: 500px;
      margin: 20px;
    }
    
    .win-content h2 {
      font-size: 2.5rem;
      font-weight: 900;
      color: #000;
      margin-bottom: 20px;
    }
    
    .win-content p {
      font-size: 1.2rem;
      color: #000;
      margin-bottom: 10px;
    }
    
    .claim-btn {
      background: #22c55e;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      margin: 20px 0;
      width: 100%;
    }
    
    .claim-btn:hover {
      background: #16a34a;
      transform: scale(1.05);
    }
    
    .close-btn {
      background: none;
      border: none;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
      text-decoration: underline;
      font-size: 0.9rem;
    }
    
    .close-btn:hover {
      color: #000;
    }
    
    @media (max-width: 768px) {
      .main-title {
        font-size: 2rem;
      }
      
      .rollover-symbol {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
      }
      
      .features {
        gap: 15px;
      }
      
      .feature-item {
        min-width: 120px;
        padding: 15px;
      }
      
      .slot-machine {
        padding: 20px;
      }
      
      .rollover-line {
        gap: 10px;
        padding: 10px;
      }
    }
  `

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${brandName} - ${headline}</title>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
      <style>${css}</style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <header class="header">
          ${logoUrl ? `
          <div style="margin-bottom: 20px;">
            <img src="${logoUrl}" alt="${brandName}" style="height: 60px; width: auto; max-width: 200px; object-fit: contain;" onerror="this.style.display='none';" />
          </div>
          ` : ''}
          <h1 class="main-title">🏆 ${headline} 🏆</h1>
          <p class="subtitle">${subheadline}</p>
          <div class="bonus-timer">⏰ Bonus expires: 5:55</div>
        </header>

        <!-- Slot Machine -->
        <div class="slot-machine">
          <div class="prize-display">
            <div class="prize-item green">🎁<br>WIN $5,000</div>
            <div class="prize-item purple">💎<br>MIN $1,000</div>
          </div>
          
          <div class="slot-game">
            <div class="rollover-line">
              <div class="rollover-symbol" id="slot0">💎</div>
              <div class="rollover-symbol" id="slot1">🎰</div>
              <div class="rollover-symbol" id="slot2">🍒</div>
            </div>
            <div class="rollover-line">
              <div class="rollover-symbol" id="slot3">🏆</div>
              <div class="rollover-symbol" id="slot4">💰</div>
              <div class="rollover-symbol" id="slot5">⭐</div>
            </div>
            <div class="rollover-line">
              <div class="rollover-symbol" id="slot6">💎</div>
              <div class="rollover-symbol" id="slot7">🎰</div>
              <div class="rollover-symbol" id="slot8">🍒</div>
            </div>
            <button class="spin-button" id="spinButton">ROLL TO WIN!</button>
          </div>
        </div>

        <!-- Features -->
        <div class="features">
          <div class="feature-item">💎<br>Instant Payouts</div>
          <div class="feature-item">🎁<br>Welcome Bonus</div>
          <div class="feature-item">🏆<br>24/7 Support</div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <button class="cta-button" id="playNowBtn">🏆 ${cta} 🏆</button>
          <p class="disclaimer">18+ only. Gamble Responsibly. Terms & Conditions Apply.</p>
        </div>
      </div>

      <!-- Win Modal -->
      <div id="winModal" class="modal">
        <div class="win-content">
          <h2>🎉 CONGRATULATIONS! 🎉</h2>
          <p>You won <span style="font-weight: bold; font-size: 1.5em; color: #22c55e;">$1,000</span>!</p>
          <p>🎁 Plus 50 FREE SPINS!</p>
          <button class="claim-btn" id="claimBtn">CLAIM YOUR PRIZE NOW!</button>
          <button class="close-btn" id="closeModal">Close</button>
        </div>
      </div>

      <script>
        // Slot machine functionality
        let spinCount = 0;
        let isSpinning = false;
        const symbols = ['💎', '🎰', '🍒', '🏆', '💰', '⭐'];
        
        function updateSlotSymbols() {
          for (let i = 0; i < 9; i++) {
            const slot = document.getElementById('slot' + i);
            if (slot) {
              if (spinCount >= 2) {
                // Show winning combination
                slot.textContent = '🏆';
              } else {
                // Show random symbols
                slot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
              }
            }
          }
        }
        
        function showWinModal() {
          const modal = document.getElementById('winModal');
          modal.classList.add('show');
        }
        
        // Spin button functionality
        document.getElementById('spinButton').addEventListener('click', function() {
          if (isSpinning) return;
          
          isSpinning = true;
          spinCount++;
          
          const button = this;
          button.textContent = 'SPINNING...';
          button.style.opacity = '0.5';
          button.style.cursor = 'not-allowed';
          
          // Add spinning animation to all symbols
          const slotSymbols = document.querySelectorAll('.rollover-symbol');
          slotSymbols.forEach(symbol => {
            symbol.classList.add('spinning');
          });
          
          // Rapidly change symbols during spin
          const spinInterval = setInterval(() => {
            for (let i = 0; i < 9; i++) {
              const slot = document.getElementById('slot' + i);
              if (slot) {
                slot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
              }
            }
          }, 100);
          
          // Stop spinning after 2 seconds
          setTimeout(() => {
            clearInterval(spinInterval);
            
            // Remove spin animation
            slotSymbols.forEach(symbol => {
              symbol.classList.remove('spinning');
            });
            
            // Update final symbols
            updateSlotSymbols();
            
            // Reset button
            button.textContent = 'ROLL TO WIN!';
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            isSpinning = false;
            
            // Show win modal on second attempt
            if (spinCount === 2) {
              setTimeout(() => {
                showWinModal();
              }, 500);
            }
          }, 2000);
        });

        // Close win modal
        document.getElementById('closeModal').addEventListener('click', function() {
          const modal = document.getElementById('winModal');
          modal.classList.remove('show');
        });

        // CTA buttons
        const ctaUrl = '${brand.ctaUrl || 'https://example.com'}';
        
        document.getElementById('claimBtn').addEventListener('click', function() {
          if (ctaUrl && ctaUrl !== 'https://example.com') {
            window.open(ctaUrl, '_blank');
          }
        });
        
        document.getElementById('playNowBtn').addEventListener('click', function() {
          if (ctaUrl && ctaUrl !== 'https://example.com') {
            window.open(ctaUrl, '_blank');
          }
        });
      </script>
    </body>
    </html>
  `

  return {
    html,
    css
  }
}

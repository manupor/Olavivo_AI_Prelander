import React from 'react'
import { BrandConfig } from '@/lib/types'

interface Template6Props {
  brand: BrandConfig
}

export function Template6({ brand }: Template6Props) {
  const [spinCount, setSpinCount] = React.useState(0);
  const [showWinModal, setShowWinModal] = React.useState(false);
  const [isSpinning, setIsSpinning] = React.useState(false);

  const symbols = ['💎', '🎰', '🍒', '🏆', '💰', '⭐'];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSpinCount(prev => prev + 1);
    
    // Animate the spin for 2 seconds
    setTimeout(() => {
      setIsSpinning(false);
      
      // Show win modal on second attempt
      if (spinCount + 1 === 2) {
        setTimeout(() => {
          setShowWinModal(true);
        }, 500);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black font-mono relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80"></div>

      {/* Floating Symbols */}
      <div className="floating-symbols absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-4xl animate-bounce" style={{ animationDelay: '0s' }}>💎</div>
        <div className="absolute top-[20%] right-[10%] text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🎰</div>
        <div className="absolute bottom-[30%] left-[8%] text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🍒</div>
        <div className="absolute bottom-[15%] right-[15%] text-4xl animate-bounce" style={{ animationDelay: '3s' }}>🏆</div>
        <div className="absolute top-[50%] left-[3%] text-4xl animate-bounce" style={{ animationDelay: '4s' }}>💰</div>
        <div className="absolute top-[70%] right-[5%] text-4xl animate-bounce" style={{ animationDelay: '5s' }}>⭐</div>
      </div>

      {/* Main Container */}
      <div className="container relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4 animate-pulse">
            🏆 {brand.copy.headline || `${brand.brandName.toUpperCase()} WINS AWAIT!`} 🏆
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            {brand.copy.subheadline || 'Join thousands of winners playing the hottest slots of 2025!'}
          </p>
          
          {/* Bonus Timer */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
            <span>⏰</span>
            <span>Bonus expires: 5:55</span>
          </div>
        </header>

        {/* Slot Machine Container */}
        <div className="slot-machine bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-4 border-yellow-400 rounded-3xl p-8 mb-8 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-3xl animate-pulse"></div>
          
          {/* Prize Display */}
          <div className="prize-display flex justify-center gap-6 mb-8">
            <div className="prize-item bg-green-600 border-2 border-green-400 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🎁</div>
              <div className="text-white font-bold text-sm">WIN<br />$5,000</div>
            </div>
            <div className="prize-item bg-purple-600 border-2 border-purple-400 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💎</div>
              <div className="text-white font-bold text-sm">MIN<br />$1,000</div>
            </div>
          </div>

          {/* Slot Game */}
          <div className="slot-game bg-black/60 rounded-2xl p-6">
            {/* Slot Machine Lines */}
            <div className="slot-lines space-y-2 mb-6">
              {[0, 1, 2].map((lineIndex) => (
                <div key={lineIndex} className="rollover-line flex justify-center gap-2">
                  {[0, 1, 2].map((symbolIndex) => {
                    const currentSymbol = spinCount >= 2 ? '🏆' : symbols[Math.floor(Math.random() * symbols.length)];
                    return (
                      <div
                        key={symbolIndex}
                        className={`rollover-symbol w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-yellow-400 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                          isSpinning ? 'animate-spin' : ''
                        }`}
                      >
                        <div className="rollover-icon text-2xl">
                          {isSpinning ? symbols[Math.floor(Math.random() * symbols.length)] : currentSymbol}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Spin Button */}
            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className={`spin-button w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xl py-4 px-8 rounded-xl border-2 border-yellow-400 shadow-lg transform hover:scale-105 transition-all duration-200 ${
                isSpinning ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'
              }`}
            >
              {isSpinning ? 'SPINNING...' : 'ROLL TO WIN!'}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="features flex flex-wrap justify-center gap-6 mb-8">
          <div className="feature-item bg-black/70 border border-yellow-400 rounded-lg p-4 text-center min-w-[120px]">
            <div className="text-2xl mb-2">💎</div>
            <div className="text-yellow-400 font-bold text-sm">Instant Payouts</div>
          </div>
          <div className="feature-item bg-black/70 border border-yellow-400 rounded-lg p-4 text-center min-w-[120px]">
            <div className="text-2xl mb-2">🎁</div>
            <div className="text-yellow-400 font-bold text-sm">Welcome Bonus</div>
          </div>
          <div className="feature-item bg-black/70 border border-yellow-400 rounded-lg p-4 text-center min-w-[120px]">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-yellow-400 font-bold text-sm">24/7 Support</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section text-center">
          <button 
            id="playNowBtn"
            className="cta-button bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-xl md:text-2xl py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse"
            style={{ 
              color: 'var(--brand-primary, #000000)',
              backgroundColor: 'var(--brand-accent, #fbbf24)'
            }}
            onClick={() => brand.ctaUrl && window.open(brand.ctaUrl, '_blank')}
          >
            🏆 {brand.copy.cta || 'PLAY NOW & WIN BIG!'} 🏆
          </button>
          <p className="text-gray-400 text-sm mt-4">18+ only. Gamble Responsibly. Terms & Conditions Apply.</p>
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="win-content bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-2xl text-center shadow-2xl max-w-md mx-4 animate-bounce">
            <h2 className="text-3xl font-black text-black mb-4">🎉 CONGRATULATIONS! 🎉</h2>
            <p className="text-xl text-black mb-2">You won <span className="font-bold text-2xl text-green-800">$1,000</span>!</p>
            <p className="text-black mb-6">🎁 Plus 50 FREE SPINS!</p>
            <button 
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200 mb-3 w-full"
              onClick={() => brand.ctaUrl && window.open(brand.ctaUrl, '_blank')}
            >
              CLAIM YOUR PRIZE NOW!
            </button>
            <button 
              className="block mx-auto text-black/70 hover:text-black text-sm underline"
              onClick={() => setShowWinModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.brandName} - Win Big!</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-primary: ${brand.colors.primary};
            --brand-secondary: ${brand.colors.secondary};
            --brand-accent: ${brand.colors.accent};
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
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
            transition: all 0.3s ease;
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
            transition: all 0.3s ease;
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
            transition: all 0.3s ease;
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
        
        .spinning {
            animation: spin 0.1s linear infinite;
        }
        
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
            transition: all 0.3s ease;
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
            .main-title { font-size: 2rem; } 
            .rollover-symbol { width: 60px; height: 60px; font-size: 1.5rem; } 
            .features { gap: 15px; } 
            .feature-item { min-width: 120px; padding: 15px; } 
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            ${brand.logoUrl ? `
            <div style="margin-bottom: 20px;">
                <img src="${brand.logoUrl}" alt="${brand.brandName}" style="height: 60px; width: auto; max-width: 200px; object-fit: contain;" onerror="this.style.display='none';" />
            </div>
            ` : ''}
            <h1 class="main-title">🏆 ${brand.copy.headline || `${brand.brandName.toUpperCase()} WINS AWAIT!`} 🏆</h1>
            <p class="subtitle">${brand.copy.subheadline || 'Join thousands of winners playing the hottest slots of 2025!'}</p>
            <div class="bonus-timer">⏰ Bonus expires: 5:55</div>
        </header>
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
        <div class="features">
            <div class="feature-item">💎<br>Instant Payouts</div>
            <div class="feature-item">🎁<br>Welcome Bonus</div>
            <div class="feature-item">🏆<br>24/7 Support</div>
        </div>
        <div class="cta-section">
            <button class="cta-button" id="playNowBtn">🏆 ${brand.copy.cta || 'PLAY NOW & WIN BIG!'} 🏆</button>
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
</html>`;

  const css = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Orbitron', monospace; background: linear-gradient(145deg, #1A0F08, #2C1810); color: white; min-height: 100vh; overflow-x: hidden; }
.container { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; max-width: 1200px; margin: 0 auto; position: relative; }
.header { text-align: center; margin-bottom: 40px; }
.main-title { font-size: 2.5rem; font-weight: 900; color: #FFD700; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); margin-bottom: 20px; animation: pulse 2s infinite; }
.subtitle { font-size: 1.2rem; color: white; margin-bottom: 20px; }
.bonus-timer { background: linear-gradient(45deg, #FF6B35, #FF8C42); color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4); animation: pulse 2s infinite; }
.slot-machine { background: linear-gradient(145deg, #1A0F08, #2C1810); border: 6px solid #FFD700; border-radius: 25px; padding: 40px; box-shadow: 0 0 50px rgba(255, 215, 0, 0.6); margin-bottom: 40px; }
.prize-display { display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; }
.prize-item { padding: 15px; border-radius: 15px; text-align: center; border: 3px solid; min-width: 100px; font-weight: bold; }
.prize-item.green { background: #22c55e; border-color: #16a34a; }
.prize-item.purple { background: #8b5cf6; border-color: #7c3aed; }
.slot-game { background: rgba(0, 0, 0, 0.6); border-radius: 20px; padding: 30px; }
.rollover-line { display: flex; gap: 20px; justify-content: center; margin-bottom: 15px; padding: 15px; background: linear-gradient(145deg, #0a0a0a, #1a1a1a); border: 3px solid #FFD700; border-radius: 15px; }
.rollover-symbol { width: 80px; height: 80px; background: linear-gradient(145deg, #2a2a2a, #1a1a1a); border: 2px solid #FFD700; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
.spin-button { width: 100%; background: linear-gradient(45deg, #dc2626, #ef4444); color: white; border: 3px solid #FFD700; border-radius: 15px; padding: 20px; font-size: 1.5rem; font-weight: 900; cursor: pointer; margin-top: 20px; animation: pulse 2s infinite; }
.features { display: flex; gap: 30px; margin-bottom: 40px; flex-wrap: wrap; justify-content: center; }
.feature-item { background: rgba(0, 0, 0, 0.7); border: 2px solid #FFD700; border-radius: 15px; padding: 20px; text-align: center; min-width: 150px; color: #FFD700; font-weight: bold; }
.cta-section { text-align: center; }
.cta-button { background: linear-gradient(45deg, #FFD700, #FFA500); color: #000; border: 3px solid #FFD700; border-radius: 15px; padding: 20px 40px; font-size: 1.5rem; font-weight: 900; cursor: pointer; box-shadow: 0 0 30px rgba(255, 215, 0, 0.6); animation: pulse 2s infinite; }
.disclaimer { color: #888; font-size: 0.8rem; margin-top: 20px; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@media (max-width: 768px) { .main-title { font-size: 2rem; } .rollover-symbol { width: 60px; height: 60px; font-size: 1.5rem; } .features { gap: 15px; } .feature-item { min-width: 120px; padding: 15px; } }`;

  return { html, css }
}

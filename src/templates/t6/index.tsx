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
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
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
                    <div class="rollover-symbol">💎</div>
                    <div class="rollover-symbol">🎰</div>
                    <div class="rollover-symbol">🍒</div>
                </div>
                <div class="rollover-line">
                    <div class="rollover-symbol">🏆</div>
                    <div class="rollover-symbol">💰</div>
                    <div class="rollover-symbol">⭐</div>
                </div>
                <div class="rollover-line">
                    <div class="rollover-symbol">💎</div>
                    <div class="rollover-symbol">🎰</div>
                    <div class="rollover-symbol">🍒</div>
                </div>
                <button class="spin-button">ROLL TO WIN!</button>
            </div>
        </div>
        <div class="features">
            <div class="feature-item">💎<br>Instant Payouts</div>
            <div class="feature-item">🎁<br>Welcome Bonus</div>
            <div class="feature-item">🏆<br>24/7 Support</div>
        </div>
        <div class="cta-section">
            <button class="cta-button">🏆 ${brand.copy.cta || 'PLAY NOW & WIN BIG!'} 🏆</button>
            <p class="disclaimer">18+ only. Gamble Responsibly. Terms & Conditions Apply.</p>
        </div>
    </div>
    <script>
        // Slot machine functionality
        let spinCount = 0;
        let isSpinning = false;
        const symbols = ['💎', '🎰', '🍒', '🏆', '💰', '⭐'];
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = \`
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
        \`;
        document.head.appendChild(style);
        
        function updateSlotSymbols() {
            const slotSymbols = document.querySelectorAll('.rollover-symbol .rollover-icon');
            slotSymbols.forEach((symbol, index) => {
                if (spinCount >= 2) {
                    // Show winning combination
                    symbol.textContent = '🏆';
                } else {
                    // Show random symbols
                    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                }
            });
        }
        
        function showWinModal() {
            const modal = document.getElementById('winModal');
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            modal.classList.add('animate-fadeIn');
            
            const content = modal.querySelector('.win-content');
            content.classList.add('animate-bounce');
        }
        
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
                symbol.style.animation = 'spin 0.1s linear infinite';
            });
            
            // Rapidly change symbols during spin
            const spinInterval = setInterval(() => {
                const symbolElements = document.querySelectorAll('.rollover-symbol .rollover-icon');
                symbolElements.forEach(symbol => {
                    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                });
            }, 100);
            
            // Stop spinning after 2 seconds
            setTimeout(() => {
                clearInterval(spinInterval);
                
                // Remove spin animation
                slotSymbols.forEach(symbol => {
                    symbol.style.animation = '';
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
            modal.style.display = 'none';
            modal.classList.add('hidden');
        });

        // Claim button and CTA button
        const ctaUrl = '${brand.ctaUrl || 'https://example.com'}';
        
        document.getElementById('claimBtn').addEventListener('click', function() {
            window.open(ctaUrl, '_blank');
        });
        
        document.getElementById('playNowBtn').addEventListener('click', function() {
            window.open(ctaUrl, '_blank');
        });
</script>
    <div id="winModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 hidden">
        <div class="win-content bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-2xl text-center shadow-2xl max-w-md mx-4">
            <h2 class="text-3xl font-black text-black mb-4">🎉 CONGRATULATIONS! 🎉</h2>
            <p class="text-xl text-black mb-2">You won <span id="winAmount" class="font-bold text-2xl">$1,000</span>!</p>
            <p class="text-black mb-6">🎁 Plus 50 FREE SPINS!</p>
            <button id="claimBtn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200">CLAIM YOUR PRIZE NOW!</button>
            <button id="closeModal" class="block mx-auto mt-4 text-black/70 hover:text-black text-sm underline">Close</button>
        </div>
    </div>
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

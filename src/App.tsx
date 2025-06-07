import React, { useState, useEffect } from 'react';
import './App.css';

interface ZodiacSign {
  name: string;
  date: string;
  element: string;
  planet: string;
  symbol: string;
  gradient: string;
}

interface Fortune {
  message: string;
  emoji: string;
  luck: "high" | "medium" | "low";
  percentage: number;
}

const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', planet: 'Mars', symbol: '♈', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', planet: 'Venus', symbol: '♉', gradient: 'from-purple-100 to-pink-100' },
  { name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', planet: 'Mercury', symbol: '♊', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', planet: 'Moon', symbol: '♋', gradient: 'from-purple-100 to-pink-100' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', planet: 'Sun', symbol: '♌', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', planet: 'Mercury', symbol: '♍', gradient: 'from-purple-100 to-pink-100' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', planet: 'Venus', symbol: '♎', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', planet: 'Pluto', symbol: '♏', gradient: 'from-purple-100 to-pink-100' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', planet: 'Jupiter', symbol: '♐', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', planet: 'Saturn', symbol: '♑', gradient: 'from-purple-100 to-pink-100' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', planet: 'Uranus', symbol: '♒', gradient: 'from-indigo-100 to-purple-100' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', planet: 'Neptune', symbol: '♓', gradient: 'from-purple-100 to-pink-100' }
];

function App() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateWinningPercentage = (sign: ZodiacSign): number => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    const date = currentTime.getDate();
    
    // Base percentage influenced by time of day
    let basePercentage = 50;
    
    // Adjust based on hour (some signs are luckier at certain times)
    if (hour >= 6 && hour < 12) basePercentage += 10; // Morning bonus
    if (hour >= 12 && hour < 18) basePercentage += 5;  // Afternoon bonus
    if (hour >= 18 && hour < 24) basePercentage += 15; // Evening bonus
    
    // Adjust based on day of week
    if (day === 0 || day === 6) basePercentage += 5; // Weekend bonus
    
    // Adjust based on date (odd/even)
    if (date % 2 === 0) basePercentage += 5; // Even date bonus
    
    // Element-based adjustments
    switch(sign.element) {
      case 'Fire': basePercentage += 10; break;
      case 'Water': basePercentage += 5; break;
      case 'Air': basePercentage += 8; break;
      case 'Earth': basePercentage += 7; break;
    }
    
    // Random factor (-10 to +10)
    const randomFactor = Math.floor(Math.random() * 21) - 10;
    basePercentage += randomFactor;
    
    // Ensure percentage stays within 0-100
    return Math.min(Math.max(basePercentage, 0), 100);
  };

  const getFortune = () => {
    if (!selectedSign) return;
    setLoading(true);
    setTimeout(() => {
      const percentage = calculateWinningPercentage(selectedSign);
      let fortune: Fortune;
      
      if (percentage >= 70) {
        fortune = {
          message: "The stars align in your favor! Your bet is blessed with cosmic energy.",
          emoji: "✨",
          luck: "high",
          percentage
        };
      } else if (percentage >= 40) {
        fortune = {
          message: "A balanced cosmic energy surrounds your bet. Proceed with caution.",
          emoji: "⚖️",
          luck: "medium",
          percentage
        };
      } else {
        fortune = {
          message: "The stars suggest reconsidering your bet today.",
          emoji: "🌠",
          luck: "low",
          percentage
        };
      }
      
      setFortune(fortune);
      setLoading(false);
    }, 1500);
  };

  const filteredSigns = zodiacSigns.filter(sign =>
    sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sign.date.includes(searchTerm)
  );

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-indigo-600">
          Bet Fortune Teller
        </h1>
        
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Current Time</h2>
            <p className="text-4xl font-mono text-indigo-700 mb-2">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-xl text-indigo-500">
              {currentTime.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <input
            type="text"
            placeholder="Search by sign name or date..."
            className="w-full p-4 rounded-xl text-[#1e293b] placeholder-indigo-300 focus:outline-none bg-white border-2 border-indigo-100 focus:border-indigo-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredSigns.map((sign) => (
            <div
              key={sign.name}
              onClick={() => setSelectedSign(sign)}
              className={`relative rounded-xl p-6 cursor-pointer bg-white shadow-md hover:shadow-lg transition-all duration-300 ${
                selectedSign?.name === sign.name ? 'ring-2 ring-indigo-500 scale-105' : ''
              }`}
            >
              <div className="relative z-10">
                <div className="text-5xl mb-4 text-indigo-600">{sign.symbol}</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{sign.name}</h3>
                <p className="text-indigo-500 mb-3">{sign.date}</p>
                <div className="flex justify-between text-sm">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">{sign.element}</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">{sign.planet}</span>
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${sign.gradient} rounded-xl opacity-20 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {selectedSign && (
          <div className="text-center mb-12">
            <button
              onClick={getFortune}
              disabled={loading}
              className="px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Reading the stars...
                </span>
              ) : (
                'Get Your Fortune'
              )}
            </button>
          </div>
        )}

        {fortune && (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
            <div className="text-center">
              <div className="text-7xl mb-6">{fortune.emoji}</div>
              <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Your Cosmic Fortune</h2>
              <p className="text-xl text-indigo-700 leading-relaxed mb-4">{fortune.message}</p>
              <div className="text-4xl font-bold mb-8">
                <span className={getPercentageColor(fortune.percentage)}>
                  {fortune.percentage}%
                </span>
                <span className="text-indigo-600 text-2xl ml-2">Chance of Winning</span>
              </div>
              <div className="flex justify-center space-x-4">
                <span className="px-6 py-3 bg-indigo-50 rounded-full text-indigo-600">Lucky Time</span>
                <span className="px-6 py-3 bg-indigo-50 rounded-full text-indigo-600">Favorable Bet</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 
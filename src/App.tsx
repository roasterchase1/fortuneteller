import React, { useState, useEffect } from 'react';

const zodiacSigns = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', icon: '♈', element: 'Fire', planet: 'Mars', color: 'from-red-500 to-orange-500' },
  { name: 'Taurus', date: 'Apr 20 - May 20', icon: '♉', element: 'Earth', planet: 'Venus', color: 'from-green-500 to-emerald-500' },
  { name: 'Gemini', date: 'May 21 - Jun 20', icon: '♊', element: 'Air', planet: 'Mercury', color: 'from-blue-400 to-cyan-400' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', icon: '♋', element: 'Water', planet: 'Moon', color: 'from-blue-600 to-indigo-600' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', icon: '♌', element: 'Fire', planet: 'Sun', color: 'from-yellow-400 to-orange-400' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', icon: '♍', element: 'Earth', planet: 'Mercury', color: 'from-green-600 to-emerald-600' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', icon: '♎', element: 'Air', planet: 'Venus', color: 'from-pink-400 to-purple-400' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: '♏', element: 'Water', planet: 'Mars', color: 'from-red-600 to-purple-600' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', icon: '♐', element: 'Fire', planet: 'Jupiter', color: 'from-purple-500 to-indigo-500' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', icon: '♑', element: 'Earth', planet: 'Saturn', color: 'from-gray-600 to-slate-600' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', icon: '♒', element: 'Air', planet: 'Uranus', color: 'from-cyan-400 to-blue-400' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', icon: '♓', element: 'Water', planet: 'Neptune', color: 'from-indigo-400 to-purple-400' }
];

const fortunes = [
  { message: "The stars align in your favor! Your bet is likely to succeed! 🌟", luck: "high", emoji: "✨" },
  { message: "The cosmic energy suggests caution. Maybe reconsider your bet. 🌙", luck: "low", emoji: "🌙" },
  { message: "The universe is neutral today. Your bet has a 50-50 chance. ⚖️", luck: "medium", emoji: "⚖️" },
  { message: "Lucky day! The celestial bodies favor your bet! 🍀", luck: "high", emoji: "🍀" },
  { message: "The stars suggest waiting for a better time. ⏳", luck: "low", emoji: "⏳" },
  { message: "Today's cosmic energy is strong! Your bet has good potential! ⭐", luck: "high", emoji: "⭐" }
];

function App() {
  const [selectedSign, setSelectedSign] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fortune, setFortune] = useState<{ message: string; luck: string; emoji: string } | null>(null);
  const [showFortune, setShowFortune] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSigns, setFilteredSigns] = useState(zodiacSigns);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const filtered = zodiacSigns.filter(sign => 
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSigns(filtered);
  }, [searchTerm]);

  const getFortune = () => {
    setShowAnimation(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setFortune(fortunes[randomIndex]);
      setShowFortune(true);
      setShowAnimation(false);
    }, 1500);
  };

  const getLuckColor = (luck: string) => {
    switch (luck) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          ✨ Bet Fortune Teller ✨
        </h1>
        
        <div className="bg-white/10 rounded-xl p-4 md:p-8 backdrop-blur-sm shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <p className="text-lg md:text-xl text-purple-200">Current Time:</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-purple-300">{currentTime.toLocaleTimeString()}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg md:text-xl mb-4 text-center text-purple-200">Select Your Zodiac Sign:</label>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search by sign or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(sign.name)}
                    className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedSign === sign.name
                        ? `bg-gradient-to-br ${sign.color} shadow-lg`
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-4xl mb-2">{sign.icon}</div>
                    <div className="font-bold text-lg">{sign.name}</div>
                    <div className="text-sm opacity-90">{sign.date}</div>
                    <div className="text-xs mt-2 opacity-70">
                      {sign.element} • {sign.planet}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={getFortune}
              disabled={!selectedSign}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Get Your Fortune
            </button>
          </div>

          {showAnimation && (
            <div className="mt-6 p-6 bg-white/10 rounded-xl animate-pulse">
              <div className="text-center text-2xl">✨ Reading the stars... ✨</div>
            </div>
          )}

          {showFortune && fortune && (
            <div className="mt-6 p-6 bg-white/10 rounded-xl animate-fade-in border border-white/20">
              <div className="text-4xl text-center mb-4">{fortune.emoji}</div>
              <p className={`text-xl md:text-2xl text-center font-semibold ${getLuckColor(fortune.luck)}`}>
                {fortune.message}
              </p>
              <div className="mt-4 text-center text-sm opacity-80">
                Luck Level: <span className={`font-bold ${getLuckColor(fortune.luck)}`}>{fortune.luck.toUpperCase()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 
import { tourRoutes } from '@/data/vietnamTourismData';
import { useLanguage } from '@/context/LanguageContext';

interface PresetTourSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTour: (tourId: string) => void;
}

export default function PresetTourSelector({ isOpen, onClose, onSelectTour }: PresetTourSelectorProps) {
  if (!isOpen) return null;

  const getGradientByRegion = (region: string) => {
    switch(region) {
      case 'north': return 'from-emerald-500 to-teal-500';
      case 'central': return 'from-purple-500 to-pink-500';
      case 'south': return 'from-amber-500 to-orange-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20 animate-slide-up relative">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🎯</span> Tour Gợi Ý / Preset Tours
            </h2>
            <p className="text-sm text-gray-300 mt-1">Chọn một hành trình tuyệt vời đã được thiết kế sẵn</p>
          </div>
          <button 
            onClick={onClose}
            className="relative z-10 w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tourRoutes.map((tour, index) => (
              <div 
                key={tour.id}
                className="group relative rounded-2xl glass-light overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getGradientByRegion(index % 2 === 0 ? 'north' : 'central')}`} />
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradientByRegion(index % 2 === 0 ? 'north' : 'central')} flex items-center justify-center text-2xl shadow-lg`}>
                        {tour.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">{tour.name.vi}</h3>
                        <p className="text-xs text-gray-400">{tour.name.en}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold whitespace-nowrap">
                      ⏱️ {tour.totalDays} Ngày
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2 min-h-[40px]">
                    {tour.description.vi}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Hành trình ({tour.stops.length} điểm):</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.stops.map((stop, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-200">
                          Chặng {stop.day}: {stop.transport.vi}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        <span>✨</span> {tour.rewards.exp} EXP
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                        <span>🪙</span> {tour.rewards.points}
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                        <span>🏅</span> {tour.rewards.badge}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onSelectTour(tour.id)}
                      className={`px-6 py-2 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${getGradientByRegion(index % 2 === 0 ? 'north' : 'central')} shadow-lg hover:shadow-xl hover:brightness-110 transition-all transform active:scale-95`}
                    >
                      Bắt đầu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

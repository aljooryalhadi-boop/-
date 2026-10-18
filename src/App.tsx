import React, { useState, useEffect } from 'react';
import { Target, ArrowLeftRight, Compass, Search, BookOpen, Terminal, Sparkles, Award, Play, RotateCcw, GraduationCap, School } from 'lucide-react';
import { GameMode } from './types/game';
import { TopNav } from './components/TopNav';
import { HunterGame } from './components/HunterGame';
import { TransformGame } from './components/TransformGame';
import { SignsGame } from './components/SignsGame';
import { DetectiveGame } from './components/DetectiveGame';
import { GrammarHandbook } from './components/GrammarHandbook';
import { GrammarAnalyzer } from './components/GrammarAnalyzer';
import { CertificateModal } from './components/CertificateModal';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('hunter');
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('amr_game_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(() => {
    const saved = localStorage.getItem('amr_game_max_streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('amr_game_player_name') || 'فارس لغة الضاد';
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => soundFx.getMuted());
  const [certificateOpen, setCertificateOpen] = useState<boolean>(false);
  const [recentBonus, setRecentBonus] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('amr_game_score', score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem('amr_game_max_streak', maxStreak.toString());
  }, [maxStreak]);

  useEffect(() => {
    localStorage.setItem('amr_game_player_name', playerName);
  }, [playerName]);

  const handleScoreUpdate = (points: number) => {
    setScore(prev => prev + points);
    setRecentBonus(points);
    setTimeout(() => {
      setRecentBonus(null);
    }, 1200);
  };

  const handleStreakUpdate = (correct: boolean) => {
    if (correct) {
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const resetProgress = () => {
    if (window.confirm('هل تريد إعادة تعيين النقاط والبدء من جديد؟')) {
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      localStorage.removeItem('amr_game_score');
      localStorage.removeItem('amr_game_max_streak');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-cairo">
      {/* Strict Top Bar Contract Header */}
      <TopNav
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        score={score}
        streak={streak}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenCertificate={() => setCertificateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Hero Banner with Light & Vibrant Blue + Maroon Theme */}
        <div className="relative rounded-3xl overflow-hidden border border-blue-100 shadow-md bg-white">
          <div className="relative min-h-[220px] sm:min-h-[250px] flex items-center">
            {/* Background Image with Luminous Scrim */}
            <img
              src="/src/assets/images/hero_arabic_grammar_quest_1792342465917.jpg"
              alt="مغامرة فرسان صيغة الأمر"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Light Scrim: Soft White to Light Blue Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-blue-900/40" />

            {/* Hero Content Overlay */}
            <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-3.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7a1827] bg-[#7a1827]/10 border border-[#7a1827]/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#7a1827]" />
                <span>لعبة تفاعلية تعليمية للغة العربية الفصحى</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#7a1827] leading-tight">
                فرسان صيغة الأمر
              </h1>

              {/* School and Student Credits Card */}
              <div className="bg-white/95 backdrop-blur border border-blue-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-[#7a1827]">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>عمل الطالبات: الجوري الحادي & نادية ولي</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  الصف: ٣ علم ١
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-1 text-slate-700 font-semibold">
                  <School className="w-3.5 h-3.5 text-[#7a1827] shrink-0" />
                  <span>مدرسة الرفاع الغربي الثانوية للبنات</span>
                </div>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                انطلق في رحلة مشوّقة لاكتشاف أسرار <strong className="text-blue-700 font-bold">فعل الأمر</strong>،
                وعلامات بنائه الثلاث (السكون، حذف حرف العلة، وحذف النون)، وتصريفه مع مختلف الضمائر وتصحيح الأخطاء الشائعة!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentMode('hunter');
                  }}
                  className="px-5 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>ابدأ اللعب الآن</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setCertificateOpen(true);
                  }}
                  className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-sm rounded-xl border border-blue-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#7a1827]" />
                  <span>شهادة الإتقان والأوسمة</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Strip Below Hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-200 bg-blue-50/40 divide-x divide-x-reverse divide-slate-200 text-center text-xs py-3.5 px-4">
            <div>
              <span className="text-slate-500 block mb-0.5">النقاط الإجمالية</span>
              <span className="text-lg font-bold text-[#7a1827] tabular-nums">{score}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">سلسلة الكومبو الحالية</span>
              <span className="text-lg font-bold text-blue-700 tabular-nums">{streak}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">أعلى سلسلة حققتها</span>
              <span className="text-lg font-bold text-teal-700 tabular-nums">{maxStreak}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">حالة البطل</span>
              <span className="text-lg font-bold text-[#7a1827]">
                {score >= 400 ? 'علاّمة 👑' : score >= 200 ? 'فارس 🛡️' : 'مبتدئ ✨'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Recent Score Pop */}
        {recentBonus && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#7a1827] text-white font-bold px-4 py-1.5 rounded-full shadow-lg text-sm animate-pop-success">
            +{recentBonus} نقطة! أحسنت!
          </div>
        )}

        {/* Mode Selector Tabs (Clean Segmented Control with Light / Maroon & Blue Palette) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('hunter');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'hunter'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <Target className="w-4 h-4 text-blue-400" />
            <span>1. صائد صيغة الأمر</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('transform');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'transform'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 text-blue-400" />
            <span>2. محوّل الأفعال</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('signs');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'signs'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>3. لغز علامات البناء</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('detective');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'detective'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <Search className="w-4 h-4 text-blue-400" />
            <span>4. المحقق اللغوي</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('rules');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'rules'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>5. خزانة القواعد</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setCurrentMode('analyzer');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
              currentMode === 'analyzer'
                ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:text-blue-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>6. المختبر النحوي</span>
          </button>
        </div>

        {/* Active Game Mode Component */}
        <section aria-label="منطقة اللعب والتعلم">
          {currentMode === 'hunter' && (
            <HunterGame
              onScoreUpdate={handleScoreUpdate}
              onStreakUpdate={handleStreakUpdate}
              streak={streak}
            />
          )}

          {currentMode === 'transform' && (
            <TransformGame
              onScoreUpdate={handleScoreUpdate}
              onStreakUpdate={handleStreakUpdate}
            />
          )}

          {currentMode === 'signs' && (
            <SignsGame
              onScoreUpdate={handleScoreUpdate}
              onStreakUpdate={handleStreakUpdate}
            />
          )}

          {currentMode === 'detective' && (
            <DetectiveGame
              onScoreUpdate={handleScoreUpdate}
              onStreakUpdate={handleStreakUpdate}
            />
          )}

          {currentMode === 'rules' && <GrammarHandbook />}

          {currentMode === 'analyzer' && <GrammarAnalyzer />}
        </section>

        {/* Footer with Student Credits & Reset Option */}
        <footer className="border-t border-slate-200 bg-white rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 text-center md:text-right">
          <div className="space-y-1">
            <div className="font-bold text-sm text-[#7a1827] flex items-center justify-center md:justify-start gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>مشروع «فرسان صيغة الأمر» التفاعلي</span>
            </div>
            <p>
              من عمل الطالبات: <strong className="text-slate-900 font-bold">الجوري الحادي</strong> وَ <strong className="text-slate-900 font-bold">نادية ولي</strong> · الصف: <span className="font-bold text-blue-700">٣ علم ١</span>
            </p>
            <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-1">
              <School className="w-3.5 h-3.5 text-[#7a1827]" />
              <span>مدرسة الرفاع الغربي الثانوية للبنات</span>
            </p>
          </div>
          <button
            onClick={resetProgress}
            className="text-slate-500 hover:text-[#7a1827] flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>إعادة تعيين النقاط</span>
          </button>
        </footer>
      </main>

      {/* Official Certificate & Awards Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        score={score}
        playerName={playerName}
        onUpdatePlayerName={setPlayerName}
      />
    </div>
  );
}

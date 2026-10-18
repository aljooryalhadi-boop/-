import React from 'react';
import { Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { GameMode } from '../types/game';
import { soundFx } from '../utils/audio';

interface TopNavProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  score: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentMode,
  onSelectMode,
  score,
  streak,
  isMuted,
  onToggleMute,
  onOpenCertificate
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur text-slate-800 border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            soundFx.playClick();
            onSelectMode('hunter');
          }}
          className="text-lg md:text-xl font-bold tracking-tight text-[#7a1827] hover:text-[#5e121e] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>فرسان صيغة الأمر</span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 hidden sm:inline">لغة الضاد</span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('hunter');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'hunter' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            صائد الأمر
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('transform');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'transform' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            محوّل الأفعال
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('signs');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'signs' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            علامات البناء
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('detective');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'detective' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            المحقق اللغوي
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('rules');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'rules' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            خزانة القواعد
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectMode('analyzer');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentMode === 'analyzer' ? 'text-[#7a1827] border-b-2 border-[#7a1827] font-bold' : 'hover:text-blue-700'
            }`}
          >
            المختبر النحوي
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area & Audio Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Streak and Score Indicator */}
          <div className="hidden sm:flex items-center gap-3 text-xs bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-[#7a1827] font-bold tabular-nums">النقاط: {score}</span>
            <span className="text-slate-300">·</span>
            <span className="text-blue-700 font-semibold flex items-center gap-1 tabular-nums">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              الكومبو: {streak}
            </span>
          </div>

          {/* Certificate Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCertificate();
            }}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#7a1827] hover:bg-[#62131f] rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            title="عرض وسام وشهادة الإنجاز"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>الشهادة</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200"
            title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, RotateCcw, ChevronLeft, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DETECTIVE_QUESTIONS } from '../data/imperativeData';
import { soundFx } from '../utils/audio';

interface DetectiveGameProps {
  onScoreUpdate: (points: number) => void;
  onStreakUpdate: (correct: boolean) => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({
  onScoreUpdate,
  onStreakUpdate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pointsGained, setPointsGained] = useState(0);

  const currentQ = DETECTIVE_QUESTIONS[currentIndex];
  const wordsInSentence = currentQ.flawedSentence.split(' ');

  const handleWordClick = (word: string) => {
    if (solved) return;
    const cleanWord = word.replace(/[.,،]/g, '');
    const cleanTarget = currentQ.wrongWord.replace(/[.,،]/g, '');

    setSelectedWord(word);

    if (cleanWord === cleanTarget) {
      soundFx.playCorrect();
      onScoreUpdate(30);
      onStreakUpdate(true);
      setPointsGained(p => p + 30);
      setSolved(true);
    } else {
      soundFx.playIncorrect();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex + 1 < DETECTIVE_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
      setSelectedWord(null);
      setSolved(false);
    } else {
      setCompleted(true);
      soundFx.playLevelSuccess();
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setSelectedWord(null);
    setSolved(false);
    setCompleted(false);
    setPointsGained(0);
  };

  if (completed) {
    return (
      <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-[#7a1827] flex items-center justify-center mx-auto text-3xl font-bold">
          🔍
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#7a1827] mb-2">تهانينا! أصبحت المحقق النحوي المعتمد</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            كشفت جميع الأخطاء الشائعة في صياغة وإملاء أفعال الأمر، وقمت بتصحيحها وفق القواعد الفصيحة بدقة بالغة!
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-around">
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">القضايا المحلولة</span>
            <span className="text-lg font-bold text-slate-800 tabular-nums">{DETECTIVE_QUESTIONS.length} / {DETECTIVE_QUESTIONS.length}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">النقاط المكتسبة</span>
            <span className="text-lg font-bold text-[#7a1827] tabular-nums">+{pointsGained}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-xl transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>إعادة التحقيق من البداية</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stage Progress */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1">
              <Search className="w-4 h-4 text-blue-600" />
              <span>الطور الرابع: المحقق النحوي ومصلح الأخطاء الشائعة</span>
              <span className="text-slate-300">·</span>
              <span className="tabular-nums text-blue-700">القضية {currentIndex + 1} من {DETECTIVE_QUESTIONS.length}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">المحقق اللغوي</h2>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-[#7a1827] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / DETECTIVE_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          هناك <strong className="text-rose-600 font-bold">خطأ لغوي شائع</strong> في كتابة صيغة الأمر في الجملة أدناه.
          انقر مباشرة على <strong className="text-[#7a1827] font-bold">الكلمة الخاطئة</strong> لكشفها وتصحيحها!
        </p>
      </div>

      {/* Main Detective Canvas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        {/* Sentence with Clickable Words */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 text-center space-y-4">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>انقر على الكلمة التي تعتقد أنها تحتوي على الخطأ:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {wordsInSentence.map((word, idx) => {
              const cleanWord = word.replace(/[.,،]/g, '');
              const cleanTarget = currentQ.wrongWord.replace(/[.,،]/g, '');
              const isTarget = cleanWord === cleanTarget;
              const isSelected = selectedWord === word;

              let wordBtnStyle = 'bg-white text-slate-800 hover:bg-blue-50 hover:text-blue-700 border-slate-200 shadow-xs';

              if (solved && isTarget) {
                wordBtnStyle = 'bg-rose-100 border-rose-500 text-rose-800 line-through decoration-rose-600 decoration-2 ring-2 ring-rose-500/20';
              } else if (!solved && isSelected && !isTarget) {
                wordBtnStyle = 'bg-slate-200 text-slate-500 border-slate-300 animate-shake-wrong';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word)}
                  disabled={solved}
                  className={`font-amiri text-2xl md:text-3xl font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer disabled:cursor-default ${wordBtnStyle}`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {!solved && (
            <div className="text-xs text-slate-500 pt-2 flex items-center justify-center gap-2">
              <span className="text-[#7a1827] font-bold">💡 تلميح:</span>
              <span>{currentQ.ruleHint}</span>
            </div>
          )}
        </div>

        {/* Correction Box upon discovering the error */}
        {solved && (
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 space-y-4 animate-pop-success">
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold border-b border-blue-200 pb-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>أحسنت! اكتشفت الخطأ في كلمة ({currentQ.wrongWord})</span>
            </div>

            {/* Before vs After comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5 space-y-1">
                <span className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  الكلمة الخاطئة
                </span>
                <div className="font-amiri text-2xl text-rose-700 font-bold line-through">
                  {currentQ.wrongWord}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 space-y-1">
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  الصواب الفصيح
                </span>
                <div className="font-amiri text-2xl text-emerald-800 font-bold">
                  {currentQ.correctWord}
                </div>
              </div>
            </div>

            {/* Correct Sentence Display */}
            <div className="bg-white border border-blue-100 rounded-lg p-3.5 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1 font-medium">الجملة الصحيحة بالكامل:</span>
              <p className="font-amiri text-xl text-[#7a1827] font-bold">
                "{currentQ.correctSentence}"
              </p>
            </div>

            {/* Why it was wrong */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700 block">التوضيح النحوي:</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {currentQ.whyWrong}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>القضية التالية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

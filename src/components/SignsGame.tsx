import React, { useState, useMemo } from 'react';
import { Compass, CheckCircle2, XCircle, RotateCcw, ChevronLeft, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SIGNS_QUESTIONS } from '../data/imperativeData';
import { soundFx, speakArabic } from '../utils/audio';
import { shuffleArray } from '../utils/shuffle';

interface SignsGameProps {
  onScoreUpdate: (points: number) => void;
  onStreakUpdate: (correct: boolean) => void;
}

export const SignsGame: React.FC<SignsGameProps> = ({
  onScoreUpdate,
  onStreakUpdate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);

  const currentQ = SIGNS_QUESTIONS[currentIndex];

  // Randomize sign options order for each question
  const shuffledSigns = useMemo(() => {
    return shuffleArray(currentQ.options);
  }, [currentQ]);

  const handleSelectSign = (sign: 'السكون' | 'حذف حرف العلة' | 'حذف النون') => {
    if (isAnswered) return;
    setSelectedSign(sign);
    setIsAnswered(true);

    const isCorrect = sign === currentQ.correctSign;
    if (isCorrect) {
      soundFx.playCorrect();
      onScoreUpdate(25);
      onStreakUpdate(true);
      setTotalEarned(t => t + 25);
    } else {
      soundFx.playIncorrect();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex + 1 < SIGNS_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
      setSelectedSign(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      soundFx.playLevelSuccess();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setSelectedSign(null);
    setIsAnswered(false);
    setCompleted(false);
    setTotalEarned(0);
  };

  if (completed) {
    return (
      <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-[#7a1827] flex items-center justify-center mx-auto text-3xl font-bold">
          📜
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#7a1827] mb-2">أتقنت علامات بناء فعل الأمر!</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            صرت خبيراً في التمييز بين البناء على السكون، وحذف حرف العلة، وحذف النون في جميع السياقات اللغوية.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-around">
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">الأسئلة المجابة</span>
            <span className="text-lg font-bold text-slate-800 tabular-nums">{SIGNS_QUESTIONS.length} / {SIGNS_QUESTIONS.length}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">النقاط المكتسبة</span>
            <span className="text-lg font-bold text-[#7a1827] tabular-nums">+{totalEarned}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-xl transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>إعادة التحدي النحوي</span>
        </button>
      </div>
    );
  }

  // Parse sentence to highlight the imperative word
  const sentenceParts = currentQ.sentence.split(/\{|\}/);

  return (
    <div className="space-y-6">
      {/* Header & Stage Progress */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>الطور الثالث: سر علامات البناء والإعراب</span>
              <span className="text-slate-300">·</span>
              <span className="tabular-nums text-blue-700">التحدي {currentIndex + 1} من {SIGNS_QUESTIONS.length}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">لغز علامات البناء</h2>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-[#7a1827] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / SIGNS_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          تأمّل الجملة التالية، وحدد <strong className="text-[#7a1827]">علامة بناء فعل الأمر</strong> المميّز بين القوسين.
        </p>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        {/* Sentence Display */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 text-center space-y-4">
          <div className="text-xs text-slate-500 font-medium">اقرأ الجملة بتمعّن:</div>
          <div className="font-amiri text-2xl md:text-3xl font-semibold text-slate-900 leading-relaxed">
            {sentenceParts.map((part, i) => {
              const isTarget = part === currentQ.imperativeWord;
              return isTarget ? (
                <span
                  key={i}
                  className="mx-1 px-3 py-1 bg-[#7a1827]/10 text-[#7a1827] border border-[#7a1827]/30 rounded-lg font-bold underline decoration-[#7a1827] decoration-2 underline-offset-8 inline-block animate-soft-float"
                >
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => {
                soundFx.playClick();
                speakArabic(currentQ.sentence.replace(/\{|\}/g, ''));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span>الاستماع إلى الجملة</span>
            </button>
          </div>
        </div>

        {/* 3 Interactive Construction Sign Options with Randomized Positions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shuffledSigns.map((sign, idx) => {
            const isSelected = selectedSign === sign;
            const isCorrect = sign === currentQ.correctSign;

            let cardStyle = 'bg-white text-slate-800 hover:bg-blue-50/50 hover:border-blue-400 border-slate-200 shadow-xs';

            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                cardStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectSign(sign)}
                disabled={isAnswered}
                className={`p-5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer disabled:cursor-default ${cardStyle}`}
              >
                <div className="text-xs text-slate-500 font-medium">مبني على</div>
                <div className="font-bold text-lg md:text-xl text-slate-900">
                  {sign}
                </div>

                {isAnswered && isCorrect && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>إجابة صحيحة ✓</span>
                  </div>
                )}

                {isAnswered && isSelected && !isCorrect && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-rose-700">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>غير صحيح ✕</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation upon answer */}
        {isAnswered && (
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 space-y-3 animate-pop-success">
            <div className="text-xs font-bold text-[#7a1827] border-b border-blue-200 pb-2">
              سبب البناء على {currentQ.correctSign}:
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              فعل الأمر <span className="font-amiri font-bold text-blue-800 text-base">({currentQ.imperativeWord})</span>: {currentQ.reason}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>السؤال التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

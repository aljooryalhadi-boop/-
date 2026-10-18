import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Volume2, CheckCircle2, XCircle, RotateCcw, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSFORM_QUESTIONS } from '../data/imperativeData';
import { soundFx, speakArabic } from '../utils/audio';
import { shuffleArray } from '../utils/shuffle';

interface TransformGameProps {
  onScoreUpdate: (points: number) => void;
  onStreakUpdate: (correct: boolean) => void;
}

export const TransformGame: React.FC<TransformGameProps> = ({
  onScoreUpdate,
  onStreakUpdate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  const currentQ = TRANSFORM_QUESTIONS[currentIndex];

  // Randomize option positions so the correct answer isn't always in the same slot
  const shuffledOptions = useMemo(() => {
    return shuffleArray(currentQ.options);
  }, [currentQ]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctImperative;
    if (isCorrect) {
      soundFx.playCorrect();
      onScoreUpdate(20);
      onStreakUpdate(true);
      setScoreEarned(s => s + 20);
    } else {
      soundFx.playIncorrect();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex + 1 < TRANSFORM_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      soundFx.playLevelSuccess();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCompleted(false);
    setScoreEarned(0);
  };

  if (completed) {
    return (
      <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-[#7a1827] flex items-center justify-center mx-auto text-3xl font-bold">
          ⚡
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#7a1827] mb-2">أتقنت مصنع تحويل صيغة الأمر!</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            لقد تمكّنت من صياغة فعل الأمر باقتدار لمختلف الضمائر (المفرد، المثنى، الجمع بنوعيه، والمعتل الآخر).
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-around">
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">الأسئلة المجابة</span>
            <span className="text-lg font-bold text-slate-800 tabular-nums">{TRANSFORM_QUESTIONS.length} / {TRANSFORM_QUESTIONS.length}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-xs text-slate-500 block mb-1">النقاط المكتسبة</span>
            <span className="text-lg font-bold text-[#7a1827] tabular-nums">+{scoreEarned}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-xl transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>إعادة التحدي للتدريب</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title & Stage Status */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1">
              <ArrowLeftRight className="w-4 h-4 text-blue-600" />
              <span>الطور الثاني: تحويل وتصريف صيغة الأمر</span>
              <span className="text-slate-300">·</span>
              <span className="tabular-nums text-blue-700">السؤال {currentIndex + 1} من {TRANSFORM_QUESTIONS.length}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">مصنع صياغة الأمر</h2>
          </div>

          {/* Progress bar */}
          <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-[#7a1827] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / TRANSFORM_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          حوّل الفعل المضارع المعطى إلى <strong className="text-[#7a1827]">صيغة أمر</strong> صحيحة تناسب الضمير المطلوب مع مراعاة علامات البناء.
        </p>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        {/* Present Sentence Banner */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 text-center space-y-3">
          <div className="text-xs text-slate-500 font-medium">الجملة الأصلية (في المضارع):</div>
          <div className="font-amiri text-2xl md:text-3xl font-bold text-[#7a1827] tracking-wide">
            "{currentQ.presentVerb}"
          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-xs">
            <span>المخاطب المطلوب للأمر:</span>
            <span className="text-blue-700 font-bold">{currentQ.targetPronoun}</span>
          </div>
        </div>

        {/* Options Grid with Randomized Positions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {shuffledOptions.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctImperative;

            let buttonStyle = 'bg-white text-slate-800 hover:bg-blue-50/60 hover:border-blue-300 border-slate-200 shadow-xs';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                buttonStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <div
                key={idx}
                className={`relative border rounded-xl p-4 flex items-center justify-between transition-all ${buttonStyle}`}
              >
                <button
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className="w-full text-right flex items-center justify-between cursor-pointer disabled:cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-amiri text-2xl font-bold tracking-wide">
                      {option}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Pronounce option button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playClick();
                    speakArabic(option);
                  }}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors ml-2 cursor-pointer"
                  title="استمع للنطق الصوتي"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Detailed Explanation upon Answer */}
        {isAnswered && (
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 space-y-3 animate-pop-success">
            <div className="flex items-center justify-between border-b border-blue-200 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7a1827]">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>التعليل النحوي وعلامة البناء</span>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 rounded">
                علامة البناء: {currentQ.constructionSign}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              {currentQ.ruleExplanation}
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

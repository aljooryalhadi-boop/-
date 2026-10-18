import React, { useState, useEffect, useMemo } from 'react';
import { Target, RotateCcw, Volume2, Sparkles, CheckCircle2, XCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HUNTER_WORDS } from '../data/imperativeData';
import { HunterWord } from '../types/game';
import { soundFx, speakArabic } from '../utils/audio';
import { shuffleArray } from '../utils/shuffle';

interface HunterGameProps {
  onScoreUpdate: (points: number) => void;
  onStreakUpdate: (correct: boolean) => void;
  streak: number;
}

export const HunterGame: React.FC<HunterGameProps> = ({
  onScoreUpdate,
  onStreakUpdate,
  streak
}) => {
  const [round, setRound] = useState(1);
  const [selectedWordIds, setSelectedWordIds] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [activeFeedback, setActiveFeedback] = useState<{ word: string; isCorrect: boolean; text: string } | null>(null);
  const [roundCompleted, setRoundCompleted] = useState(false);

  // Generate 8 randomized words per round (guaranteeing at least 3-4 imperatives in random positions)
  const currentBatch = useMemo(() => {
    const imperatives = HUNTER_WORDS.filter(w => w.type === 'imperative');
    const others = HUNTER_WORDS.filter(w => w.type !== 'imperative');

    const shuffledImp = shuffleArray(imperatives).slice(0, 4);
    const shuffledOthers = shuffleArray(others).slice(0, 4);
    return shuffleArray([...shuffledImp, ...shuffledOthers]);
  }, [round]);

  const targetImperativesCount = useMemo(() => {
    return currentBatch.filter(w => w.type === 'imperative').length;
  }, [currentBatch]);

  const correctlyFoundCount = useMemo(() => {
    return currentBatch.filter(w => w.type === 'imperative' && selectedWordIds[w.id] === 'correct').length;
  }, [currentBatch, selectedWordIds]);

  useEffect(() => {
    if (correctlyFoundCount > 0 && correctlyFoundCount === targetImperativesCount && !roundCompleted) {
      setRoundCompleted(true);
      soundFx.playLevelSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, [correctlyFoundCount, targetImperativesCount, roundCompleted]);

  const handleWordClick = (wordObj: HunterWord) => {
    if (selectedWordIds[wordObj.id]) return; // already clicked

    if (wordObj.type === 'imperative') {
      soundFx.playCorrect();
      onScoreUpdate(15);
      onStreakUpdate(true);
      setSelectedWordIds(prev => ({ ...prev, [wordObj.id]: 'correct' }));
      setActiveFeedback({
        word: wordObj.word,
        isCorrect: true,
        text: `أحسنت! (${wordObj.word}) صيغة أمر صحيحة. ${wordObj.explanation}`
      });
    } else {
      soundFx.playIncorrect();
      onStreakUpdate(false);
      setSelectedWordIds(prev => ({ ...prev, [wordObj.id]: 'wrong' }));
      const typeLabel = wordObj.type === 'past' ? 'فعل ماضٍ' : wordObj.type === 'present' ? 'فعل مضارع' : 'اسم وليس فعلاً';
      setActiveFeedback({
        word: wordObj.word,
        isCorrect: false,
        text: `انتبه! (${wordObj.word}) ليس فعل أمر بل هو ${typeLabel}. ${wordObj.explanation}`
      });
    }
  };

  const nextRound = () => {
    soundFx.playClick();
    setSelectedWordIds({});
    setActiveFeedback(null);
    setRoundCompleted(false);
    setRound(r => r + 1);
  };

  const restartAll = () => {
    soundFx.playClick();
    setSelectedWordIds({});
    setActiveFeedback(null);
    setRoundCompleted(false);
    setRound(1);
  };

  return (
    <div className="space-y-6">
      {/* Header & Mission Bar (Light blue & maroon card) */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              <span>الطور الأول: سرعة التمييز والفصاحة</span>
              <span className="text-slate-300">·</span>
              <span className="text-blue-700">الجولة {round}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">صائد صيغة الأمر</h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              المهمة: انقر على جميع <strong className="text-[#7a1827] font-bold">أفعال الأمر</strong> فقط وتجنّب الماضي، والمضارع، والأسماء.
              اجمع كل أفعال الأمر لإنهاء الجولة بنجاح!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-blue-50/70 px-4 py-3 rounded-xl border border-blue-100 shrink-0">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-0.5">الأفعال المطلوبة</div>
              <div className="text-lg font-bold text-[#7a1827] tabular-nums">
                {correctlyFoundCount} / {targetImperativesCount}
              </div>
            </div>
            <div className="h-8 w-px bg-blue-200" />
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-0.5">سلسلة الإجابات</div>
              <div className="text-lg font-bold text-blue-700 tabular-nums flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-blue-500" />
                {streak}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Word Cards (Crisp white tiles with blue hover) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {currentBatch.map((item) => {
          const status = selectedWordIds[item.id];
          let cardClasses = 'bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50/40 border-slate-200 shadow-xs';

          if (status === 'correct') {
            cardClasses = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 animate-pop-success';
          } else if (status === 'wrong') {
            cardClasses = 'bg-rose-50 border-rose-400 text-rose-900 opacity-80 animate-shake-wrong';
          }

          return (
            <div
              key={item.id}
              className={`group relative rounded-xl border p-5 text-center flex flex-col items-center justify-center min-h-[140px] transition-all duration-200 ${cardClasses}`}
            >
              <button
                onClick={() => handleWordClick(item)}
                disabled={Boolean(status)}
                className="w-full h-full flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg cursor-pointer disabled:cursor-default"
                aria-label={`اختر الكلمة: ${item.word}`}
              >
                <span className="font-amiri text-3xl font-bold mb-2 tracking-wide text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.word}
                </span>

                {/* Status indicator */}
                {status === 'correct' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    فعل أمر ✓
                  </span>
                )}

                {status === 'wrong' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                    <XCircle className="w-3.5 h-3.5" />
                    ليس أمراً ✕
                  </span>
                )}

                {!status && (
                  <span className="text-[11px] text-slate-400 group-hover:text-blue-600 transition-colors">
                    انقر للفحص
                  </span>
                )}
              </button>

              {/* Audio Pronunciation Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playClick();
                  speakArabic(item.word);
                }}
                className="absolute top-2 left-2 p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                title="استمع للنطق الصوتي الفصيح"
                aria-label={`استمع لنطق ${item.word}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Live Feedback & Explanatory Box */}
      {activeFeedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            activeFeedback.isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
          <div className="text-sm leading-relaxed">
            <span className="font-bold font-amiri text-base ml-1">[{activeFeedback.word}]</span>
            {activeFeedback.text}
          </div>
        </div>
      )}

      {/* Round Completion Banner (Light Theme) */}
      {roundCompleted && (
        <div className="bg-gradient-to-r from-blue-50 via-white to-red-50/50 border border-blue-200 rounded-2xl p-6 text-center space-y-4 shadow-md animate-pop-success">
          <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-[#7a1827] flex items-center justify-center mx-auto text-xl font-bold">
            🏆
          </div>
          <h3 className="text-xl font-bold text-[#7a1827]">رائع جداً! أنهيت الجولة {round} بنجاح</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            لقد اصطدت جميع أفعال الأمر وميّزتها بمهارة عالية عن الماضي والمضارع والأسماء!
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={nextRound}
              className="px-6 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              الانتقال إلى الجولة التالية
            </button>
            <button
              onClick={restartAll}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>إعادة من البداية</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

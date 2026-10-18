import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, Check, ChevronLeft } from 'lucide-react';
import { GRAMMAR_RULES } from '../data/imperativeData';
import { soundFx, speakArabic } from '../utils/audio';

export const GrammarHandbook: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const activeRule = GRAMMAR_RULES[activeTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>خزانة المعرفة النحوية المبسطة</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">قواعد وأحكام صيغة الأمر</h2>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          فعل الأمر هو: <strong className="text-[#7a1827]">ما يُطلب به حصول شيء بعد زمن التكلّم</strong>.
          وهو فعلٌ <strong className="text-blue-700 font-bold">مبنيٌّ دائماً</strong>، وله ثلاث علامات بناء رئيسية موضحة بالشواهد أدناه.
        </p>
      </div>

      {/* Interactive Tabs for the 3 Signs (Light / Maroon Palette) */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-xl">
        {GRAMMAR_RULES.map((rule, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(idx);
              }}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer text-center ${
                isActive
                  ? 'bg-[#7a1827] text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-white'
              }`}
            >
              {rule.title}
            </button>
          );
        })}
      </div>

      {/* Active Rule Details Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-blue-600 font-bold mb-1">العلامة الإعرابية</div>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#7a1827]">{activeRule.title}</span>
              <span className="text-sm font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full">
                {activeRule.sign}
              </span>
            </h3>
          </div>

          <div className="text-slate-500 text-xs font-semibold">
            حالة الإعراب: <span className="text-blue-700 font-bold">مبني دائماً</span>
          </div>
        </div>

        {/* Condition Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 space-y-2">
          <div className="text-xs font-bold text-[#7a1827] flex items-center gap-1.5">
            <Check className="w-4 h-4 text-blue-600" />
            <span>متى يُبنى على هذه العلامة؟</span>
          </div>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
            {activeRule.condition}
          </p>
        </div>

        {/* Examples Showcase */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7a1827]" />
            <span>أمثلة تطبيقية مع التوضيح:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRule.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-slate-50 hover:bg-blue-50/40 border border-slate-200 rounded-xl p-4 flex flex-col justify-between transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-amiri text-2xl font-bold text-[#7a1827]">
                      {ex.word}
                    </span>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        speakArabic(ex.sentence);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-white transition-colors cursor-pointer"
                      title="استمع للمثال"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-amiri text-lg text-slate-800 mb-2 font-semibold">
                    "{ex.sentence}"
                  </div>
                </div>

                <div className="text-xs text-slate-500 border-t border-slate-200 pt-2.5">
                  {ex.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Quick Rule Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 leading-relaxed flex items-start gap-2.5">
          <div className="font-bold text-[#7a1827] shrink-0 text-sm">💡 قاعدة ذهبية:</div>
          <div>
            يُبنى فعل الأمر على ما يُجزم به مضارعه! فإذا كان مضارعه يُجزم بالسكون (لم يكتبْ)، بُني أمره على السكون (اكتبْ).
            وإذا كان مضارعه يُجزم بحذف حرف العلة (لم يدعُ)، بُني أمره على حذف حرف العلة (ادعُ).
            وإذا كان مضارعه يُجزم بحذف النون (لم يكتبوا)، بُني أمره على حذف النون (اكتبوا).
          </div>
        </div>
      </div>
    </div>
  );
};

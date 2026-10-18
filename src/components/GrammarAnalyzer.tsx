import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, ChevronDown, Layers, Terminal } from 'lucide-react';
import { soundFx, speakArabic } from '../utils/audio';

interface VerbData {
  root: string;
  past: string;
  present: string;
  type: string;
  forms: {
    pronoun: string;
    imperative: string;
    sign: 'السكون' | 'حذف حرف العلة' | 'حذف النون';
    pronounSuffix: string;
    parsing: string;
  }[];
}

const PRESET_VERBS: VerbData[] = [
  {
    root: 'ك-ت-ب',
    past: 'كَتَبَ',
    present: 'يَكْتُبُ',
    type: 'ثلاثي صحيح الآخر',
    forms: [
      { pronoun: 'أنتَ (مفرد مذكر)', imperative: 'اكْتُبْ', sign: 'السكون', pronounSuffix: 'ضمير مستتر تقديره (أنتَ)', parsing: 'فعل أمر مبني على السكون، والفاعل ضمير مستتر وجوباً تقديره أنتَ.' },
      { pronoun: 'أنتِ (مفردة مؤنثة)', imperative: 'اكْتُبِي', sign: 'حذف النون', pronounSuffix: 'ياء المخاطبة في محل رفع فاعل', parsing: 'فعل أمر مبني على حذف النون لاتصاله بياء المخاطبة، والياء ضمير متصل مبني في محل رفع فاعل.' },
      { pronoun: 'أنتما (مثنى)', imperative: 'اكْتُبَا', sign: 'حذف النون', pronounSuffix: 'ألف الاثنين في محل رفع فاعل', parsing: 'فعل أمر مبني على حذف النون لاتصاله بألف الاثنين، والألف ضمير متصل في محل رفع فاعل.' },
      { pronoun: 'أنتم (جمع مذكر)', imperative: 'اكْتُبُوا', sign: 'حذف النون', pronounSuffix: 'واو الجماعة في محل رفع فاعل', parsing: 'فعل أمر مبني على حذف النون لاتصاله بواو الجماعة، والواو ضمير متصل في محل رفع فاعل، والألف فارقة.' },
      { pronoun: 'أنتنّ (جمع مؤنث)', imperative: 'اكْتُبْنَ', sign: 'السكون', pronounSuffix: 'نون النسوة في محل رفع فاعل', parsing: 'فعل أمر مبني على السكون لاتصاله بنون النسوة، ونون النسوة ضمير متصل مبني في محل رفع فاعل.' }
    ]
  },
  {
    root: 'د-ع-و',
    past: 'دَعَا',
    present: 'يَدْعُو',
    type: 'معتل الآخر بالواو (ناقص)',
    forms: [
      { pronoun: 'أنتَ (مفرد مذكر)', imperative: 'ادْعُ', sign: 'حذف حرف العلة', pronounSuffix: 'ضمير مستتر تقديره (أنتَ)', parsing: 'فعل أمر مبني على حذف حرف العلة (الواو) والضمة دليل عليها، والفاعل ضمير مستتر وجوباً تقديره أنتَ.' },
      { pronoun: 'أنتِ (مفردة مؤنثة)', imperative: 'ادْعِي', sign: 'حذف النون', pronounSuffix: 'ياء المخاطبة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بياء المخاطبة، والياء ضمير متصل مبني في محل رفع فاعل.' },
      { pronoun: 'أنتما (مثنى)', imperative: 'ادْعُوَا', sign: 'حذف النون', pronounSuffix: 'ألف الاثنين', parsing: 'فعل أمر مبني على حذف النون لاتصاله بألف الاثنين، والألف ضمير متصل في محل رفع فاعل.' },
      { pronoun: 'أنتم (جمع مذكر)', imperative: 'ادْعُوا', sign: 'حذف النون', pronounSuffix: 'واو الجماعة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بواو الجماعة، والواو ضمير متصل في محل رفع فاعل.' },
      { pronoun: 'أنتنّ (جمع مؤنث)', imperative: 'ادْعُونَ', sign: 'السكون', pronounSuffix: 'نون النسوة', parsing: 'فعل أمر مبني على السكون لاتصاله بنون النسوة، ونون النسوة ضمير متصل مبني في محل رفع فاعل.' }
    ]
  },
  {
    root: 'س-ع-ي',
    past: 'سَعَى',
    present: 'يَسْعَى',
    type: 'معتل الآخر بالألف',
    forms: [
      { pronoun: 'أنتَ (مفرد مذكر)', imperative: 'اسْعَ', sign: 'حذف حرف العلة', pronounSuffix: 'ضمير مستتر تقديره (أنتَ)', parsing: 'فعل أمر مبني على حذف حرف العلة (الألف) والفتحة دليل عليها، والفاعل ضمير مستتر وجوباً تقديره أنتَ.' },
      { pronoun: 'أنتِ (مفردة مؤنثة)', imperative: 'اسْعَيْ', sign: 'حذف النون', pronounSuffix: 'ياء المخاطبة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بياء المخاطبة، والياء ضمير متصل مبني في محل رفع فاعل.' },
      { pronoun: 'أنتما (مثنى)', imperative: 'اسْعَيَا', sign: 'حذف النون', pronounSuffix: 'ألف الاثنين', parsing: 'فعل أمر مبني على حذف النون لاتصاله بألف الاثنين، والألف فاعل.' },
      { pronoun: 'أنتم (جمع مذكر)', imperative: 'اسْعَوْا', sign: 'حذف النون', pronounSuffix: 'واو الجماعة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بواو الجماعة، والواو فاعل.' },
      { pronoun: 'أنتنّ (جمع مؤنث)', imperative: 'اسْعَيْنَ', sign: 'السكون', pronounSuffix: 'نون النسوة', parsing: 'فعل أمر مبني على السكون لاتصاله بنون النسوة، ونون النسوة فاعل.' }
    ]
  },
  {
    root: 'ق-ض-ي',
    past: 'قَضَى',
    present: 'يَقْضِي',
    type: 'معتل الآخر بالياء',
    forms: [
      { pronoun: 'أنتَ (مفرد مذكر)', imperative: 'اقْضِ', sign: 'حذف حرف العلة', pronounSuffix: 'ضمير مستتر تقديره (أنتَ)', parsing: 'فعل أمر مبني على حذف حرف العلة (الياء) والكسرة دليل عليها، والفاعل ضمير مستتر وجوباً تقديره أنتَ.' },
      { pronoun: 'أنتِ (مفردة مؤنثة)', imperative: 'اقْضِي', sign: 'حذف النون', pronounSuffix: 'ياء المخاطبة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بياء المخاطبة، والياء فاعل.' },
      { pronoun: 'أنتما (مثنى)', imperative: 'اقْضِيَا', sign: 'حذف النون', pronounSuffix: 'ألف الاثنين', parsing: 'فعل أمر مبني على حذف النون لاتصاله بألف الاثنين، والألف فاعل.' },
      { pronoun: 'أنتم (جمع مذكر)', imperative: 'اقْضُوا', sign: 'حذف النون', pronounSuffix: 'واو الجماعة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بواو الجماعة، والواو فاعل.' },
      { pronoun: 'أنتنّ (جمع مؤنث)', imperative: 'اقْضِينَ', sign: 'السكون', pronounSuffix: 'نون النسوة', parsing: 'فعل أمر مبني على السكون لاتصاله بنون النسوة، ونون النسوة فاعل.' }
    ]
  },
  {
    root: 'ق-و-ل',
    past: 'قَالَ',
    present: 'يَقُولُ',
    type: 'أجوف (معتل الوسط)',
    forms: [
      { pronoun: 'أنتَ (مفرد مذكر)', imperative: 'قُلْ', sign: 'السكون', pronounSuffix: 'ضمير مستتر (حذفت الواو لمنع التقاء الساكنين)', parsing: 'فعل أمر مبني على السكون، وحُذفت الواو منه لالتقاء الساكنين (قُولْ ⬅️ قُلْ).' },
      { pronoun: 'أنتِ (مفردة مؤنثة)', imperative: 'قُولِي', sign: 'حذف النون', pronounSuffix: 'ياء المخاطبة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بياء المخاطبة، عادت الواو لعدم التقاء الساكنين.' },
      { pronoun: 'أنتما (مثنى)', imperative: 'قُولَا', sign: 'حذف النون', pronounSuffix: 'ألف الاثنين', parsing: 'فعل أمر مبني على حذف النون لاتصاله بألف الاثنين.' },
      { pronoun: 'أنتم (جمع مذكر)', imperative: 'قُولُوا', sign: 'حذف النون', pronounSuffix: 'واو الجماعة', parsing: 'فعل أمر مبني على حذف النون لاتصاله بواو الجماعة.' },
      { pronoun: 'أنتنّ (جمع مؤنث)', imperative: 'قُلْنَ', sign: 'السكون', pronounSuffix: 'نون النسوة', parsing: 'فعل أمر مبني على السكون لاتصاله بنون النسوة (حذفت الواو لالتقاء الساكنين).' }
    ]
  }
];

export const GrammarAnalyzer: React.FC = () => {
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(0);
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const verb = PRESET_VERBS[selectedVerbIndex];
  const activeForm = verb.forms[selectedFormIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white text-slate-800 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-[#7a1827] font-bold mb-1">
          <Terminal className="w-4 h-4 text-blue-600" />
          <span>المختبر التفاعلي لفحص وتصريف الأفعال</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">مختبر صيغة الأمر التفاعلي</h2>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          اختر أي فعل لترى كيف يتصرف في صيغة الأمر مع جميع الضمائر، مع الإعراب الكامل وتوضيح علة الحذف أو الإثبات وسماع النطق الفصيح.
        </p>
      </div>

      {/* Verb Picker Row */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold block">اختر فعلاً للفحص الصرفي والنحوي:</span>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_VERBS.map((v, i) => {
            const isSelected = selectedVerbIndex === i;
            return (
              <button
                key={i}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedVerbIndex(i);
                  setSelectedFormIndex(0);
                }}
                className={`px-4 py-2 rounded-xl border text-sm font-bold font-amiri text-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#7a1827] text-white border-[#7a1827] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:text-blue-800'
                }`}
              >
                {v.past} ({v.type})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pronoun Forms */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-[#7a1827] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>تصريفات الأمر حسب الضمير</span>
            </span>
            <span className="text-xs text-slate-400">انقر لعرض الإعراب</span>
          </div>

          <div className="space-y-2.5">
            {verb.forms.map((form, idx) => {
              const isSelected = selectedFormIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedFormIndex(idx);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 text-blue-950 ring-1 ring-blue-400/40'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{form.pronoun}</div>
                    <div className="font-amiri text-2xl font-bold text-slate-900">{form.imperative}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold bg-white border border-blue-200 px-2 py-0.5 rounded text-blue-800 shadow-xs">
                      {form.sign}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        speakArabic(form.imperative);
                      }}
                      className="p-1.5 rounded text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      title="نطق الأمر"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Morphological & Syntactic Breakdown */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs text-slate-500 block">الصيغة المختارة</span>
                <span className="text-sm font-bold text-[#7a1827]">{activeForm.pronoun}</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  speakArabic(activeForm.imperative);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span>الاستماع للصيغة</span>
              </button>
            </div>

            {/* Giant Highlight Word (Maroon text) */}
            <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-6 text-center space-y-2">
              <span className="text-xs text-slate-500 font-medium">صيغة فعل الأمر:</span>
              <div className="font-amiri text-5xl font-black text-[#7a1827] tracking-wider">
                {activeForm.imperative}
              </div>
              <div className="text-xs text-slate-600">
                الجذر اللغوي: <span className="font-bold text-blue-700">{verb.root}</span> · نوع الفعل: {verb.type}
              </div>
            </div>

            {/* Parsing Details Grid */}
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="text-xs font-bold text-[#7a1827] block mb-1">علامة البناء النحوية:</span>
                <p className="text-slate-800 text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>مبني على {activeForm.sign}</span>
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="text-xs font-bold text-blue-700 block mb-1">الفاعل والضمير المتصل:</span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeForm.pronounSuffix}
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <span className="text-xs font-bold text-[#7a1827] block mb-1.5">الإعراب النموذجي الكامل:</span>
                <p className="text-slate-800 text-sm font-mono leading-relaxed bg-white p-3 rounded-lg border border-blue-100">
                  {activeForm.parsing}
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-200 pt-3 text-center">
            يمكنك تجربة جميع الأفعال الخمسة بالأعلى لاكتشاف الفروق الدقيقة في قواعد الحذف والبناء!
          </div>
        </div>
      </div>
    </div>
  );
};

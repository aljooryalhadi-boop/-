import React, { useState } from 'react';
import { X, Printer, Award, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { BADGES } from '../data/imperativeData';
import { soundFx } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  playerName,
  onUpdatePlayerName
}) => {
  const [nameInput, setNameInput] = useState(playerName);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePlayerName(nameInput.trim() || 'فارس لغة الضاد');
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  // Determine Rank based on score
  let rank = 'مبتدئ الفصاحة';
  if (score >= 400) rank = 'علاّمة صيغة الأمر الأكبر 👑';
  else if (score >= 250) rank = 'فارس الإعراب المتميّز 🛡️';
  else if (score >= 120) rank = 'صائد الأفعال الماهر ⚡';
  else if (score >= 50) rank = 'طالب العلم النبيه 📜';

  const todayDate = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#7a1827]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">شهادة الفصاحة والأوسمة التقديرية</h3>
            <p className="text-xs text-slate-500">شهادة رسمية لإتقان صيغة الأمر وعلامات بنائه في لغة الضاد</p>
          </div>
        </div>

        {/* Name input banner */}
        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-center gap-3 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
          <label htmlFor="student-name" className="text-xs text-slate-700 font-bold whitespace-nowrap">
            اسم البطل المكتوب على الشهادة:
          </label>
          <input
            id="student-name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="اكتب اسمك الكريم هنا..."
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-sm text-[#7a1827] font-bold focus:outline-none focus:border-[#7a1827] text-right shadow-xs"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#7a1827] hover:bg-[#62131f] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            تحديث الاسم
          </button>
        </form>

        {/* Printable Certificate Frame */}
        <div
          id="printable-certificate"
          className="border-8 border-double border-[#7a1827] bg-gradient-to-b from-white via-blue-50/30 to-white p-8 rounded-xl text-center space-y-5 relative overflow-hidden shadow-xs"
        >
          {/* Subtle Arabesque Corner Filigree */}
          <div className="absolute top-3 right-3 text-[#7a1827]/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute top-3 left-3 text-[#7a1827]/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute bottom-3 right-3 text-[#7a1827]/40 text-2xl font-serif select-none">⚜</div>
          <div className="absolute bottom-3 left-3 text-[#7a1827]/40 text-2xl font-serif select-none">⚜</div>

          {/* Badge Image */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-blue-300 overflow-hidden shadow-md bg-white p-1">
              <img
                src="/src/assets/images/badge_arabic_champion_1792342466594.jpg"
                alt="وسام بطل لغة الضاد"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          <div>
            <span className="text-xs tracking-widest text-blue-700 font-bold block mb-1">
              مَدْرَسَةُ الرِّفَاعِ الغَرْبِيِّ الثَّانَوِيَّةِ لِلْبَنَات · وِسَامُ الإِتْقَانِ اللُّغَوِيِّ
            </span>
            <h2 className="font-amiri text-3xl md:text-4xl font-black text-[#7a1827]">
              شَهَادَةُ جَدَارَةٍ وَتَفَوُّقٍ فِي صِيغَةِ الأَمْرِ
            </h2>
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <p className="text-xs text-slate-500 font-semibold">تَشْهَدُ إِدَارَةُ رِحْلَةِ الفُرْسَانِ بِأَنَّ البَطَلَ المِقْدَام:</p>
            <div className="font-amiri text-3xl font-black text-slate-900 underline decoration-[#7a1827] decoration-2 underline-offset-8">
              {playerName || 'فارس لغة الضاد'}
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed pt-2">
              قَدْ أَكْمَلَ بِتَفَوُّقٍ تَحَدِّيَاتِ <strong className="text-[#7a1827]">صِيغَةِ الأَمْرِ</strong> وَتَمَيَّزَ فِي إِدْرَاكِ
              عَلَامَاتِ بِنَائِهِ الثَّلَاث (السُّكُون، وَحَذْف حَرْف العِلَّة، وَحَذْف النُّون) مَعَ تَصْحِيحِ الأَخْطَاءِ الشَّائِعَةِ بِكُلِّ بَرَاعَةٍ.
            </p>
          </div>

          {/* Stats Summary Inside Certificate */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 border-t border-b border-blue-200 py-3 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">الرتبة الممنوحة</span>
              <span className="font-bold text-[#7a1827]">{rank}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">مجموع النقاط</span>
              <span className="font-bold text-blue-700 tabular-nums">{score} نقطة</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">تاريخ الإنجاز</span>
              <span className="font-semibold text-slate-700">{todayDate}</span>
            </div>
          </div>

          {/* Official Endorsement & Student Creators Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 border-t border-blue-100 pt-3 px-2 gap-2 text-center sm:text-right">
            <div>
              <span className="font-bold text-[#7a1827]">من عمل الطالبات:</span> الجوري الحادي وَ نادية ولي <span className="font-bold text-blue-700">(٣ علم ١)</span>
            </div>
            <div className="font-semibold text-slate-500">
              مدرسة الرفاع الغربي الثانوية للبنات
            </div>
          </div>
        </div>

        {/* Badges Collection Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#7a1827] flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>سجل الأوسمة المكتسبة:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {BADGES.map((b) => {
              const isUnlocked = score >= b.reqScore;
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    isUnlocked
                      ? 'bg-blue-50/70 border-blue-200 text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{b.icon}</div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span className={isUnlocked ? 'text-[#7a1827]' : 'text-slate-500'}>{b.title}</span>
                      {isUnlocked && <CheckCircle className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <p className="text-[11px] leading-tight mt-0.5 text-slate-500">{b.desc}</p>
                    <div className="text-[10px] text-slate-400 mt-1 tabular-nums font-semibold">
                      {isUnlocked ? 'مكتسب ✓' : `يتطلب ${b.reqScore} نقطة`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#7a1827] hover:bg-[#62131f] text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-blue-300" />
            <span>طباعة أو حفظ الشهادة (PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

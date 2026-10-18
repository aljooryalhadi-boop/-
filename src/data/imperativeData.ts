import { HunterWord, TransformQuestion, SignsQuestion, DetectiveQuestion } from '../types/game';

// Words for Mode 1: صائد فعل الأمر (Speed & Classification)
export const HUNTER_WORDS: HunterWord[] = [
  // Imperative Verbs (Target = True)
  { id: 'h1', word: 'اقْرَأْ', type: 'imperative', explanation: 'فعل أمر صحيح الآخر مبني على السكون.' },
  { id: 'h2', word: 'اكْتُبْ', type: 'imperative', explanation: 'فعل أمر صحيح الآخر مبني على السكون.' },
  { id: 'h3', word: 'ادْعُ', type: 'imperative', explanation: 'فعل أمر معتل الآخر مبني على حذف حرف العلة (الواو).' },
  { id: 'h4', word: 'اسْعَ', type: 'imperative', explanation: 'فعل أمر معتل الآخر مبني على حذف حرف العلة (الألف).' },
  { id: 'h5', word: 'اقْضِ', type: 'imperative', explanation: 'فعل أمر معتل الآخر مبني على حذف حرف العلة (الياء).' },
  { id: 'h6', word: 'احْفَظُوا', type: 'imperative', explanation: 'فعل أمر اتصلت به واو الجماعة مبني على حذف النون.' },
  { id: 'h7', word: 'تَعَاوَنَا', type: 'imperative', explanation: 'فعل أمر اتصلت به ألف الاثنين مبني على حذف النون.' },
  { id: 'h8', word: 'انْتَبِهِي', type: 'imperative', explanation: 'فعل أمر اتصلت به ياء المخاطبة مبني على حذف النون.' },
  { id: 'h9', word: 'اصْبِرْنَ', type: 'imperative', explanation: 'فعل أمر اتصلت به نون النسوة مبني على السكون.' },
  { id: 'h10', word: 'قُلْ', type: 'imperative', explanation: 'فعل أمر مبني على السكون وحُذفت عينه لالتقاء الساكنين.' },
  { id: 'h11', word: 'صِلْ', type: 'imperative', explanation: 'فعل أمر مبني على السكون (من وصل).' },
  { id: 'h12', word: 'اسْتَمِعْ', type: 'imperative', explanation: 'فعل أمر خماسي مبني على السكون.' },
  { id: 'h13', word: 'جَاهِدُوا', type: 'imperative', explanation: 'فعل أمر متصل بواو الجماعة مبني على حذف النون.' },
  { id: 'h14', word: 'سَاعِدْ', type: 'imperative', explanation: 'فعل أمر صحيح الآخر مبني على السكون.' },
  { id: 'h15', word: 'تَفَاءَلْ', type: 'imperative', explanation: 'فعل أمر صحيح الآخر مبني على السكون.' },

  // Past Verbs (Distractors)
  { id: 'h16', word: 'كَتَبَ', type: 'past', explanation: 'فعل ماضٍ مبني على الفتح.' },
  { id: 'h17', word: 'انْطَلَقَ', type: 'past', explanation: 'فعل ماضٍ مبني على الفتح.' },
  { id: 'h18', word: 'دَعَا', type: 'past', explanation: 'فعل ماضٍ معتل الآخر بالألف.' },
  { id: 'h19', word: 'سَمِعُوا', type: 'past', explanation: 'فعل ماضٍ مبني على الضم لاتصاله بواو الجماعة.' },
  { id: 'h20', word: 'عَلِمَتْ', type: 'past', explanation: 'فعل ماضٍ مبني على الفتح لاتصاله بتاء التأنيث.' },

  // Present Verbs (Distractors)
  { id: 'h21', word: 'يَكْتُبُ', type: 'present', explanation: 'فعل مضارع مرفوع وعلامة رفعه الضمة.' },
  { id: 'h22', word: 'تَسْعَى', type: 'present', explanation: 'فعل مضارع مرفوع بضمة مقدرة على الألف.' },
  { id: 'h23', word: 'يَقْرَؤُونَ', type: 'present', explanation: 'فعل مضارع من الأفعال الخمسة مرفوع بثبوت النون.' },
  { id: 'h24', word: 'نَسْتَمِعُ', type: 'present', explanation: 'فعل مضارع مبدوء بنون المضارعة.' },
  { id: 'h25', word: 'تَرْسُمِينَ', type: 'present', explanation: 'فعل مضارع متصل بياء المخاطبة مرفوع بثبوت النون.' },

  // Nouns (Distractors)
  { id: 'h26', word: 'كِتَابَةٌ', type: 'noun', explanation: 'اسم مصدر، وليس فعلاً.' },
  { id: 'h27', word: 'قَارِئٌ', type: 'noun', explanation: 'اسم فاعل، وليس فعلاً.' },
  { id: 'h28', word: 'اسْتِمَاعٌ', type: 'noun', explanation: 'مصدر لفعل خماسي، يقبل التنوين فهو اسم.' },
  { id: 'h29', word: 'النَّجَاحُ', type: 'noun', explanation: 'اسم معرّف بأل التعريف.' },
  { id: 'h30', word: 'صَبْرٌ', type: 'noun', explanation: 'اسم يدل على صفة ومصدر.' }
];

// Questions for Mode 2: محوّل صيغة الأمر (Transformation Forge)
export const TRANSFORM_QUESTIONS: TransformQuestion[] = [
  {
    id: 't1',
    presentVerb: 'تَسْمَعُ كَلَامَ المُعَلِّمِ',
    targetPronoun: 'أنتَ (المفرد المذكر)',
    pronounCode: 'anta',
    correctImperative: 'اسْمَعْ',
    options: ['اسْمَعْ', 'اسْمَعِي', 'اسْمَعُوا', 'سَمِعْتَ'],
    constructionSign: 'السكون',
    ruleExplanation: 'يُبنى فعل الأمر على السكون إذا كان صحيح الآخر ولم يتصل به شيء.'
  },
  {
    id: 't2',
    presentVerb: 'تَدْعُو إِلَى الخَيْرِ',
    targetPronoun: 'أنتَ (المفرد المذكر)',
    pronounCode: 'anta',
    correctImperative: 'ادْعُ',
    options: ['ادْعُ', 'ادْعُو', 'ادْعِي', 'ادْعَا'],
    constructionSign: 'حذف حرف العلة',
    ruleExplanation: 'الفعل معتل الآخر بالواو (يدعو)، فعند صياغة الأمر منه نحذف حرف العلة ونضع ضمة تدل عليه: ادْعُ.'
  },
  {
    id: 't3',
    presentVerb: 'تَحْفَظِينَ القُرْآنَ',
    targetPronoun: 'أنتِ (المفردة المؤنثة)',
    pronounCode: 'anti',
    correctImperative: 'احْفَظِي',
    options: ['احْفَظِي', 'احْفَظْ', 'احْفَظِينَ', 'احْفَظُوا'],
    constructionSign: 'حذف النون',
    ruleExplanation: 'عند مخاطبة المؤنثة تتصل به ياء المخاطبة، فيُبنى على حذف النون (لأنه من الأفعال الخمسة في المضارع).'
  },
  {
    id: 't4',
    presentVerb: 'تَسْعَوْنَ فِي طَلَبِ العِلْمِ',
    targetPronoun: 'أنتم (جمع المذكر)',
    pronounCode: 'antum',
    correctImperative: 'اسْعَوْا',
    options: ['اسْعَوْا', 'اسْعُونَ', 'اسْعَ', 'اسْعَيَا'],
    constructionSign: 'حذف النون',
    ruleExplanation: 'عند اتصاله بواو الجماعة يُبنى على حذف النون وتوضع بعدها ألف التفريق: اسْعَوْا.'
  },
  {
    id: 't5',
    presentVerb: 'تَقْضِي بِالعَدْلِ',
    targetPronoun: 'أنتَ (المفرد المذكر)',
    pronounCode: 'anta',
    correctImperative: 'اقْضِ',
    options: ['اقْضِ', 'اقْضِي', 'اقْضُو', 'قَضَيْتَ'],
    constructionSign: 'حذف حرف العلة',
    ruleExplanation: 'الفعل معتل الآخر بالياء (يقضي)، فيُبنى على حذف حرف العلة وتوضع كسرة تدل عليه: اقْضِ.'
  },
  {
    id: 't6',
    presentVerb: 'تَتَعَاوَنَانِ عَلَى البِرِّ',
    targetPronoun: 'أنتما (المثنى)',
    pronounCode: 'antuma',
    correctImperative: 'تَعَاوَنَا',
    options: ['تَعَاوَنَا', 'تَعَاوَنَانِ', 'تَعَاوَنْ', 'تَعَاوَنُوا'],
    constructionSign: 'حذف النون',
    ruleExplanation: 'عند اتصاله بألف الاثنين يُبنى فعل الأمر على حذف النون: تَعَاوَنَا.'
  },
  {
    id: 't7',
    presentVerb: 'تَصْبِرْنَ فِي الشَّدَائِدِ',
    targetPronoun: 'أنتنّ (جمع المؤنث)',
    pronounCode: 'antunna',
    correctImperative: 'اصْبِرْنَ',
    options: ['اصْبِرْنَ', 'اصْبِرُوا', 'اصْبِرِي', 'اصْبِرَات'],
    constructionSign: 'السكون',
    ruleExplanation: 'إذا اتصلت بفعل الأمر نون النسوة بُني دائماً على السكون: اصْبِرْنَ.'
  },
  {
    id: 't8',
    presentVerb: 'تَرْمِي الكُرَةَ بِدِقَّةٍ',
    targetPronoun: 'أنتَ (المفرد المذكر)',
    pronounCode: 'anta',
    correctImperative: 'ارْمِ',
    options: ['ارْمِ', 'ارْمِي', 'ارْمُو', 'رَمَيْتَ'],
    constructionSign: 'حذف حرف العلة',
    ruleExplanation: 'الفعل معتل بالياء، فيحذف حرف العلة ويُعوض عنه بالكسرة: ارْمِ.'
  }
];

// Questions for Mode 3: سر علامات البناء (Construction Signs Challenge)
export const SIGNS_QUESTIONS: SignsQuestion[] = [
  {
    id: 's1',
    sentence: 'يا بُنَيَّ، {اقْرَأْ} كِتَابَكَ بِتَمَعُّنٍ.',
    imperativeWord: 'اقْرَأْ',
    correctSign: 'السكون',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لأنه فعل صحيح الآخر ولم يتصل بآخره شيء.',
    pronoun: 'أنتَ'
  },
  {
    id: 's2',
    sentence: 'يا طَالِبُ، {ادْعُ} رَبَّكَ أَنْ يُوَفِّقَكَ.',
    imperativeWord: 'ادْعُ',
    correctSign: 'حذف حرف العلة',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لأنه معتل الآخر بالواو (يدعو)، فحُذفت الواو وعُوّض عنها بالضمة.',
    pronoun: 'أنتَ'
  },
  {
    id: 's3',
    sentence: 'يا أَبْطَالُ، {حَافِظُوا} عَلَى نَظَافَةِ بِيئَتِكُمْ.',
    imperativeWord: 'حَافِظُوا',
    correctSign: 'حذف النون',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لاتصاله بواو الجماعة (مضارعه من الأفعال الخمسة: يحافظون).',
    pronoun: 'أنتم'
  },
  {
    id: 's4',
    sentence: 'يا سَارَةُ، {اكْتُبِي} دَرْسَكِ بِخَطٍّ جَمِيلٍ.',
    imperativeWord: 'اكْتُبِي',
    correctSign: 'حذف النون',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لاتصاله بياء المخاطبة (مضارعه: تكتبين).',
    pronoun: 'أنتِ'
  },
  {
    id: 's5',
    sentence: 'يا صَدِيقِي، {اسْعَ} فِي الخَيْرِ دَائِمًا.',
    imperativeWord: 'اسْعَ',
    correctSign: 'حذف حرف العلة',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لأنه معتل الآخر بالألف (يسعى)، فحُذفت الألف وعُوِّض عنها بالفتحة.',
    pronoun: 'أنتَ'
  },
  {
    id: 's6',
    sentence: 'يا طَبِيبَاتُ، {اعْتَنِينَ} بِالمَرْضَى بِرِفْقٍ.',
    imperativeWord: 'اعْتَنِينَ',
    correctSign: 'السكون',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لاتصاله بنون النسوة، ونون النسوة تبني الفعل على السكون دائماً.',
    pronoun: 'أنتنّ'
  },
  {
    id: 's7',
    sentence: 'يا رَجُلَانِ، {قُولَا} الحَقَّ وَلَا تَخَافَا.',
    imperativeWord: 'قُولَا',
    correctSign: 'حذف النون',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لاتصاله بألف الاثنين (مضارعه: تقولان).',
    pronoun: 'أنتما'
  },
  {
    id: 's8',
    sentence: 'يا مُؤْمِنُ، {اخْشَ} اللهَ فِي السِّرِّ وَالعَلَنِ.',
    imperativeWord: 'اخْشَ',
    correctSign: 'حذف حرف العلة',
    options: ['السكون', 'حذف حرف العلة', 'حذف النون'],
    reason: 'لأنه معتل الآخر بالألف المقصورة (يخشى)، فحذفت الألف وبقيت الفتحة دليلاً عليها.',
    pronoun: 'أنتَ'
  }
];

// Questions for Mode 4: مصلح الأخطاء الشائعة (Detective of Common Mistakes)
export const DETECTIVE_QUESTIONS: DetectiveQuestion[] = [
  {
    id: 'd1',
    flawedSentence: 'اللَّهُمَّ صَلِّي عَلَى نَبِيِّنَا مُحَمَّد',
    wrongWord: 'صَلِّي',
    correctWord: 'صَلِّ',
    correctSentence: 'اللَّهُمَّ صَلِّ عَلَى نَبِيِّنَا مُحَمَّد',
    whyWrong: 'كتابة الياء للمذكر خطأ شائع؛ لأن الفعل (صلّى) معتل الآخر بالياء، وأمر المذكر منه يُبنى على حذف حرف العلة بالكسرة (صَلِّ). أما الياء فتوضع للمخاطبة المؤنثة فقط (يا فاطمة صَلِّي).',
    ruleHint: 'فعل الأمر من المعتل الآخر للمذكر يحذف حرف العلة وتوضع الكسرة: صَلِّ.'
  },
  {
    id: 'd2',
    flawedSentence: 'يا أَحْمَد، ادْعُوا إِلَى سَبِيلِ رَبِّكَ بِالحِكْمَة',
    wrongWord: 'ادْعُوا',
    correctWord: 'ادْعُ',
    correctSentence: 'يا أَحْمَد، ادْعُ إِلَى سَبِيلِ رَبِّكَ بِالحِكْمَة',
    whyWrong: 'أحمد مفرد مذكر، فلا يصح إلحاق واو الجماعة به، والصواب حذف الواو الأصلية لأنه معتل الآخر بالواو: ادْعُ.',
    ruleHint: 'واو الجماعة للجمع (ادعُوا)، أما للمفرد المذكر فيحذف حرف العلة ونكتفي بالضمة: ادعُ.'
  },
  {
    id: 'd3',
    flawedSentence: 'يا طَالِبَاتُ، اكْتُبُوا الوَاجِبَ بِانْتِظَام',
    wrongWord: 'اكْتُبُوا',
    correctWord: 'اكْتُبْنَ',
    correctSentence: 'يا طَالِبَاتُ، اكْتُبْنَ الوَاجِبَ بِانْتِظَام',
    whyWrong: 'المخاطب جمع إناث (طالبات)، فيجب استخدام نون النسوة (اكْتُبْنَ) وليس واو الجماعة الخاصة بجمع الذكور (اكْتُبُوا).',
    ruleHint: 'لجمع الإناث نتصل بنون النسوة: افْعَلْنَ.'
  },
  {
    id: 'd4',
    flawedSentence: 'يا رِجَالُ، احْرِصُونَ عَلَى وَحْدَتِكُمْ',
    wrongWord: 'احْرِصُونَ',
    correctWord: 'احْرِصُوا',
    correctSentence: 'يا رِجَالُ، احْرِصُوا عَلَى وَحْدَتِكُمْ',
    whyWrong: 'فعل الأمر المتصل بواو الجماعة يُبنى على حذف النون، ولا يجوز بقاء النون كما في الفعل المضارع المرفوع.',
    ruleHint: 'فعل الأمر لا توجد فيه النون مع واو الجماعة أو ألف الاثنين أو ياء المخاطبة؛ يُبنى على حذف النون.'
  },
  {
    id: 'd5',
    flawedSentence: 'يا زَيْد، لَا تَتَرَدَّدْ وَاقْضِي بَيْنَ النَّاسِ بِالعَدْل',
    wrongWord: 'وَاقْضِي',
    correctWord: 'وَاقْضِ',
    correctSentence: 'يا زَيْد، لَا تَتَرَدَّدْ وَاقْضِ بَيْنَ النَّاسِ بِالعَدْل',
    whyWrong: 'زيد مفرد مذكر، وفعل الأمر من (قضى - يقضي) معتل الآخر، فيُبنى على حذف حرف العلة بالكسرة: اقْضِ.',
    ruleHint: 'لا تثبت الياء في الأمر إلا مع ياء المخاطبة للمؤنث (اقضي يا هند).'
  }
];

// Reference Guide for Rules Mode
export interface GrammarRule {
  title: string;
  sign: string;
  description: string;
  condition: string;
  examples: { word: string; sentence: string; note: string }[];
}

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    title: 'البناء على السكون',
    sign: 'السكون ( ْ )',
    description: 'الأصل في بناء فعل الأمر هو السكون الظاهر على آخره.',
    condition: 'إذا كان الفعل صحيح الآخر ولم يتصل بآخره شيء، أو إذا اتصلت به نون النسوة.',
    examples: [
      { word: 'اكْتُبْ', sentence: 'يا طَالِبُ، اكْتُبْ دَرْسَكَ.', note: 'صحيح الآخر لم يتصل به شيء.' },
      { word: 'اسْتَمِعْ', sentence: 'اسْتَمِعْ لِنَصِيحَةِ وَالِدِكَ.', note: 'فعل خماسي صحيح الآخر.' },
      { word: 'اجْتَهِدْنَ', sentence: 'يا فَتَيَاتُ، اجْتَهِدْنَ فِي دِرَاسَتِكُنَّ.', note: 'مبني على السكون لاتصاله بنون النسوة.' }
    ]
  },
  {
    title: 'البناء على حذف حرف العلة',
    sign: 'حذف العلة ( َ / ُ / ِ )',
    description: 'يُحذف حرف العلة الأخير وتوضع حركة تناسب الحرف المحذوف.',
    condition: 'إذا كان فعل الأمر معتل الآخر (بالألف أو الواو أو الياء) للمفرد المذكر المخاطب.',
    examples: [
      { word: 'اسْعَ', sentence: 'اسْعَ فِي الخَيْرِ دَائِمًا.', note: 'أصله (يسعى)، حُذفت الألف وعُوِّض عنها بالفتحة.' },
      { word: 'ادْعُ', sentence: 'ادْعُ رَبَّكَ تَضَرُّعًا.', note: 'أصله (يدعو)، حُذفت الواو وعُوِّض عنها بالضمة.' },
      { word: 'اقْضِ', sentence: 'اقْضِ بِالحَقِّ بَيْنَ النَّاسِ.', note: 'أصله (يقضي)، حُذفت الياء وعُوِّض عنها بالكسرة.' }
    ]
  },
  {
    title: 'البناء على حذف النون',
    sign: 'حذف النون',
    description: 'يُبنى على حذف النون لأن مضارعه يكون من الأفعال الخمسة.',
    condition: 'إذا اتصلت به ألف الاثنين، أو واو الجماعة، أو ياء المخاطبة.',
    examples: [
      { word: 'انْتَبِهَا', sentence: 'يا طَالِبَانِ، انْتَبِهَا لِلشَّرْحِ.', note: 'مبني على حذف النون لاتصاله بألف الاثنين.' },
      { word: 'تَعَاوَنُوا', sentence: 'تَعَاوَنُوا عَلَى البِرِّ وَالتَّقْوَى.', note: 'مبني على حذف النون لاتصاله بواو الجماعة وتلحقه ألف التفريق.' },
      { word: 'احْرِصِي', sentence: 'يا مَرْيَمُ، احْرِصِي عَلَى صَلَاتِكِ.', note: 'مبني على حذف النون لاتصاله بياء المخاطبة.' }
    ]
  }
];

export const BADGES = [
  { id: 'apprentice', title: 'فارس لغة الضاد', desc: 'أكملت أول تحدٍّ بنجاح!', reqScore: 50, icon: '🛡️' },
  { id: 'combo_master', title: 'أمير الكومبو', desc: 'حققت سلسلة 5 إجابات صحيحة متتالية!', reqScore: 100, icon: '⚡' },
  { id: 'hunter_pro', title: 'صائد الفصاحة', desc: 'أتقنت تمييز صيغة الأمر من باقي الأفعال!', reqScore: 180, icon: '🎯' },
  { id: 'detective_ace', title: 'المحقق النحوي', desc: 'كشفت الأخطاء الإملائية والنحوية الشائعة!', reqScore: 260, icon: '🔍' },
  { id: 'master_scholar', title: 'علاّمة صيغة الأمر', desc: 'جمعت أكثر من 400 نقطة وأتقنت جميع علامات البناء!', reqScore: 400, icon: '👑' }
];

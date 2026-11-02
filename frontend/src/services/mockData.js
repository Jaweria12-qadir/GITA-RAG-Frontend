const responses = {
  'why was arjuna confused?': {
    en: {
      answer: 'Arjuna was overwhelmed by the human cost of the coming battle. Seeing loved ones, teachers, and friends on both sides, he experienced grief and uncertainty about whether fighting could ever be morally right. The Gita begins with this conflict so that Krishna can guide Arjuna toward clarity about duty, action, and inner steadiness.',
      sources: [
      {
        verse_id: '1.28',
        chapter_no: 1,
        chapter_name: 'Arjuna Vishada Yoga',
        speaker: 'Arjuna',
        text_content: 'Seeing my own people gathered here, eager to fight, my limbs fail and my mouth becomes dry.',
        sanskrit: 'दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् । सीदन्ति मम गात्राणि मुखं च परिशुष्यति ॥ २८ ॥',
        transliteration: 'dṛṣṭvemaṁ svajanaṁ kṛṣṇa yuyutsuṁ samupasthitam | sīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati || 28 ||',
        purport: 'Arjuna felt distress upon seeing his family members, teachers and friends on the battlefield. His compassion and attachment overwhelmed him, making him unable to continue with the war.',
      },
      {
        verse_id: '1.29',
        chapter_no: 1,
        chapter_name: 'Arjuna Vishada Yoga',
        speaker: 'Arjuna',
        text_content: 'My body trembles and my mind is in turmoil as I face the consequences of this battle.',
        sanskrit: 'वेपथुश्च शरीरे मे रोमहर्षश्च जायते । गाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ॥ २९ ॥',
        transliteration: 'vepathuś ca śarīre me roma-harṣaś ca jāyate | gāṇḍīvaṁ sraṁsate hastāt tvak caiva paridahyate || 29 ||',
        purport: 'The shock of the coming war shows itself in Arjuna’s body and mind. This verse records his physical collapse so the later teaching on duty can begin from a place of honest human weakness.',
      },
    ],
    },
    ur: {
      answer: 'ارجن آنے والی جنگ کے انسانی نقصان سے بہت پریشان تھے۔ دونوں طرف اپنے عزیزوں، اساتذہ اور دوستوں کو دیکھ کر انہیں گہرا دکھ اور یہ تردد محسوس ہوا کہ کیا لڑنا اخلاقی طور پر درست ہو سکتا ہے۔ گیتا اسی کشمکش سے آغاز کرتی ہے تاکہ کرشن ارجن کو فرض، عمل اور باطنی استقامت کے بارے میں رہنمائی دے سکیں۔',
      sources: [
        {
          verse_id: '1.28',
          chapter_no: 1,
          chapter_name: 'ارجن وِشاد یوگ',
          speaker: 'ارجن',
          text_content: 'اپنے لوگوں کو جنگ کے لیے تیار دیکھ کر میرے اعضا کمزور ہو رہے ہیں اور میرا منہ خشک ہو رہا ہے۔',
        },
        {
          verse_id: '1.29',
          chapter_no: 1,
          chapter_name: 'ارجن وِشاد یوگ',
          speaker: 'ارجن',
          text_content: 'اس جنگ کے انجام کو دیکھ کر میرا جسم کانپ رہا ہے اور میرا ذہن بے چین ہے۔',
        },
      ],
    },
  },
  default: {
    en: {
      answer: 'This mock response demonstrates how Gita RAG will present a grounded answer together with the verses used as evidence. In the next phase, the same interface can be connected to the retrieval system without changing the user experience.',
      sources: [
      {
        verse_id: '2.47',
        chapter_no: 2,
        chapter_name: 'Sankhya Yoga',
        speaker: 'Krishna',
        text_content: 'You have a right to action, but not to the fruits of action. Do not act only for reward, and do not become attached to inaction.',
      },
    ],
    },
    ur: {
      answer: 'یہ نمونہ جواب دکھاتا ہے کہ گیتا راگ کس طرح متعلقہ آیات کو ثبوت کے طور پر پیش کرتے ہوئے ایک مربوط جواب فراہم کرے گا۔ اگلے مرحلے میں اسی انٹرفیس کو صارف کے تجربے کو تبدیل کیے بغیر بازیافت کے نظام سے جوڑا جا سکتا ہے۔',
      sources: [
        {
          verse_id: '2.47',
          chapter_no: 2,
          chapter_name: 'سانکھیہ یوگ',
          speaker: 'کرشن',
          text_content: 'تمہیں صرف عمل کرنے کا حق ہے، اس کے پھل پر نہیں۔ نتیجے کی خواہش کے لیے عمل نہ کرو اور بے عملی سے بھی وابستہ نہ ہو۔',
        },
      ],
    },
  },
}

export function getMockResponse(question, language) {
  if (question.trim().toLowerCase() === '__no_context__') {
    return {
      question,
      answer: '',
      language,
      no_context: true,
      sources: [],
    }
  }

  const response = responses[question.toLowerCase()] ?? responses.default
  const localizedResponse = language === 'ur' ? response.ur : response.en

  return {
    question,
    answer: localizedResponse.answer,
    language,
    no_context: false,
    sources: localizedResponse.sources,
  }
}

"use client";

import { useState } from "react";
import { FaGlobe } from "react-icons/fa";

const translations = {
  en: {
    title: "Herbal Quality Analyzer",
    description:
      "Use AI-powered e-tongue sensors to analyze taste, dilution and quality of herbal products with confidence and precision.",
    placeholderFactory: "Enter Factory Name",
    placeholderHerb: "Enter Herb Name",
    buttonText: "Start Your Analysis",
    selectLanguage: "Select Language",
    languages: {
      en: "English",
      hi: "Hindi (हिन्दी)",
      ta: "Tamil (தமிழ்)",
      te: "Telugu (తెలుగు)",
      ml: "Malayalam (മലയാളം)",
      bn: "Bengali (বাংলা)",
      gu: "Gujarati (ગુજરાતી)",
      kn: "Kannada (ಕನ್ನಡ)",
      or: "Odia (ଓଡ଼ିଆ)",
      pa: "Punjabi (ਪੰਜਾਬੀ)",
      as: "Assamese (অসমীয়া)",
      ma: "Marathi (मराठी)",
      ur: "Urdu (اردو)",
    },
  },
  hi: {
    title: "हर्बल गुणवत्ता विश्लेषक",
    description:
      "एआई-संचालित ई-टंग सेंसर का उपयोग करके हर्बल उत्पादों के स्वाद, पतलापन और गुणवत्ता का विश्लेषण करें।",
    placeholderFactory: "फैक्टरी का नाम दर्ज करें",
    placeholderHerb: "हर्बल नाम दर्ज करें",
    buttonText: "अपना विश्लेषण शुरू करें",
    selectLanguage: "भाषा चुनें",
    languages: {
      en: "अंग्रेज़ी",
      hi: "हिन्दी",
      ta: "तमिल",
      te: "तेलुगु",
      ml: "मलयालम",
      bn: "बंगाली",
      gu: "गुजराती",
      kn: "कन्नड़",
      or: "ओड़िया",
      pa: "पंजाबी",
      as: "असमिया",
      ma: "मराठी",
      ur: "उर्दू",
    },
  },
  ta: {
    title: "மூலிகை தர பகுப்பாய்வு கருவி",
    description:
      "சுவை, தண்ணீர் கலப்பு மற்றும் மூலிகை பொருட்களின் தரத்தை AI இயக்கிய இ-நாக்கு உணரிகள் மூலம் பகுப்பாய்வு செய்யவும்.",
    placeholderFactory: "கூடாரி பெயரை உள்ளிடவும்",
    placeholderHerb: "மூலிகை பெயரை உள்ளிடவும்",
    buttonText: "உங்கள் பகுப்பாய்வை தொடங்கவும்",
    selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்",
    languages: {
      en: "ஆங்கிலம்",
      hi: "இந்தி",
      ta: "தமிழ்",
      te: "తెలుగు",
      ml: "மலையாளம்",
      bn: "பெங்காலி",
      gu: "குஜராத்தி",
      kn: "கன்னடம்",
      or: "ஒடியா",
      pa: "பஞ்சாபி",
      as: "ஆசாமீஸ்",
      ma: "மராத்தி",
      ur: "உர்து",
    },
  },
  te: {
    title: "హెర్బల్ క్వాలిటీ విశ్లేషకుడు",
    description:
      "స్వాద్, కలయిక మరియు మొక్కజొన్న ఉత్పత్తుల నాణ్యతను AI ఆధారిత ఈ-టంగ్ సెన్సార్లతో విశ్లేషించండి.",
    placeholderFactory: "ఫ్యాక్టరీ పేరు నమోదు చేయండి",
    placeholderHerb: "మొక్క పేరు నమోదు చేయండి",
    buttonText: "మీ విశ్లేషణ ప్రారంభించండి",
    selectLanguage: "భాషను ఎంచుకోండి",
    languages: {
      en: "ఆంగ్లం",
      hi: "హిందీ",
      ta: "తమిళం",
      te: "తెలుగు",
      ml: "మలయాళం",
      bn: "బెంగాలీ",
      gu: "గుజరాతీ",
      kn: "కన్నడ",
      or: "ఒడియా",
      pa: "పంజాబీ",
      as: "ఆసామీస్",
      ma: "మరాఠీ",
      ur: "ఉర్దూ",
    },
  },
  ml: {
    title: "ഹെർബൽ ഗുണനിലവാര വിശകലനം",
    description:
      "സ്വാദും, ദ്രവീകരണവും, ഹർബൽ ഉൽപ്പന്നങ്ങളുടെ ഗുണനിലവാരം AI അധിഷ്ഠിത ഇ-നാക്ക് സെൻസറുകൾ ഉപയോഗിച്ച് വിശകലനം ചെയ്യുക.",
    placeholderFactory: "ഫാക്ടറി പേര് നൽകുക",
    placeholderHerb: "ഹർബൽ പേര് നൽകുക",
    buttonText: "നിങ്ങളുടെ വിശകലനം ആരംഭിക്കുക",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    languages: {
      en: "ഇംഗ്ലീഷ്",
      hi: "ഹിന്ദി",
      ta: "തമിഴ്",
      te: "തെലുങ്ക്",
      ml: "മലയാളം",
      bn: "ബംഗാളി",
      gu: "ഗുജറാത്തി",
      kn: "കന്നഡ",
      or: "ഒറിയ",
      pa: "പഞ്ചാബി",
      as: "അസാമീസ്",
      ma: "മറാത്തി",
      ur: "ഉർദു",
    },
  },
  bn: {
    title: "হার্বাল কোয়ালিটি অ্যানালাইজার",
    description:
      "AI চালিত ই-টং সেন্সরের সাহায্যে হার্বাল পণ্যের স্বাদ, পাতলা এবং গুণমান বিশ্লেষণ করুন।",
    placeholderFactory: "কারখানার নাম লিখুন",
    placeholderHerb: "হার্বাল নাম লিখুন",
    buttonText: "আপনার বিশ্লেষণ শুরু করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",
    languages: {
      en: "ইংরেজি",
      hi: "হিন্দি",
      ta: "তামিল",
      te: "তেলুগু",
      ml: "মালয়ালম",
      bn: "বাংলা",
      gu: "গুজরাটি",
      kn: "কন্নড়",
      or: "ওড়িয়া",
      pa: "পাঞ্জাবি",
      as: "অসমীয়া",
      ma: "মারাঠি",
      ur: "উর্দু",
    },
  },
  gu: {
    title: "હર્બલ ગુણવત્તા વિશ્લેષક",
    description:
      "AI આધારિત ઈ-ટંગ સેન્સર્સ સાથે હર્બલ ઉત્પાદનોનું સ્વાદ, વિલય અને ગુણવત્તા વિશ્લેષણ કરો.",
    placeholderFactory: "ફેક્ટરીનું નામ દાખલ કરો",
    placeholderHerb: "હર્બલનું નામ દાખલ કરો",
    buttonText: "તમારો વિશ્લેષણ શરૂ કરો",
    selectLanguage: "ભાષા પસંદ કરો",
    languages: {
      en: "અંગ્રેજી",
      hi: "હિન્દી",
      ta: "તમિલ",
      te: "તેલુગુ",
      ml: "મલયાલમ",
      bn: "બંગાળી",
      gu: "ગુજરાતી",
      kn: "કન્નડ",
      or: "ઓડિયા",
      pa: "પંજાબી",
      as: "આસામી",
      ma: "મરાઠી",
      ur: "ઉર્દૂ",
    },
  },
  kn: {
    title: "ಹರ್ಬಲ್ ಗುಣಮಟ್ಟ ವಿಶ್ಲೇಷಕ",
    description:
      "AI ಆಧಾರಿತ ಇ-ಟಂಗ್ ಸೆನ್ಸರ್‌ಗಳೊಂದಿಗೆ ಹರ್ಬಲ್ ಉತ್ಪನ್ನಗಳ ರುಚಿ, ದ್ರಾವಣ ಮತ್ತು ಗುಣಮಟ್ಟವನ್ನು ವಿಶ್ಲೇಷಿಸಿ.",
    placeholderFactory: "ಕಾರ್ಖಾನೆ ಹೆಸರು ನಮೂದಿಸಿ",
    placeholderHerb: "ಹರ್ಬಲ್ ಹೆಸರು ನಮೂದಿಸಿ",
    buttonText: "ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    languages: {
      en: "ಇಂಗ್ಲಿಷ್",
      hi: "ಹಿಂದಿ",
      ta: "ತಮಿಳು",
      te: "ತೆಲುಗು",
      ml: "ಮಲಯಾಳಂ",
      bn: "ಬಂಗಾಳಿ",
      gu: "ಗುಜರಾತಿ",
      kn: "ಕನ್ನಡ",
      or: "ಒಡಿಯಾ",
      pa: "ಪಂಜಾಬಿ",
      as: "ಅಸ್ಸಾಮಿ",
      ma: "ಮರಾಠಿ",
      ur: "ಉರ್ದು",
    },
  },
  or: {
    title: "ହର୍ବାଲ୍ କ୍ୱାଲିଟି ଆନାଲାଇଜର",
    description:
      "AI ଆଧାରିତ ଇ-ଟଙ୍ଗ୍ ସେନ୍ସର ସହିତ ହର୍ବାଲ୍ ପ୍ରୋଡକ୍ଟସ୍ ର ସ୍ୱାଦ, ପତଳାପଣ ଏବଂ ଗୁଣବତ୍ତା ବିଶ୍ଲେଷଣ କରନ୍ତୁ।",
    placeholderFactory: "ଫ୍ୟାକ୍ଟୋରୀ ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
    placeholderHerb: "ହର୍ବାଲ୍ ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
    buttonText: "ଆପଣଙ୍କର ବିଶ୍ଲେଷଣ ଆରମ୍ଭ କରନ୍ତୁ",
    selectLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    languages: {
      en: "ଇଂରାଜୀ",
      hi: "ହିନ୍ଦୀ",
      ta: "ତାମିଳ",
      te: "ତେଲୁଗୁ",
      ml: "ମଲୟାଳମ୍",
      bn: "ବେଙ୍ଗାଳୀ",
      gu: "ଗୁଜରାଟୀ",
      kn: "କନ୍ନଡ",
      or: "ଓଡ଼ିଆ",
      pa: "ପଞ୍ଜାବୀ",
      as: "ଆସାମୀୟ",
      ma: "ମରାଠୀ",
      ur: "ଉର୍ଦୁ",
    },
  },
  pa: {
    title: "ਹਰਬਲ ਕੁਆਲਟੀ ਐਨਾਲਾਈਜ਼ਰ",
    description:
      "AI-ਆਧਾਰਿਤ ਈ-ਟੰਗ ਸੈਂਸਰਾਂ ਨਾਲ ਹਰਬਲ ਉਤਪਾਦਾਂ ਦੇ ਸਵਾਦ, ਪਤਲਾ ਅਤੇ ਗੁਣਵੱਤਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ।",
    placeholderFactory: "ਫੈਕਟਰੀ ਨਾਮ ਦਾਖਲ ਕਰੋ",
    placeholderHerb: "ਹਰਬਲ ਨਾਮ ਦਾਖਲ ਕਰੋ",
    buttonText: "ਆਪਣਾ ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ੁਰੂ ਕਰੋ",
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    languages: {
      en: "ਅੰਗ੍ਰੇਜ਼ੀ",
      hi: "ਹਿੰਦੀ",
      ta: "ਤਮਿਲ",
      te: "ਤੇਲੁਗੁ",
      ml: "ਮਲਯਾਲਮ",
      bn: "ਬੰਗਾਲੀ",
      gu: "ਗੁਜਰਾਤੀ",
      kn: "ਕੰਨੜ",
      or: "ਓੜੀਆ",
      pa: "ਪੰਜਾਬੀ",
      as: "ਅਸਮੀ",
      ma: "ਮਰਾਠੀ",
      ur: "ਉਰਦੂ",
    },
  },
  as: {
    title: "হাৰ্বেল কোৱালিটি এনালাইজাৰ",
    description:
      "AI-চালিত ই-টং সেন্সৰ ব্যৱহাৰেৰে হাৰ্বেল সামগ্ৰীৰ স্বাদ, পাতল আৰু গুণমান বিশ্লেষণ কৰক।",
    placeholderFactory: "কাৰখানাৰ নাম লিখক",
    placeholderHerb: "হাৰ্বেল নাম লিখক",
    buttonText: "আপোনাৰ বিশ্লেষণ আৰম্ভ কৰক",
    selectLanguage: "ভাষা বাচনি কৰক",
    languages: {
      en: "ইংৰাজী",
      hi: "হিন্দী",
      ta: "তামিল",
      te: "তেলুগু",
      ml: "মালয়ালম",
      bn: "বংগালী",
      gu: "গুজৰাটী",
      kn: "কান্নড়",
      or: "ওড়িয়া",
      pa: "পাঞ্জাবী",
      as: "অসমীয়া",
      ma: "মাৰাঠী",
      ur: "উৰ্দু",
    },
  },
  ma: {
    title: "हर्बल गुणवत्ता विश्लेषक",
    description:
      "AI-आधारित ई-टंग सेन्सर्स के साथ हर्बल उत्पादों के स्वाद, पतलापन और गुणवत्ता का विश्लेषण करें।",
    placeholderFactory: "फॅक्टरी नाव टाका",
    placeholderHerb: "हर्बल नाव टाका",
    buttonText: "आपला विश्लेषण सुरू करा",
    selectLanguage: "भाषा निवडा",
    languages: {
      en: "इंग्रजी",
      hi: "हिंदी",
      ta: "तमिळ",
      te: "तेलुगू",
      ml: "मल्याळम",
      bn: "बंगाली",
      gu: "गुजराती",
      kn: "कन्नड",
      or: "ओडिया",
      pa: "पंजाबी",
      as: "असमिया",
      ma: "मराठी",
      ur: "उर्दू",
    },
  },
  ur: {
    title: "ہاربل کوالٹی اینالائزر",
    description:
      "AI پر مبنی ای-ٹونگ سینسرز کے ساتھ جڑی بوٹیوں کی مصنوعات کے ذائقہ، پتلاپن اور معیار کا تجزیہ کریں۔",
    placeholderFactory: "فیکٹری کا نام درج کریں",
    placeholderHerb: "جڑی بوٹی کا نام درج کریں",
    buttonText: "اپنا تجزیہ شروع کریں",
    selectLanguage: "زبان منتخب کریں",
    languages: {
      en: "انگریزی",
      hi: "ہندی",
      ta: "تمل",
      te: "تلگو",
      ml: "ملایالم",
      bn: "بنگالی",
      gu: "گجراتی",
      kn: "کنڑ",
      or: "اڑیہ",
      pa: "پنجابی",
      as: "آسامیز",
      ma: "مراٹھی",
      ur: "اردو",
    },
  },
};

export default function FloatingLanguageSwitcher({ setLanguageContent }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (lang) => {
    setLanguageContent(translations[lang]);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Language Menu - appears above button */}
      {open && (
        <div className="mb-3 bg-white rounded-lg shadow-lg p-3 border w-72 border-green-200 max-h-64 overflow-auto">
          <h2 className="text-sm font-semibold text-green-800 mb-2">
            {translations.en.selectLanguage}
          </h2>
          <ul className="space-y-1 text-sm">
            {Object.entries(translations.en.languages).map(([code, label]) => (
              <li
                key={code}
                className="cursor-pointer hover:text-green-800 py-1 px-2 rounded hover:bg-green-50 transition-colors"
                onClick={() => handleSelect(code)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle Button - stays fixed */}
      <button
        onClick={toggleOpen}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Toggle Language Selector"
      >
        <FaGlobe size={24} />
      </button>
    </div>
  );
}

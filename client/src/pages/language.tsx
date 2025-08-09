import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    const selectedLang = languages.find(lang => lang.code === languageCode);
    
    toast({
      title: "Language Updated",
      description: `Language has been changed to ${selectedLang?.name}`,
    });
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/crypto-background.svg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.95) 100%)"
          }}
        />
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col p-6 py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mining
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Language Settings
          </h1>
          <p className="text-slate-400">Choose your preferred language</p>
        </div>

        {/* Language Settings */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Current Language */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-400">Current Language</h3>
              <Check className="w-5 h-5 text-green-400" />
            </div>
            
            <div className="flex items-center bg-slate-700/50 rounded-xl p-4">
              <span className="text-2xl mr-3">{currentLanguage?.flag}</span>
              <div>
                <div className="font-semibold text-white" data-testid="current-language">
                  {currentLanguage?.name}
                </div>
                <div className="text-sm text-slate-400">
                  {currentLanguage?.nativeName}
                </div>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <h3 className="text-lg font-semibold text-slate-300 mb-4">Select Language</h3>
            
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger 
                className="bg-slate-700/50 border-slate-600 text-white"
                data-testid="language-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center">
                      <span className="mr-3">{language.flag}</span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-sm text-slate-400">{language.nativeName}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Available Languages */}
          <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
            <h4 className="font-semibold text-blue-400 mb-3">Available Languages</h4>
            <div className="space-y-3">
              {languages.map((language) => (
                <div key={language.code} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{language.flag}</span>
                    <div>
                      <div className="text-sm font-medium text-slate-300">{language.name}</div>
                      <div className="text-xs text-slate-400">{language.nativeName}</div>
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Translation Note */}
          <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Translation Status</h4>
                <p className="text-sm text-slate-300">
                  Full translations for all languages are currently in progress. Some features may still appear in English.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, ChevronDown, AlertCircle } from 'lucide-react';
// import { validateMnemonic } from 'bip39'; // Disabled BIP39 validation

interface ImportWalletProps {
  onBack: () => void;
  onContinue: (mnemonic: string) => void;
}

export const ImportWallet: React.FC<ImportWalletProps> = ({
  onBack,
  onContinue
}) => {
  const { t } = useTranslation();
  const [words, setWords] = useState<string[]>(Array(12).fill(''));
  const [isExpanded, setIsExpanded] = useState(false);
  const [wordCount, setWordCount] = useState(12);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<boolean[]>(Array(12).fill(false));
  const [bip39WordList, setBip39WordList] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<{ [key: number]: string[] }>({});
  const [showSuggestions, setShowSuggestions] = useState<{ [key: number]: boolean }>({});
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<{ [key: number]: number }>({});
  // Removed unused inputPositions state
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(12).fill(null));

  // Load BIP39 word list on component mount
  useEffect(() => {
    const loadWordList = async () => {
      try {
        const response = await fetch('/bip39-wordlist.txt');
        const text = await response.text();
        const wordList = text.trim().split('\n').map(word => word.trim());
        setBip39WordList(wordList);
      } catch (error) {
        console.error('Failed to load BIP39 word list:', error);
      }
    };
    loadWordList();
  }, []);

  // Skip BIP39 word validation - allow any words
  const isValidWord = (): boolean => {
    return true;
  };

  const getSuggestions = (input: string): string[] => {
    if (!input.trim() || bip39WordList.length === 0) {
      return [];
    }

    const inputLower = input.toLowerCase();
    const matches = bip39WordList
      .filter(word => word.startsWith(inputLower))
      .slice(0, 6); // Show max 6 suggestions

    return matches;
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    const cleanValue = value.toLowerCase().trim();
    newWords[index] = cleanValue;
    setWords(newWords);

    // Validate word
    const newErrors = [...errors];
    newErrors[index] = cleanValue.length > 0 && !isValidWord();
    setErrors(newErrors);

    // Update suggestions for this specific input
    if (cleanValue.length > 0) {
      const newSuggestions = getSuggestions(cleanValue);
      setSuggestions(prev => ({ ...prev, [index]: newSuggestions }));
      setShowSuggestions(prev => ({ ...prev, [index]: focusedIndex === index && newSuggestions.length > 0 }));
      setSelectedSuggestionIndex(prev => ({ ...prev, [index]: 0 }));
    } else {
      setShowSuggestions(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const currentSuggestions = suggestions[index] || [];
    const isShowingSuggestions = showSuggestions[index] || false;
    const currentSelectedIndex = selectedSuggestionIndex[index] || 0;

    if (isShowingSuggestions && currentSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentSelectedIndex < currentSuggestions.length - 1 ? currentSelectedIndex + 1 : 0;
        setSelectedSuggestionIndex(prev => ({ ...prev, [index]: nextIndex }));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentSelectedIndex > 0 ? currentSelectedIndex - 1 : currentSuggestions.length - 1;
        setSelectedSuggestionIndex(prev => ({ ...prev, [index]: prevIndex }));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        selectSuggestion(index, currentSuggestions[currentSelectedIndex]);
        return;
      } else if (e.key === 'Escape') {
        setShowSuggestions(prev => ({ ...prev, [index]: false }));
        return;
      }
    }

    if (e.key === 'Enter' && words[index].trim() && index < wordCount - 1) {
      // Move to next input on Enter
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Backspace' && !words[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0 && !isShowingSuggestions) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < wordCount - 1 && !isShowingSuggestions) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowUp' && index >= 3 && !isShowingSuggestions) {
      inputRefs.current[index - 3]?.focus();
    } else if (e.key === 'ArrowDown' && index < wordCount - 3 && !isShowingSuggestions) {
      inputRefs.current[index + 3]?.focus();
    }
  };

  const selectSuggestion = (index: number, suggestion: string) => {
    const newWords = [...words];
    newWords[index] = suggestion;
    setWords(newWords);

    // Update validation
    const newErrors = [...errors];
    newErrors[index] = false; // BIP39 words from list are always valid
    setErrors(newErrors);

    setShowSuggestions(prev => ({ ...prev, [index]: false }));

    // Move to next input
    if (index < wordCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pastedWords = pasteData.trim().split(/\s+/);

    if (pastedWords.length >= 12) {
      const newWords = pastedWords.slice(0, wordCount);
      setWords(newWords);

      // Validate all words
      const newErrors = newWords.map(() => !isValidWord());
      setErrors(newErrors);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    const currentWord = words[index];
    if (currentWord && suggestions[index]) {
      setShowSuggestions(prev => ({ ...prev, [index]: suggestions[index].length > 0 }));
    }
  };

  const handleBlur = (index: number) => {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      if (focusedIndex === index) {
        setFocusedIndex(null);
      }
      setShowSuggestions(prev => ({ ...prev, [index]: false }));
    }, 200);
  };

  const clearAll = () => {
    setWords(Array(wordCount).fill(''));
    setErrors(Array(wordCount).fill(false));
    setSuggestions({});
    setShowSuggestions({});
    setSelectedSuggestionIndex({});
    inputRefs.current[0]?.focus();
  };

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    if (newExpanded) {
      // Expand to 24 words
      const newWordCount = 24;
      setWordCount(newWordCount);
      setWords(prev => [...prev, ...Array(newWordCount - prev.length).fill('')]);
      setErrors(prev => [...prev, ...Array(newWordCount - prev.length).fill(false)]);
      inputRefs.current = [...inputRefs.current, ...Array(newWordCount - inputRefs.current.length).fill(null)];
    } else {
      // Back to 12 words
      setWordCount(12);
      setWords(prev => prev.slice(0, 12));
      setErrors(prev => prev.slice(0, 12));
      inputRefs.current = inputRefs.current.slice(0, 12);
    }
  };

  const isComplete = () => {
    // Get all words for the current word count
    const currentWords = words.slice(0, wordCount);

    // Filter out empty words
    const filledWords = currentWords.filter(word => word && word.trim() !== '');

    // Check if we have the right number of words
    if (filledWords.length !== wordCount) {
      return false;
    }

    // Skip BIP39 validation - allow any words
    console.log('Skipping BIP39 validation - allowing any input');
    return true;
  };

  const handleContinue = () => {
    console.log('Continue button clicked, isComplete:', isComplete());
    if (isComplete()) {
      const filledWords = words.filter(word => word && word.trim() !== '');
      onContinue(filledWords.join(' '));
    } else {
      console.log('Cannot continue - validation failed');
    }
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-visible rounded-2xl sm:rounded-none font-montserrat">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pb-4 overflow-visible">
        {/* Icon and Title Section */}
        <div className="flex flex-col items-center justify-center pt-4 pb-6 space-y-4">
          {/* Document Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-3xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"></div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-2"
          >
            <h1 className="text-xl font-bold text-white">
              {t('importWallet.title')}
            </h1>
            <p className="text-gray-400 text-sm px-4 leading-relaxed">
              Type or paste your {wordCount}-word recovery phrase
            </p>
          </motion.div>
        </div>

        {/* Recovery Phrase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 space-y-6 min-h-0 overflow-visible"
        >
          {/* Input Grid */}
          <div className={`grid gap-3 ${isExpanded ? 'grid-cols-4' : 'grid-cols-3'} relative`}>
            {words.slice(0, wordCount).map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.02 }}
                className="relative z-10"
              >
                <div
                  className={`relative bg-gray-800/60 backdrop-blur-sm border rounded-2xl transition-all duration-200 ${
                    focusedIndex === index
                      ? 'border-purple-500/50 bg-gray-800/80'
                      : errors[index]
                      ? 'border-red-500/50'
                      : 'border-gray-700/50'
                  }`}
                >
                  {/* Word number */}
                  <div className="absolute -top-2 left-3 bg-gray-900 px-2 py-0.5 rounded text-xs text-gray-400">
                    {index + 1}
                  </div>

                  <input
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    value={word}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => {
                      // Only blur if not clicking on suggestions
                      setTimeout(() => handleBlur(index), 150);
                    }}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    placeholder=""
                    className="w-full h-12 px-3 pt-3 bg-transparent text-white text-center text-sm font-mono focus:outline-none placeholder-gray-500"
                    autoComplete="off"
                    spellCheck={false}
                  />


                  {/* Error indicator */}
                  {errors[index] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <AlertCircle className="w-2.5 h-2.5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Longer phrase option */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={toggleExpanded}
              className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              <span>{t('importWallet.longerPhrase')}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3">
            {/* Word count and clear */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                {t('importWallet.wordCount', {
                  current: words.filter(w => w.trim()).length,
                  total: wordCount
                })}
              </span>
              {words.some(w => w.trim()) && (
                <button
                  onClick={clearAll}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  {t('importWallet.clearAll')}
                </button>
              )}
            </div>

            {/* Continue Button */}
            <motion.button
              onClick={handleContinue}
              disabled={!isComplete()}
              className={`w-full h-12 rounded-2xl font-semibold text-white transition-all duration-200 ${
                isComplete()
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
              whileHover={isComplete() ? { scale: 1.02 } : {}}
              whileTap={isComplete() ? { scale: 0.98 } : {}}
            >
              {t('importWallet.continue')}
            </motion.button>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <p className="text-amber-300/80 leading-relaxed">
                  {t('importWallet.securityNotice')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Suggestions Portal */}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 pointer-events-none z-[10000]">
          {words.slice(0, wordCount).map((_, index) => {
            if (!showSuggestions[index] || focusedIndex !== index || !(suggestions[index] || []).length) {
              return null;
            }

            const inputElement = inputRefs.current[index];
            if (!inputElement) return null;

            const rect = inputElement.getBoundingClientRect();

            return (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'fixed',
                    top: rect.bottom + 4,
                    left: rect.left,
                    width: rect.width,
                    zIndex: 10000
                  }}
                  className="pointer-events-auto max-h-48 overflow-auto bg-gray-900 border border-gray-600 rounded-lg shadow-2xl"
                >
                  {(suggestions[index] || []).map((suggestion, suggestionIndex) => (
                    <button
                      key={suggestion}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors ${
                        suggestionIndex === (selectedSuggestionIndex[index] || 0)
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300'
                      }`}
                      onMouseDown={(e) => e.preventDefault()} // Prevent blur
                      onClick={() => selectSuggestion(index, suggestion)}
                      onMouseEnter={() => setSelectedSuggestionIndex(prev => ({ ...prev, [index]: suggestionIndex }))}
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
};
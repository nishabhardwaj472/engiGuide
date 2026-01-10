import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { careerPaths } from '@/data/mockData';
import { Compass, ArrowRight, Check, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const quizQuestions = [
  {
    question: "What excites you more?",
    options: [
      { text: "Building software products", points: { it: 2, startup: 1 } },
      { text: "Understanding how machines work", points: { core: 2 } },
      { text: "Research and innovation", points: { higher: 2 } },
      { text: "Creating something of my own", points: { startup: 2 } },
    ],
  },
  {
    question: "How do you handle uncertainty?",
    options: [
      { text: "I prefer stability", points: { core: 2, it: 1 } },
      { text: "I thrive in chaos", points: { startup: 2 } },
      { text: "I like structured challenges", points: { higher: 2 } },
      { text: "I adapt quickly", points: { it: 2 } },
    ],
  },
  {
    question: "What's your ideal work environment?",
    options: [
      { text: "Remote, flexible hours", points: { it: 2, startup: 1 } },
      { text: "Lab or factory floor", points: { core: 2 } },
      { text: "University or research center", points: { higher: 2 } },
      { text: "My own office/garage", points: { startup: 2 } },
    ],
  },
];

type CareerScores = {
  it: number;
  core: number;
  higher: number;
  startup: number;
};

const Career = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<CareerScores>({ it: 0, core: 0, higher: 0, startup: 0 });
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    const option = quizQuestions[currentQuestion].options[optionIndex];
    
    setTimeout(() => {
      const newScores = { ...scores };
      Object.entries(option.points).forEach(([key, value]) => {
        newScores[key as keyof CareerScores] += value;
      });
      setScores(newScores);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const getSortedPaths = () => {
    return careerPaths
      .map((path) => ({
        ...path,
        score: scores[path.id as keyof CareerScores],
      }))
      .sort((a, b) => b.score - a.score);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ it: 0, core: 0, higher: 0, startup: 0 });
    setShowResults(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <div className="pt-24 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
              <Compass className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Find Your Path</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Career <span className="gradient-text-secondary">Clarity</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Take a quick quiz to discover which career path suits you best
            </p>
          </motion.div>

          {!showResults ? (
            /* Quiz Section */
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-elevated p-8 max-w-2xl mx-auto"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option.text}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-xl transition-all ${
                      selectedAnswer === index
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? 'border-white bg-white/20' : 'border-muted-foreground'
                      }`}>
                        {selectedAnswer === index && <Check className="w-4 h-4" />}
                      </span>
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Results Section */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Your Results Are In! 🎉</h2>
                <p className="text-muted-foreground">Here's how different paths match your personality</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getSortedPaths().map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 relative overflow-hidden ${
                      index === 0 ? 'ring-2 ring-primary glow-primary md:col-span-2' : ''
                    }`}
                  >
                    {index === 0 && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-bl-lg">
                        BEST MATCH
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{path.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.effort} effort</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{path.timeCommitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span>{path.salary}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-500/10 rounded-lg mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                        <p className="text-sm text-amber-200/80">{path.realityCheck}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-emerald-400 mb-2">Pros</p>
                        <ul className="space-y-1">
                          {path.pros.map((pro) => (
                            <li key={pro} className="flex items-center gap-2 text-muted-foreground">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-red-400 mb-2">Cons</p>
                        <ul className="space-y-1">
                          {path.cons.map((con) => (
                            <li key={con} className="flex items-center gap-2 text-muted-foreground">
                              <span className="w-3 h-3 text-red-400">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="glass" size="lg" onClick={resetQuiz}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;

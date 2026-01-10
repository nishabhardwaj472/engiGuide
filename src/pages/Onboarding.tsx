import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { branches, semesters, goals } from '@/data/mockData';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

const steps = ['Branch', 'Semester', 'Goal'];

const PLACEMENT_OPTIONS = [
  'Software / IT',
  'Core Engineering',
  'Data / Analytics',
  'Product / Management',
];

const CGPA_OPTIONS = [
  '6.5 – 7.5',
  '7.5 – 8.0',
  '8.0 – 8.5',
  '8.5+',
];

const MULTI_GOALS = ['placements', 'cgpa'];

const Onboarding = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [selectedCgpa, setSelectedCgpa] = useState<string[]>([]);

  const canProceed = () => {
    if (currentStep === 0) return !!selectedBranch;
    if (currentStep === 1) return !!selectedSemester;

    if (currentStep === 2) {
      if (selectedGoals.length === 0) return false;
      if (selectedGoals.includes('placements') && selectedPlacements.length === 0) return false;
      if (selectedGoals.includes('cgpa') && selectedCgpa.length === 0) return false;
      return true;
    }

    return false;
  };

  const toggleGoal = (goalId: string) => {
    const isMulti = MULTI_GOALS.includes(goalId);

    // 🔒 SINGLE SELECT GOALS
    if (!isMulti) {
      setSelectedGoals([goalId]);
      setSelectedPlacements([]);
      setSelectedCgpa([]);
      return;
    }

    // 🔓 MULTI SELECT GOALS (Placements + CGPA)
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );

    // Reset sub-options when deselected
    if (goalId === 'placements' && selectedGoals.includes('placements')) {
      setSelectedPlacements([]);
    }

    if (goalId === 'cgpa' && selectedGoals.includes('cgpa')) {
      setSelectedCgpa([]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container max-w-3xl mx-auto">

          <div className="mb-10 text-center text-muted-foreground">
            Step {currentStep + 1} of {steps.length}: Select your {steps[currentStep]}
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Choose your <span className="gradient-text">Branch</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b.id)}
                      className={`glass-card p-6 cursor-pointer ${
                        selectedBranch === b.id
                          ? 'ring-2 ring-primary glow-primary'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <h3 className="font-semibold">{b.name}</h3>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Select <span className="gradient-text">Semester</span>
                </h2>

                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {semesters.map((s) => (
                    <div
                      key={s}
                      onClick={() => setSelectedSemester(s)}
                      className={`glass-card p-6 text-center cursor-pointer ${
                        selectedSemester === s
                          ? 'ring-2 ring-primary glow-primary'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Select your <span className="gradient-text">Goals</span>
                </h2>

                <div className="space-y-4">
                  {goals.map((goal) => {
                    const active = selectedGoals.includes(goal.id);

                    return (
                      <div
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`glass-card p-6 cursor-pointer ${
                          active ? 'ring-2 ring-primary glow-primary' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{goal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {goal.description}
                            </p>
                          </div>
                          {active && <Check className="text-primary" />}
                        </div>

                        {goal.id === 'placements' && active && (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {PLACEMENT_OPTIONS.map((opt) => (
                              <button
                                key={opt}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPlacements((prev) =>
                                    prev.includes(opt)
                                      ? prev.filter((o) => o !== opt)
                                      : [...prev, opt]
                                  );
                                }}
                                className={`px-4 py-2 rounded-full text-sm ${
                                  selectedPlacements.includes(opt)
                                    ? 'bg-primary text-white'
                                    : 'border text-muted-foreground'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {goal.id === 'cgpa' && active && (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {CGPA_OPTIONS.map((opt) => (
                              <button
                                key={opt}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCgpa((prev) =>
                                    prev.includes(opt)
                                      ? prev.filter((c) => c !== opt)
                                      : [...prev, opt]
                                  );
                                }}
                                className={`px-4 py-2 rounded-full text-sm ${
                                  selectedCgpa.includes(opt)
                                    ? 'bg-primary text-white'
                                    : 'border text-muted-foreground'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-12">
            <Button variant="glass" onClick={handleBack} disabled={currentStep === 0}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <Button variant="hero" onClick={handleNext} disabled={!canProceed()}>
              {currentStep === 2 ? (
                <>
                  <Sparkles className="w-4 h-4" /> Start My Journey
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;

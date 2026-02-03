import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

// Steps
const steps = ["Goal", "Branch", "Semester"];

const goals = [
  { id: "just-pass", label: "Just Pass", description: "Quick help to clear exams" },
  { id: "cgpa", label: "Decent CGPA", description: "Strong concepts with 8.5+ CGPA" },
  { id: "placements", label: "Placements", description: "DSA, core & interview prep" },
];

const branches = [
  "CSE",
  "ECE",
  "EE",
  "ME",
  "CE",
  "IT",
  "CST",
];

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const Onboarding = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [semester, setSemester] = useState<string | null>(null);

  const nextStep = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep((prev) => prev + 1);
  } else {
    if (goal === "just-pass") {
      navigate("/just-pass");
    } 
    else if (goal === "cgpa") {
      navigate("/cgpa-subjects"); // 👈 YOUR CGPA SUBJECT PAGE
    } 
    else if (goal === "placements") {
      navigate("placements");
    }
  }
};


  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return !goal;
    if (currentStep === 1) return !branch;
    if (currentStep === 2) return !semester;
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-3xl">

        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  index <= currentStep
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? <Check size={16} /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-10 h-[2px] bg-muted mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8">

          <AnimatePresence mode="wait">
            {/* STEP 1 — GOAL */}
            {currentStep === 0 && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="text-primary" /> Choose your goal
                </h2>
                <p className="text-muted-foreground mb-6">
                  We’ll personalize everything for you
                </p>

                <div className="grid gap-4">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`p-4 rounded-xl border text-left transition
                      ${
                        goal === g.id
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <h3 className="font-semibold">{g.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {g.description}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — BRANCH */}
            {currentStep === 1 && (
              <motion.div
                key="branch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Select your branch
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBranch(b)}
                      className={`p-4 rounded-xl border font-medium transition
                      ${
                        branch === b
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3 — SEMESTER */}
            {currentStep === 2 && (
              <motion.div
                key="semester"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Select semester
                </h2>

                <div className="grid grid-cols-4 gap-4">
                  {semesters.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSemester(s)}
                      className={`p-4 rounded-xl border font-medium transition
                      ${
                        semester === s
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      Sem {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={isNextDisabled()}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

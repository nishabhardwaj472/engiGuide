import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, AlertCircle, BarChart3, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Subject {
  id: string;
  name: string;
  priority: string;
  progress: number;
  description: string;
  keyTopics: string[];
  commonMistakes: string[];
  examWeight: number;
  skillWeight: number;
  resources: { name: string; type: string }[];
}

interface SubjectModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubjectModal = ({ subject, isOpen, onClose }: SubjectModalProps) => {
  if (!subject) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full glass-card-elevated p-6 z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold gradient-text">{subject.name}</h2>
                <p className="text-muted-foreground">{subject.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* What Actually Matters */}
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                What Actually Matters
              </h3>
              <div className="grid gap-2">
                {subject.keyTopics.map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{topic}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Common Mistakes
              </h3>
              <div className="space-y-2">
                {subject.commonMistakes.map((mistake, index) => (
                  <motion.div
                    key={mistake}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg text-sm"
                  >
                    <span className="text-destructive">⚠️</span>
                    <span>{mistake}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Exam vs Skill Importance */}
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold mb-3">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Exam vs Skill Importance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Exam Weight</span>
                    <span className="font-medium">{subject.examWeight}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.examWeight}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Skill Value</span>
                    <span className="font-medium">{subject.skillWeight}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.skillWeight}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">📚 Curated Resources</h3>
              <div className="grid gap-2">
                {subject.resources.map((resource) => (
                  <div
                    key={resource.name}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {resource.type === 'Video' ? '🎬' : resource.type === 'Book' ? '📖' : '💻'}
                      </span>
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.type}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="glass" className="flex-1" onClick={onClose}>
                Close
              </Button>
              <Button variant="hero" className="flex-1">
                Start Studying
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

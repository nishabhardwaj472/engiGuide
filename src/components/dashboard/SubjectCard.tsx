import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SubjectCardProps {
  name: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  topics: number;
  completedTopics: number;
  onClick: () => void;
  delay?: number;
}

export const SubjectCard = ({
  name,
  priority,
  progress,
  topics,
  completedTopics,
  onClick,
  delay = 0,
}: SubjectCardProps) => {
  const priorityColors = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-amber-500 to-yellow-500',
    low: 'from-emerald-500 to-green-500',
  };

  const priorityBadgeColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className="glass-card p-5 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {completedTopics}/{topics} topics
          </p>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${priorityBadgeColors[priority]}`}>
          {priority}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${priorityColors[priority]}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-end text-sm text-muted-foreground group-hover:text-primary transition-colors">
        <span>View details</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};

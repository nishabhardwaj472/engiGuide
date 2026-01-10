import { motion } from 'framer-motion';
import { Target, Clock, Zap } from 'lucide-react';

interface TodayFocusCardProps {
  subject: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  topic: string;
}

export const TodayFocusCard = ({ subject, priority, timeEstimate, topic }: TodayFocusCardProps) => {
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
      transition={{ duration: 0.5 }}
      className="glass-card-elevated p-6 relative overflow-hidden"
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${priorityColors[priority]}`} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${priorityColors[priority]} flex items-center justify-center`}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Today's Focus</h3>
            <p className="text-sm text-muted-foreground">Your priority for today</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityBadgeColors[priority]}`}>
          {priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-bold gradient-text">{subject}</h4>
          <p className="text-muted-foreground">{topic}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{timeEstimate}</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Start now for best results</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, BookOpen } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 5.0 },
  { day: 'Sun', hours: 2.0 },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

export const ProgressChart = () => {
  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);
  const avgHours = (totalHours / 7).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-teal-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Weekly Progress</h3>
            <p className="text-xs text-muted-foreground">Study hours this week</p>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between h-32 mb-4 px-2">
        {weeklyData.map((data, index) => (
          <div key={data.day} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(data.hours / maxHours) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              className="w-8 rounded-t-lg bg-gradient-to-t from-primary to-accent relative group"
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                {data.hours}h
              </div>
            </motion.div>
            <span className="text-xs text-muted-foreground">{data.day}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-lg font-semibold">{totalHours.toFixed(1)}h</p>
            <p className="text-xs text-muted-foreground">Total this week</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-lg font-semibold">{avgHours}h</p>
            <p className="text-xs text-muted-foreground">Daily average</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

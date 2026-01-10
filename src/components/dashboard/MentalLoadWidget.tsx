import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { mentalLoadMessages } from '@/data/mockData';

export const MentalLoadWidget = () => {
  const [load, setLoad] = useState(3);
  const currentMessage = mentalLoadMessages[load];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Mental Load</h3>
          <p className="text-xs text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>

      {/* Emoji display */}
      <div className="text-center mb-4">
        <motion.span
          key={load}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-6xl inline-block"
        >
          {currentMessage.emoji}
        </motion.span>
      </div>

      {/* Slider */}
      <div className="mb-4">
        <input
          type="range"
          min="1"
          max="5"
          value={load}
          onChange={(e) => setLoad(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(load - 1) * 25}%, hsl(var(--muted)) ${(load - 1) * 25}%, hsl(var(--muted)) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Calm</span>
          <span>Overwhelmed</span>
        </div>
      </div>

      {/* Dynamic message */}
      <motion.p
        key={load}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm text-muted-foreground"
      >
        {currentMessage.message}
      </motion.p>
    </motion.div>
  );
};

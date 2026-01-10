import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { TodayFocusCard } from '@/components/dashboard/TodayFocusCard';
import { MentalLoadWidget } from '@/components/dashboard/MentalLoadWidget';
import { SubjectCard } from '@/components/dashboard/SubjectCard';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { SubjectModal } from '@/components/dashboard/SubjectModal';
import { subjects } from '@/data/mockData';
import { Sparkles, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSubjectClick = (subject: typeof subjects[0]) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleNotificationClick = () => {
    toast({
      title: "🔔 Reminder Set!",
      description: "You'll be reminded to study DSA in 2 hours.",
    });
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <div className="pt-24 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary font-medium">Good morning!</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Your <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  Let's make today count. Here's your personalized study plan.
                </p>
              </div>
              <button
                onClick={handleNotificationClick}
                className="p-3 glass-card hover:bg-white/10 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Focus & Subjects */}
            <div className="lg:col-span-2 space-y-6">
              <TodayFocusCard
                subject="Data Structures & Algorithms"
                priority="high"
                timeEstimate="2-3 hours"
                topic="Binary Trees & Graph Traversal"
              />

              <div>
                <h2 className="text-xl font-semibold mb-4">📚 Subject Priority</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <SubjectCard
                      key={subject.id}
                      name={subject.name}
                      priority={subject.priority as 'high' | 'medium' | 'low'}
                      progress={subject.progress}
                      topics={subject.topics}
                      completedTopics={subject.completedTopics}
                      onClick={() => handleSubjectClick(subject)}
                      delay={0.1 + index * 0.05}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Widgets */}
            <div className="space-y-6">
              <MentalLoadWidget />
              <ProgressChart />

              {/* Quick tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card p-5"
              >
                <h3 className="font-semibold mb-3">💡 Quick Tip</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Pomodoro Technique works wonders for DSA practice. 
                  Try 25 minutes of focused coding, then a 5-minute break. 
                  Your brain will thank you!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Modal */}
      <SubjectModal
        subject={selectedSubject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

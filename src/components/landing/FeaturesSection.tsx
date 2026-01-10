import { motion } from 'framer-motion';
import { Map, Brain, MessageSquare, Briefcase, Lightbulb, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Map,
    title: 'Smart Roadmaps',
    description: 'Personalized study paths based on your goals and current progress.',
    gradient: 'from-primary to-blue-400',
  },
  {
    icon: Brain,
    title: 'Mental Clarity',
    description: 'Track your mental load and get suggestions to stay balanced.',
    gradient: 'from-accent to-purple-400',
  },
  {
    icon: MessageSquare,
    title: 'AI Companion',
    description: 'Get instant answers and guidance for your academic queries.',
    gradient: 'from-secondary to-teal-400',
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'Discover career paths that match your skills and interests.',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    description: 'Curated project ideas to build your portfolio and skills.',
    gradient: 'from-emerald-500 to-green-400',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Visualize your growth with beautiful charts and insights.',
    gradient: 'from-rose-500 to-pink-400',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need to <span className="gradient-text">succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built by students, for students. We understand the chaos and designed tools to bring clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card p-6 h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

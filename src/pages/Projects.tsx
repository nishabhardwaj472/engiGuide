import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { projectIdeas } from '@/data/mockData';
import { X, Clock, ExternalLink, Lightbulb } from 'lucide-react';

const difficultyColors = {
  easy: 'from-emerald-500 to-green-400',
  medium: 'from-amber-500 to-yellow-500',
  hard: 'from-red-500 to-orange-500',
};

const difficultyBadgeColors = {
  easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projectIdeas[0] | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projectIdeas 
    : projectIdeas.filter(p => p.branch === filter || p.difficulty === filter);

  return (
    <div className="min-h-screen pb-12">
      <Navbar />

      <div className="pt-24 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-muted-foreground">Build Your Portfolio</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Project <span className="gradient-text">Ideas</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Curated project ideas to boost your resume and skills. 
              Pick one that excites you!
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {['all', 'CSE', 'ECE', 'EE', 'easy', 'medium', 'hard'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card p-6 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Difficulty indicator */}
                <div className={`h-1 rounded-full bg-gradient-to-r ${difficultyColors[project.difficulty as keyof typeof difficultyColors]} mb-4 w-1/3`} />

                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyBadgeColors[project.difficulty as keyof typeof difficultyBadgeColors]}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {project.branch}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeEstimate}</span>
                  </div>
                  <span className="text-sm text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full glass-card-elevated p-6 z-50 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyBadgeColors[selectedProject.difficulty as keyof typeof difficultyBadgeColors]}`}>
                  {selectedProject.difficulty}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold gradient-text mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {selectedProject.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Branch:</span>
                  <span className="font-medium">{selectedProject.branch}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedProject.timeEstimate}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="glass" className="flex-1" onClick={() => setSelectedProject(null)}>
                  Close
                </Button>
                <Button variant="hero" className="flex-1">
                  Start Building
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

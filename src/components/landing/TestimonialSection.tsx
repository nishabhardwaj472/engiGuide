import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Finally, an app that doesn't make me feel stupid. The roadmaps are actually realistic.",
    author: "Rahul K.",
    role: "CSE, 4th Sem",
    avatar: "👨‍💻",
  },
  {
    quote: "The mental load tracker helped me realize I was overworking. Game changer for my anxiety.",
    author: "Priya M.",
    role: "ECE, 6th Sem",
    avatar: "👩‍🎓",
  },
  {
    quote: "Used the project ideas section for my internship portfolio. Got 3 interview calls!",
    author: "Amit S.",
    role: "EE, Final Year",
    avatar: "👨‍🔧",
  },
];

export const TestimonialSection = () => {
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
            Students <span className="gradient-text-secondary">love</span> EngiGuide
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of engineering students finding their path
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card-elevated p-6 h-full relative">
                <Quote className="w-8 h-8 text-primary/30 absolute top-4 right-4" />
                <p className="text-foreground/90 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

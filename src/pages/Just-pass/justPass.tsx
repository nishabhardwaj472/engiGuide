import { justPassSubjects } from "@/data/justPassSubjects";
import SubjectCard from "@/components/subjectCard";
import { Navbar } from "@/components/layout/Navbar";

const JustPass = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Just-Pass Strategy 🚀
          </h1>

          <p className="text-center text-muted-foreground mb-10">
            Minimum effort • Maximum marks • Exam-focused
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {justPassSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustPass;

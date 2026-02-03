import { useParams } from "react-router-dom";
import { justPassContent } from "@/data/justPassContent";
import { Navbar } from "@/components/layout/Navbar";
import { ExternalLink } from "lucide-react";

const SubjectDetail = () => {
  const { subjectId } = useParams();

  const subject = justPassContent.find(
    (sub) => sub.id === subjectId
  );

  if (!subject) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 text-center">
          <h2 className="text-2xl font-semibold">Subject not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {subject.name} – Just Pass
          </h1>

          <div className="space-y-6">
            {subject.topics.map((topic) => (
              <div
                key={topic.id}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold">
                  {topic.title}
                </h3>

                <div className="flex flex-wrap gap-4 mt-4">
                  {topic.youtubeLink && (
                    <a
                      href={topic.youtubeLink}
                      target="_blank"
                      className="text-primary flex items-center gap-1"
                    >
                      YouTube <ExternalLink size={16} />
                    </a>
                  )}

                  {topic.notesLink && (
                    <a
                      href={topic.notesLink}
                      target="_blank"
                      className="text-primary flex items-center gap-1"
                    >
                      Notes <ExternalLink size={16} />
                    </a>
                  )}

                  {topic.pyqLink && (
                    <a
                      href={topic.pyqLink}
                      target="_blank"
                      className="text-primary flex items-center gap-1"
                    >
                      PYQs <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;

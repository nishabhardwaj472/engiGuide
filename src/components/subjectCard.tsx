import { Subject } from "@/types/subject";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  subject: Subject;
}

const SubjectCard = ({ subject }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/just-pass/${subject.id}`)}
      className="glass-card p-6 cursor-pointer hover:ring-2 hover:ring-primary transition"
    >
      <h3 className="text-lg font-semibold">{subject.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {subject.description}
      </p>

      <div className="mt-4 flex items-center text-primary text-sm">
        View Topics <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};

export default SubjectCard;

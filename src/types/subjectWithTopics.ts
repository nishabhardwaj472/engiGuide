export interface Topic {
  id: string;
  title: string;
  youtubeLink?: string;
  notesLink?: string;
  pyqLink?: string;
}

export interface SubjectWithTopics {
  id: string;
  name: string;
  topics: Topic[];
}

/**
 * Icons for subject areas. Administrators pick an icon key per Subject in control-panel
 * (course_metadata.Subject.icon, served by /api/v1/catalog/subjects/); legacy subject names
 * without a key fall back to the matching icon, then to BookOpen.
 */
import {
  BookOpen, Briefcase, Code, Database, FlaskConical, Globe, GraduationCap, HeartPulse, Palette,
  Sigma, Terminal, Users,
} from 'lucide-react';

export const SUBJECT_ICON_BY_KEY = {
  palette: Palette,
  briefcase: Briefcase,
  code: Code,
  database: Database,
  'graduation-cap': GraduationCap,
  heartbeat: HeartPulse,
  users: Users,
  'square-root': Sigma,
  'laptop-code': Terminal,
  flask: FlaskConical,
  globe: Globe,
  'book-open': BookOpen,
};

const SUBJECT_ICON_BY_NAME = {
  'Art & Design': Palette,
  Business: Briefcase,
  'Computer Science': Code,
  'Data Science': Database,
  'Education & Teaching': GraduationCap,
  'Health & Medicine': HeartPulse,
  Humanities: Users,
  Mathematics: Sigma,
  Programming: Terminal,
  Science: FlaskConical,
  'Social Sciences': Globe,
  Theology: BookOpen,
};

/** `subject` is {name, icon} from the API or a plain name. */
export const subjectIcon = (subject) => {
  const name = typeof subject === 'string' ? subject : subject?.name;
  const key = typeof subject === 'string' ? '' : subject?.icon;
  return SUBJECT_ICON_BY_KEY[key] || SUBJECT_ICON_BY_NAME[name] || BookOpen;
};

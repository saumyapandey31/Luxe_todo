export const CATEGORIES = ["General", "Work", "Personal", "Health", "Learning", "Finance", "Errands"];

export const PRIORITIES = [
  { value: "high", label: "High", color: "#B94A48" },
  { value: "medium", label: "Medium", color: "#C8A165" },
  { value: "low", label: "Low", color: "#3B7D5D" },
];

export const STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
];

export const MOODS = [
  { value: "great", emoji: "✨", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "low", emoji: "🌧️", label: "Low" },
  { value: "tired", emoji: "🥱", label: "Tired" },
];

export const DAILY_QUOTES = [
  { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { quote: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { quote: "Small daily improvements are the key to staggering long-term results.", author: "Anonymous" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { quote: "Do the hard things first, when your will is strongest.", author: "Anonymous" },
];

export function getGreeting(name) {
  const hour = new Date().getHours();
  let base = "Good evening";
  if (hour < 12) base = "Good morning";
  else if (hour < 17) base = "Good afternoon";
  return name ? `${base}, ${name.split(" ")[0]}` : base;
}

export function getTodayQuote() {
  const day = new Date().getDate();
  return DAILY_QUOTES[day % DAILY_QUOTES.length];
}

export function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function isOverdue(task) {
  return task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());
}

export function isDueToday(task) {
  if (!task.dueDate) return false;
  const today = new Date().toDateString();
  return new Date(task.dueDate).toDateString() === today;
}

export default { CATEGORIES, PRIORITIES, STATUSES, MOODS, DAILY_QUOTES, getGreeting, getTodayQuote, formatDate, isOverdue, isDueToday };

import { ChatInterface } from './components/ChatInterface';
import { TasksPanel } from './components/TasksPanel';

export default function App() {
  return (
    <div className="flex h-full min-h-0 bg-background">
      <ChatInterface />
      <TasksPanel />
    </div>
  );
}

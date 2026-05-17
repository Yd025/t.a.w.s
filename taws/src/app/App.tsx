import { KnowledgeBaseSidebar } from './components/KnowledgeBaseSidebar';
import { ChatInterface } from './components/ChatInterface';
import { TopBar } from './components/TopBar';
import { DeadlinesPanel } from './components/DeadlinesPanel';

export default function App() {
  return (
    <div className="size-full flex flex-col bg-background">
      <TopBar />
      <div className="flex-1 flex">
        <KnowledgeBaseSidebar />
        <ChatInterface />
        <DeadlinesPanel />
      </div>
    </div>
  );
}
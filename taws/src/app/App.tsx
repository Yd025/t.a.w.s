import { KnowledgeBaseSidebar } from './components/KnowledgeBaseSidebar';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="size-full flex bg-background">
      <KnowledgeBaseSidebar />
      <ChatInterface />
    </div>
  );
}
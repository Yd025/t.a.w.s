import { useState } from 'react';
import { KnowledgeBaseSidebar } from './components/KnowledgeBaseSidebar';
import { ChatInterface } from './components/ChatInterface';
import { ProfessorDashboard } from './components/ProfessorDashboard';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

export default function App() {
  const [role, setRole] = useState<'student' | 'professor'>('student');
  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Introduction to Machine Learning', type: 'pdf', uploadedAt: new Date('2026-05-10') },
    { id: '2', name: 'Neural Networks Basics', type: 'note', uploadedAt: new Date('2026-05-12') },
    { id: '3', name: 'Course overview and syllabus', type: 'note', uploadedAt: new Date('2026-05-14') },
  ]);
  const [flaggedPolicyCount, setFlaggedPolicyCount] = useState(0);

  const handleUploadMaterials = (files: FileList) => {
    const newMaterials = Array.from(files).map((file) => ({
      id: Math.random().toString(36).slice(2, 11),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 'doc',
      uploadedAt: new Date(),
    }));
    setMaterials((current) => [...newMaterials, ...current]);
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials((current) => current.filter((material) => material.id !== id));
  };

  const handleFlaggedPrompt = () => {
    setFlaggedPolicyCount((current) => current + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border bg-muted/70 backdrop-blur p-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">t.a.w.s</p>
            <h1 className="text-2xl font-semibold">Course AI Assistant</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setRole('student')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                role === 'student'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground border border-border hover:bg-muted'
              }`}
            >
              Student view
            </button>
            <button
              onClick={() => setRole('professor')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                role === 'professor'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground border border-border hover:bg-muted'
              }`}
            >
              Professor dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0">
        {role === 'student' ? (
          <div className="flex min-h-[calc(100vh-5rem)] bg-background">
            <KnowledgeBaseSidebar
              materials={materials}
              isProfessor={false}
              onDeleteMaterial={handleDeleteMaterial}
            />
            <ChatInterface materials={materials} onFlaggedPrompt={handleFlaggedPrompt} />
          </div>
        ) : (
          <ProfessorDashboard
            materials={materials}
            flaggedPolicyCount={flaggedPolicyCount}
            onUploadMaterials={handleUploadMaterials}
            onDeleteMaterial={handleDeleteMaterial}
          />
        )}
      </main>
    </div>
  );
}
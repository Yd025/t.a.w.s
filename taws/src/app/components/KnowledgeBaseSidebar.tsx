import { FileText, BookOpen } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

export function KnowledgeBaseSidebar() {
  const materials: Material[] = [
    { id: '1', name: 'Lecture 1: Process Management', type: 'pdf', uploadedAt: new Date('2026-05-01') },
    { id: '2', name: 'Lecture 2: Scheduling Algorithms', type: 'pdf', uploadedAt: new Date('2026-05-05') },
    { id: '3', name: 'Lecture 3: Memory Management', type: 'pdf', uploadedAt: new Date('2026-05-08') },
    { id: '4', name: 'Lecture 4: Virtual Memory', type: 'pdf', uploadedAt: new Date('2026-05-12') },
    { id: '5', name: 'Lab 1: Process Creation', type: 'note', uploadedAt: new Date('2026-05-02') },
    { id: '6', name: 'Syllabus & Course Overview', type: 'note', uploadedAt: new Date('2026-04-28') },
  ];

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-foreground font-semibold">Course Materials</h2>
        <p className="text-xs text-muted-foreground mt-1">Materials provided by instructor</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                {material.type === 'pdf' ? (
                  <FileText className="w-5 h-5 text-muted-foreground" />
                ) : material.type === 'note' ? (
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <FileText className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{material.name}</p>
                <p className="text-xs text-muted-foreground">
                  {material.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>{materials.length} course materials available</p>
        </div>
      </div>
    </div>
  );
}

import { Upload, FileText, BookOpen, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

export function KnowledgeBaseSidebar() {
  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Introduction to Machine Learning', type: 'pdf', uploadedAt: new Date('2026-05-10') },
    { id: '2', name: 'Neural Networks Basics', type: 'note', uploadedAt: new Date('2026-05-12') },
    { id: '3', name: 'Study Notes - Week 1', type: 'note', uploadedAt: new Date('2026-05-14') },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newMaterials: Material[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'doc',
        uploadedAt: new Date(),
      }));
      setMaterials([...materials, ...newMaterials]);
    }
  };

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-foreground mb-4">Knowledge Base</h2>
        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          <Upload className="w-4 h-4" />
          <span>Upload Materials</span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {materials.map((material) => (
            <div
              key={material.id}
              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMaterial(material.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          <p>{materials.length} materials uploaded</p>
        </div>
      </div>
    </div>
  );
}

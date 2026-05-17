import { Upload, FileText, BookOpen, Trash2 } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

interface KnowledgeBaseSidebarProps {
  materials: Material[];
  isProfessor: boolean;
  onDeleteMaterial: (id: string) => void;
}

export function KnowledgeBaseSidebar({ materials, isProfessor, onDeleteMaterial }: KnowledgeBaseSidebarProps) {
  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-foreground mb-2">Course Materials</h2>
        <p className="text-sm text-muted-foreground">
          {isProfessor
            ? 'Manage course materials for the whole class.'
            : 'Materials have been uploaded by your professor. Read-only access is enabled for students.'}
        </p>
        {isProfessor && (
          <label className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
            <Upload className="w-4 h-4" />
            <span>Upload Materials</span>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                const newMaterials = Array.from(files).map((file) => ({
                  id: Math.random().toString(36).slice(2, 11),
                  name: file.name,
                  type: file.type.includes('pdf') ? 'pdf' : 'doc',
                  uploadedAt: new Date(),
                }));
                // eslint-disable-next-line no-console
                console.info('Professor upload: ', newMaterials);
              }}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {materials.map((material) => (
            <div
              key={material.id}
              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors"
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
              {isProfessor && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMaterial(material.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          <p>{materials.length} materials available</p>
        </div>
      </div>
    </div>
  );
}

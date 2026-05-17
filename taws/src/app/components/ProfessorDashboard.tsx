import { Upload, FileText, ShieldAlert, Flag, Trash2 } from 'lucide-react';
import { useRef } from 'react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

interface ProfessorDashboardProps {
  materials: Material[];
  flaggedPolicyCount: number;
  onUploadMaterials: (files: FileList) => void;
  onDeleteMaterial: (id: string) => void;
}

export function ProfessorDashboard({
  materials,
  flaggedPolicyCount,
  onUploadMaterials,
  onDeleteMaterial,
}: ProfessorDashboardProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex-1 h-full flex flex-col bg-background">
      <div className="border-b border-border bg-muted/50 p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-[0.3em]">Professor Dashboard</p>
            <h1 className="text-3xl font-semibold text-foreground">Course content management</h1>
            <p className="max-w-2xl text-sm text-muted-foreground mt-2">
              Upload and manage course materials, monitor prompts flagged by the policy engine, and keep student access aligned with your syllabus.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="rounded-3xl border border-border bg-background px-4 py-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Uploaded materials</p>
              <p className="text-3xl font-semibold text-foreground mt-2">{materials.length}</p>
            </div>
            <div className="rounded-3xl border border-border bg-background px-4 py-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Policy flags</p>
              <p className="text-3xl font-semibold text-foreground mt-2">{flaggedPolicyCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Upload course materials</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Only professors can upload course materials. Students will not be able to modify the content.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <label
                  className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  htmlFor="professor-upload"
                >
                  Select files
                </label>
                <input
                  ref={uploadInputRef}
                  id="professor-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => e.target.files && onUploadMaterials(e.target.files)}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground">
                  Upload PDF, Word, or text materials for your course.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Policy flags</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    When students submit three policy-violating prompts, the course is highlighted for review.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Current flagged prompts</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{flaggedPolicyCount}</p>
                </div>
                <div className="rounded-3xl border border-border bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Review threshold</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">3 prompts</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Professor controls</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage access and monitor student AI usage with confidence.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-border bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Student access</p>
                  <p className="mt-2 text-foreground">Read-only AI assistant access for enrolled students.</p>
                </div>
                <div className="rounded-3xl border border-border bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Upload permission</p>
                  <p className="mt-2 text-foreground">Professor only.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Uploaded materials</h2>
              <div className="mt-4 space-y-3">
                {materials.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No materials uploaded yet. Add files to populate the student knowledge base.</p>
                ) : (
                  materials.map((material) => (
                    <div key={material.id} className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{material.name}</p>
                        <p className="text-xs text-muted-foreground">{material.uploadedAt.toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => onDeleteMaterial(material.id)}
                        className="rounded-full p-2 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-16 bg-primary text-primary-foreground border-b border-primary/20 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">CSE 451: Introduction to Operating Systems</h1>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary/20"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            FAQ & Guidelines
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>FAQ & Guidelines</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-base mb-2">✅ What You CAN Ask</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Conceptual explanations of OS principles</li>
                <li>Help understanding lecture material</li>
                <li>Clarification on assignment requirements</li>
                <li>Debugging strategies and approaches</li>
                <li>Recommendations for resources and reading materials</li>
                <li>Questions about course policies and deadlines</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">❌ What You CANNOT Ask</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-destructive/70">
                <li>Direct solutions to homework or projects</li>
                <li>Complete code implementations for assignments</li>
                <li>Full essay or report answers</li>
                <li>Test/exam preparation that violates academic integrity</li>
                <li>Help bypassing security measures or assignment constraints</li>
                <li>Questions unrelated to the course material</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">💡 Best Practices</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Be specific about the concept you're struggling with</li>
                <li>Reference specific sections of course materials</li>
                <li>Ask "How do I approach...?" instead of "Give me the answer"</li>
                <li>Follow the Socratic method - learn through guided questions</li>
              </ul>
            </div>

            <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> This AI assistant is designed to help you learn, not do the work for you. 
                Misusing this system may violate academic integrity policies.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

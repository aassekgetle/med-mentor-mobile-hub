import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  FileText, 
  Heart, 
  Menu, 
  Settings, 
  Stethoscope, 
  Trophy,
  User,
  X
} from 'lucide-react';

interface MedicalNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MedicalNav = ({ activeSection, onSectionChange }: MedicalNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Heart },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'exams', label: 'Practice Exams', icon: FileText },
    { id: 'anatomy', label: '3D Anatomy', icon: Brain },
    { id: 'hospital', label: 'Hospital Mode', icon: Stethoscope },
    { id: 'progress', label: 'Progress', icon: Trophy },
    { id: 'schedule', label: 'Study Plan', icon: Calendar },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="medical-outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/95 backdrop-blur-sm shadow-card"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur-sm border-r border-border z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">MedMentor</h1>
              <p className="text-xs text-muted-foreground">Learning Platform</p>
            </div>
          </div>

          {/* User Profile */}
          <Card className="mb-6 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-secondary rounded-full">
                  <User className="h-4 w-4 text-secondary-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">4th Year Medical Student</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "medical" : "medical-ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive ? 'shadow-medical' : ''
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Subscription Status */}
          <Card className="mt-6 bg-gradient-success shadow-card">
            <CardContent className="p-4">
              <div className="text-center">
                <Trophy className="h-6 w-6 text-success-foreground mx-auto mb-2" />
                <p className="font-medium text-sm text-success-foreground">Premium Active</p>
                <p className="text-xs text-success-foreground/80">23 days remaining</p>
                <Button 
                  variant="medical-outline" 
                  size="sm" 
                  className="mt-2 border-success-foreground text-success-foreground hover:bg-success-foreground hover:text-success"
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MedicalNav;
import { useState } from 'react';
import MedicalNav from '@/components/MedicalNav';
import Dashboard from '@/components/Dashboard';
import Flashcards from '@/components/Flashcards';
import HospitalMode from '@/components/HospitalMode';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'flashcards':
        return <Flashcards />;
      case 'hospital':
        return <HospitalMode />;
      case 'exams':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Practice Exams</h2>
            <p className="text-muted-foreground">OSCE simulations and MCQ practice coming soon...</p>
          </div>
        );
      case 'anatomy':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">3D Anatomy</h2>
            <p className="text-muted-foreground">Interactive 3D anatomy models coming soon...</p>
          </div>
        );
      case 'progress':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Progress Tracking</h2>
            <p className="text-muted-foreground">Detailed analytics and progress reports coming soon...</p>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Study Plan</h2>
            <p className="text-muted-foreground">Personalized study schedules coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <MedicalNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;

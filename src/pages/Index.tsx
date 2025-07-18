import { useState } from 'react';
import MedicalNav from '@/components/MedicalNav';
import Dashboard from '@/components/Dashboard';
import Flashcards from '@/components/Flashcards';
import HospitalMode from '@/components/HospitalMode';
import PracticeExams from '@/components/PracticeExams';
import AnatomyViewer from '@/components/AnatomyViewer';
import ProgressTracking from '@/components/ProgressTracking';
import StudySchedule from '@/components/StudySchedule';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'flashcards':
        return <Flashcards />;
      case 'hospital':
        return <HospitalMode />;
      case 'exams':
        return <PracticeExams />;
      case 'anatomy':
        return <AnatomyViewer />;
      case 'progress':
        return <ProgressTracking />;
      case 'schedule':
        return <StudySchedule />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <MedicalNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;

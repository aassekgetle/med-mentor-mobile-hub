import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  Play, 
  Stethoscope, 
  Target, 
  TrendingUp 
} from 'lucide-react';
import medicalHero from '@/assets/medical-hero.jpg';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const todayStats = [
    { label: 'Study Streak', value: '12 days', icon: Target, color: 'text-success' },
    { label: 'Cards Reviewed', value: '47', icon: BookOpen, color: 'text-primary' },
    { label: 'Practice Questions', value: '23', icon: FileText, color: 'text-secondary-accent' },
    { label: 'Study Time', value: '2h 15m', icon: Clock, color: 'text-warning' },
  ];

  const recentActivity = [
    { subject: 'Cardiology', progress: 85, total: 120 },
    { subject: 'Pharmacology', progress: 62, total: 90 },
    { subject: 'Anatomy', progress: 94, total: 150 },
    { subject: 'Pathology', progress: 73, total: 110 },
  ];

  const upcomingExams = [
    { exam: 'OSCE Practice', date: 'Tomorrow, 2:00 PM', type: 'Practical' },
    { exam: 'Cardiology MCQ', date: 'Friday, 10:00 AM', type: 'Theory' },
    { exam: 'Anatomy Quiz', date: 'Monday, 9:00 AM', type: 'Assessment' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-primary shadow-medical">
        <div className="absolute inset-0">
          <img 
            src={medicalHero} 
            alt="Medical Education" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <CardContent className="relative p-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Welcome back, Dr. Johnson!
              </h2>
              <p className="text-primary-foreground/90 mb-6 text-lg">
                Continue your medical education journey. You're doing great with a 12-day study streak!
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="medical-outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => onNavigate('flashcards')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
                <Button 
                  variant="medical-ghost" 
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => onNavigate('schedule')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Study Schedule
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-primary-foreground mb-4">Today's Goal</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-primary-foreground/90">
                    <span>Daily Progress</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="bg-primary-foreground/20" />
                  <p className="text-sm text-primary-foreground/80">
                    Complete 20 more flashcards to reach your daily goal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-medical transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-secondary ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{subject.subject}</span>
                  <span className="text-muted-foreground">
                    {subject.progress}/{subject.total}
                  </span>
                </div>
                <Progress 
                  value={(subject.progress / subject.total) * 100} 
                  className="bg-muted"
                />
              </div>
            ))}
            <Button variant="medical-outline" className="w-full mt-4" onClick={() => onNavigate('progress')}>
              View Detailed Progress
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded">
                    <FileText className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{exam.exam}</p>
                    <p className="text-sm text-muted-foreground">{exam.date}</p>
                  </div>
                </div>
                <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground">
                  {exam.type}
                </span>
              </div>
            ))}
            <Button variant="medical" className="w-full" onClick={() => onNavigate('exams')}>
              <Play className="h-4 w-4 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="medical-outline" className="h-20 flex-col gap-2" onClick={() => onNavigate('flashcards')}>
              <BookOpen className="h-6 w-6" />
              <span>Flashcards</span>
            </Button>
            <Button variant="medical-outline" className="h-20 flex-col gap-2" onClick={() => onNavigate('anatomy')}>
              <Brain className="h-6 w-6" />
              <span>3D Anatomy</span>
            </Button>
            <Button variant="medical-outline" className="h-20 flex-col gap-2" onClick={() => onNavigate('hospital')}>
              <Stethoscope className="h-6 w-6" />
              <span>Hospital Mode</span>
            </Button>
            <Button variant="medical-outline" className="h-20 flex-col gap-2" onClick={() => onNavigate('exams')}>
              <Heart className="h-6 w-6" />
              <span>Practice Exams</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
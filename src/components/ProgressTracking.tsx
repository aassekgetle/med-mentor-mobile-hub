import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Trophy, 
  BookOpen, 
  Brain, 
  Clock, 
  Flame,
  Award,
  CheckCircle,
  BarChart3,
  Download
} from 'lucide-react';

const ProgressTracking = () => {
  const overallStats = [
    { label: 'Study Streak', value: '12 days', icon: Flame, trend: '+2 days', color: 'text-warning' },
    { label: 'Total Hours', value: '127h', icon: Clock, trend: '+8h this week', color: 'text-primary' },
    { label: 'Cards Mastered', value: '1,247', icon: CheckCircle, trend: '+89 this week', color: 'text-success' },
    { label: 'Exams Passed', value: '23', icon: Trophy, trend: '+3 this month', color: 'text-secondary-accent' },
  ];

  const subjectProgress = [
    { 
      subject: 'Cardiology', 
      completed: 85, 
      total: 120, 
      hours: 23, 
      lastStudied: '2 hours ago',
      nextMilestone: 'Complete remaining 35 topics',
      difficulty: 'Medium'
    },
    { 
      subject: 'Pharmacology', 
      completed: 62, 
      total: 90, 
      hours: 18, 
      lastStudied: '1 day ago',
      nextMilestone: 'Drug interactions quiz',
      difficulty: 'Hard'
    },
    { 
      subject: 'Anatomy', 
      completed: 94, 
      total: 150, 
      hours: 31, 
      lastStudied: '3 hours ago',
      nextMilestone: 'Complete nervous system',
      difficulty: 'Easy'
    },
    { 
      subject: 'Pathology', 
      completed: 73, 
      total: 110, 
      hours: 25, 
      lastStudied: '5 hours ago',
      nextMilestone: 'Cancer pathology module',
      difficulty: 'Hard'
    },
    { 
      subject: 'Clinical Skills', 
      completed: 41, 
      total: 80, 
      hours: 15, 
      lastStudied: '2 days ago',
      nextMilestone: 'OSCE practice session',
      difficulty: 'Medium'
    },
    { 
      subject: 'Medical Ethics', 
      completed: 28, 
      total: 45, 
      hours: 12, 
      lastStudied: '4 days ago',
      nextMilestone: 'Case study analysis',
      difficulty: 'Easy'
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3.5, cards: 45, exams: 1 },
    { day: 'Tue', hours: 2.8, cards: 32, exams: 0 },
    { day: 'Wed', hours: 4.2, cards: 67, exams: 2 },
    { day: 'Thu', hours: 3.1, cards: 41, exams: 1 },
    { day: 'Fri', hours: 2.4, cards: 28, exams: 0 },
    { day: 'Sat', hours: 5.1, cards: 89, exams: 3 },
    { day: 'Sun', hours: 3.8, cards: 52, exams: 1 }
  ];

  const achievements = [
    { name: 'Study Streak Master', description: '10+ day study streak', earned: true, icon: Flame },
    { name: 'Cardiology Expert', description: 'Complete all cardiology modules', earned: true, icon: Trophy },
    { name: 'Speed Learner', description: 'Complete 100 cards in one day', earned: false, icon: Brain },
    { name: 'Exam Ace', description: 'Score 90%+ on 5 consecutive exams', earned: false, icon: Award },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Progress Tracking</h2>
          <p className="text-muted-foreground">Monitor your learning journey and achievements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="medical-outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="medical" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Detailed Analytics
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-medical transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-full bg-gradient-secondary ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-success mt-1">{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subject Progress */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{subject.subject}</h3>
                      <Badge className={getDifficultyColor(subject.difficulty)}>
                        {subject.difficulty}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subject.completed}/{subject.total} topics
                    </div>
                  </div>
                  
                  <Progress 
                    value={(subject.completed / subject.total) * 100} 
                    className="h-2"
                  />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {subject.hours}h studied • Last: {subject.lastStudied}
                    </span>
                    <span className="text-foreground font-medium">
                      {Math.round((subject.completed / subject.total) * 100)}%
                    </span>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Next milestone:</strong> {subject.nextMilestone}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity & Achievements */}
        <div className="space-y-6">
          {/* Weekly Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground w-12">{day.day}</span>
                    <div className="flex-1 mx-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full"
                            style={{ width: `${(day.hours / 6) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{day.hours}h</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.cards} cards
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">24.9h</p>
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">354</p>
                    <p className="text-xs text-muted-foreground">Cards</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Exams</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? 'bg-success/10 border border-success/20' : 'bg-muted/30'
                      }`}
                    >
                      <div className={`p-2 rounded ${
                        achievement.earned ? 'bg-success' : 'bg-muted'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          achievement.earned ? 'text-success-foreground' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Goals Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Study Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Daily Goal</span>
                <span className="text-sm text-muted-foreground">2.8/3.0h</span>
              </div>
              <Progress value={93} />
              <p className="text-xs text-muted-foreground">93% complete • 12 min remaining</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Weekly Goal</span>
                <span className="text-sm text-muted-foreground">24.9/25h</span>
              </div>
              <Progress value={99} />
              <p className="text-xs text-muted-foreground">99% complete • Excellent progress!</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Monthly Goal</span>
                <span className="text-sm text-muted-foreground">89/100h</span>
              </div>
              <Progress value={89} />
              <p className="text-xs text-muted-foreground">89% complete • 11h remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;
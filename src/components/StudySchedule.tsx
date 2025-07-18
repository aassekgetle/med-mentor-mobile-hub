import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Plus, 
  BookOpen, 
  Brain, 
  Heart, 
  Stethoscope,
  Bell,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  CalendarDays
} from 'lucide-react';

const StudySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [view, setView] = useState<'week' | 'month'>('week');

  const todaySchedule = [
    {
      time: '09:00 - 10:30',
      subject: 'Cardiology',
      topic: 'Arrhythmias and ECG Interpretation',
      type: 'Flashcards',
      status: 'completed',
      icon: Heart,
      priority: 'high'
    },
    {
      time: '11:00 - 12:00',
      subject: 'Pharmacology',
      topic: 'Beta-blockers and ACE Inhibitors',
      type: 'Practice Quiz',
      status: 'in-progress',
      icon: Brain,
      priority: 'medium'
    },
    {
      time: '14:00 - 15:30',
      subject: 'Clinical Skills',
      topic: 'Physical Examination Techniques',
      type: 'Video Review',
      status: 'upcoming',
      icon: Stethoscope,
      priority: 'high'
    },
    {
      time: '16:00 - 17:00',
      subject: 'Anatomy',
      topic: 'Nervous System Review',
      type: 'Interactive 3D',
      status: 'upcoming',
      icon: BookOpen,
      priority: 'low'
    }
  ];

  const weeklyOverview = [
    {
      day: 'Mon',
      date: '15',
      sessions: 4,
      hours: 3.5,
      completed: 3,
      isToday: false
    },
    {
      day: 'Tue',
      date: '16',
      sessions: 3,
      hours: 2.5,
      completed: 3,
      isToday: false
    },
    {
      day: 'Wed',
      date: '17',
      sessions: 5,
      hours: 4.0,
      completed: 2,
      isToday: false
    },
    {
      day: 'Thu',
      date: '18',
      sessions: 4,
      hours: 3.0,
      completed: 0,
      isToday: true
    },
    {
      day: 'Fri',
      date: '19',
      sessions: 3,
      hours: 2.5,
      completed: 0,
      isToday: false
    },
    {
      day: 'Sat',
      date: '20',
      sessions: 6,
      hours: 5.0,
      completed: 0,
      isToday: false
    },
    {
      day: 'Sun',
      date: '21',
      sessions: 2,
      hours: 1.5,
      completed: 0,
      isToday: false
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'Cardiology Final Exam',
      date: '2024-07-25',
      daysLeft: 7,
      priority: 'high',
      type: 'Exam'
    },
    {
      title: 'OSCE Practice Session',
      date: '2024-07-22',
      daysLeft: 4,
      priority: 'medium',
      type: 'Practice'
    },
    {
      title: 'Pharmacology Assignment',
      date: '2024-07-28',
      daysLeft: 10,
      priority: 'medium',
      type: 'Assignment'
    },
    {
      title: 'Anatomy Quiz',
      date: '2024-07-30',
      daysLeft: 12,
      priority: 'low',
      type: 'Quiz'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'upcoming': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const getDeadlinePriorityColor = (daysLeft: number) => {
    if (daysLeft <= 3) return 'bg-destructive text-destructive-foreground';
    if (daysLeft <= 7) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Study Schedule</h2>
          <p className="text-muted-foreground">Plan and track your medical education journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="medical-outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button variant="medical" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button 
          variant={view === 'week' ? 'medical' : 'medical-outline'}
          onClick={() => setView('week')}
        >
          Week View
        </Button>
        <Button 
          variant={view === 'month' ? 'medical' : 'medical-outline'}
          onClick={() => setView('month')}
        >
          Month View
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
                <Badge variant="secondary">Thursday, July 18</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((session, index) => {
                const Icon = session.icon;
                return (
                  <Card 
                    key={index} 
                    className={`border-l-4 ${getPriorityColor(session.priority)} hover:shadow-card transition-all duration-300`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gradient-secondary rounded">
                            <Icon className="h-4 w-4 text-secondary-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{session.subject}</h3>
                              <Badge className={getStatusColor(session.status)}>
                                {session.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{session.topic}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </span>
                              <span>{session.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card className="mt-6 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                This Week Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weeklyOverview.map((day, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-center cursor-pointer transition-all duration-300 ${
                      day.isToday 
                        ? 'bg-gradient-primary text-primary-foreground shadow-medical' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">{day.day}</div>
                    <div className="text-lg font-bold mb-1">{day.date}</div>
                    <div className="text-xs space-y-1">
                      <div>{day.sessions} sessions</div>
                      <div>{day.hours}h planned</div>
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {day.completed}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Goals */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Today's Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Study Time</span>
                  <span className="text-foreground">2.5/3.0h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '83%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sessions</span>
                  <span className="text-foreground">2/4</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-success h-2 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Flashcards</span>
                  <span className="text-foreground">47/60</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-secondary h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{deadline.title}</h4>
                    <p className="text-xs text-muted-foreground">{deadline.type} • {deadline.date}</p>
                  </div>
                  <Badge className={getDeadlinePriorityColor(deadline.daysLeft)}>
                    {deadline.daysLeft}d
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="medical-outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Schedule Study Session
              </Button>
              <Button variant="medical-outline" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Set Study Goals
              </Button>
              <Button variant="medical-outline" className="w-full justify-start gap-2">
                <Bell className="h-4 w-4" />
                Manage Reminders
              </Button>
              <Button variant="medical-outline" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                View Study Materials
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySchedule;
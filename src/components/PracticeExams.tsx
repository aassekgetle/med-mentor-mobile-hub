import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  FileText, 
  Play, 
  RotateCcw, 
  Trophy,
  CheckCircle,
  XCircle,
  Brain,
  Heart,
  Stethoscope
} from 'lucide-react';

const PracticeExams = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const examCategories = [
    { 
      id: 'cardiology-mcq', 
      name: 'Cardiology MCQ', 
      questions: 25, 
      duration: '45 min',
      difficulty: 'Medium',
      icon: Heart,
      color: 'bg-gradient-primary'
    },
    { 
      id: 'anatomy-osce', 
      name: 'Anatomy OSCE', 
      questions: 15, 
      duration: '30 min',
      difficulty: 'Hard',
      icon: Brain,
      color: 'bg-gradient-secondary'
    },
    { 
      id: 'pharmacology-quiz', 
      name: 'Pharmacology Quiz', 
      questions: 20, 
      duration: '35 min',
      difficulty: 'Easy',
      icon: FileText,
      color: 'bg-gradient-success'
    },
    { 
      id: 'clinical-skills', 
      name: 'Clinical Skills Assessment', 
      questions: 12, 
      duration: '40 min',
      difficulty: 'Hard',
      icon: Stethoscope,
      color: 'bg-gradient-primary'
    }
  ];

  const sampleQuestions = {
    'cardiology-mcq': [
      {
        question: "What is the most common cause of myocardial infarction?",
        options: [
          "Coronary artery thrombosis",
          "Coronary artery spasm",
          "Aortic stenosis",
          "Pulmonary embolism"
        ],
        correct: 0,
        explanation: "Coronary artery thrombosis is the most common cause of MI, typically occurring when an atherosclerotic plaque ruptures."
      },
      {
        question: "Normal ejection fraction range is:",
        options: [
          "40-50%",
          "50-70%", 
          "70-80%",
          "80-90%"
        ],
        correct: 1,
        explanation: "Normal left ventricular ejection fraction ranges from 50-70%. Values below 40% indicate heart failure."
      },
      {
        question: "The most specific cardiac enzyme for MI diagnosis is:",
        options: [
          "CK-MB",
          "Troponin I",
          "LDH",
          "AST"
        ],
        correct: 1,
        explanation: "Troponin I is the most specific and sensitive marker for myocardial injury and is the gold standard for MI diagnosis."
      }
    ]
  };

  const recentScores = [
    { exam: 'Cardiology MCQ', score: 85, total: 100, date: '2024-07-17' },
    { exam: 'Anatomy OSCE', score: 78, total: 100, date: '2024-07-15' },
    { exam: 'Pharmacology Quiz', score: 92, total: 100, date: '2024-07-14' },
    { exam: 'Clinical Skills', score: 88, total: 100, date: '2024-07-12' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const startExam = (examId: string) => {
    setSelectedExam(examId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setUserAnswers({});
  };

  const submitAnswer = () => {
    if (selectedAnswer !== null) {
      setUserAnswers(prev => ({ ...prev, [currentQuestion]: selectedAnswer }));
      
      const questions = sampleQuestions[selectedExam as keyof typeof sampleQuestions] || [];
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    const questions = sampleQuestions[selectedExam as keyof typeof sampleQuestions] || [];
    let correct = 0;
    
    Object.entries(userAnswers).forEach(([questionIndex, answer]) => {
      if (questions[parseInt(questionIndex)]?.correct === parseInt(answer)) {
        correct++;
      }
    });
    
    return { correct, total: questions.length };
  };

  if (selectedExam && !showResults) {
    const questions = sampleQuestions[selectedExam as keyof typeof sampleQuestions] || [];
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="medical-outline" onClick={() => setSelectedExam(null)}>
            ← Back to Exams
          </Button>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <Card className="shadow-medical">
          <CardContent className="p-8">
            <div className="mb-6">
              <Progress value={progress} className="mb-2" />
              <div className="text-sm text-muted-foreground text-center">
                {Math.round(progress)}% Complete
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {currentQ?.question}
              </h2>

              <div className="space-y-3">
                {currentQ?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index.toString() ? "medical" : "medical-outline"}
                    className="w-full text-left justify-start p-4 h-auto"
                    onClick={() => setSelectedAnswer(index.toString())}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="medical" 
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="px-8"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Exam'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="medical-outline" onClick={() => setSelectedExam(null)}>
            ← Back to Exams
          </Button>
        </div>

        <Card className="shadow-medical text-center">
          <CardContent className="p-8">
            <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Exam Complete!</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You scored {correct} out of {total} questions correct
            </p>
            
            <div className="bg-gradient-primary text-primary-foreground rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold">{percentage}%</div>
              <div className="text-sm opacity-90">Your Score</div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="medical" onClick={() => startExam(selectedExam!)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Exam
              </Button>
              <Button variant="medical-outline" onClick={() => setSelectedExam(null)}>
                <BookOpen className="h-4 w-4 mr-2" />
                Choose Another Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Practice Exams</h2>
          <p className="text-muted-foreground">Test your knowledge with realistic medical exams</p>
        </div>
        <Button variant="medical" className="gap-2">
          <Trophy className="h-4 w-4" />
          View All Scores
        </Button>
      </div>

      {/* Available Exams */}
      <div className="grid md:grid-cols-2 gap-6">
        {examCategories.map((exam) => {
          const Icon = exam.icon;
          
          return (
            <Card key={exam.id} className="shadow-card hover:shadow-medical transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${exam.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{exam.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exam.questions} questions • {exam.duration}
                      </p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(exam.difficulty)}>
                    {exam.difficulty}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Best Score:</span>
                    <span className="text-foreground font-medium">
                      {recentScores.find(s => s.exam.includes(exam.name.split(' ')[0]))?.score || 0}%
                    </span>
                  </div>
                  
                  <Button 
                    variant="medical" 
                    className="w-full gap-2"
                    onClick={() => startExam(exam.id)}
                  >
                    <Play className="h-4 w-4" />
                    Start Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Scores */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Recent Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${score.score >= 80 ? 'bg-success' : score.score >= 70 ? 'bg-warning' : 'bg-destructive'}`}>
                    {score.score >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <XCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{score.exam}</h4>
                    <p className="text-sm text-muted-foreground">{score.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{score.score}%</div>
                  <div className="text-sm text-muted-foreground">{score.score}/{score.total}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExams;
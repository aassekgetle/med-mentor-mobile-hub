import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  RotateCcw, 
  Shuffle, 
  X 
} from 'lucide-react';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState('cardiology');

  const flashcardDecks = [
    { 
      id: 'cardiology', 
      name: 'Cardiology Essentials', 
      count: 120, 
      completed: 85, 
      icon: Heart,
      color: 'bg-gradient-primary'
    },
    { 
      id: 'pharmacology', 
      name: 'Pharmacology', 
      count: 90, 
      completed: 62, 
      icon: Brain,
      color: 'bg-gradient-secondary'
    },
    { 
      id: 'anatomy', 
      name: 'Human Anatomy', 
      count: 150, 
      completed: 94, 
      icon: BookOpen,
      color: 'bg-gradient-success'
    },
  ];

  const sampleCards = {
    cardiology: [
      {
        question: "What is the normal resting heart rate for adults?",
        answer: "60-100 beats per minute (bpm). Athletes may have resting heart rates as low as 40-60 bpm due to increased cardiac efficiency.",
        difficulty: "Easy",
        category: "Vital Signs"
      },
      {
        question: "What are the main symptoms of myocardial infarction?",
        answer: "Chest pain/pressure, shortness of breath, nausea, sweating, pain radiating to left arm/jaw, fatigue. Women may present with atypical symptoms.",
        difficulty: "Medium",
        category: "Emergency Medicine"
      },
      {
        question: "Explain the mechanism of action of ACE inhibitors.",
        answer: "ACE inhibitors block the conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion, ultimately lowering blood pressure and reducing cardiac workload.",
        difficulty: "Hard",
        category: "Pharmacology"
      }
    ]
  };

  const currentDeck = flashcardDecks.find(deck => deck.id === selectedDeck);
  const cards = sampleCards[selectedDeck as keyof typeof sampleCards] || [];
  const progress = ((currentCard + 1) / cards.length) * 100;

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const resetDeck = () => {
    setCurrentCard(0);
    setIsFlipped(false);
  };

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
          <h2 className="text-3xl font-bold text-foreground">Flashcards</h2>
          <p className="text-muted-foreground">Master medical concepts with interactive flashcards</p>
        </div>
        <Button variant="medical" className="gap-2">
          <Shuffle className="h-4 w-4" />
          Shuffle Deck
        </Button>
      </div>

      {/* Deck Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {flashcardDecks.map((deck) => {
          const Icon = deck.icon;
          const isSelected = selectedDeck === deck.id;
          
          return (
            <Card 
              key={deck.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-primary shadow-medical' : 'hover:shadow-card'
              }`}
              onClick={() => {
                setSelectedDeck(deck.id);
                setCurrentCard(0);
                setIsFlipped(false);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${deck.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{deck.name}</h3>
                    <p className="text-sm text-muted-foreground">{deck.count} cards</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{deck.completed}/{deck.count}</span>
                  </div>
                  <Progress value={(deck.completed / deck.count) * 100} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Flashcard Interface */}
      {currentDeck && cards.length > 0 && (
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <Card className="mb-6 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Card {currentCard + 1} of {cards.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentDeck.name}</span>
                <span>{cards[currentCard]?.category}</span>
              </div>
            </CardContent>
          </Card>

          {/* Flashcard */}
          <Card 
            className="h-96 cursor-pointer shadow-medical hover:shadow-progress transition-all duration-500 transform hover:scale-[1.02]"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="p-8 h-full flex flex-col justify-center relative">
              {/* Difficulty Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(cards[currentCard]?.difficulty)}`}>
                  {cards[currentCard]?.difficulty}
                </span>
              </div>

              {/* Card Content */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {isFlipped ? 'Answer' : 'Question'}
                  </span>
                </div>
                
                <div className="min-h-[200px] flex items-center justify-center">
                  <p className="text-lg leading-relaxed text-foreground">
                    {isFlipped ? cards[currentCard]?.answer : cards[currentCard]?.question}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    {isFlipped ? 'Click to see question' : 'Click to reveal answer'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="medical-outline"
              onClick={previousCard}
              disabled={currentCard === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="medical-ghost"
              onClick={resetDeck}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button
              variant="medical"
              onClick={nextCard}
              disabled={currentCard === cards.length - 1}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Knowledge Check */}
          {isFlipped && (
            <Card className="mt-6 shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg">How well did you know this?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 justify-center">
                  <Button variant="destructive" className="gap-2 flex-1 max-w-32">
                    <X className="h-4 w-4" />
                    Hard
                  </Button>
                  <Button variant="warning" className="gap-2 flex-1 max-w-32">
                    <RotateCcw className="h-4 w-4" />
                    Medium
                  </Button>
                  <Button variant="success" className="gap-2 flex-1 max-w-32">
                    <Check className="h-4 w-4" />
                    Easy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcards;
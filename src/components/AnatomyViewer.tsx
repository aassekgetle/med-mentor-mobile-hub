import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Activity, 
  Eye, 
  Search, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Play,
  Pause,
  BookOpen,
  Target
} from 'lucide-react';

const AnatomyViewer = () => {
  const [selectedSystem, setSelectedSystem] = useState('cardiovascular');
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const anatomySystems = [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular System',
      icon: Heart,
      color: 'bg-gradient-primary',
      structures: [
        { name: 'Heart', description: 'Four-chambered muscular organ that pumps blood' },
        { name: 'Aorta', description: 'Main artery carrying blood from left ventricle' },
        { name: 'Pulmonary Arteries', description: 'Vessels carrying deoxygenated blood to lungs' },
        { name: 'Coronary Arteries', description: 'Vessels supplying blood to heart muscle' }
      ]
    },
    {
      id: 'respiratory',
      name: 'Respiratory System',
      icon: Activity,
      color: 'bg-gradient-secondary',
      structures: [
        { name: 'Lungs', description: 'Paired organs for gas exchange' },
        { name: 'Trachea', description: 'Main airway to the lungs' },
        { name: 'Bronchi', description: 'Primary branches of the trachea' },
        { name: 'Alveoli', description: 'Tiny air sacs where gas exchange occurs' }
      ]
    },
    {
      id: 'nervous',
      name: 'Nervous System',
      icon: Brain,
      color: 'bg-gradient-success',
      structures: [
        { name: 'Brain', description: 'Control center of the nervous system' },
        { name: 'Spinal Cord', description: 'Main pathway for information between brain and body' },
        { name: 'Neurons', description: 'Nerve cells that transmit electrical signals' },
        { name: 'Cerebellum', description: 'Part of brain controlling balance and coordination' }
      ]
    },
    {
      id: 'visual',
      name: 'Visual System',
      icon: Eye,
      color: 'bg-gradient-primary',
      structures: [
        { name: 'Cornea', description: 'Clear front layer of the eye' },
        { name: 'Retina', description: 'Light-sensitive tissue at back of eye' },
        { name: 'Optic Nerve', description: 'Nerve carrying visual information to brain' },
        { name: 'Lens', description: 'Transparent structure that focuses light' }
      ]
    }
  ];

  const currentSystem = anatomySystems.find(system => system.id === selectedSystem);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">3D Anatomy Viewer</h2>
          <p className="text-muted-foreground">Explore interactive 3D anatomical models</p>
        </div>
        <Button variant="medical" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Study Guide
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* System Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Anatomy Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {anatomySystems.map((system) => {
                const Icon = system.icon;
                const isSelected = selectedSystem === system.id;
                
                return (
                  <Button
                    key={system.id}
                    variant={isSelected ? "medical" : "medical-ghost"}
                    className={`w-full justify-start gap-3 ${
                      isSelected ? 'shadow-medical' : ''
                    }`}
                    onClick={() => {
                      setSelectedSystem(system.id);
                      setSelectedStructure(null);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{system.name}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Structure List */}
          {currentSystem && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Structures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentSystem.structures.map((structure, index) => (
                  <Button
                    key={index}
                    variant={selectedStructure === structure.name ? "medical" : "outline"}
                    className="w-full justify-start text-sm"
                    onClick={() => setSelectedStructure(structure.name)}
                  >
                    <Target className="h-3 w-3 mr-2" />
                    {structure.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* 3D Viewer */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="shadow-medical">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {currentSystem && <currentSystem.icon className="h-5 w-5 text-primary" />}
                  {currentSystem?.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="medical-outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="medical-outline" size="icon">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="medical-outline" size="icon">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={isRotating ? "medical" : "medical-outline"} 
                    size="icon"
                    onClick={() => setIsRotating(!isRotating)}
                  >
                    {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="medical-outline" size="icon">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 3D Model Placeholder */}
              <div className={`h-96 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden ${isRotating ? 'animate-pulse-medical' : ''}`}>
                <div className="text-center">
                  {currentSystem && (
                    <>
                      <div className={`p-6 rounded-full ${currentSystem.color} mx-auto mb-4 ${isRotating ? 'animate-pulse-medical' : ''}`}>
                        <currentSystem.icon className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Interactive {currentSystem.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        3D model loading... Click structures to explore
                      </p>
                      <Badge variant="secondary">
                        {isRotating ? 'Auto-rotating' : 'Static view'}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">View:</span>
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Posterior</Button>
                  <Button variant="outline" size="sm">Lateral</Button>
                  <Button variant="outline" size="sm">Superior</Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Layers:</span>
                  <Button variant="outline" size="sm">Skin</Button>
                  <Button variant="outline" size="sm">Muscle</Button>
                  <Button variant="outline" size="sm">Bone</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Structure Details */}
          {selectedStructure && currentSystem && (
            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {selectedStructure}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground">
                      {currentSystem.structures.find(s => s.name === selectedStructure)?.description}
                    </p>
                    
                    <h4 className="font-semibold text-foreground mt-4 mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Detailed anatomical structure</li>
                      <li>• Interactive 3D visualization</li>
                      <li>• Multiple viewing angles</li>
                      <li>• Educational annotations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Clinical Relevance</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Understanding the structure and function of {selectedStructure.toLowerCase()} is crucial for clinical diagnosis and treatment planning.
                    </p>
                    
                    <Button variant="medical" className="w-full gap-2">
                      <BookOpen className="h-4 w-4" />
                      View Related Cases
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnatomyViewer;
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  BookOpen, 
  ClipboardList, 
  Download, 
  FileText, 
  Heart, 
  Pill, 
  Search, 
  Stethoscope, 
  TestTube,
  Users,
  WifiOff
} from 'lucide-react';

const HospitalMode = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const labResults = [
    {
      test: "Complete Blood Count (CBC)",
      values: [
        { parameter: "WBC", value: "7.2", range: "4.0-11.0", unit: "×10³/µL", status: "normal" },
        { parameter: "RBC", value: "4.5", range: "4.5-5.9", unit: "×10⁶/µL", status: "normal" },
        { parameter: "Hemoglobin", value: "13.8", range: "14.0-18.0", unit: "g/dL", status: "low" },
        { parameter: "Hematocrit", value: "41.2", range: "42.0-52.0", unit: "%", status: "low" },
      ]
    },
    {
      test: "Basic Metabolic Panel",
      values: [
        { parameter: "Glucose", value: "95", range: "70-100", unit: "mg/dL", status: "normal" },
        { parameter: "BUN", value: "18", range: "7-20", unit: "mg/dL", status: "normal" },
        { parameter: "Creatinine", value: "1.1", range: "0.7-1.3", unit: "mg/dL", status: "normal" },
        { parameter: "Sodium", value: "142", range: "136-145", unit: "mEq/L", status: "normal" },
      ]
    }
  ];

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg daily",
      indication: "Hypertension",
      interactions: ["NSAIDs", "Potassium supplements"],
      contraindications: "Pregnancy, Angioedema history"
    },
    {
      name: "Metformin",
      dosage: "500mg BID",
      indication: "Type 2 Diabetes",
      interactions: ["Contrast agents", "Alcohol"],
      contraindications: "Kidney disease, Metabolic acidosis"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg daily",
      indication: "Hyperlipidemia",
      interactions: ["Grapefruit juice", "Warfarin"],
      contraindications: "Active liver disease, Pregnancy"
    }
  ];

  const procedures = [
    { date: "2024-07-18", procedure: "Lumbar Puncture", role: "Observer", supervisor: "Dr. Smith" },
    { date: "2024-07-17", procedure: "Central Line Insertion", role: "Assistant", supervisor: "Dr. Johnson" },
    { date: "2024-07-16", procedure: "Arterial Blood Gas", role: "Performed", supervisor: "Dr. Williams" },
    { date: "2024-07-15", procedure: "Chest Tube Insertion", role: "Observer", supervisor: "Dr. Brown" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Performed': return 'bg-success text-success-foreground';
      case 'Assistant': return 'bg-primary text-primary-foreground';
      case 'Observer': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Hospital Mode</h2>
          <p className="text-muted-foreground">Clinical tools for hospital rotations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={isOfflineMode ? "warning" : "medical-outline"}
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className="gap-2"
          >
            <WifiOff className="h-4 w-4" />
            {isOfflineMode ? "Online Mode" : "Offline Mode"}
          </Button>
          <Button variant="medical" className="gap-2">
            <Download className="h-4 w-4" />
            Download Resources
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      {isOfflineMode && (
        <Card className="bg-warning/10 border-warning shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-warning" />
              <p className="text-warning-foreground">
                <strong>Offline Mode Active:</strong> All resources cached locally for areas with limited connectivity
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="lab-results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lab-results" className="gap-2">
            <TestTube className="h-4 w-4" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="medications" className="gap-2">
            <Pill className="h-4 w-4" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="procedures" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Logbook
          </TabsTrigger>
          <TabsTrigger value="references" className="gap-2">
            <BookOpen className="h-4 w-4" />
            References
          </TabsTrigger>
        </TabsList>

        {/* Lab Results Interpretation */}
        <TabsContent value="lab-results" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary" />
                Lab Results Interpreter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {labResults.map((lab, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-semibold text-foreground mb-4">{lab.test}</h3>
                    <div className="grid gap-3">
                      {lab.values.map((value, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background rounded">
                          <div className="flex-1">
                            <span className="font-medium text-foreground">{value.parameter}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-foreground">{value.value} {value.unit}</span>
                            <span className="text-muted-foreground text-sm">({value.range})</span>
                            <Badge className={getStatusColor(value.status)}>
                              {value.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medication Reference */}
        <TabsContent value="medications" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Medication Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <Card key={index} className="border bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{med.name}</h3>
                          <p className="text-muted-foreground">{med.dosage}</p>
                        </div>
                        <Badge variant="secondary">{med.indication}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Drug Interactions</h4>
                          <div className="space-y-1">
                            {med.interactions.map((interaction, idx) => (
                              <Badge key={idx} variant="outline" className="mr-2">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Contraindications</h4>
                          <p className="text-sm text-muted-foreground">{med.contraindications}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Digital Logbook */}
        <TabsContent value="procedures" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Procedure Logbook
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procedures.map((procedure, index) => (
                  <Card key={index} className="border bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gradient-primary rounded">
                            <Stethoscope className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{procedure.procedure}</h3>
                            <p className="text-sm text-muted-foreground">
                              {procedure.date} • Supervisor: {procedure.supervisor}
                            </p>
                          </div>
                        </div>
                        <Badge className={getRoleColor(procedure.role)}>
                          {procedure.role}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="medical" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Add New Procedure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick References */}
        <TabsContent value="references" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Vital Signs Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Normal Ranges</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heart Rate:</span>
                      <span className="text-foreground">60-100 bpm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Pressure:</span>
                      <span className="text-foreground">&lt;120/80 mmHg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Respiratory Rate:</span>
                      <span className="text-foreground">12-20/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="text-foreground">36.1-37.2°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">O2 Saturation:</span>
                      <span className="text-foreground">&gt;95%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  SOAP Note Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">S (Subjective):</span>
                    <p className="text-muted-foreground">Patient's symptoms and concerns</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">O (Objective):</span>
                    <p className="text-muted-foreground">Physical exam findings and vitals</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">A (Assessment):</span>
                    <p className="text-muted-foreground">Clinical impression and diagnosis</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">P (Plan):</span>
                    <p className="text-muted-foreground">Treatment plan and follow-up</p>
                  </div>
                </div>
                <Button variant="medical-outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Common Abbreviations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Common Medical Abbreviations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">BP:</span>
                    <span className="text-muted-foreground">Blood Pressure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">HR:</span>
                    <span className="text-muted-foreground">Heart Rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">RR:</span>
                    <span className="text-muted-foreground">Respiratory Rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">T:</span>
                    <span className="text-muted-foreground">Temperature</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">c/o:</span>
                    <span className="text-muted-foreground">Complains of</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">SOB:</span>
                    <span className="text-muted-foreground">Shortness of Breath</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">N/V:</span>
                    <span className="text-muted-foreground">Nausea/Vomiting</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">HEENT:</span>
                    <span className="text-muted-foreground">Head, Eyes, Ears, Nose, Throat</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">BID:</span>
                    <span className="text-muted-foreground">Twice daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">TID:</span>
                    <span className="text-muted-foreground">Three times daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">QID:</span>
                    <span className="text-muted-foreground">Four times daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">PRN:</span>
                    <span className="text-muted-foreground">As needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalMode;
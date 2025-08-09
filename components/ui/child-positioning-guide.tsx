"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, AlertTriangle, CheckCircle, Target, Users, BookOpen, Heart, Star, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChildPositioningGuideProps {
  className?: string;
}

const ChildPositioningGuide: React.FC<ChildPositioningGuideProps> = ({ className = "" }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const markSectionComplete = (section: string) => {
    setCompletedSections(prev => new Set([...prev, section]));
  };

  const SafetyBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded-r-xl">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-red-800 text-sm">{children}</div>
      </div>
    </div>
  );

  const TipsBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-xl">
      <div className="flex items-start">
        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-blue-800 text-sm">{children}</div>
      </div>
    </div>
  );

  const GoalBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 mb-4 rounded-r-xl">
      <div className="flex items-start">
        <Target className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-emerald-800 text-sm">
          <strong>Goal:</strong> {children}
        </div>
      </div>
    </div>
  );

  const VideoLink: React.FC<{ url: string; title?: string }> = ({ url, title }) => (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300"
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        <Play className="w-4 h-4 mr-2" />
        {title || "Watch Video"}
      </a>
    </Button>
  );

  const SectionHeader: React.FC<{ 
    title: string; 
    isActive: boolean; 
    onClick: () => void;
    isCompleted: boolean;
    sectionKey: string;
  }> = ({ title, isActive, onClick, isCompleted, sectionKey }) => (
    <div className="relative">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-6 transition-all duration-300 border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
          isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
          } shadow-lg`}>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <BookOpen className="w-5 h-5 text-white" />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {isCompleted && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
              Completed
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!isCompleted && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                markSectionComplete(sectionKey);
              }}
              className="text-emerald-600 hover:bg-emerald-50 rounded-xl"
            >
              <Star className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
          {isActive ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
        </div>
      </button>
    </div>
  );

  const ExerciseCard: React.FC<{ 
    title: string; 
    children: React.ReactNode;
    difficulty?: 'easy' | 'medium' | 'hard';
  }> = ({ title, children, difficulty = 'medium' }) => (
    <Card className="mb-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
          <Badge 
            className={`${
              difficulty === 'easy' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
              difficulty === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
              'bg-gradient-to-r from-red-500 to-pink-600'
            } text-white border-0`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-gray-700 text-sm leading-relaxed">
        {children}
      </CardContent>
    </Card>
  );

  const sections = [
    {
      key: 'head',
      title: '1. Head Control',
      content: (
        <div className="space-y-6">
          <GoalBox>Maintain upright head positions while sitting and prone</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                    Minimal neck muscle activation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                    Tolerance to prone position
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Key Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-emerald-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span><strong>Tummy time</strong> (3-5 min, several times/day)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span><strong>Supported sitting</strong> with pillows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span><strong>Side-lying play</strong> for head turning</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep sessions short but frequent</li>
              <li>Use favorite toys and eye contact</li>
              <li>Make it fun with songs and smiles</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Always supervise prone position</li>
              <li>Avoid leaving the child unsupported</li>
              <li>Stop if child becomes distressed</li>
            </ul>
          </SafetyBox>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />
              Prone Position Exercises
            </h3>
            
            <ExerciseCard title="C1. Lying on the forearm" difficulty="easy">
              <p>Encourage your child to lie on their front to play and take weight on their forearms. Place colorful toys at eye level to maintain interest.</p>
            </ExerciseCard>
            
            <ExerciseCard title="C2. Head lifting encouragement" difficulty="medium">
              <ul className="list-disc list-inside space-y-1">
                <li>Encourage your child to lie on their front</li>
                <li>Roll up a towel/bolster to put under the chest if necessary</li>
                <li>Place a toy in front to encourage your child to lift up their head</li>
              </ul>
            </ExerciseCard>

            <ExerciseCard title="C3. Lap play with straight arms" difficulty="medium">
              <ul className="list-disc list-inside space-y-1">
                <li>Encourage your child to play in this position with their elbows straight</li>
                <li>Later on they can be encouraged to put more weight on their hands and start to reach out</li>
              </ul>
            </ExerciseCard>

            <ExerciseCard title="C4. Weight shift using play" difficulty="hard">
              <p>Encourage child to shift weight and take objects. This builds core strength and coordination.</p>
            </ExerciseCard>

            <ExerciseCard title="C5. Forearm weight bearing" difficulty="medium">
              <ul className="list-disc list-inside space-y-1">
                <li>Encourage child to lie on their forearms</li>
                <li>Encourage child to raise their chest by taking weight on their forearm</li>
              </ul>
            </ExerciseCard>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <VideoLink url="https://youtu.be/p1QcRimMPRo?si=tcyGLVuW3SaXYk74" title="Head Control Guide 1" />
            <VideoLink url="https://youtu.be/X7GXEcgCy3Q?si=DGyRkfKL6jOXNfU4" title="Head Control Guide 2" />
          </div>
        </div>
      )
    },
    {
      key: 'rolling',
      title: '2. Rolling',
      content: (
        <div className="space-y-6">
          <GoalBox>Roll from back to tummy and tummy to back</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                    Some head control
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                    Ability to reach midline
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-amber-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Step-by-Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-amber-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Lay child on back with toy on the side</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Assist arm and leg over gently</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Reward with smiles or toys</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Practice on a soft surface (mat)</li>
              <li>Start with one direction (back to tummy)</li>
              <li>Make it a fun game with songs</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Clear the area of hard objects</li>
              <li>Stay nearby during attempts</li>
              <li>Never force the movement</li>
            </ul>
          </SafetyBox>

          <div className="flex flex-wrap gap-3 mt-6">
            <VideoLink url="https://youtu.be/0oqQo-W43rA?si=YOO-qOLi_KKwyR9c" title="Rolling Guide" />
          </div>
        </div>
      )
    },
    {
      key: 'sitting',
      title: '3. Independent Sitting',
      content: (
        <div className="space-y-6">
          <GoalBox>Sit without support for at least 30 seconds</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Good head control
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                    Trunk muscle activation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Key Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-cyan-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span><strong>Ring sitting</strong> with support behind</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Reduce support gradually</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Introduce reaching while sitting</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use mirror play for engagement</li>
              <li>Practice daily for short sessions</li>
              <li>Celebrate small improvements</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use cushions around the child</li>
              <li>Never leave a child on elevated surfaces</li>
              <li>Ensure soft landing surfaces</li>
            </ul>
          </SafetyBox>

          <Tabs defaultValue="getting-up" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
              <TabsTrigger 
                value="getting-up" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
              >
                Getting Up to Sitting
              </TabsTrigger>
              <TabsTrigger 
                value="sitting-exercises" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
              >
                Sitting Exercises
              </TabsTrigger>
            </TabsList>

            <TabsContent value="getting-up" className="space-y-4 mt-6">
              <ExerciseCard title="G1. From prone to sitting" difficulty="medium">
                <ul className="list-disc list-inside space-y-1">
                  <li>Lay the child on their front in a prone position</li>
                  <li>Bring the weight backwards over the knees by holding the child's hips</li>
                  <li>Encourage the child to push up with their hands</li>
                  <li>Move the child's hip slowly over to one side so the child is now sitting</li>
                </ul>
              </ExerciseCard>
              
              <ExerciseCard title="G2. Supported head control transition" difficulty="easy">
                <ul className="list-disc list-inside space-y-1">
                  <li>Place your hands behind your child's shoulders and gently support the head</li>
                  <li>Make sure that they are facing you with their head in the middle</li>
                  <li>Bring the child slowly up to the sitting position</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="G3. Hand-supported transition" difficulty="medium">
                <ul className="list-disc list-inside space-y-1">
                  <li>From lying down bring children up to sitting by holding their hands</li>
                  <li>Make sure their head is in the middle and encourage them to grasp your thumbs</li>
                  <li>Bring child slowly up to sitting position, letting them do as much work as they can</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="G4. One-hand weight bearing" difficulty="hard">
                <ul className="list-disc list-inside space-y-1">
                  <li>Bring child to sitting position from lying by holding one hand</li>
                  <li>Gently tilt them over to one side and let them push up with that hand</li>
                  <li>Do this as slowly as you can so that your child can do as much of the activity as possible</li>
                </ul>
              </ExerciseCard>
            </TabsContent>

            <TabsContent value="sitting-exercises" className="space-y-4 mt-6">
              <ExerciseCard title="H1. Head control in sitting" difficulty="easy">
                <ul className="list-disc list-inside space-y-1">
                  <li>Sit with your child on your lap facing you</li>
                  <li>Place your hands behind their head and shoulder</li>
                  <li>Encourage your child to look at you, talk and play</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H2. Reaching activities" difficulty="medium">
                <ul className="list-disc list-inside space-y-1">
                  <li>Encourage child to reach for toys to either side and keep their balance</li>
                  <li>This exercise helps improve sitting balance and strengthens stomach and back muscles</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H3. Chair/stool sitting" difficulty="medium">
                <p>Encourage reaching forward while maintaining balance on a stable surface.</p>
              </ExerciseCard>

              <ExerciseCard title="H4. Side sitting" difficulty="hard">
                <ul className="list-disc list-inside space-y-1">
                  <li>Encourage your child to sit as shown</li>
                  <li>Make sure they are taking weight through the straight hand</li>
                  <li>Encourage the child to use the other hand to reach for toys and play</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H5. Bolster activities" difficulty="medium">
                <ul className="list-disc list-inside space-y-1">
                  <li>Encourage child to do rotations</li>
                  <li>Ask them to reach the object, encouraging them to reach out</li>
                  <li>This exercise improves reach out</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H6. Swiss ball exercises" difficulty="hard">
                <ul className="list-disc list-inside space-y-1">
                  <li>Make your child sit on the ball, holding them at the hips</li>
                  <li>Gently bounce up and down</li>
                  <li>When this becomes easier, slowly tilt them to one side and then to the other</li>
                  <li>You can also try tilting the hips backwards and forwards too</li>
                  <li>Encourage your child to keep their balance and stay upright, give them reach out</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H7. CP chair positioning" difficulty="easy">
                <ul className="list-disc list-inside space-y-1">
                  <li>Encourage child to sit on CP chair in upright position</li>
                  <li>Make sure the hips and knees are in 90-degree position</li>
                  <li>The hands are well supported</li>
                  <li>The head should also be well supported if the child has poor head and neck control</li>
                </ul>
              </ExerciseCard>

              <ExerciseCard title="H8. Sit to stand transition" difficulty="hard">
                <ul className="list-disc list-inside space-y-1">
                  <li>Make the child sit on a stool</li>
                  <li>Hold at child's waist encouraging weight shift from hip to legs</li>
                  <li>You can also encourage child to reach for a toy</li>
                </ul>
              </ExerciseCard>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-3 mt-6">
            <VideoLink url="https://youtu.be/VQ_LtY0H0rc?si=dYd-q45iYjN4wI6F" title="Sitting Guide 1" />
            <VideoLink url="https://youtu.be/TZK6aFUm9DY?si=gcokRpVn7fOVQZ1x" title="Sitting Guide 2" />
          </div>
        </div>
      )
    },
    {
      key: 'crawling',
      title: '4. Crawling',
      content: (
        <div className="space-y-6">
          <GoalBox>Move forward on hands and knees</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                    Weight-bearing on arms
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                    Ability to pivot in tummy time
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-pink-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Step-by-Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-pink-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Position child in crawling pose with support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Use a rolled towel under the tummy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Motivate with toys placed just out of reach</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Encourage crawling over walking too early</li>
              <li>Make it a game (tunnel play, chase toys)</li>
              <li>Use colorful, interesting toys as motivation</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use non-slip mats</li>
              <li>Clear the floor of small or sharp objects</li>
              <li>Ensure adequate space for movement</li>
            </ul>
          </SafetyBox>

          <div className="flex flex-wrap gap-3 mt-6">
            <VideoLink url="https://youtu.be/mTQnr39Kyq4?si=1L3RYPPCbYDiD3-o" title="Crawling Guide 1" />
            <VideoLink url="https://youtu.be/RWCjJs6JAMk?si=jqtal8h4kqhtNE3Q" title="Crawling Guide 2" />
          </div>
        </div>
      )
    },
    {
      key: 'standing',
      title: '5. Standing',
      content: (
        <div className="space-y-6">
          <GoalBox>Stand while holding onto furniture or parent</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-indigo-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-indigo-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                    Trunk stability
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                    Some leg strength
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-teal-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Step-by-Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-teal-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Practice supported standing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Bounce gently to strengthen legs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Encourage reaching for toys on a table</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use supportive footwear</li>
              <li>Let the child explore while supervised</li>
              <li>Celebrate standing achievements</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Never use baby walkers</li>
              <li>Ensure furniture is stable</li>
              <li>Remove sharp corners and edges</li>
            </ul>
          </SafetyBox>

          <div className="flex flex-wrap gap-3 mt-6">
            <VideoLink url="https://youtu.be/6b0CTqsooBc?si=pKvUkDgjelt5KqBD" title="Standing Guide 1" />
            <VideoLink url="https://youtu.be/4U9gvOSDHJY?si=1lEKqdaTcxCJI7yI" title="Standing Guide 2" />
            <VideoLink url="https://youtube.com/shorts/sOdBDY-VEcM?si=0B740huyZk8U7vnz" title="Standing Short Guide" />
          </div>
        </div>
      )
    },
    {
      key: 'walking',
      title: '6. Walking',
      content: (
        <div className="space-y-6">
          <GoalBox>Take steps while holding on</GoalBox>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-violet-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-violet-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-violet-500" />
                    Can stand with support
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-violet-500" />
                    Good balance reactions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-rose-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Step-by-Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-rose-700">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Use parallel bars, furniture edges, or parent's hands</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Practice stepping between stable surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Use push toys (only under supervision)</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <TipsBox>
            <h4 className="font-semibold mb-2">Parent Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Celebrate every step</li>
              <li>Don't rush to independent walking</li>
              <li>Make walking fun with music and games</li>
            </ul>
          </TipsBox>

          <SafetyBox>
            <h4 className="font-semibold mb-2">Safety Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use anti-slip socks or shoes</li>
              <li>Avoid cluttered paths</li>
              <li>Ensure soft landing areas</li>
            </ul>
          </SafetyBox>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />
              Walking Exercises
            </h3>
            
            <ExerciseCard title="1. Hand-supported walking" difficulty="easy">
              <ul className="list-disc list-inside space-y-1">
                <li>Hold the wrists and hands to support your child</li>
                <li>Help your child to move their weight from one foot to the other</li>
              </ul>
            </ExerciseCard>

            <ExerciseCard title="2. Walker-assisted walking" difficulty="medium">
              <ul className="list-disc list-inside space-y-1">
                <li>Initially you can hold on to the hip and shift weight from one hip to another</li>
                <li>Gradually child can try taking independent steps</li>
              </ul>
            </ExerciseCard>

            <ExerciseCard title="3. Parallel bar walking" difficulty="medium">
              <ul className="list-disc list-inside space-y-1">
                <li>Child can walk in parallel bars by holding the railing with both hands initially</li>
                <li>Later they can walk holding one hand</li>
              </ul>
            </ExerciseCard>

            <ExerciseCard title="4. Side walking" difficulty="hard">
              <ul className="list-disc list-inside space-y-1">
                <li>Encourage side walking</li>
                <li>This improves weight shifts</li>
              </ul>
            </ExerciseCard>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">
            Child Positioning Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide for child positioning and therapy exercises to support development and mobility
          </p>
          
          {/* Progress Overview */}
          <div className="mt-8 p-6 bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                {completedSections.size} of {sections.length} completed
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Safe Lifting Section */}
        <Card className="mb-8 bg-gradient-to-br from-yellow-50 to-amber-50 border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100">
            <CardTitle className="text-2xl font-bold text-yellow-800 flex items-center">
              <Users className="w-7 h-7 mr-3" />
              How to Safely Pick Up a Child with CP
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Essential safety guidelines for lifting and handling
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-emerald-800 text-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  DO:
                </h3>
                <ol className="space-y-3 text-emerald-700">
                  {[
                    "Bend knees",
                    "Keep back straight", 
                    "Place one foot a little in front of the other",
                    "Hold the child close to your body",
                    "Lift using leg muscles, not back muscles",
                    "When the child gets bigger, ask for help to lift them",
                    "When two people are lifting the child, count to 3"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-red-800 text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  DO NOT:
                </h3>
                <ul className="space-y-3 text-red-700">
                  {[
                    "Bend forward with legs straight - this will hurt your back",
                    "Pull up child by their arms with no support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.key} className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <SectionHeader 
                title={section.title}
                isActive={activeSection === section.key}
                onClick={() => toggleSection(section.key)}
                isCompleted={completedSections.has(section.key)}
                sectionKey={section.key}
              />
              {activeSection === section.key && (
                <div className="p-8 border-t border-gray-100">
                  {section.content}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Completion Celebration */}
        {completedSections.size === sections.length && (
          <Card className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">Congratulations!</h3>
              <p className="text-emerald-700">
                You've completed all sections of the Child Positioning Guide. Keep practicing these exercises regularly for the best results.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChildPositioningGuide;
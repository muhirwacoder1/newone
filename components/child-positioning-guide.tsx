import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, AlertTriangle, CheckCircle, Target, Users } from 'lucide-react';

const ChildPositioningGuide = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const SafetyBox = ({ children }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-red-800">{children}</div>
      </div>
    </div>
  );

  const TipsBox = ({ children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
      <div className="flex items-start">
        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-blue-800">{children}</div>
      </div>
    </div>
  );

  const GoalBox = ({ children }) => (
    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
      <div className="flex items-start">
        <Target className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-green-800">
          <strong>Goal:</strong> {children}
        </div>
      </div>
    </div>
  );

  const VideoLink = ({ url, title }) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 mr-3 mb-3 group-hover:scale-105"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
          <Play className="w-4 h-4 text-white fill-current" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">{title || "Watch Video"}</span>
          <span className="text-xs text-red-100">Click to watch</span>
        </div>
      </a>
    </div>
  );

  const SectionHeader = ({ title, isActive, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors border-b"
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {isActive ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );

  return (    <
div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">How to Position Child</h1>
        <p className="text-lg text-gray-600">Comprehensive guide for child positioning and therapy exercises</p>
      </div>

      {/* Safe Lifting Section */}
      <div className="mb-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2" />
          How to Pick Up a Child with CP
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-800 mb-3">DO:</h3>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800">
              <li>Bend knees</li>
              <li>Keep back straight</li>
              <li>Place one foot a little in front of the other</li>
              <li>Hold the child close to your body</li>
              <li>Lift using leg muscles, not back muscles</li>
              <li>When the child gets bigger, ask for help to lift them</li>
              <li>When two people are lifting the child, count to 3</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-3">DO NOT:</h3>
            <ul className="list-disc list-inside space-y-2 text-red-800">
              <li>Bend forward with legs straight - this will hurt your back</li>
              <li>Pull up child by their arms with no support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 1: Head Control */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="1. Head Control" 
          isActive={activeSection === 'head'} 
          onClick={() => toggleSection('head')} 
        />
        {activeSection === 'head' && (
          <div className="p-6">
            <GoalBox>Maintain upright head positions while sitting and prone</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Minimal neck muscle activation</li>
                <li>Tolerance to prone position</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Tummy time</strong> (3-5 min, several times/day) - place toys at eye level</li>
                <li><strong>Supported sitting</strong> - use pillows, hold shoulders gently to encourage upright head</li>
                <li><strong>Side-lying play</strong> - encourages turning head and visual tracking</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Keep sessions short but frequent</li>
                <li>Use favorite toys and eye contact</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Always supervise prone position</li>
                <li>Avoid leaving the child unsupported</li>
              </ul>
            </SafetyBox>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Prone Activities:</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">C1. Lying on the forearm</h4>
                  <p className="text-gray-700">Encourage your child to lie on their front to play and take weight on their forearms.</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">C2. Lying prone to encourage head lifting</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage your child to lie on their front</li>
                    <li>Roll up a towel/bolster to put under the chest if necessary</li>
                    <li>Place a toy in front to encourage your child to lift up their head</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">C3. Encourage play by placing child on your lap with straight arms</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage your child to play in this position with their elbows straight</li>
                    <li>Later on they can be encouraged to put more weight on their hands and start to reach out</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">C4. Encourage Weight Shift Using Play</h4>
                  <p className="text-gray-700">Encourage child to shift weight and take objects.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">C5. Exercise to encourage forearm weight bearing</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage child to lie on their forearms</li>
                    <li>Encourage child to raise their chest by taking weight on their forearm</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-500" />
                Video Guides
              </h4>
              <div className="flex flex-wrap gap-3">
                <VideoLink url="https://youtu.be/p1QcRimMPRo?si=tcyGLVuW3SaXYk74" title="Head Control Guide 1" />
                <VideoLink url="https://youtu.be/X7GXEcgCy3Q?si=DGyRkfKL6jOXNfU4" title="Head Control Guide 2" />
              </div>
            </div>
          </div>
        )}
      </div>     
 {/* Section 2: Rolling */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="2. Rolling" 
          isActive={activeSection === 'rolling'} 
          onClick={() => toggleSection('rolling')} 
        />
        {activeSection === 'rolling' && (
          <div className="p-6">
            <GoalBox>Roll from back to tummy and tummy to back</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Some head control</li>
                <li>Ability to reach midline</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Lay child on the back with a toy on the side</li>
                <li>Assist arm and leg over gently to initiate roll</li>
                <li>Reward with smiles or toys when child attempts</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Practice on a soft surface (mat)</li>
                <li>Start with one direction (back to tummy)</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Clear the area of hard objects</li>
                <li>Stay nearby during attempts</li>
              </ul>
            </SafetyBox>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-500" />
                Video Guides
              </h4>
              <div className="flex flex-wrap gap-3">
                <VideoLink url="https://youtu.be/0oqQo-W43rA?si=YOO-qOLi_KKwyR9c" title="Rolling Guide" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Independent Sitting */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="3. Independent Sitting" 
          isActive={activeSection === 'sitting'} 
          onClick={() => toggleSection('sitting')} 
        />
        {activeSection === 'sitting' && (
          <div className="p-6">
            <GoalBox>Sit without support for at least 30 seconds</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Good head control</li>
                <li>Trunk muscle activation</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Ring sitting</strong> with support behind</li>
                <li>Reduce support gradually</li>
                <li>Introduce reaching while sitting to challenge balance</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use mirror play for engagement</li>
                <li>Practice daily for short sessions</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use cushions around the child</li>
                <li>Never leave a child on elevated surfaces</li>
              </ul>
            </SafetyBox>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Getting Up to Sitting Exercises:</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">G1. Getting up from lying to sitting position</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Lay the child on their front in a prone position</li>
                    <li>Bring the weight backwards over the knees by holding the child's hips</li>
                    <li>Encourage the child to push up with their hands</li>
                    <li>Move the child's hip slowly over to one side so the child is now sitting</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">G2. Getting up from lying to sitting to encourage head control</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Place your hands behind your child's shoulders and gently support the head</li>
                    <li>Make sure that they are facing you with their head in the middle</li>
                    <li>Bring the child slowly up to the sitting position</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">G3. Getting up from lying to sitting with hand control</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>From lying down bring children up to sitting by holding their hands</li>
                    <li>Make sure their head is in the middle and encourage them to grasp your thumbs</li>
                    <li>Bring child slowly up to sitting position, letting them do as much work as they can</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">G4. Getting up from lying, encouraging weight bearing on one hand</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Bring child to sitting position from lying by holding one hand</li>
                    <li>Gently tilt them over to one side and let them push up with that hand</li>
                    <li>Do this as slowly as you can so that your child can do as much of the activity as possible</li>
                  </ul>
                </div>
              </div>
            </div>    
        <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Exercises in Sitting Position:</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H1. Encouraging head control when sitting</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Sit with your child on your lap facing you</li>
                    <li>Place your hands behind their head and shoulder</li>
                    <li>Encourage your child to look at you, talk and play</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H2. Encouraging activity in sitting position</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage child to reach for toys to either side and keep their balance</li>
                    <li>This exercise helps improve sitting balance and strengthens stomach and back muscles</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H3. Encourage activity sitting on stool/chair</h4>
                  <p className="text-gray-700">Encourage reaching forward while maintaining balance.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H4. Side sitting</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage your child to sit as shown</li>
                    <li>Make sure they are taking weight through the straight hand</li>
                    <li>Encourage the child to use the other hand to reach for toys and play</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H5. Activity on bolster</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage child to do rotations</li>
                    <li>Ask them to reach the object, encouraging them to reach out</li>
                    <li>This exercise improves reach out</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H6. Exercises on Swiss ball</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Make your child sit on the ball, holding them at the hips</li>
                    <li>Gently bounce up and down</li>
                    <li>When this becomes easier, slowly tilt them to one side and then to the other</li>
                    <li>You can also try tilting the hips backwards and forwards too</li>
                    <li>Encourage your child to keep their balance and stay upright, give them reach out</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H7. Sitting on CP chair</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage child to sit on CP chair in upright position</li>
                    <li>Make sure the hips and knees are in 90-degree position</li>
                    <li>The hands are well supported</li>
                    <li>The head should also be well supported if the child has poor head and neck control</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">H8. Encouraging sit to stand</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Make the child sit on a stool</li>
                    <li>Hold at child's waist encouraging weight shift from hip to legs</li>
                    <li>You can also encourage child to reach for a toy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-500" />
                Video Guides
              </h4>
              <div className="flex flex-wrap gap-3">
                <VideoLink url="https://youtu.be/VQ_LtY0H0rc?si=dYd-q45iYjN4wI6F" title="Sitting Guide 1" />
                <VideoLink url="https://youtu.be/TZK6aFUm9DY?si=gcokRpVn7fOVQZ1x" title="Sitting Guide 2" />
              </div>
            </div>
          </div>
        )}
      </div>    
  {/* Section 4: Crawling */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="4. Crawling" 
          isActive={activeSection === 'crawling'} 
          onClick={() => toggleSection('crawling')} 
        />
        {activeSection === 'crawling' && (
          <div className="p-6">
            <GoalBox>Move forward on hands and knees</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Weight-bearing on arms</li>
                <li>Ability to pivot in tummy time</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Position child in crawling pose with support</li>
                <li>Use a rolled towel under the tummy</li>
                <li>Motivate with toys placed just out of reach</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Encourage crawling over walking too early</li>
                <li>Make it a game (tunnel play, chase toys)</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use non-slip mats</li>
                <li>Clear the floor of small or sharp objects</li>
              </ul>
            </SafetyBox>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-500" />
                Video Guides
              </h4>
              <div className="flex flex-wrap gap-3">
                <VideoLink url="https://youtu.be/mTQnr39Kyq4?si=1L3RYPPCbYDiD3-o" title="Crawling Guide 1" />
                <VideoLink url="https://youtu.be/RWCjJs6JAMk?si=jqtal8h4kqhtNE3Q" title="Crawling Guide 2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Standing */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="5. Standing" 
          isActive={activeSection === 'standing'} 
          onClick={() => toggleSection('standing')} 
        />
        {activeSection === 'standing' && (
          <div className="p-6">
            <GoalBox>Stand while holding onto furniture or parent</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Trunk stability</li>
                <li>Some leg strength</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Practice supported standing</li>
                <li>Bounce gently to strengthen legs</li>
                <li>Encourage reaching for toys on a table</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use supportive footwear</li>
                <li>Let the child explore while supervised</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Never use baby walkers</li>
                <li>Ensure furniture is stable</li>
              </ul>
            </SafetyBox>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-red-500" />
                Video Guides
              </h4>
              <div className="flex flex-wrap gap-3">
                <VideoLink url="https://youtu.be/6b0CTqsooBc?si=pKvUkDgjelt5KqBD" title="Standing Guide 1" />
                <VideoLink url="https://youtu.be/4U9gvOSDHJY?si=1lEKqdaTcxCJI7yI" title="Standing Guide 2" />
                <VideoLink url="https://youtube.com/shorts/sOdBDY-VEcM?si=0B740huyZk8U7vnz" title="Standing Short Guide" />
              </div>
            </div>
          </div>
        )}
      </div>      {/* 
Section 6: Walking */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <SectionHeader 
          title="6. Walking" 
          isActive={activeSection === 'walking'} 
          onClick={() => toggleSection('walking')} 
        />
        {activeSection === 'walking' && (
          <div className="p-6">
            <GoalBox>Take steps while holding on</GoalBox>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Prerequisites:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Can stand with support</li>
                <li>Good balance reactions</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Step-by-Step Activities:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Use parallel bars, furniture edges, or parent's hands</li>
                <li>Practice stepping between stable surfaces</li>
                <li>Use push toys (only under supervision)</li>
              </ol>
            </div>

            <TipsBox>
              <h4 className="font-semibold mb-2">Parent Tips:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Celebrate every step</li>
                <li>Don't rush to independent walking</li>
              </ul>
            </TipsBox>

            <SafetyBox>
              <h4 className="font-semibold mb-2">Safety:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use anti-slip socks or shoes</li>
                <li>Avoid cluttered paths</li>
              </ul>
            </SafetyBox>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Walking Exercises:</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">1. Encourage walking holding hands</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Hold the wrists and hands to support your child</li>
                    <li>Help your child to move their weight from one foot to the other</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">2. Encourage walking holding walker</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Initially you can hold on to the hip and shift weight from one hip to another</li>
                    <li>Gradually child can try taking independent steps</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">3. Encourage walking in parallel bars</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Child can walk in parallel bars by holding the railing with both hands initially</li>
                    <li>Later they can walk holding one hand</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">4. Side walking</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Encourage side walking</li>
                    <li>This improves weight shifts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildPositioningGuide;
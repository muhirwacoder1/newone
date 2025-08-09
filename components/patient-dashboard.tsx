"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Play, Camera, MessageSquare, Clock, CheckCircle, Star, Plus, Bell, Settings, Heart, Activity, Video, Users, BookOpen, Award, TrendingUp, Pill, Zap, ArrowRight, Target, Sparkles, Eye, Brain, MapPin, HelpCircle, Send, ThumbsUp, AlertTriangle, Shield } from 'lucide-react'
import { BottomNavigation } from "@/components/bottom-navigation"
import EarlyDetectionCP from "@/components/early-detection"
import ChildPositioningGuide from "@/components/child-positioning-guide"

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [showEarlyDetection, setShowEarlyDetection] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    type: "",
    notes: ""
  })
  const [showQuestionDialog, setShowQuestionDialog] = useState(false)
  const [showExerciseDetails, setShowExerciseDetails] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "",
    urgency: "medium",
    isUrgent: false
  })
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How often should I do exercises with Emma?",
      content: "Emma is 7 years old with spastic CP. The physiotherapist gave us exercises but I'm not sure how many times per day we should do them. Should we do them every day?",
      category: "Exercise",
      author: "Emma's Mom",
      date: "2 hours ago",
      status: "answered",
      urgency: "medium",
      isUrgent: false,
      likes: 5,
      views: 24,
      answers: [
        {
          id: 1,
          content: "For a 7-year-old with spastic CP, I recommend doing the exercises 2-3 times daily, about 15-20 minutes each session. Make sure Emma is not tired and the exercises are fun. Consistency is more important than intensity.",
          author: "CHW Uwimana Marie Claire",
          verified: true,
          date: "1 hour ago",
          likes: 8,
          avatar: "/placeholder.svg"
        }
      ]
    },
    {
      id: 2,
      title: "Wheelchair maintenance - urgent help needed",
      content: "Michael's wheelchair is making strange noises and the left wheel seems loose. Is it safe to continue using it? We have an appointment next week but I'm worried.",
      category: "Equipment",
      author: "Michael's Dad",
      date: "5 hours ago",
      status: "answered",
      urgency: "high",
      isUrgent: true,
      likes: 3,
      views: 18,
      answers: [
        {
          id: 1,
          content: "Please stop using the wheelchair immediately if the wheel is loose - this is a safety concern. Contact your equipment provider or visit the nearest health center today. In the meantime, use alternative mobility aids if available.",
          author: "CHW Nkurunziza Jean Baptiste",
          verified: true,
          date: "3 hours ago",
          likes: 12,
          avatar: "/placeholder.svg"
        }
      ]
    },
    {
      id: 3,
      title: "Feeding difficulties with Sofia",
      content: "Sofia has trouble swallowing and often chokes during meals. What are some safe feeding techniques I can use at home?",
      category: "Nutrition",
      author: "Sofia's Grandmother",
      date: "1 day ago",
      status: "pending",
      urgency: "medium",
      isUrgent: false,
      likes: 7,
      views: 31,
      answers: []
    },
    {
      id: 4,
      title: "Speech therapy progress tracking",
      content: "How can I track David's speech development progress at home? What milestones should I look for?",
      category: "Speech",
      author: "David's Mother",
      date: "2 days ago",
      status: "answered",
      urgency: "low",
      isUrgent: false,
      likes: 12,
      views: 45,
      answers: [
        {
          id: 1,
          content: "Track daily communication attempts, new sounds/words, and social interactions. Keep a simple diary noting improvements. Look for increased eye contact, attempts to communicate needs, and response to familiar voices.",
          author: "CHW Mukamana Esperance",
          verified: true,
          date: "1 day ago",
          likes: 15,
          avatar: "/placeholder.svg"
        }
      ]
    },
    {
      id: 5,
      title: "Managing spasticity at home",
      content: "Emma's muscles get very tight, especially in the evenings. Are there safe techniques I can use at home to help her relax?",
      category: "Therapy",
      author: "Emma's Mother",
      date: "3 days ago",
      status: "answered",
      urgency: "medium",
      isUrgent: false,
      likes: 9,
      views: 28,
      answers: [
        {
          id: 1,
          content: "Gentle warm baths, slow stretching, and positioning can help. Avoid forcing movements. Use pillows for comfortable positioning and consider gentle massage. If spasticity increases suddenly, contact your healthcare provider.",
          author: "CHW Habimana Emmanuel",
          verified: true,
          date: "2 days ago",
          likes: 11,
          avatar: "/placeholder.svg"
        }
      ]
    }
  ])

  const [todayExercises, setTodayExercises] = useState([
    {
      id: 1,
      name: "Arm Stretching",
      duration: "10 min",
      completed: true,
      difficulty: "Easy",
      points: 50,
      videoUrl: "https://youtu.be/ji72maOhE6s?si=omPJYkV0C8glOA5T",
      description: "Gentle arm stretching exercises to improve flexibility and reduce muscle tension. Focus on slow, controlled movements and hold each stretch for 15-30 seconds.",
      instructions: [
        "Start with gentle warm-up movements",
        "Stretch each arm slowly and hold for 15-30 seconds",
        "Breathe deeply during each stretch",
        "Stop if you feel any pain"
      ]
    },
    {
      id: 2,
      name: "Balance Training",
      duration: "15 min",
      completed: false,
      difficulty: "Medium",
      points: 75,
      videoUrl: "https://youtu.be/hbrKHbM8dnM?si=BVb7bKV0_3pF5FB3",
      description: "Balance training exercises to improve stability and coordination. These exercises help strengthen core muscles and improve postural control.",
      instructions: [
        "Start with simple standing balance exercises",
        "Progress to more challenging movements as you improve",
        "Use support if needed for safety",
        "Practice daily for best results"
      ]
    },
    {
      id: 3,
      name: "Leg Strengthening",
      duration: "12 min",
      completed: false,
      difficulty: "Medium",
      points: 65,
      videoUrl: "https://youtu.be/vNHrQZEwL_U?si=u7vX0L0je6eoO4-_",
      description: "Leg strengthening exercises to build muscle strength and improve mobility. These exercises target major leg muscle groups including quadriceps, hamstrings, and calves.",
      instructions: [
        "Start with light resistance or body weight",
        "Perform 10-15 repetitions of each exercise",
        "Rest between sets as needed",
        "Gradually increase intensity over time"
      ]
    }
  ])

  const upcomingAppointments = [
    {
      id: 1,
      type: "Physiotherapy Session",
      doctor: "Dr. Sarah Mitchell",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "City Medical Center",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      type: "Progress Review",
      doctor: "Dr. Michael Johnson",
      date: "Friday",
      time: "2:30 PM",
      location: "Pediatric Clinic",
      avatar: "/placeholder.svg"
    }
  ]

  const communityPosts = [
    {
      id: 1,
      author: "Sarah M.",
      time: "2 hours ago",
      content: "Just wanted to share that Emma completed her first independent walk today! 🎉",
      likes: 12,
      comments: 5,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      author: "Dr. Wilson",
      time: "1 day ago",
      content: "New research shows promising results for early intervention techniques. Link in comments.",
      likes: 8,
      comments: 3,
      avatar: "/placeholder.svg"
    }
  ]

  const healthProfessionals = [
    {
      id: 1,
      name: "Dr. Mugisha Emmanuel",
      title: "Pediatric Physiotherapist",
      specialization: "Cerebral Palsy & Motor Development",
      experience: "8 years",
      location: "Kigali University Teaching Hospital",
      rating: 4.9,
      availability: "Mon-Fri 8:00-17:00",
      languages: ["Kinyarwanda", "English", "French"],
      avatar: "/placeholder.svg",
      nextAvailable: "Tomorrow 10:00 AM"
    },
    {
      id: 2,
      name: "Dr. Flora Uwimana",
      title: "Senior Physiotherapist",
      specialization: "Pediatric Rehabilitation & Therapy",
      experience: "12 years",
      location: "Rwanda Military Hospital",
      rating: 4.8,
      availability: "Mon-Sat 7:30-16:30",
      languages: ["Kinyarwanda", "English"],
      avatar: "/placeholder.svg",
      nextAvailable: "Today 2:00 PM"
    },
    {
      id: 3,
      name: "Dr. Jean Baptiste Nkurunziza",
      title: "Occupational Therapist",
      specialization: "Assistive Technology & Daily Living",
      experience: "6 years",
      location: "King Faisal Hospital",
      rating: 4.7,
      availability: "Tue-Sat 9:00-18:00",
      languages: ["Kinyarwanda", "English"],
      avatar: "/placeholder.svg",
      nextAvailable: "Friday 11:00 AM"
    },
    {
      id: 4,
      name: "Dr. Marie Claire Mukamana",
      title: "Speech Therapist",
      specialization: "Communication & Swallowing Disorders",
      experience: "5 years",
      location: "University Central Hospital of Kigali",
      rating: 4.6,
      availability: "Mon-Thu 8:30-17:30",
      languages: ["Kinyarwanda", "English", "French"],
      avatar: "/placeholder.svg",
      nextAvailable: "Monday 9:30 AM"
    }
  ]

  const handleScheduleAppointment = (professional: any) => {
    setSelectedProfessional(professional)
    setShowScheduleDialog(true)
  }

  const handleSubmitAppointment = () => {
    console.log("Scheduling appointment:", {
      professional: selectedProfessional,
      appointmentData: appointmentData
    })
    // Here you would submit the appointment request
    setShowScheduleDialog(false)
    setAppointmentData({
      date: "",
      time: "",
      type: "",
      notes: ""
    })
  }

  const handleSubmitQuestion = () => {
    // Validation
    if (!newQuestion.title.trim() || !newQuestion.content.trim() || !newQuestion.category) {
      alert("Please fill in all required fields")
      return
    }

    const question = {
      id: questions.length + 1,
      title: newQuestion.title.trim(),
      content: newQuestion.content.trim(),
      category: newQuestion.category,
      urgency: newQuestion.urgency,
      isUrgent: newQuestion.isUrgent,
      status: "pending",
      author: "Emma's Mother",
      date: "Just now",
      likes: 0,
      views: 1,
      answers: []
    }

    setQuestions(prev => [question, ...prev])
    setShowQuestionDialog(false)
    setNewQuestion({
      title: "",
      content: "",
      category: "",
      urgency: "medium",
      isUrgent: false
    })

    // Show success notification (in a real app, this would be a toast notification)
    setTimeout(() => {
      alert(`✅ Question submitted successfully!\n\n${newQuestion.isUrgent ? '🚨 Urgent questions are prioritized and CHWs will be notified immediately.' : '📝 Your question has been sent to our verified CHWs. Average response time: 2 hours.'}`)
    }, 500)
  }

  const handleLikeQuestion = (questionId: number) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, likes: q.likes + 1 } : q
    ))
  }

  const handleLikeAnswer = (questionId: number, answerId: number) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? {
          ...q,
          answers: q.answers.map(a =>
            a.id === answerId ? { ...a, likes: a.likes + 1 } : a
          )
        }
        : q
    ))
  }

  const handleCompleteExercise = (exerciseId: number) => {
    setTodayExercises(prev => prev.map(exercise =>
      exercise.id === exerciseId 
        ? { ...exercise, completed: true }
        : exercise
    ))
  }

  const handleShowExerciseDetails = (exercise: any) => {
    setSelectedExercise(exercise)
    setShowExerciseDetails(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-14 h-14 ring-4 ring-white/50 shadow-xl">
                  <AvatarImage src="/whimsical-child.png" />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-bold text-lg">EJ</AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-pink-800 bg-clip-text text-transparent">
                  Emma's Journey
                </h1>
                <p className="text-slate-600 font-medium">Age 7 • Spastic CP • Level 2</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl">
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl">
                <Settings className="w-5 h-5 text-slate-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Guide
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Community
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Q&A
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            {/* Did You Know Card */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setShowEarlyDetection(true)}>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
                <img
                  src="https://www.datelinehealthafrica.org/ckfinder/userfiles/files/Caregiver%20and%20Child%20with%20Cerebral%20Palsy(1).jpg"
                  alt="Early detection guide"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Did You Know?</h3>
                    <p className="text-white/90 mb-4">Early detection of cerebral palsy can greatly improve treatment outcomes</p>
                    <div className="flex items-center justify-center space-x-2 text-white/80">
                      <Brain className="w-4 h-4" />
                      <span className="text-sm font-semibold">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Progress Overview */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10"></div>
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/25">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Today's Progress</h3>
                        <p className="text-pink-100">You're doing amazing, Emma! 🌟</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-white">67%</div>
                      <div className="text-sm text-pink-100">Complete</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Progress value={67} className="h-3 bg-white/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <div className="text-2xl font-bold text-white">2/3</div>
                      <div className="text-pink-100">Exercises</div>
                    </div>
                    <div className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <div className="text-2xl font-bold text-white">1/1</div>
                      <div className="text-pink-100">Medication</div>
                    </div>
                    <div className="text-center p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <div className="text-2xl font-bold text-white">190</div>
                      <div className="text-pink-100">Points Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">15</div>
                    <div className="text-sm font-medium text-slate-600">Days Streak</div>
                    <div className="flex items-center justify-center mt-2 text-emerald-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold">Personal Best!</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">8</div>
                    <div className="text-sm font-medium text-slate-600">Achievements</div>
                    <div className="flex items-center justify-center mt-2 text-amber-600">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold">Gold Level</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">+12%</div>
                    <div className="text-sm font-medium text-slate-600">This Month</div>
                    <div className="flex items-center justify-center mt-2 text-blue-600">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold">Improving</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">2</div>
                    <div className="text-sm font-medium text-slate-600">Upcoming</div>
                    <div className="flex items-center justify-center mt-2 text-purple-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold">This Week</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Today's Exercises */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <span>Today's Exercises</span>
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {todayExercises.map((exercise) => (
                  <div key={exercise.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${exercise.completed
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25'
                        }`}>
                        {exercise.completed ? (
                          <CheckCircle className="w-7 h-7 text-white" />
                        ) : (
                          <Play className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-lg font-bold ${exercise.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {exercise.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${exercise.difficulty === 'Easy' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                exercise.difficulty === 'Medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                  'bg-gradient-to-r from-red-500 to-pink-600'
                                } text-white border-0 shadow-lg`}
                            >
                              {exercise.difficulty}
                            </Badge>
                            <div className="text-right">
                              <div className="text-lg font-bold text-purple-600">+{exercise.points}</div>
                              <div className="text-xs text-slate-500">points</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{exercise.duration}</span>
                          </div>
                          {exercise.completed && (
                            <div className="flex items-center space-x-2 text-emerald-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">Completed!</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                          onClick={() => window.open(exercise.videoUrl, '_blank')}
                          title="Watch Exercise Video"
                        >
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl"
                          onClick={() => handleShowExerciseDetails(exercise)}
                          title="View Exercise Details"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        {!exercise.completed && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl"
                            onClick={() => handleCompleteExercise(exercise.id)}
                            title="Mark as Complete"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Upcoming Appointments */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 ring-4 ring-white/50">
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                              {appointment.doctor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-bold text-slate-800">{appointment.type}</h4>
                            <p className="text-sm text-slate-600 mb-1">{appointment.doctor}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {appointment.date} at {appointment.time}
                              </span>
                              <span>•</span>
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <ChildPositioningGuide />
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span>Schedule Appointment</span>
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                    {healthProfessionals.length} Available Professionals
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {healthProfessionals.map((professional) => (
                  <div key={professional.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16 ring-4 ring-white/50">
                          <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                            {professional.name.split(' ').slice(1, 3).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-slate-800">{professional.name}</h4>
                              <p className="text-emerald-600 font-semibold">{professional.title}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-500 fill-current" />
                                <span className="text-sm font-semibold text-slate-700">{professional.rating}</span>
                              </div>
                              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
                                {professional.experience}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                              <Heart className="w-4 h-4 text-pink-600" />
                              <span className="text-sm font-medium text-slate-700">{professional.specialization}</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-slate-700">{professional.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                              <Clock className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm font-medium text-slate-700">{professional.availability}</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                              <MessageSquare className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-slate-700">{professional.languages.join(", ")}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                  <Calendar className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                  <div className="text-xs text-emerald-600 font-medium">Next Available</div>
                                  <div className="text-sm font-bold text-emerald-800">{professional.nextAvailable}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-emerald-200 hover:bg-emerald-50 rounded-xl"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Video Call
                              </Button>
                              <Button
                                onClick={() => handleScheduleAppointment(professional)}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-8">
            {/* Community Posts */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span>Community Feed</span>
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Share Update
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12 ring-4 ring-white/50">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold text-sm">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-bold text-slate-800">{post.author}</span>
                            <span className="text-sm text-slate-500">{post.time}</span>
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                          <p className="text-slate-700 leading-relaxed mb-4">{post.content}</p>
                          <div className="flex items-center space-x-6 text-sm">
                            <button className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors group">
                              <div className="w-8 h-8 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                                <Heart className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors group">
                              <div className="w-8 h-8 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                                <MessageSquare className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-slate-500 hover:text-purple-500 transition-colors group">
                              <div className="w-8 h-8 bg-purple-50 group-hover:bg-purple-100 rounded-xl flex items-center justify-center transition-colors">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                              <span className="font-medium">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-8">
            {/* Ask Question Button */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Have a Question?</h3>
                      <p className="text-slate-600">Get expert advice from healthcare professionals</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowQuestionDialog(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Q&A Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{questions.length}</div>
                  <div className="text-xs font-medium text-slate-600">Total Questions</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/25">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">{questions.filter(q => q.status === 'answered').length}</div>
                  <div className="text-xs font-medium text-slate-600">Answered</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/25">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{questions.filter(q => q.status === 'pending').length}</div>
                  <div className="text-xs font-medium text-slate-600">Pending</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/25">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">{questions.reduce((sum, q) => sum + (q.helpful || 0), 0)}</div>
                  <div className="text-xs font-medium text-slate-600">Helpful Votes</div>
                </CardContent>
              </Card>
            </div>

            {/* Questions & Answers Feed */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span>Questions & Answers</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32 rounded-xl border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Questions</SelectItem>
                        <SelectItem value="answered">Answered</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="speech">Speech</SelectItem>
                        <SelectItem value="therapy">Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            {question.isUrgent && (
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg text-xs animate-pulse">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                            <Badge
                              className={`${question.category === 'Exercise' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                                question.category === 'Equipment' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                  question.category === 'Speech' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                    question.category === 'Nutrition' ? 'bg-gradient-to-r from-orange-500 to-amber-600' :
                                      question.category === 'Therapy' ? 'bg-gradient-to-r from-indigo-500 to-blue-600' :
                                        'bg-gradient-to-r from-emerald-500 to-teal-600'
                                } text-white border-0 shadow-lg text-xs`}
                            >
                              {question.category}
                            </Badge>
                            <Badge
                              className={`${question.urgency === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                question.urgency === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                  'bg-gradient-to-r from-emerald-500 to-teal-600'
                                } text-white border-0 shadow-lg text-xs`}
                            >
                              {question.urgency} priority
                            </Badge>
                            <Badge
                              className={`${question.status === 'answered' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                'bg-gradient-to-r from-amber-500 to-orange-600'
                                } text-white border-0 shadow-lg text-xs`}
                            >
                              {question.status}
                            </Badge>
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors">{question.title}</h4>
                          <p className="text-slate-700 mb-4 leading-relaxed">{question.content}</p>

                          {/* Display Answers */}
                          {question.answers && question.answers.length > 0 && (
                            <div className="space-y-4 mb-4">
                              {question.answers.map((answer) => (
                                <div key={answer.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                  <div className="flex items-start space-x-3">
                                    <Avatar className="w-10 h-10">
                                      <AvatarImage src={answer.avatar} />
                                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                                        {answer.author.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-sm font-semibold text-emerald-800">{answer.author}</span>
                                        {answer.verified && (
                                          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 text-xs">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Verified CHW
                                          </Badge>
                                        )}
                                        <span className="text-xs text-emerald-600">{answer.date}</span>
                                      </div>
                                      <p className="text-sm text-emerald-700 leading-relaxed mb-3">{answer.content}</p>
                                      <div className="flex items-center space-x-3">
                                        <button
                                          onClick={() => handleLikeAnswer(question.id, answer.id)}
                                          className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors"
                                        >
                                          <ThumbsUp className="w-4 h-4" />
                                          <span className="text-sm">{answer.likes}</span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors">
                                          <MessageSquare className="w-4 h-4" />
                                          <span className="text-sm">Reply</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Pending Status */}
                          {question.status === 'pending' && (
                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-white animate-spin" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-amber-800">Waiting for Expert Answer</h5>
                                  <p className="text-amber-700 text-sm">Our verified CHWs will respond soon. Average response time: 2 hours</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm text-slate-600">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-semibold">
                                    {question.author.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>by <strong>{question.author}</strong></span>
                              </div>
                              <span>•</span>
                              <span>{question.date}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{question.views} views</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleLikeQuestion(question.id)}
                                className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors"
                              >
                                <Heart className="w-4 h-4" />
                                <span>{question.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors">
                                <Star className="w-4 h-4" />
                                <span>Save</span>
                              </button>
                              <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                                <span>View Thread</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300"
                  >
                    Load More Questions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation role="patient" activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Early Detection Dialog */}
      <Dialog open={showEarlyDetection} onOpenChange={setShowEarlyDetection}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-y-auto">
          <EarlyDetectionCP onClose={() => setShowEarlyDetection(false)} />
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span>Schedule Appointment</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {selectedProfessional && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedProfessional.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                      {selectedProfessional.name.split(' ').slice(1, 3).map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{selectedProfessional.name}</h4>
                    <p className="text-sm text-emerald-600 font-semibold">{selectedProfessional.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span>{selectedProfessional.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedProfessional.experience}</span>
                      <span>•</span>
                      <span>{selectedProfessional.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Preferred Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-time">Preferred Time</Label>
                <Select value={appointmentData.time} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointment-type">Appointment Type</Label>
              <Select value={appointmentData.type} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Assessment</SelectItem>
                  <SelectItem value="followup">Follow-up Session</SelectItem>
                  <SelectItem value="therapy">Therapy Session</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="progress">Progress Review</SelectItem>
                  <SelectItem value="device">Device Fitting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointment-notes">Additional Notes</Label>
              <Textarea
                id="appointment-notes"
                placeholder="Please describe your child's current condition, specific concerns, or any special requirements..."
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
                className="rounded-xl border-slate-200 min-h-[100px]"
              />
            </div>

            {/* Appointment Summary */}
            {appointmentData.date && appointmentData.time && appointmentData.type && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <Label className="text-blue-800 font-semibold">Appointment Summary</Label>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center justify-between">
                    <span>Professional:</span>
                    <span className="font-semibold">{selectedProfessional?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date & Time:</span>
                    <span className="font-semibold">{appointmentData.date} at {appointmentData.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-semibold capitalize">{appointmentData.type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span className="font-semibold">{selectedProfessional?.location}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setShowScheduleDialog(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAppointment}
                disabled={!appointmentData.date || !appointmentData.time || !appointmentData.type}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Request Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ask Question Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span>Ask a Question</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Get Expert Help</span>
              </div>
              <p className="text-blue-700 text-sm">
                Ask questions about your child's care, exercises, equipment, or any concerns. Our healthcare professionals and community will help you.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-title">Question Title</Label>
              <Input
                id="question-title"
                placeholder="Brief summary of your question..."
                value={newQuestion.title}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="question-category">Category</Label>
                <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exercise">Exercise & Therapy</SelectItem>
                    <SelectItem value="Equipment">Equipment & Devices</SelectItem>
                    <SelectItem value="Nutrition">Nutrition & Feeding</SelectItem>
                    <SelectItem value="Speech">Speech & Communication</SelectItem>
                    <SelectItem value="Therapy">Physical Therapy</SelectItem>
                    <SelectItem value="Medical">Medical Concerns</SelectItem>
                    <SelectItem value="Daily Care">Daily Care</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="question-urgency">Priority Level</Label>
                <Select value={newQuestion.urgency} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                        <span>Low - General question</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                        <span>Medium - Need guidance</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                        <span>High - Urgent concern</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Urgent Checkbox */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
              <input
                type="checkbox"
                id="urgent-question"
                checked={newQuestion.isUrgent}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, isUrgent: e.target.checked, urgency: e.target.checked ? 'high' : prev.urgency }))}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <div className="flex-1">
                <Label htmlFor="urgent-question" className="text-red-800 font-semibold cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Mark as Urgent</span>
                  </div>
                </Label>
                <p className="text-red-700 text-sm mt-1">
                  Check this if your question requires immediate attention from healthcare professionals
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-content">Question Details</Label>
              <Textarea
                id="question-content"
                placeholder="Please provide detailed information about your question. Include your child's age, condition, current situation, and what specific help you need..."
                value={newQuestion.content}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                className="rounded-xl border-slate-200 min-h-[120px]"
              />
            </div>

            {/* Question Preview */}
            {newQuestion.title && newQuestion.content && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-5 h-5 text-emerald-600" />
                  <Label className="text-emerald-800 font-semibold">Question Preview</Label>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800">{newQuestion.title}</h4>
                  <p className="text-sm text-slate-700">{newQuestion.content}</p>
                  <div className="flex items-center space-x-2">
                    {newQuestion.category && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 text-xs">
                        {newQuestion.category}
                      </Badge>
                    )}
                    <Badge className={`${newQuestion.urgency === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                      newQuestion.urgency === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                        'bg-gradient-to-r from-emerald-500 to-teal-600'
                      } text-white border-0 text-xs`}>
                      {newQuestion.urgency} priority
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setShowQuestionDialog(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitQuestion}
                disabled={!newQuestion.title || !newQuestion.content || !newQuestion.category}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Question
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Exercise Details Dialog */}
      <Dialog open={showExerciseDetails} onOpenChange={setShowExerciseDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span>{selectedExercise?.name} Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedExercise && (
            <div className="space-y-6 pt-4">
              {/* Exercise Overview */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      selectedExercise.completed
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25'
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25'
                    }`}>
                      {selectedExercise.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{selectedExercise.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{selectedExercise.duration}</span>
                        </div>
                        <Badge
                          className={`${
                            selectedExercise.difficulty === 'Easy' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                            selectedExercise.difficulty === 'Medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                            'bg-gradient-to-r from-red-500 to-pink-600'
                          } text-white border-0 text-xs`}
                        >
                          {selectedExercise.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold">+{selectedExercise.points} points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedExercise.completed && (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                      Completed
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Description
                </h4>
                <p className="text-slate-700 leading-relaxed">{selectedExercise.description}</p>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Instructions
                </h4>
                <div className="space-y-2">
                  {selectedExercise.instructions.map((instruction: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 flex-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => window.open(selectedExercise.videoUrl, '_blank')}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Watch Video Guide
                  </Button>
                  {!selectedExercise.completed && (
                    <Button
                      onClick={() => {
                        handleCompleteExercise(selectedExercise.id)
                        setShowExerciseDetails(false)
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowExerciseDetails(false)}
                  className="border-slate-200 hover:bg-slate-50 rounded-xl"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  )
}

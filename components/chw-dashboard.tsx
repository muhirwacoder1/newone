"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, Camera, MapPin, Clock, CheckCircle, AlertTriangle, Plus, Upload, Bell, Settings, Heart, Activity, MessageSquare, Video, Star, Award, TrendingUp, Zap, ArrowRight, Play, Target, Calendar, Send, Image, Paperclip, AlertCircle, Route } from 'lucide-react'
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function CHWDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportType, setReportType] = useState("")
  const [selectedPatientForReport, setSelectedPatientForReport] = useState<any>(null)
  const [reportData, setReportData] = useState({
    notes: "",
    mediaFiles: [] as File[],
    deviceRequest: "",
    deviceImages: [] as File[],
    urgency: "medium"
  })
  const [showTripDialog, setShowTripDialog] = useState(false)
  const [selectedPatientForTrip, setSelectedPatientForTrip] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [tripData, setTripData] = useState({
    date: "",
    time: "",
    purpose: "",
    notes: "",
    estimatedDuration: "60"
  })
  const [storedReports, setStoredReports] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('chw_reports')
        return stored ? JSON.parse(stored) : []
      } catch (error) {
        console.error('Error parsing stored reports:', error)
        return []
      }
    }
    return []
  })
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Umwana wanjye afite imyaka 5, ariko ntabwo ashobora kugenda neza. Ni iki nakora?",
      answer: "Murakoze kubaza. Ni ngombwa ko ujya ku kigo cy'ubuvuzi kugira ngo umwana akorwe isuzuma. Mu gihe cyo gutegereza, mukomeze gukora imyitozo yoroshye yo kugenda hamwe n'umwana.",
      patient: "Uwimana Claudine",
      date: "Uyu munsi",
      answered: true,
      priority: "high"
    },
    {
      id: 2,
      question: "Umwana wanjye ntashobora kwicuza neza. Ni iki nakora kugira ngo mufashe?",
      answer: "",
      patient: "Nkurunziza Jean Baptiste",
      date: "Ejo hashize",
      answered: false,
      priority: "medium"
    },
    {
      id: 3,
      question: "Umwana wanjye afite ibibazo byo kurya. Ni gute nakora kugira ngo mufashe?",
      answer: "Murakoze kubaza. Ni ngombwa ko mukoresha ibiribwa byoroshye kurya kandi mukagira ubwoba bwo gufata amazi menshi. Ni byiza ko mujya ku kigo cy'ubuvuzi kugira ngo muhabwe ubufasha burambuye.",
      patient: "Mukamana Esperance",
      date: "Ejo hashize",
      answered: true,
      priority: "medium"
    },
    {
      id: 4,
      question: "Umwana wanjye ntashobora kuvuga neza. Ni iki nakora?",
      answer: "",
      patient: "Habimana Emmanuel",
      date: "Iminsi 2 ishize",
      answered: false,
      priority: "high"
    }
  ])
  const [newAnswer, setNewAnswer] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)
  const [showAnswerDialog, setShowAnswerDialog] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "question",
      title: "Ikibazo gishya kuva mu muryango",
      message: "Nyina wa Uwimana Claudine yabajije ku bijyanye n'imyitozo yo kugenda",
      time: "Iminota 10 ishize",
      read: false,
      priority: "medium",
      patient: "Uwimana Claudine",
      avatar: "/whimsical-child.png"
    },
    {
      id: 2,
      type: "visit",
      title: "Kwibuka Gusura",
      message: "Gusura Nkurunziza Jean Baptiste ejo ku isaha ya 2:00",
      time: "Amasaha 2 ashize",
      read: false,
      priority: "high",
      patient: "Nkurunziza Jean Baptiste",
      avatar: "/young-boy-drawing.png"
    },
    {
      id: 3,
      type: "question",
      title: "Ikibazo cy'ibikoresho",
      message: "Umuryango wa Mukamana Esperance ukeneye ubufasha ku bikoresho",
      time: "Umunsi 1 ushize",
      read: true,
      priority: "low",
      patient: "Mukamana Esperance",
      avatar: "/young-woman-smiling.png"
    }
  ])

  // Interactive handlers
  const handleStatCardClick = (statType: string, value: number) => {
    switch (statType) {
      case 'patients':
        toast.success(`📊 Kwerekana abarwayi ${value} bose`)
        break
      case 'visits':
        toast.success(`📅 Kwerekana amasura ${value} yateguwe`)
        break
      case 'reports':
        setActiveTab('reports')
        toast.success(`📝 Kwerekana raporo ${value} zitegereje`)
        break
      case 'devices':
        toast.info(`🔧 Nta bikoresho byasabwe ubu`)
        break
      default:
        toast.info(`📈 ${statType}: ${value}`)
    }
  }

  const handleSubmitReport = (type: string) => {
    const newReport = {
      id: Date.now(),
      type: type,
      patient: selectedPatientForReport?.patient || "Uwimana Claudine",
      date: new Date().toLocaleDateString('rw-RW'),
      time: new Date().toLocaleTimeString('rw-RW'),
      notes: reportData.notes,
      urgency: reportData.urgency,
      status: "pending",
      // Store only file names, not File objects to avoid circular references
      mediaFileNames: reportData.mediaFiles.map(file => file.name),
      deviceImageNames: reportData.deviceImages.map(file => file.name)
    }

    const updatedReports = [...storedReports, newReport]
    setStoredReports(updatedReports)

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('chw_reports', JSON.stringify(updatedReports))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
        // Fallback: save without file data
        const reportWithoutFiles = { ...newReport }
        delete reportWithoutFiles.mediaFileNames
        delete reportWithoutFiles.deviceImageNames
        const fallbackReports = [...storedReports, reportWithoutFiles]
        localStorage.setItem('chw_reports', JSON.stringify(fallbackReports))
      }
    }

    setShowReportDialog(false)
    setReportData({ notes: "", mediaFiles: [], deviceRequest: "", deviceImages: [], urgency: "medium" })

    // Show success notification after 3 seconds
    setTimeout(() => {
      toast.success("✅ Raporo yoherejwe neza!")
    }, 3000)
  }

  const handleAnswerQuestion = (questionId: number, answer: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId
        ? { ...q, answer: answer, answered: true, date: new Date().toLocaleDateString('rw-RW') }
        : q
    ))
    setShowAnswerDialog(false)
    setNewAnswer("")

    // Show success notification after 3 seconds
    setTimeout(() => {
      toast.success("✅ Igisubizo cyoherejwe neza!")
    }, 3000)
  }

  const patientAssignments = [
    {
      id: 1,
      patient: "Uwimana Claudine",
      age: "Imyaka 7",
      condition: "Spastic CP",
      lastVisit: "Iminsi 2 ishize",
      nextVisit: "Uyu munsi",
      priority: "high",
      avatar: "/whimsical-child.png",
      progress: 75
    }
  ]

  const recentReports = [
    {
      id: 1,
      patient: "Emma Johnson",
      date: "Today",
      status: "submitted",
      type: "Progress Update",
      score: 85
    },
    {
      id: 2,
      patient: "Michael Chen",
      date: "Yesterday",
      status: "draft",
      type: "Device Assessment",
      score: 72
    }
  ]

  const handleCreateReport = (type: string, patient: any) => {
    setReportType(type)
    setSelectedPatientForReport(patient)
    setShowReportDialog(true)
  }

  const handleMediaUpload = (files: FileList | null, type: 'media' | 'device') => {
    if (files) {
      const fileArray = Array.from(files)
      if (type === 'media') {
        setReportData(prev => ({ ...prev, mediaFiles: [...prev.mediaFiles, ...fileArray] }))
      } else {
        setReportData(prev => ({ ...prev, deviceImages: [...prev.deviceImages, ...fileArray] }))
      }
    }
  }



  const handlePlanTrip = (patient: any) => {
    setSelectedPatientForTrip(patient)
    setShowTripDialog(true)
  }

  const handleSubmitTrip = () => {
    console.log("Planning trip:", {
      patient: selectedPatientForTrip,
      tripData: tripData
    })
    setShowTripDialog(false)
    setTripData({
      date: "",
      time: "",
      purpose: "",
      notes: "",
      estimatedDuration: "60"
    })

    // Show success notification after 3 seconds
    setTimeout(() => {
      toast.success("✅ Gahunda y'urugendo yashyizweho neza!")
    }, 3000)
  }

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
                  Uwimana Marie Claire
                </h1>
                <p className="text-slate-600 font-medium">Community Health Worker • Umukozi w'ubuzima mu muryango</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Popover open={showNotifications} onOpenChange={setShowNotifications}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl">
                    <Bell className="w-5 h-5 text-slate-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0 bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl" align="end">
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-800">Amakuru</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg">
                            {unreadCount} mashya
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-emerald-600 hover:bg-emerald-50 rounded-xl"
                        >
                          Byose byasomwe
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Nta makuru ubu</p>
                      </div>
                    ) : (
                      <div className="space-y-1 p-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${notification.read
                              ? 'bg-slate-50/50 hover:bg-slate-100/50'
                              : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200/50'
                              }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="relative">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                                    {notification.patient.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${notification.type === 'question'
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                  : 'bg-gradient-to-r from-amber-500 to-orange-600'
                                  }`}>
                                  {notification.type === 'question' ? (
                                    <MessageSquare className="w-2 h-2 text-white" />
                                  ) : (
                                    <Calendar className="w-2 h-2 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'
                                    }`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      className={`text-xs ${notification.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                        notification.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                          'bg-gradient-to-r from-emerald-500 to-teal-600'
                                        } text-white border-0`}
                                    >
                                      {notification.priority}
                                    </Badge>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                                <p className={`text-sm mb-2 ${notification.read ? 'text-slate-600' : 'text-slate-700'
                                  }`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">{notification.time}</span>
                                  <span className="text-xs text-slate-500">{notification.patient}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl">
                <Settings className="w-5 h-5 text-slate-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Ibibazo Byasubijwe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="group relative cursor-pointer"
                onClick={() => handleStatCardClick('patients', 1)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">+8%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">1</p>
                      <p className="text-slate-600 font-medium">Abarwayi Bashinzwe</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div
                className="group relative cursor-pointer"
                onClick={() => handleStatCardClick('visits', 2)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-blue-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Complete</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">2</p>
                      <p className="text-slate-600 font-medium">Amasura Aya Cyumweru</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div
                className="group relative cursor-pointer"
                onClick={() => handleStatCardClick('reports', 1)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-amber-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">Due</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">1</p>
                      <p className="text-slate-600 font-medium">Raporo Zitegereje</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div
                className="group relative cursor-pointer"
                onClick={() => handleStatCardClick('devices', 0)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-red-600">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-semibold">Priority</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">0</p>
                      <p className="text-slate-600 font-medium">Ibibazo by'Ibikoresho</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Patient Assignments */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span>Patient Assignments</span>
                  </CardTitle>

                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {patientAssignments.map((patient) => (
                  <div key={patient.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <Avatar className="w-16 h-16 ring-4 ring-white/50">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                          {patient.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-slate-800">{patient.patient}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${patient.progress >= 80 ? 'text-emerald-600' :
                                patient.progress >= 60 ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                {patient.progress}%
                              </div>
                              <div className="text-xs text-slate-500">Progress</div>
                            </div>
                            <Badge
                              className={`${patient.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                patient.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                  'bg-gradient-to-r from-emerald-500 to-teal-600'
                                } text-white border-0 shadow-lg`}
                            >
                              {patient.priority} priority
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Heart className="w-4 h-4 text-pink-600" />
                            <span className="font-medium text-slate-700">{patient.age} • {patient.condition}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-slate-700">Last: {patient.lastVisit}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-slate-700">Next: {patient.nextVisit}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                            onClick={() => handleCreateReport("progress", patient)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Create Report
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl p-2"
                            onClick={() => handlePlanTrip(patient)}
                            title="Plan Visit"
                          >
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            {/* Enhanced Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative cursor-pointer" onClick={() => handleCreateReport("progress", patientAssignments[0])}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Raporo y'Iterambere</h3>
                    <p className="text-slate-600">Ohereza raporo y'iterambere ku muganga</p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
                      <span className="text-sm font-semibold">Kora Raporo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative cursor-pointer" onClick={() => handleCreateReport("device", patientAssignments[0])}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Gusaba Ibikoresho</h3>
                    <p className="text-slate-600">Saba ibikoresho bishya by'ubufasha</p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-emerald-600">
                      <span className="text-sm font-semibold">Saba Ibikoresho</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative cursor-pointer" onClick={() => handleCreateReport("urgent", patientAssignments[0])}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-red-500/25 group-hover:shadow-red-500/40 transition-all duration-300">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Raporo y'Ihutirwa</h3>
                    <p className="text-slate-600">Menyesha ibibazo by'ihutirwa by'umuryango</p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-red-600">
                      <span className="text-sm font-semibold">Menyesha Ikibazo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Recent Reports */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span>Raporo Zashyizweho</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {report.patient.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-bold text-slate-800">{report.patient}</h4>
                            <p className="text-sm text-slate-600">{report.type} • {report.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-xl font-bold ${report.score >= 80 ? 'text-emerald-600' :
                              report.score >= 60 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                              {report.score}%
                            </div>
                            <div className="text-xs text-slate-500">Score</div>
                          </div>
                          <Badge
                            className={`${report.status === 'submitted' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                              'bg-gradient-to-r from-amber-500 to-orange-600'
                              } text-white border-0 shadow-lg`}
                          >
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stored Reports Display */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span>Raporo Zashyizweho</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {storedReports.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>Nta raporo zashyizweho</p>
                  </div>
                ) : (
                  storedReports.map((report: any) => (
                    <div key={report.id} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                {report.patient.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-lg font-bold text-slate-800">{report.patient}</h4>
                              <p className="text-sm text-slate-600">{report.type} • {report.date} • {report.time}</p>
                              <p className="text-sm text-slate-700 mt-1">{report.notes}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={`${report.urgency === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                report.urgency === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                  'bg-gradient-to-r from-emerald-500 to-teal-600'
                                } text-white border-0 shadow-lg`}
                            >
                              {report.urgency}
                            </Badge>
                            <Badge
                              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-lg"
                            >
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span>Ibibazo Byasubijwe</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                      {questions.filter(q => q.answered).length} Byasubijwe
                    </Badge>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                      {questions.filter(q => !q.answered).length} Bitegereje
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {questions.map((qa) => (
                  <div key={qa.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge
                              className={`${qa.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                qa.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                  'bg-gradient-to-r from-emerald-500 to-teal-600'
                                } text-white border-0 shadow-lg`}
                            >
                              {qa.priority}
                            </Badge>
                            <Badge
                              className={`${qa.answered ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-amber-500 to-orange-600'
                                } text-white border-0 shadow-lg`}
                            >
                              {qa.answered ? 'Byasubijwe' : 'Bitegereje'}
                            </Badge>
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 mb-2">{qa.question}</h4>
                          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                            <span>Byabajijwe na: {qa.patient}</span>
                            <span>•</span>
                            <span>{qa.date}</span>
                          </div>
                        </div>
                      </div>

                      {qa.answered ? (
                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-emerald-800 mb-1">Igisubizo:</h5>
                              <p className="text-emerald-700">{qa.answer}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-emerald-600">Cyasubijwe na: Uwimana Marie Claire</span>
                                <span className="text-xs text-emerald-600">{qa.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-amber-700">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">Gitegereje igisubizo</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl"
                              onClick={() => {
                                setSelectedQuestion(qa)
                                setShowAnswerDialog(true)
                              }}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Subiza
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report to Physiotherapist Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${reportType === 'progress' ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/25' :
                reportType === 'device' ? 'bg-gradient-to-br from-emerald-600 to-teal-600 shadow-emerald-500/25' :
                  'bg-gradient-to-br from-red-600 to-pink-600 shadow-red-500/25'
                }`}>
                {reportType === 'progress' ? <FileText className="w-4 h-4 text-white" /> :
                  reportType === 'device' ? <Activity className="w-4 h-4 text-white" /> :
                    <AlertTriangle className="w-4 h-4 text-white" />}
              </div>
              <span>
                {reportType === 'progress' ? 'Progress Report to Physiotherapist' :
                  reportType === 'device' ? 'Device Request Report' :
                    'Urgent Report to Physiotherapist'}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {selectedPatientForReport && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedPatientForReport.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {selectedPatientForReport.patient.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedPatientForReport.patient}</h4>
                    <p className="text-sm text-slate-600">{selectedPatientForReport.age} • {selectedPatientForReport.condition}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Report Notes */}
            <div className="space-y-2">
              <Label htmlFor="report-notes">
                {reportType === 'progress' ? 'Progress Notes' :
                  reportType === 'device' ? 'Device Request Details' :
                    'Urgent Concern Details'}
              </Label>
              <Textarea
                id="report-notes"
                placeholder={
                  reportType === 'progress' ? 'Describe the patient\'s progress, improvements, challenges, and observations...' :
                    reportType === 'device' ? 'Describe the device needed, current issues, and why it\'s required...' :
                      'Describe the urgent concern, symptoms, or issues that need immediate attention...'
                }
                value={reportData.notes}
                onChange={(e) => setReportData(prev => ({ ...prev, notes: e.target.value }))}
                className="rounded-xl border-slate-200 min-h-[120px]"
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <Label>Attach Photos/Videos</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleMediaUpload(e.target.files, 'media')}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Upload photos or videos</p>
                      <p className="text-xs text-slate-500">Click to browse or drag and drop</p>
                    </div>
                  </div>
                </label>
              </div>
              {reportData.mediaFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {reportData.mediaFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg">
                      <Paperclip className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Device Request Section */}
            {reportType === 'device' && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <Label className="text-emerald-800 font-semibold">Device Request Information</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="device-request">Device Description & Justification</Label>
                  <Textarea
                    id="device-request"
                    placeholder="Specify the type of device needed, current device issues, patient's specific needs, and medical justification..."
                    value={reportData.deviceRequest}
                    onChange={(e) => setReportData(prev => ({ ...prev, deviceRequest: e.target.value }))}
                    className="rounded-xl border-emerald-200 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Device Photos (Current device issues or patient needs)</Label>
                  <div className="border-2 border-dashed border-emerald-300 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e.target.files, 'device')}
                      className="hidden"
                      id="device-upload"
                    />
                    <label htmlFor="device-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <Image className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-emerald-700">Upload device photos</p>
                          <p className="text-xs text-emerald-600">Show current device or patient needs</p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {reportData.deviceImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {reportData.deviceImages.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg">
                          <Image className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-emerald-800">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Urgency Level */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Priority Level</Label>
              <Select value={reportData.urgency} onValueChange={(value) => setReportData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                      <span>Low Priority - Routine update</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                      <span>Medium Priority - Needs attention</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                      <span>High Priority - Urgent response needed</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setShowReportDialog(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReport}
                disabled={!reportData.notes.trim()}
                className={`border-0 rounded-xl shadow-lg transition-all duration-300 ${reportType === 'progress' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/25 hover:shadow-blue-500/40' :
                  reportType === 'device' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25 hover:shadow-emerald-500/40' :
                    'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-red-500/25 hover:shadow-red-500/40'
                  } text-white`}
              >
                <Send className="w-4 h-4 mr-2" />
                Send to Physiotherapist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trip Planning Dialog */}
      <Dialog open={showTripDialog} onOpenChange={setShowTripDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Route className="w-4 h-4 text-white" />
              </div>
              <span>Plan Patient Visit</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {selectedPatientForTrip && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedPatientForTrip.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-semibold">
                      {selectedPatientForTrip.patient.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{selectedPatientForTrip.patient}</h4>
                    <p className="text-sm text-slate-600 mb-1">{selectedPatientForTrip.age} • {selectedPatientForTrip.condition}</p>
                    <div className="flex items-center space-x-2 text-sm text-amber-700">
                      <MapPin className="w-4 h-4" />
                      <span>Distance: {selectedPatientForTrip.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visit-date">Visit Date</Label>
                <Input
                  id="visit-date"
                  type="date"
                  value={tripData.date}
                  onChange={(e) => setTripData(prev => ({ ...prev, date: e.target.value }))}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visit-time">Visit Time</Label>
                <Input
                  id="visit-time"
                  type="time"
                  value={tripData.time}
                  onChange={(e) => setTripData(prev => ({ ...prev, time: e.target.value }))}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            {/* Purpose and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visit-purpose">Visit Purpose</Label>
                <Select value={tripData.purpose} onValueChange={(value) => setTripData(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Select visit purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Check-up</SelectItem>
                    <SelectItem value="assessment">Progress Assessment</SelectItem>
                    <SelectItem value="therapy">Therapy Session</SelectItem>
                    <SelectItem value="device">Device Fitting/Adjustment</SelectItem>
                    <SelectItem value="training">Family Training</SelectItem>
                    <SelectItem value="emergency">Emergency Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visit-duration">Estimated Duration (minutes)</Label>
                <Select value={tripData.estimatedDuration} onValueChange={(value) => setTripData(prev => ({ ...prev, estimatedDuration: value }))}>
                  <SelectTrigger className="rounded-xl border-slate-200">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Visit Notes */}
            <div className="space-y-2">
              <Label htmlFor="visit-notes">Visit Notes & Preparation</Label>
              <Textarea
                id="visit-notes"
                placeholder="Add notes about what to prepare, specific goals for this visit, materials needed, etc..."
                value={tripData.notes}
                onChange={(e) => setTripData(prev => ({ ...prev, notes: e.target.value }))}
                className="rounded-xl border-slate-200 min-h-[100px]"
              />
            </div>

            {/* Trip Summary */}
            {tripData.date && tripData.time && tripData.purpose && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Car className="w-5 h-5 text-emerald-600" />
                  <Label className="text-emerald-800 font-semibold">Trip Summary</Label>
                </div>
                <div className="space-y-2 text-sm text-emerald-700">
                  <div className="flex items-center justify-between">
                    <span>Patient:</span>
                    <span className="font-semibold">{selectedPatientForTrip?.patient}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date & Time:</span>
                    <span className="font-semibold">{tripData.date} at {tripData.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Purpose:</span>
                    <span className="font-semibold capitalize">{tripData.purpose.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{tripData.estimatedDuration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Distance:</span>
                    <span className="font-semibold">{selectedPatientForTrip?.distance}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setShowTripDialog(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitTrip}
                disabled={!tripData.date || !tripData.time || !tripData.purpose}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Answer Question Dialog */}
      <Dialog open={showAnswerDialog} onOpenChange={setShowAnswerDialog}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span>Subiza Ikibazo</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6">
            {selectedQuestion && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2">Ikibazo:</h4>
                <p className="text-slate-700">{selectedQuestion.question}</p>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mt-2">
                  <span>Byabajijwe na: {selectedQuestion.patient}</span>
                  <span>•</span>
                  <span>{selectedQuestion.date}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="answer">Igisubizo Cyawe</Label>
              <Textarea
                id="answer"
                placeholder="Andika igisubizo cyawe hano..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="rounded-xl border-slate-200 min-h-[120px]"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={() => setShowAnswerDialog(false)}
                variant="outline"
                className="flex-1 rounded-xl border-slate-200"
              >
                Hagarika
              </Button>
              <Button
                onClick={() => selectedQuestion && handleAnswerQuestion(selectedQuestion.id, newAnswer)}
                disabled={!newAnswer.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Ohereza Igisubizo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

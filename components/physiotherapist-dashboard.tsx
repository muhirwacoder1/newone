"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Users, BarChart3, FileText, Clock, CheckCircle, AlertCircle, Plus, Search, Filter, Bell, Settings, LogOut, Heart, Stethoscope, Activity, TrendingUp, MessageSquare, Video, Download, Zap, Star, Award, ArrowRight, Play, Phone, MapPin, UserPlus, Edit, Eye } from 'lucide-react'

import { SmartAssessmentForm } from "@/components/form"

export function PhysiotherapistDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAssessmentForm, setShowAssessmentForm] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [meetingLink, setMeetingLink] = useState("")
  const [denialReason, setDenialReason] = useState("")
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Request",
      message: "Emma Johnson requested an appointment for tomorrow at 10:00 AM",
      time: "5 minutes ago",
      read: false,
      priority: "high",
      patient: "Emma Johnson",
      avatar: "/whimsical-child.png"
    },
    {
      id: 2,
      type: "report",
      title: "New CHW Report",
      message: "Uwimana Marie Claire submitted a progress report for Michael Chen",
      time: "15 minutes ago",
      read: false,
      priority: "medium",
      patient: "Michael Chen",
      chw: "Uwimana Marie Claire",
      avatar: "/young-boy-drawing.png"
    },
    {
      id: 3,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Sofia Rodriguez confirmed her appointment for Friday at 2:00 PM",
      time: "1 hour ago",
      read: true,
      priority: "low",
      patient: "Sofia Rodriguez",
      avatar: "/young-woman-smiling.png"
    },
    {
      id: 4,
      type: "report",
      title: "Urgent Report",
      message: "Habimana Emmanuel reported equipment issues for David Uwimana",
      time: "2 hours ago",
      read: false,
      priority: "high",
      patient: "David Uwimana",
      chw: "Habimana Emmanuel",
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      type: "appointment",
      title: "Appointment Cancelled",
      message: "Grace Mukamana cancelled her appointment due to transportation issues",
      time: "3 hours ago",
      read: true,
      priority: "medium",
      patient: "Grace Mukamana",
      avatar: "/placeholder.svg"
    }
  ])

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Emma Johnson",
      time: "9:00 AM",
      date: "Today",
      type: "Initial Assessment",
      status: "confirmed",
      avatar: "/whimsical-child.png",
      priority: "high",
      duration: "45 min",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:30 AM",
      date: "Today",
      type: "Follow-up",
      status: "pending",
      avatar: "/young-boy-drawing.png",
      priority: "medium",
      duration: "30 min",
      meetingLink: ""
    },
    {
      id: 3,
      patient: "Sofia Rodriguez",
      time: "2:00 PM",
      date: "Tomorrow",
      type: "Progress Review",
      status: "pending",
      avatar: "/young-woman-smiling.png",
      priority: "low",
      duration: "60 min",
      meetingLink: ""
    },
    {
      id: 4,
      patient: "David Uwimana",
      time: "11:00 AM",
      date: "Friday",
      type: "Therapy Session",
      status: "denied",
      avatar: "/placeholder.svg",
      priority: "medium",
      duration: "40 min",
      denialReason: "Patient needs to complete pre-assessment forms first",
      meetingLink: ""
    }
  ]

  const allCHWReports = [
    {
      id: 1,
      patient: "Emma Johnson",
      chw: "Uwimana Marie Claire",
      date: "2 hours ago",
      status: "improvement",
      summary: "Significant progress in motor skills development. Patient can now walk 10 steps independently.",
      score: 85,
      category: "Motor Skills",
      feedbackGiven: false,
      avatar: "/whimsical-child.png",
      chwAvatar: "/placeholder.svg",
      details: "Patient showed remarkable improvement in balance and coordination during today's session."
    },
    {
      id: 2,
      patient: "Michael Chen",
      chw: "Nkurunziza Jean Baptiste",
      date: "1 day ago",
      status: "concern",
      summary: "Device adjustment needed for better mobility. Wheelchair needs maintenance.",
      score: 65,
      category: "Equipment",
      feedbackGiven: true,
      feedback: "Great observation! Please schedule maintenance with our equipment team.",
      avatar: "/young-boy-drawing.png",
      chwAvatar: "/placeholder.svg",
      details: "Wheelchair left wheel is making noise and affecting patient's mobility."
    },
    {
      id: 3,
      patient: "Sofia Rodriguez",
      chw: "Mukamana Esperance",
      date: "3 days ago",
      status: "improvement",
      summary: "Excellent response to new exercise routine. Family very engaged.",
      score: 91,
      category: "Therapy",
      feedbackGiven: false,
      avatar: "/young-woman-smiling.png",
      chwAvatar: "/placeholder.svg",
      details: "Family has been consistent with home exercises. Patient shows increased strength."
    },
    {
      id: 4,
      patient: "David Uwimana",
      chw: "Habimana Emmanuel",
      date: "5 days ago",
      status: "stable",
      summary: "Patient maintaining current functional level. No significant changes.",
      score: 78,
      category: "Assessment",
      feedbackGiven: true,
      feedback: "Thank you for the detailed assessment. Continue current therapy plan.",
      avatar: "/placeholder.svg",
      chwAvatar: "/placeholder.svg",
      details: "Patient continues with regular therapy sessions. No new concerns noted."
    },
    {
      id: 5,
      patient: "Grace Mukamana",
      chw: "Nyirahabimana Vestine",
      date: "1 week ago",
      status: "concern",
      summary: "Patient missed several therapy sessions. Family facing transportation issues.",
      score: 52,
      category: "Attendance",
      feedbackGiven: false,
      avatar: "/placeholder.svg",
      chwAvatar: "/placeholder.svg",
      details: "Family reports difficulty getting to therapy sessions due to lack of transportation."
    },
    {
      id: 6,
      patient: "John Bizimana",
      chw: "Uwamahoro Claudine",
      date: "1 week ago",
      status: "improvement",
      summary: "New communication device working well. Patient more engaged in activities.",
      score: 88,
      category: "Communication",
      feedbackGiven: true,
      feedback: "Excellent work with the communication device setup! Keep monitoring progress.",
      avatar: "/placeholder.svg",
      chwAvatar: "/placeholder.svg",
      details: "Patient is using the communication device effectively and showing increased social interaction."
    }
  ]

  const patients = [
    {
      id: 1,
      name: "Emma Johnson",
      age: "7 years",
      condition: "Spastic CP",
      gmfcsLevel: "II",
      assignedCHW: "Uwimana Marie Claire",
      status: "active",
      lastVisit: "2 days ago",
      progress: 85,
      avatar: "/whimsical-child.png"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: "5 years",
      condition: "Ataxic CP",
      gmfcsLevel: "III",
      assignedCHW: "Nkurunziza Jean Baptiste",
      status: "active",
      lastVisit: "1 week ago",
      progress: 72,
      avatar: "/young-boy-drawing.png"
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      age: "9 years",
      condition: "Mixed CP",
      gmfcsLevel: "I",
      assignedCHW: "Mukamana Esperance",
      status: "discharged",
      lastVisit: "3 days ago",
      progress: 91,
      avatar: "/young-woman-smiling.png"
    },
    {
      id: 4,
      name: "David Uwimana",
      age: "6 years",
      condition: "Spastic CP",
      gmfcsLevel: "IV",
      assignedCHW: null,
      status: "active",
      lastVisit: "5 days ago",
      progress: 68,
      avatar: "/placeholder.svg"
    }
  ]

  const rwandanCHWs = [
    "Uwimana Marie Claire",
    "Nkurunziza Jean Baptiste",
    "Mukamana Esperance",
    "Habimana Emmanuel",
    "Nyirahabimana Vestine",
    "Bizimana Patrick",
    "Uwamahoro Claudine",
    "Niyonsenga Damascene",
    "Mukandayisenga Immaculee",
    "Hakizimana Faustin"
  ]

  const handleAssignCHW = (patientId: number, chwName: string) => {
    console.log(`Assigning ${chwName} to patient ${patientId}`)
    setShowAssignDialog(false)
    // Here you would update the patient's assigned CHW
  }

  const handleFormSubmit = (formData: any) => {
    console.log("Assessment form submitted:", formData)
    setShowAssessmentForm(false)
    // Here you would save the assessment data
  }

  const handleApproveAppointment = (appointmentId: number, link: string) => {
    console.log(`Approving appointment ${appointmentId} with link: ${link}`)
    setShowAppointmentDialog(false)
    setMeetingLink("")
    // Here you would update the appointment status and send link to patient
  }

  const handleDenyAppointment = (appointmentId: number, reason: string) => {
    console.log(`Denying appointment ${appointmentId} with reason: ${reason}`)
    setShowAppointmentDialog(false)
    setDenialReason("")
    // Here you would update the appointment status and notify patient
  }

  const handleSubmitFeedback = (reportId: number, feedbackText: string) => {
    console.log(`Submitting feedback for report ${reportId}: ${feedbackText}`)
    setShowFeedbackDialog(false)
    setFeedback("")
    // Here you would save the feedback and notify the CHW
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                  Dr. Sarah Mitchell
                </h1>
                <p className="text-slate-600 font-medium">Pediatric Physiotherapist • Senior Specialist</p>
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
                      <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg">
                            {unreadCount} new
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-blue-600 hover:bg-blue-50 rounded-xl"
                        >
                          Mark all read
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      <div className="space-y-1 p-2">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                              notification.read 
                                ? 'bg-slate-50/50 hover:bg-slate-100/50' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50'
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="relative">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                                    {notification.patient.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                                  notification.type === 'appointment' 
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                                    : 'bg-gradient-to-r from-purple-500 to-pink-600'
                                }`}>
                                  {notification.type === 'appointment' ? (
                                    <Calendar className="w-2 h-2 text-white" />
                                  ) : (
                                    <FileText className="w-2 h-2 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-semibold ${
                                    notification.read ? 'text-slate-700' : 'text-slate-900'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge 
                                      className={`text-xs ${
                                        notification.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                        notification.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                        'bg-gradient-to-r from-emerald-500 to-teal-600'
                                      } text-white border-0`}
                                    >
                                      {notification.priority}
                                    </Badge>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                                <p className={`text-sm mb-2 ${
                                  notification.read ? 'text-slate-600' : 'text-slate-700'
                                }`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">{notification.time}</span>
                                  {notification.chw && (
                                    <span className="text-xs text-slate-500">CHW: {notification.chw.split(' ')[0]}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-200 bg-slate-50/50">
                    <Button 
                      variant="ghost" 
                      className="w-full text-blue-600 hover:bg-blue-50 rounded-xl"
                      onClick={() => setShowNotifications(false)}
                    >
                      View All Notifications
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
          <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="patients" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Patients
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">+12%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24</p>
                      <p className="text-slate-600 font-medium">Active Patients</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">On track</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">8</p>
                      <p className="text-slate-600 font-medium">Today's Sessions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-amber-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">Pending</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">3</p>
                      <p className="text-slate-600 font-medium">Reports Due</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-purple-600">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-semibold">Active</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">12</p>
                      <p className="text-slate-600 font-medium">CHW Partners</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Today's Schedule */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span>Today's Schedule</span>
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <Avatar className="w-14 h-14 ring-4 ring-white/50">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-slate-800">{appointment.patient}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={`${
                                appointment.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                appointment.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                'bg-gradient-to-r from-emerald-500 to-teal-600'
                              } text-white border-0 shadow-lg`}
                            >
                              {appointment.priority} priority
                            </Badge>
                            <Badge 
                              className={`${
                                appointment.status === 'confirmed' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 
                                'bg-gradient-to-r from-amber-500 to-orange-600'
                              } text-white border-0 shadow-lg`}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">{appointment.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium">{appointment.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced CHW Reports */}
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span>Recent CHW Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {allCHWReports.slice(0, 2).map((report) => (
                  <div key={report.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm">
                              {report.chw.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-bold text-slate-800">{report.patient}</h4>
                            <p className="text-sm text-slate-600">CHW: {report.chw}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              report.score >= 80 ? 'text-emerald-600' :
                              report.score >= 60 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {report.score}%
                            </div>
                            <div className="text-xs text-slate-500">Progress Score</div>
                          </div>
                          <Badge 
                            className={`${
                              report.status === 'improvement' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 
                              'bg-gradient-to-r from-amber-500 to-orange-600'
                            } text-white border-0 shadow-lg`}
                          >
                            {report.status === 'improvement' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {report.status}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">{report.date}</span>
                        </div>
                      </div>
                      <p className="text-slate-700 mb-4 leading-relaxed">{report.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800">Patient Management</CardTitle>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => setShowAssessmentForm(true)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Assessment
                    </Button>
                    <Button variant="outline" className="border-blue-200 hover:bg-blue-50 rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" className="border-purple-200 hover:bg-purple-50 rounded-xl">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <Avatar className="w-16 h-16 ring-4 ring-white/50">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-slate-800">{patient.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                patient.progress >= 80 ? 'text-emerald-600' :
                                patient.progress >= 60 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {patient.progress}%
                              </div>
                              <div className="text-xs text-slate-500">Progress</div>
                            </div>
                            <Badge 
                              className={`${
                                patient.status === 'active' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                patient.status === 'discharged' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                                'bg-gradient-to-r from-amber-500 to-orange-600'
                              } text-white border-0 shadow-lg`}
                            >
                              {patient.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Heart className="w-4 h-4 text-pink-600" />
                            <span className="font-medium text-slate-700">{patient.age} • {patient.condition}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Activity className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-slate-700">GMFCS {patient.gmfcsLevel}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-slate-700">Last: {patient.lastVisit}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-slate-700">
                              {patient.assignedCHW ? patient.assignedCHW.split(' ')[0] : 'No CHW'}
                            </span>
                          </div>
                        </div>
                        {patient.assignedCHW && (
                          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-emerald-800">Assigned CHW</div>
                              <div className="text-sm text-emerald-600">{patient.assignedCHW}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl"
                          onClick={() => setShowAssessmentForm(true)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl"
                          onClick={() => {
                            setSelectedPatient(patient)
                            setShowAssignDialog(true)
                          }}
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span>Appointment Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                      {upcomingAppointments.filter(apt => apt.status === 'pending').length} Pending
                    </Badge>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                      {upcomingAppointments.filter(apt => apt.status === 'confirmed').length} Confirmed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <Avatar className="w-16 h-16 ring-4 ring-white/50">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-slate-800">{appointment.patient}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={`${
                                appointment.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                appointment.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                'bg-gradient-to-r from-emerald-500 to-teal-600'
                              } text-white border-0 shadow-lg`}
                            >
                              {appointment.priority} priority
                            </Badge>
                            <Badge 
                              className={`${
                                appointment.status === 'confirmed' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 
                                appointment.status === 'pending' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                                'bg-gradient-to-r from-red-500 to-pink-600'
                              } text-white border-0 shadow-lg`}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-slate-700">{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-slate-700">{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <span className="font-medium text-slate-700">{appointment.type}</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-white/40 rounded-xl">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="font-medium text-slate-700">{appointment.duration}</span>
                          </div>
                        </div>
                        
                        {appointment.status === 'confirmed' && appointment.meetingLink && (
                          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-emerald-800">Meeting Link Sent</div>
                              <div className="text-xs text-emerald-600 truncate">{appointment.meetingLink}</div>
                            </div>
                          </div>
                        )}

                        {appointment.status === 'denied' && appointment.denialReason && (
                          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-red-800">Appointment Denied</div>
                              <div className="text-sm text-red-600">{appointment.denialReason}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        {appointment.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowAppointmentDialog(true)
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span>CHW Reports & Feedback</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                      {allCHWReports.filter(report => !report.feedbackGiven).length} Pending Feedback
                    </Badge>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                      {allCHWReports.length} Total Reports
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {allCHWReports.map((report) => (
                  <div key={report.id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-14 h-14 ring-4 ring-white/50">
                              <AvatarImage src={report.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                {report.patient.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="w-8 h-8 absolute -bottom-1 -right-1 ring-2 ring-white">
                              <AvatarImage src={report.chwAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-xs">
                                {report.chw.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-800">{report.patient}</h4>
                            <p className="text-sm text-slate-600 mb-1">CHW: {report.chw}</p>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                              <span>{report.date}</span>
                              <span>•</span>
                              <span>{report.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              report.score >= 80 ? 'text-emerald-600' :
                              report.score >= 60 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {report.score}%
                            </div>
                            <div className="text-xs text-slate-500">Progress Score</div>
                          </div>
                          <Badge 
                            className={`${
                              report.status === 'improvement' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 
                              report.status === 'concern' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                              'bg-gradient-to-r from-blue-500 to-cyan-600'
                            } text-white border-0 shadow-lg`}
                          >
                            {report.status === 'improvement' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : report.status === 'concern' ? (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Activity className="w-3 h-3 mr-1" />
                            )}
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-slate-700 leading-relaxed mb-2">{report.summary}</p>
                        <p className="text-sm text-slate-600 italic">{report.details}</p>
                      </div>

                      {report.feedbackGiven && report.feedback && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-emerald-800">Your Feedback</span>
                          </div>
                          <p className="text-sm text-emerald-700">{report.feedback}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                            View Full Report
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!report.feedbackGiven && (
                            <Button 
                              onClick={() => {
                                setSelectedReport(report)
                                setShowFeedbackDialog(true)
                              }}
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Give Feedback
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>



      {/* Assessment Form Dialog */}
      <Dialog open={showAssessmentForm} onOpenChange={setShowAssessmentForm}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-y-auto">
          <SmartAssessmentForm 
            onSubmit={handleFormSubmit}
            onCancel={() => setShowAssessmentForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Assign CHW Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <UserPlus className="w-4 h-4 text-white" />
              </div>
              <span>Assign Community Health Worker</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {selectedPatient && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedPatient.name}</h4>
                    <p className="text-sm text-slate-600">{selectedPatient.age} • {selectedPatient.condition}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="chw-select">Select Community Health Worker</Label>
              <Select onValueChange={(value) => selectedPatient && handleAssignCHW(selectedPatient.id, value)}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Choose a CHW to assign" />
                </SelectTrigger>
                <SelectContent>
                  {rwandanCHWs.map((chw) => (
                    <SelectItem key={chw} value={chw}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span>{chw}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAssignDialog(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowAssignDialog(false)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Assign CHW
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Approval/Denial Dialog */}
      <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span>Appointment Decision</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {selectedAppointment && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedAppointment.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {selectedAppointment.patient.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedAppointment.patient}</h4>
                    <p className="text-sm text-slate-600">{selectedAppointment.type} • {selectedAppointment.date} at {selectedAppointment.time}</p>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  Duration: {selectedAppointment.duration} • Priority: {selectedAppointment.priority}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Approve Section */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <Label className="text-emerald-800 font-semibold">Approve Appointment</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-link">Meeting Link</Label>
                  <Input 
                    id="meeting-link"
                    placeholder="Enter meeting link (e.g., Zoom, Google Meet, Teams)"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="rounded-xl border-emerald-200"
                  />
                </div>
                <Button 
                  onClick={() => selectedAppointment && handleApproveAppointment(selectedAppointment.id, meetingLink)}
                  disabled={!meetingLink.trim()}
                  className="w-full mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Send Link
                </Button>
              </div>

              {/* Deny Section */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Label className="text-red-800 font-semibold">Deny Appointment</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="denial-reason">Reason for Denial</Label>
                  <Textarea 
                    id="denial-reason"
                    placeholder="Please provide a reason for denying this appointment..."
                    value={denialReason}
                    onChange={(e) => setDenialReason(e.target.value)}
                    className="rounded-xl border-red-200 min-h-[80px]"
                  />
                </div>
                <Button 
                  onClick={() => selectedAppointment && handleDenyAppointment(selectedAppointment.id, denialReason)}
                  disabled={!denialReason.trim()}
                  className="w-full mt-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Deny Appointment
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAppointmentDialog(false)
                  setMeetingLink("")
                  setDenialReason("")
                }}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CHW Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span>Provide Feedback to CHW</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {selectedReport && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedReport.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {selectedReport.patient.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Avatar className="w-6 h-6 absolute -bottom-1 -right-1 ring-2 ring-white">
                      <AvatarImage src={selectedReport.chwAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold text-xs">
                        {selectedReport.chw.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{selectedReport.patient}</h4>
                    <p className="text-sm text-slate-600 mb-2">CHW: {selectedReport.chw}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <span>{selectedReport.date}</span>
                      <span>•</span>
                      <span>{selectedReport.category}</span>
                      <span>•</span>
                      <span className={`font-semibold ${
                        selectedReport.score >= 80 ? 'text-emerald-600' :
                        selectedReport.score >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {selectedReport.score}% Progress
                      </span>
                    </div>
                    <div className="p-3 bg-white/60 rounded-xl">
                      <p className="text-sm text-slate-700 mb-1"><strong>Summary:</strong> {selectedReport.summary}</p>
                      <p className="text-sm text-slate-600"><strong>Details:</strong> {selectedReport.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-text">Your Feedback to CHW</Label>
                <Textarea 
                  id="feedback-text"
                  placeholder="Provide constructive feedback, suggestions, or acknowledgment for the CHW's work..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="rounded-xl border-slate-200 min-h-[120px]"
                />
                <p className="text-xs text-slate-500">
                  Your feedback will help the CHW improve their care delivery and feel supported in their work.
                </p>
              </div>

              {/* Quick Feedback Templates */}
              <div className="space-y-2">
                <Label>Quick Feedback Templates</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFeedback("Excellent work! Your detailed observations are very helpful for treatment planning.")}
                    className="text-left justify-start border-emerald-200 hover:bg-emerald-50 rounded-xl"
                  >
                    <Star className="w-4 h-4 mr-2 text-emerald-600" />
                    Excellent Work
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFeedback("Thank you for the thorough report. Please continue monitoring and report any changes.")}
                    className="text-left justify-start border-blue-200 hover:bg-blue-50 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                    Good Report
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFeedback("Great observation! Please coordinate with our equipment team for the necessary adjustments.")}
                    className="text-left justify-start border-amber-200 hover:bg-amber-50 rounded-xl"
                  >
                    <Activity className="w-4 h-4 mr-2 text-amber-600" />
                    Action Needed
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFeedback("Please provide more details about the patient's response to the current treatment plan.")}
                    className="text-left justify-start border-purple-200 hover:bg-purple-50 rounded-xl"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                    Need More Info
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowFeedbackDialog(false)
                  setFeedback("")
                }}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => selectedReport && handleSubmitFeedback(selectedReport.id, feedback)}
                disabled={!feedback.trim()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Baby, Clock, AlertTriangle, CheckCircle, ArrowRight, Brain, Heart, Users, Calendar, Bell, Play, Award, Star } from 'lucide-react'

interface EarlyDetectionCPProps {
    onClose?: () => void;
}

const EarlyDetectionCP: React.FC<EarlyDetectionCPProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("overview")
    const [quizStarted, setQuizStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<boolean[]>([])
    const [quizCompleted, setQuizCompleted] = useState(false)

    const quizQuestions = [
        {
            id: 1,
            question: "Does your child have good head control when picked up?",
            ageGroup: "0-6",
            concern: "Poor head control"
        },
        {
            id: 2,
            question: "Does your child make eye contact and smile socially?",
            ageGroup: "0-6",
            concern: "Social interaction"
        },
        {
            id: 3,
            question: "Can your child roll over in both directions?",
            ageGroup: "6-12",
            concern: "Motor development"
        },
        {
            id: 4,
            question: "Can your child sit independently without support?",
            ageGroup: "6-12",
            concern: "Sitting ability"
        },
        {
            id: 5,
            question: "Does your child use both hands equally (no strong preference)?",
            ageGroup: "6-12",
            concern: "Hand preference"
        }
    ]

    const handleQuizAnswer = (answer: boolean) => {
        const newAnswers = [...answers, answer]
        setAnswers(newAnswers)

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setQuizCompleted(true)
        }
    }

    const getQuizResult = () => {
        const concernCount = answers.filter(answer => !answer).length
        if (concernCount >= 3) {
            return {
                level: "high",
                message: "We recommend scheduling a consultation with a healthcare provider soon.",
                color: "from-red-500 to-pink-600"
            }
        } else if (concernCount >= 1) {
            return {
                level: "medium",
                message: "Some areas may need attention. Consider discussing with your healthcare provider.",
                color: "from-amber-500 to-orange-600"
            }
        } else {
            return {
                level: "low",
                message: "Your child appears to be developing well! Continue regular check-ups.",
                color: "from-emerald-500 to-teal-600"
            }
        }
    }

    const resetQuiz = () => {
        setQuizStarted(false)
        setCurrentQuestion(0)
        setAnswers([])
        setQuizCompleted(false)
    }

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                                    Early Detection Guide
                                </h1>
                                <p className="text-slate-600">Recognizing cerebral palsy signs in children</p>
                            </div>
                        </div>
                        {onClose && (
                            <Button variant="outline" onClick={onClose} className="rounded-xl">
                                Close
                            </Button>
                        )}
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="signs"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
                        >
                            Warning Signs
                        </TabsTrigger>
                        <TabsTrigger
                            value="quiz"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
                        >
                            Assessment Quiz
                        </TabsTrigger>
                        <TabsTrigger
                            value="action"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-semibold transition-all duration-300"
                        >
                            Next Steps
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        {/* What is CP Card */}
                        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <span>What Is Cerebral Palsy?</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <p className="text-lg text-slate-700 leading-relaxed">
                                        Cerebral palsy (CP) is a condition that affects movement, muscle tone, and posture. It happens when a baby's brain doesn't develop properly or is damaged early in life.
                                    </p>
                                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Heart className="w-5 h-5 text-emerald-600" />
                                            <span className="font-semibold text-emerald-800">Important to Remember</span>
                                        </div>
                                        <p className="text-emerald-700">
                                            Early detection and treatment can greatly improve a child's quality of life and development outcomes.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-600 mb-2">1 in 345</h3>
                                    <p className="text-slate-600">Children are diagnosed with CP</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                                        <Clock className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">0-2 Years</h3>
                                    <p className="text-slate-600">Best time for early intervention</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-purple-600 mb-2">85%</h3>
                                    <p className="text-slate-600">Improvement with early treatment</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="signs" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Warning Signs by Age</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* 0-6 Months */}
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                            <Baby className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-800">0–6 Months Old</h3>
                                            <p className="text-blue-600">Early infancy signs</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Poor head control when picked up",
                                            "Stiff or floppy muscle tone",
                                            "Overextension (pushing head back)",
                                            "Arms or legs that cross/scissor",
                                            "No social smiling or eye contact"
                                        ].map((sign, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                                                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                <span className="text-slate-700">{sign}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 6-12 Months */}
                                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                            <Play className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-emerald-800">6–12 Months</h3>
                                            <p className="text-emerald-600">Motor development period</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Cannot roll over (both directions)",
                                            "Cannot sit independently",
                                            "Strong hand preference (red flag)",
                                            "Very stiff legs or arms"
                                        ].map((sign, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                                                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                <span className="text-slate-700">{sign}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 12+ Months */}
                                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-purple-800">12+ Months</h3>
                                            <p className="text-purple-600">Toddler development</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Cannot crawl or walk",
                                            "Abnormal walking patterns",
                                            "Difficulty speaking or swallowing",
                                            "Persistent primitive reflexes"
                                        ].map((sign, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
                                                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                <span className="text-slate-700">{sign}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-6">
                        {!quizStarted ? (
                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <span>Development Assessment Quiz</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <p className="text-lg text-slate-700">
                                            This quick assessment will help you understand if your child's development is on track. Answer a few simple questions about your child's abilities.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 text-center">
                                                <Baby className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                                <h4 className="font-semibold text-blue-800">0-6 Months</h4>
                                                <p className="text-sm text-blue-600">Early infancy</p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center">
                                                <Play className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                                                <h4 className="font-semibold text-emerald-800">6-12 Months</h4>
                                                <p className="text-sm text-emerald-600">Motor development</p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 text-center">
                                                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                                <h4 className="font-semibold text-purple-800">12+ Months</h4>
                                                <p className="text-sm text-purple-600">Toddler stage</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => setQuizStarted(true)}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                                        >
                                            <Play className="w-5 h-5 mr-2" />
                                            Start Assessment
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : !quizCompleted ? (
                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-bold text-slate-800">
                                            Question {currentQuestion + 1} of {quizQuestions.length}
                                        </CardTitle>
                                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                                            {Math.round(((currentQuestion) / quizQuestions.length) * 100)}% Complete
                                        </Badge>
                                    </div>
                                    <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mt-4" />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                                {quizQuestions[currentQuestion].question}
                                            </h3>
                                            <p className="text-slate-600">
                                                Age group: {quizQuestions[currentQuestion].ageGroup} months
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Button
                                                onClick={() => handleQuizAnswer(true)}
                                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                                            >
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Yes
                                            </Button>
                                            <Button
                                                onClick={() => handleQuizAnswer(false)}
                                                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
                                            >
                                                <AlertTriangle className="w-5 h-5 mr-2" />
                                                No
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className={`bg-gradient-to-r ${getQuizResult().color.replace('from-', 'from-').replace('to-', 'to-').replace('500', '50').replace('600', '50')}`}>
                                    <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                                        <div className={`w-10 h-10 bg-gradient-to-br ${getQuizResult().color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                            {getQuizResult().level === 'low' ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertTriangle className="w-5 h-5 text-white" />}
                                        </div>
                                        <span>Assessment Results</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                                {getQuizResult().message}
                                            </h3>
                                            <div className="flex items-center justify-center space-x-4 text-lg">
                                                <span>Concerns identified:</span>
                                                <Badge className={`bg-gradient-to-r ${getQuizResult().color} text-white border-0 text-lg px-4 py-2`}>
                                                    {answers.filter(answer => !answer).length} out of {quizQuestions.length}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex space-x-4">
                                            <Button
                                                onClick={resetQuiz}
                                                variant="outline"
                                                className="flex-1 border-slate-200 hover:bg-slate-50 rounded-xl py-3"
                                            >
                                                Retake Assessment
                                            </Button>
                                            <Button
                                                onClick={() => setActiveTab("action")}
                                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                                            >
                                                <ArrowRight className="w-4 h-4 mr-2" />
                                                Next Steps
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="action" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                        <Heart className="w-5 h-5 text-white" />
                                    </div>
                                    <span>What To Do Next</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-800 mb-4">If You Notice Warning Signs</h3>
                                    <p className="text-blue-700 mb-4">
                                        If you notice any of the signs above, visit your nearest health center as soon as possible. Early intervention can help your child grow stronger and improve movement.
                                    </p>
                                    <p className="text-blue-700">
                                        Rise Beyond APP partners with hospitals and community health workers to support you and your child at every stage.
                                    </p>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Bell className="w-6 h-6 text-amber-600" />
                                        <h3 className="text-xl font-bold text-amber-800">Development Reminders</h3>
                                    </div>
                                    <p className="text-amber-700 mb-4">Enable reminders to check your child's development at:</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {["3 months", "6 months", "9 months", "12 months"].map((age, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-3 bg-white/60 rounded-xl">
                                                <Calendar className="w-4 h-4 text-amber-600" />
                                                <span className="text-amber-800 font-medium">{age}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0 rounded-xl py-3 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300">
                                        <Bell className="w-4 h-4 mr-2" />
                                        Enable Notifications
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default EarlyDetectionCP;
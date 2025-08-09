import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Stethoscope, Heart, Calendar, BarChart3, MessageSquare, Shield, Clock, Star, Award, TrendingUp, Zap, CheckCircle, ArrowRight, Play, Sparkles } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text font-sans text-green-600">
                  {"Rise Beyond APP"}
                </h1>
                <p className="text-slate-600 font-medium">Advanced Physiotherapy Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-4 py-2 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                v1.0 
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-zinc-600">Trusted by Healthcare Professionals</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Transform CP Care
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                With Intelligence
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary platform that seamlessly connects physiotherapists, community health workers, 
              and families to deliver exceptional cerebral palsy care through cutting-edge technology.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://www.datelinehealthafrica.org/ckfinder/userfiles/files/Caregiver%20and%20Child%20with%20Cerebral%20Palsy(1).jpg"
                  alt="Caregiver supporting a child with cerebral palsy during therapy session"
                  className="w-full h-auto object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Role Selection */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                Choose Your Experience
              </span>
            </h3>
            <p className="text-xl text-slate-600">Tailored dashboards designed for your specific role</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Physiotherapist Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
              <Card className="relative bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                <CardHeader className="relative text-center pb-6 pt-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-500">
                      <Stethoscope className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                    Physiotherapist
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Advanced patient management with AI-powered insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6 px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-blue-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Smart Scheduling</div>
                        <div className="text-sm text-slate-600">AI-optimized appointments</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-purple-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Progress Analytics</div>
                        <div className="text-sm text-slate-600">Real-time insights</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-emerald-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Team Coordination</div>
                        <div className="text-sm text-slate-600">Seamless collaboration</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/physiotherapist" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group">
                      Access Dashboard
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* CHW Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
              <Card className="relative bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50"></div>
                <CardHeader className="relative text-center pb-6 pt-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-500">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent">
                    Community Health Worker
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Mobile-first tools for field healthcare delivery
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6 px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-emerald-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Smart Reporting</div>
                        <div className="text-sm text-slate-600">Voice & photo capture</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-teal-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Device Tracking</div>
                        <div className="text-sm text-slate-600">QR code scanning</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-cyan-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Training Hub</div>
                        <div className="text-sm text-slate-600">Interactive learning</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/chw" className="block">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group">
                      Access Portal
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Patient/Caregiver Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-600 to-orange-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
              <Card className="relative bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-orange-50/50"></div>
                <CardHeader className="relative text-center pb-6 pt-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-600 via-rose-600 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/25 group-hover:shadow-pink-500/40 transition-all duration-500">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-pink-800 bg-clip-text text-transparent">
                    Patient/Caregiver
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Empowering families with personalized care tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6 px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-pink-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Exercise Library</div>
                        <div className="text-sm text-slate-600">Interactive videos</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-rose-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Community Support</div>
                        <div className="text-sm text-slate-600">Connect with families</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/60 rounded-2xl border border-orange-100/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Progress Tracking</div>
                        <div className="text-sm text-slate-600">Visual milestones</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/patient" className="block">
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white border-0 rounded-2xl py-6 text-lg font-semibold shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 group">
                      Access App
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Positive Impact Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                Transforming Lives Through Technology
              </span>
            </h3>
            <p className="text-xl text-slate-600">Real impact on patients and families living with cerebral palsy</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Improved Mobility</h4>
                <p className="text-slate-600 text-center leading-relaxed">85% of patients show significant improvement in motor skills within 6 months of using our personalized therapy programs.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Enhanced Quality of Life</h4>
                <p className="text-slate-600 text-center leading-relaxed">Families report 70% increase in daily independence and confidence through our comprehensive support system.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Stronger Support Network</h4>
                <p className="text-slate-600 text-center leading-relaxed">Our community platform connects over 1,200 families, creating lasting bonds and shared learning experiences.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Faster Progress Tracking</h4>
                <p className="text-slate-600 text-center leading-relaxed">Real-time monitoring reduces therapy adjustment time by 60%, leading to more effective treatment outcomes.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Increased Engagement</h4>
                <p className="text-slate-600 text-center leading-relaxed">Gamified therapy sessions increase patient participation by 90%, making treatment enjoyable and effective.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/25">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 text-center">Better Care Coordination</h4>
                <p className="text-slate-600 text-center leading-relaxed">Seamless communication between therapists, CHWs, and families improves treatment consistency by 95%.</p>
              </div>
            </div>
          </div>

          {/* Questions CTA */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-6 py-3 mb-6">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">Have Questions?</span>
            </div>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We're here to help you understand how our platform can make a difference in your cerebral palsy care journey.
            </p>
            <a 
              href="https://eu.makeforms.co/hpwtdne/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group">
                Ask Your Questions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2 text-left">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">CP Care Hub</span>
                  <p className="text-blue-200">Advanced Healthcare Technology</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Revolutionizing cerebral palsy care through innovative technology, 
                connecting healthcare professionals and families for better outcomes.
              </p>
              
            </div>
            
            
            
            <div>
              
              
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              © 2025 CP Care Hub. All rights reserved. | Empowering healthcare through innovation.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">HIPAA Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

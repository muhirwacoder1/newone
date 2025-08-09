"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, User, Heart, Activity, Stethoscope, Calendar, CheckCircle, ArrowRight } from 'lucide-react'

interface SmartAssessmentFormProps {
    patientId?: string;
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
}

export const SmartAssessmentForm = ({ patientId, onSubmit, onCancel }: SmartAssessmentFormProps) => {
    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        address: "",
        caregiverName: "",
        caregiverContact: "",
        gmfcLevel: "",
        complaint: "",
        prenatal: "",
        perinatal: "",
        postnatal: "",
        milestones: "",
        treatmentResponse: "",
        accessibility: "",
        assistiveDevices: "",
        communication: "",
        gaitPosture: "",
        nutrition: "",
        involuntaryMovements: "",
        continence: "",
        motorSkills: "",
        reflexes: "",
        sensory: "",
        balance: "",
        tone: "",
        rom: "",
        functionalLevel: "",
        recommendedTherapy: "",
        assistiveRecommendation: "",
        deviceRecommendations: "",
        progressCheck: "",
        assignedCHW: "",
        followUpDate: "",
        dischargeStatus: "active",
        dischargeNotes: "",
        dischargeDate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        } else {
            console.log("Submitted form data:", formData);
        }
    };

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
    ];

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                                Smart Assessment Form
                            </h1>
                            <p className="text-slate-600">Comprehensive cerebral palsy evaluation and care planning</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Patient Information */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span>1. Patient Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter patient's full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                                        <SelectTrigger className="rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gmfcLevel">GMFCS Level</Label>
                                    <Select onValueChange={(value) => handleSelectChange("gmfcLevel", value)}>
                                        <SelectTrigger className="rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select GMFCS Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="I">Level I - Walks without limitations</SelectItem>
                                            <SelectItem value="II">Level II - Walks with limitations</SelectItem>
                                            <SelectItem value="III">Level III - Walks using mobility device</SelectItem>
                                            <SelectItem value="IV">Level IV - Self-mobility with limitations</SelectItem>
                                            <SelectItem value="V">Level V - Transported in wheelchair</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Patient's home address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="caregiverName">Caregiver Name</Label>
                                    <Input
                                        id="caregiverName"
                                        name="caregiverName"
                                        placeholder="Primary caregiver's name"
                                        value={formData.caregiverName}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="caregiverContact">Caregiver Contact</Label>
                                    <Input
                                        id="caregiverContact"
                                        name="caregiverContact"
                                        placeholder="Phone number or email"
                                        value={formData.caregiverContact}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="complaint">Functional Complaint</Label>
                                <Textarea
                                    id="complaint"
                                    name="complaint"
                                    placeholder="Describe the main functional concerns and complaints"
                                    value={formData.complaint}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200 min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Medical Background */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                    <Heart className="w-4 h-4 text-white" />
                                </div>
                                <span>2. Medical Background</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="prenatal">Prenatal History</Label>
                                <Textarea
                                    id="prenatal"
                                    name="prenatal"
                                    placeholder="Pregnancy complications, infections, medications, etc."
                                    value={formData.prenatal}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="perinatal">Perinatal History</Label>
                                <Textarea
                                    id="perinatal"
                                    name="perinatal"
                                    placeholder="Birth complications, delivery method, birth weight, etc."
                                    value={formData.perinatal}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postnatal">Postnatal History</Label>
                                <Textarea
                                    id="postnatal"
                                    name="postnatal"
                                    placeholder="Early complications, NICU stay, feeding issues, etc."
                                    value={formData.postnatal}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="milestones">Delayed Milestones</Label>
                                <Textarea
                                    id="milestones"
                                    name="milestones"
                                    placeholder="Motor, cognitive, and social developmental delays"
                                    value={formData.milestones}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="treatmentResponse">Treatment Response</Label>
                                <Textarea
                                    id="treatmentResponse"
                                    name="treatmentResponse"
                                    placeholder="Previous treatments and patient's response"
                                    value={formData.treatmentResponse}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Functional & Environmental Assessment */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                                    <Activity className="w-4 h-4 text-white" />
                                </div>
                                <span>3. Functional & Environmental Assessment</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accessibility">Home & School Accessibility</Label>
                                    <Textarea
                                        id="accessibility"
                                        name="accessibility"
                                        placeholder="Accessibility barriers and modifications needed"
                                        value={formData.accessibility}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="assistiveDevices">Current Assistive Devices</Label>
                                    <Textarea
                                        id="assistiveDevices"
                                        name="assistiveDevices"
                                        placeholder="Currently used mobility aids, communication devices, etc."
                                        value={formData.assistiveDevices}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="communication">Communication & Attention</Label>
                                    <Textarea
                                        id="communication"
                                        name="communication"
                                        placeholder="Communication abilities and attention span"
                                        value={formData.communication}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gaitPosture">Gait, Posture & Deformities</Label>
                                    <Textarea
                                        id="gaitPosture"
                                        name="gaitPosture"
                                        placeholder="Walking pattern, posture issues, deformities"
                                        value={formData.gaitPosture}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nutrition">Nutrition and Feeding</Label>
                                    <Textarea
                                        id="nutrition"
                                        name="nutrition"
                                        placeholder="Feeding difficulties, nutritional status"
                                        value={formData.nutrition}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="involuntaryMovements">Involuntary Movements</Label>
                                    <Textarea
                                        id="involuntaryMovements"
                                        name="involuntaryMovements"
                                        placeholder="Spasticity, dystonia, athetosis, etc."
                                        value={formData.involuntaryMovements}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="continence">Continence & Hygiene Care</Label>
                                <Textarea
                                    id="continence"
                                    name="continence"
                                    placeholder="Bladder/bowel control and hygiene management"
                                    value={formData.continence}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4. Motor & Neurological Evaluation */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                                    <Stethoscope className="w-4 h-4 text-white" />
                                </div>
                                <span>4. Motor & Neurological Evaluation</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="motorSkills">Gross & Fine Motor Skills</Label>
                                    <Textarea
                                        id="motorSkills"
                                        name="motorSkills"
                                        placeholder="Motor skill assessment and limitations"
                                        value={formData.motorSkills}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reflexes">Reflexes</Label>
                                    <Textarea
                                        id="reflexes"
                                        name="reflexes"
                                        placeholder="Primitive and postural reflexes"
                                        value={formData.reflexes}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sensory">Sensory Perception</Label>
                                    <Textarea
                                        id="sensory"
                                        name="sensory"
                                        placeholder="Visual, auditory, tactile sensory assessment"
                                        value={formData.sensory}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="balance">Balance and Coordination</Label>
                                    <Textarea
                                        id="balance"
                                        name="balance"
                                        placeholder="Balance reactions and coordination abilities"
                                        value={formData.balance}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tone">Tone & Contractures</Label>
                                    <Textarea
                                        id="tone"
                                        name="tone"
                                        placeholder="Muscle tone assessment and contractures"
                                        value={formData.tone}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rom">Range of Motion</Label>
                                    <Textarea
                                        id="rom"
                                        name="rom"
                                        placeholder="Joint range of motion limitations"
                                        value={formData.rom}
                                        onChange={handleChange}
                                        className="rounded-xl border-slate-200"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Rehabilitation Summary & Assignment */}
                    <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                    <Calendar className="w-4 h-4 text-white" />
                                </div>
                                <span>5. Rehabilitation Summary & Care Plan</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="functionalLevel">Functional Level Assessment</Label>
                                <Textarea
                                    id="functionalLevel"
                                    name="functionalLevel"
                                    placeholder="Overall functional capabilities and limitations"
                                    value={formData.functionalLevel}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="recommendedTherapy">Recommended Home-Based Therapy</Label>
                                <Textarea
                                    id="recommendedTherapy"
                                    name="recommendedTherapy"
                                    placeholder="Specific therapy exercises and interventions"
                                    value={formData.recommendedTherapy}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deviceRecommendations">Device Recommendations (Written)</Label>
                                <Textarea
                                    id="deviceRecommendations"
                                    name="deviceRecommendations"
                                    placeholder="Detailed written recommendations for assistive devices, mobility aids, communication devices, etc."
                                    value={formData.deviceRecommendations}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200 min-h-[120px]"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="assignedCHW">Assign Community Health Worker</Label>
                                    <Select onValueChange={(value) => handleSelectChange("assignedCHW", value)}>
                                        <SelectTrigger className="rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select CHW for patient care" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {rwandanCHWs.map((chw) => (
                                                <SelectItem key={chw} value={chw}>{chw}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dischargeStatus">Patient Status</Label>
                                    <Select onValueChange={(value) => handleSelectChange("dischargeStatus", value)}>
                                        <SelectTrigger className="rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select patient status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active Treatment</SelectItem>
                                            <SelectItem value="discharged">Discharged</SelectItem>
                                            <SelectItem value="follow-up">Follow-up Required</SelectItem>
                                            <SelectItem value="referred">Referred</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {formData.dischargeStatus === "discharged" && (
                                <div className="space-y-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                                        <Label className="text-emerald-800 font-semibold">Discharge Information</Label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="dischargeDate">Discharge Date</Label>
                                            <Input
                                                id="dischargeDate"
                                                type="date"
                                                name="dischargeDate"
                                                value={formData.dischargeDate}
                                                onChange={handleChange}
                                                className="rounded-xl border-emerald-200"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="followUpDate">Next Follow-Up Date</Label>
                                            <Input
                                                id="followUpDate"
                                                type="date"
                                                name="followUpDate"
                                                value={formData.followUpDate}
                                                onChange={handleChange}
                                                className="rounded-xl border-emerald-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dischargeNotes">Discharge Notes & Instructions</Label>
                                        <Textarea
                                            id="dischargeNotes"
                                            name="dischargeNotes"
                                            placeholder="Discharge summary, home care instructions, and follow-up requirements"
                                            value={formData.dischargeNotes}
                                            onChange={handleChange}
                                            className="rounded-xl border-emerald-200 min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="progressCheck">Progress Check Setup</Label>
                                <Textarea
                                    id="progressCheck"
                                    name="progressCheck"
                                    placeholder="Location for progress checks and CHW coordination details"
                                    value={formData.progressCheck}
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-200"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="border-slate-200 hover:bg-slate-50 rounded-xl px-8 py-3"
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-8 py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Submit Assessment
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SmartAssessmentForm;

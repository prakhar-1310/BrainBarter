import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Brain, Target, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { examAPI } from '../services/api';

export function ExamMode() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [pastPapers, setPastPapers] = useState([]);
  const [predictions, setPredictions] = useState(null);

  // Mock predictions data
  const mockPredictions = {
    highProbability: [
      { topic: "Dynamic Programming", probability: 95, lastAsked: "2024, 2023, 2022" },
      { topic: "Graph Algorithms", probability: 90, lastAsked: "2024, 2022" },
      { topic: "Tree Traversals", probability: 85, lastAsked: "2024, 2023" },
      { topic: "Hashing", probability: 80, lastAsked: "2023, 2021" },
    ],
    mediumProbability: [
      { topic: "Sorting Algorithms", probability: 65, lastAsked: "2022" },
      { topic: "Linked Lists", probability: 60, lastAsked: "2021" },
      { topic: "Stack & Queue", probability: 55, lastAsked: "2023" },
    ],
    contentAvailable: 12,
    estimatedStudyTime: "15-20 hours"
  };

  const handleSyllabusUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSyllabus(file);
    }
  };

  const handlePastPapersUpload = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    setPastPapers(prev => [...prev, ...pdfFiles]);
  };

  const removePaper = (index) => {
    setPastPapers(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!syllabus || pastPapers.length === 0) return;

    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setStep(2);
    }, 2000);
  };

  const handlePredict = async () => {
    setPredicting(true);
    // Simulate AI prediction
    setTimeout(() => {
      setPredicting(false);
      setPredictions(mockPredictions);
      setStep(3);
    }, 3000);
  };

  const ProbabilityBadge = ({ probability }) => {
    const getColor = (prob) => {
      if (prob >= 80) return 'bg-red-100 text-red-700 border-red-300';
      if (prob >= 60) return 'bg-orange-100 text-orange-700 border-orange-300';
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getColor(probability)}`}>
        {probability}% chance
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Zero-Search Learning</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Exam Prediction</h1>
            <p className="text-xl text-indigo-100">
              Upload your materials and let AI predict what's coming in your exam
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mt-12 flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${step >= s ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-white text-indigo-600' : 'bg-white/20 text-white'
                  }`}>
                    {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                  </div>
                  <span className="hidden md:inline text-white font-medium">
                    {s === 1 ? 'Upload' : s === 2 ? 'Analyze' : 'Results'}
                  </span>
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-white' : 'bg-white/20'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Syllabus Upload */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Syllabus</h2>
                    <p className="text-gray-600 mb-6">
                      Upload your course syllabus (PDF format) to help AI understand your curriculum
                    </p>

                    {!syllabus ? (
                      <label className="block">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleSyllabusUpload}
                          className="hidden"
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 cursor-pointer transition-colors">
                          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-700 font-medium mb-1">Click to upload syllabus</p>
                          <p className="text-sm text-gray-500">PDF up to 10MB</p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{syllabus.name}</p>
                          <p className="text-sm text-gray-600">{(syllabus.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          onClick={() => setSyllabus(null)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Papers Upload */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Past Papers</h2>
                    <p className="text-gray-600 mb-6">
                      Upload last 5 years' question papers for accurate predictions (minimum 3 required)
                    </p>

                    <label className="block mb-4">
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handlePastPapersUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 cursor-pointer transition-colors">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-700 font-medium mb-1">Click to upload past papers</p>
                        <p className="text-sm text-gray-500">Multiple PDFs supported</p>
                      </div>
                    </label>

                    {pastPapers.length > 0 && (
                      <div className="space-y-2">
                        {pastPapers.map((paper, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{paper.name}</p>
                              <p className="text-xs text-gray-500">{(paper.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <button
                              onClick={() => removePaper(index)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <div className="pt-2">
                          <p className="text-sm text-green-600 font-medium">
                            ✓ {pastPapers.length} paper{pastPapers.length > 1 ? 's' : ''} uploaded
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Button */}
            <div className="flex justify-end gap-4">
              <Button
                onClick={handleUpload}
                disabled={!syllabus || pastPapers.length < 3 || uploading}
                className="bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                {uploading ? 'Uploading...' : 'Continue to Analysis'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Analysis */}
        {step === 2 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-indigo-600 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for AI Analysis</h2>
                <p className="text-gray-600 mb-8">
                  Our AI will analyze your syllabus and {pastPapers.length} past papers to predict high-probability exam topics
                </p>
                <Button
                  onClick={handlePredict}
                  disabled={predicting}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  {predicting ? (
                    <>
                      <Brain className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Start AI Prediction'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && predictions && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Prediction Complete!</h2>
                    <p className="text-gray-600">AI has analyzed your exam pattern</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-600 text-sm mb-1">Peer Content Available</p>
                    <p className="text-3xl font-bold text-indigo-600">{predictions.contentAvailable} videos</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-600 text-sm mb-1">Estimated Study Time</p>
                    <p className="text-3xl font-bold text-indigo-600">{predictions.estimatedStudyTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High Probability Topics */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">High Priority Topics</h3>
                    <p className="text-gray-600">Focus on these first - high chance of appearing</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {predictions.highProbability.map((topic, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{topic.topic}</h4>
                        <ProbabilityBadge probability={topic.probability} />
                      </div>
                      <p className="text-sm text-gray-600">
                        Previously asked in: <span className="font-semibold">{topic.lastAsked}</span>
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          View Content
                        </Button>
                        <Button size="sm" variant="outline">
                          Add to Playlist
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medium Probability Topics */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Secondary Topics</h3>
                    <p className="text-gray-600">Review these if you have extra time</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {predictions.mediumProbability.map((topic, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                          <p className="text-sm text-gray-600 mt-1">Last asked: {topic.lastAsked}</p>
                        </div>
                        <ProbabilityBadge probability={topic.probability} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                size="lg"
              >
                Start Learning
              </Button>
              <Button
                onClick={() => {
                  setStep(1);
                  setSyllabus(null);
                  setPastPapers([]);
                  setPredictions(null);
                }}
                variant="outline"
                size="lg"
              >
                New Prediction
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

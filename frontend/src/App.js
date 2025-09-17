import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import {
  Upload,
  FileText,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Lightbulb,
  Brain,
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // set in Vercel settings

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 20000,
});

// retry once if Render backend is waking up
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error?.response?.status === 503 && !error.config.__retried) {
      error.config.__retried = true;
      await new Promise((res) => setTimeout(res, 1500));
      return api.request(error.config);
    }
    throw error;
  }
);

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files?.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileUpload = async (e) => {
    e?.preventDefault?.();
    if (!selectedFile) {
      alert("Please select a PDF/DOC/DOCX first.");
      return;
    }
    try {
      setLoadingUpload(true);
      const form = new FormData();
      form.append("file", selectedFile);

      // ❌ removed manual Content-Type (Axios sets it correctly)
      const { data } = await api.post("/upload-resume", form, {
        maxBodyLength: 25 * 1024 * 1024,
      });

      setResumeText(data?.text || "");
      setActiveTab("analyze");
    } catch (err) {
      console.error("Upload error", err?.response || err);
      alert("Upload failed: " + (err?.response?.data?.detail || err.message));
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleAnalysis = async (e) => {
    e?.preventDefault?.();
    if (!resumeText?.trim()) {
      alert("Resume text is empty. Upload a file or paste text.");
      return;
    }
    if (!jobDescription?.trim()) {
      alert("Please paste a job description.");
      return;
    }

    try {
      setLoadingAnalyze(true);
      const { data } = await api.post("/analyze", {
        resume_text: resumeText,
        job_description: jobDescription,
      });
      setAnalysis(data);
      setActiveTab("results");
    } catch (err) {
      console.error("Analyze error", err?.response || err);
      alert("Analyze failed: " + (err?.response?.data?.detail || err.message));
    } finally {
      setLoadingAnalyze(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "bg-emerald-500";
    if (percentage >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AI Resume Matcher</h1>
              <p className="text-sm text-slate-600">Smart Resume & Job Description Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl flex items-center gap-3 justify-center">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  Upload Your Resume
                </CardTitle>
                <CardDescription className="text-lg">
                  Upload your resume in PDF or DOCX format to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* Hidden input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={onFileChange}
                      className="hidden"
                    />

                    <div className="flex items-center gap-3">
                      <Button size="lg" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Select File
                      </Button>

                      <Button
                        size="lg"
                        onClick={handleFileUpload}
                        disabled={!selectedFile || loadingUpload}
                      >
                        {loadingUpload ? "Uploading..." : "Upload & Extract"}
                      </Button>
                    </div>

                    {selectedFile && (
                      <div className="text-sm text-slate-700 mt-1">
                        Selected: <span className="font-medium">{selectedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analyze / Results tabs unchanged… */}
      </main>
    </div>
  );
}

export default App;

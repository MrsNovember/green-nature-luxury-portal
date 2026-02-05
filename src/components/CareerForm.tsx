import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  X,
  Check,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FormData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  
  // Step 2: Experience
  currentPosition: string;
  yearsExperience: string;
  previousEmployer: string;
  linkedinUrl: string;
  
  // Step 3: Documents
  cvFile: File | null;
  coverLetterFile: File | null;
  
  // Additional
  availableStartDate: string;
  salaryExpectation: string;
  additionalNotes: string;
}

interface CareerFormProps {
  jobId?: string;
  jobTitle?: string;
  onClose: () => void;
}

const steps = [
  { id: 1, name: "Personal Information", icon: User },
  { id: 2, name: "Experience", icon: Briefcase },
  { id: 3, name: "Documents", icon: FileText },
  { id: 4, name: "Review & Submit", icon: CheckCircle },
];

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  dateOfBirth: "",
  currentPosition: "",
  yearsExperience: "",
  previousEmployer: "",
  linkedinUrl: "",
  cvFile: null,
  coverLetterFile: null,
  availableStartDate: "",
  salaryExpectation: "",
  additionalNotes: "",
};

export function CareerForm({ jobId, jobTitle, onClose }: CareerFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: "cvFile" | "coverLetterFile", file: File | null) => {
    updateField(field, file);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const uploadFile = async (file: File, type: "cv" | "cover-letter"): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${type}.${fileExt}`;
    const filePath = `applications/${fileName}`;

    const { error } = await supabase.storage
      .from("career-documents")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    return filePath;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Upload files
      let cvUrl: string | null = null;
      let coverLetterUrl: string | null = null;

      if (formData.cvFile) {
        cvUrl = await uploadFile(formData.cvFile, "cv");
        if (!cvUrl) throw new Error("Failed to upload CV");
      }

      if (formData.coverLetterFile) {
        coverLetterUrl = await uploadFile(formData.coverLetterFile, "cover-letter");
        if (!coverLetterUrl) throw new Error("Failed to upload cover letter");
      }

      // Submit application
      const { error } = await supabase.from("career_applications").insert({
        job_id: jobId || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality || null,
        date_of_birth: formData.dateOfBirth || null,
        current_position: formData.currentPosition || null,
        years_experience: formData.yearsExperience ? parseInt(formData.yearsExperience) : null,
        previous_employer: formData.previousEmployer || null,
        linkedin_url: formData.linkedinUrl || null,
        cv_url: cvUrl,
        cover_letter_url: coverLetterUrl,
        available_start_date: formData.availableStartDate || null,
        salary_expectation: formData.salaryExpectation || null,
        additional_notes: formData.additionalNotes || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in joining Green Nature Hotels.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return true; // Experience is optional
      case 3:
        return !!formData.cvFile; // CV is required
      case 4:
        return true;
      default:
        return false;
    }
  }, [formData]);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm"
      >
        <div className="bg-background rounded-sm p-12 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-forest mx-auto mb-6 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-ivory" />
          </motion.div>
          <h3 className="font-display text-2xl text-foreground mb-4">
            Application Received!
          </h3>
          <p className="text-muted-foreground mb-8">
            Thank you for applying to join the Green Nature family. Our HR team will review 
            your application and contact you within 5-7 business days.
          </p>
          <button onClick={onClose} className="btn-luxury">
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-background rounded-sm w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col my-4"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-secondary/30">
          <div>
            <p className="text-champagne text-xs tracking-[0.2em] uppercase mb-1">
              Apply Now
            </p>
            <h2 className="font-display text-2xl text-foreground">
              {jobTitle || "Career Application"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      backgroundColor: currentStep >= step.id 
                        ? "hsl(var(--champagne))" 
                        : "hsl(var(--muted))",
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  >
                    <step.icon 
                      className={`w-5 h-5 ${
                        currentStep >= step.id ? "text-midnight" : "text-muted-foreground"
                      }`} 
                    />
                  </motion.div>
                  <span className={`text-xs hidden sm:block ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 lg:w-24 h-0.5 mx-2 mt-[-1rem]">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep > step.id 
                          ? "hsl(var(--champagne))" 
                          : "hsl(var(--muted))",
                      }}
                      className="h-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepPersonalInfo formData={formData} updateField={updateField} />
            )}
            {currentStep === 2 && (
              <StepExperience formData={formData} updateField={updateField} />
            )}
            {currentStep === 3 && (
              <StepDocuments formData={formData} onFileChange={handleFileChange} />
            )}
            {currentStep === 4 && (
              <StepReview formData={formData} jobTitle={jobTitle} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-4 border-t border-border flex items-center justify-between bg-secondary/30">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-sm transition-colors ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed text-muted-foreground"
                : "hover:bg-muted text-foreground"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className={`flex items-center gap-2 btn-luxury ${
                !isStepValid(currentStep) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isStepValid(3)}
              className="flex items-center gap-2 btn-luxury"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Step Components
interface StepProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

function StepPersonalInfo({ formData, updateField }: StepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display text-xl text-foreground mb-2">Personal Information</h3>
        <p className="text-muted-foreground text-sm">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Last Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="Smith"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="john.smith@email.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="+90 555 123 4567"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nationality</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => updateField("nationality", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="Turkish"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StepExperience({ formData, updateField }: StepProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display text-xl text-foreground mb-2">Professional Experience</h3>
        <p className="text-muted-foreground text-sm">Share your career background</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Current Position</label>
          <input
            type="text"
            value={formData.currentPosition}
            onChange={(e) => updateField("currentPosition", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="Front Desk Manager"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Years of Experience</label>
          <select
            value={formData.yearsExperience}
            onChange={(e) => updateField("yearsExperience", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
          >
            <option value="">Select...</option>
            <option value="0">Less than 1 year</option>
            <option value="1">1-2 years</option>
            <option value="3">3-5 years</option>
            <option value="6">6-10 years</option>
            <option value="11">10+ years</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-foreground">Previous Employer</label>
          <input
            type="text"
            value={formData.previousEmployer}
            onChange={(e) => updateField("previousEmployer", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="Hilton Hotels"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-foreground">LinkedIn Profile</label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => updateField("linkedinUrl", e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>

      <div className="border-t border-border pt-6 mt-6">
        <h4 className="font-display text-lg text-foreground mb-4">Availability</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Available Start Date</label>
            <input
              type="date"
              value={formData.availableStartDate}
              onChange={(e) => updateField("availableStartDate", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Salary Expectation</label>
            <input
              type="text"
              value={formData.salaryExpectation}
              onChange={(e) => updateField("salaryExpectation", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors"
              placeholder="e.g., 50,000 TRY/month"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface StepDocumentsProps {
  formData: FormData;
  onFileChange: (field: "cvFile" | "coverLetterFile", file: File | null) => void;
}

function StepDocuments({ formData, onFileChange }: StepDocumentsProps) {
  const handleDrop = (field: "cvFile" | "coverLetterFile") => (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      onFileChange(field, file);
    }
  };

  const handleFileSelect = (field: "cvFile" | "coverLetterFile") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileChange(field, file);
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display text-xl text-foreground mb-2">Documents</h3>
        <p className="text-muted-foreground text-sm">
          Upload your CV and cover letter (PDF, DOC, DOCX - max 10MB)
        </p>
      </div>

      <div className="space-y-6">
        {/* CV Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            CV / Resume <span className="text-destructive">*</span>
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop("cvFile")}
            className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
              formData.cvFile
                ? "border-forest bg-forest/5"
                : "border-border hover:border-champagne"
            }`}
          >
            {formData.cvFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-forest" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{formData.cvFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => onFileChange("cvFile", null)}
                  className="ml-4 p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium mb-1">
                  Drop your CV here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect("cvFile")}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Cover Letter Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Cover Letter (Optional)</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop("coverLetterFile")}
            className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
              formData.coverLetterFile
                ? "border-forest bg-forest/5"
                : "border-border hover:border-champagne"
            }`}
          >
            {formData.coverLetterFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-forest" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{formData.coverLetterFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(formData.coverLetterFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => onFileChange("coverLetterFile", null)}
                  className="ml-4 p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium mb-1">
                  Drop your cover letter here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect("coverLetterFile")}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <AdditionalNotes formData={formData} onFileChange={onFileChange} />
      </div>
    </motion.div>
  );
}

interface AdditionalNotesProps {
  formData: FormData;
  onFileChange: (field: "cvFile" | "coverLetterFile", file: File | null) => void;
}

function AdditionalNotes({ formData }: AdditionalNotesProps) {
  const [notes, setNotes] = useState(formData.additionalNotes);
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Additional Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-sm bg-background focus:border-champagne focus:outline-none transition-colors min-h-[100px] resize-none"
        placeholder="Anything else you'd like us to know about your application..."
      />
    </div>
  );
}

interface StepReviewProps {
  formData: FormData;
  jobTitle?: string;
}

function StepReview({ formData, jobTitle }: StepReviewProps) {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", value: `${formData.firstName} ${formData.lastName}` },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
        { label: "Nationality", value: formData.nationality || "Not specified" },
        { label: "Date of Birth", value: formData.dateOfBirth || "Not specified" },
      ],
    },
    {
      title: "Professional Experience",
      fields: [
        { label: "Current Position", value: formData.currentPosition || "Not specified" },
        { label: "Years of Experience", value: formData.yearsExperience ? `${formData.yearsExperience}+ years` : "Not specified" },
        { label: "Previous Employer", value: formData.previousEmployer || "Not specified" },
        { label: "LinkedIn", value: formData.linkedinUrl || "Not specified" },
        { label: "Available From", value: formData.availableStartDate || "Immediate" },
        { label: "Salary Expectation", value: formData.salaryExpectation || "Negotiable" },
      ],
    },
    {
      title: "Documents",
      fields: [
        { label: "CV / Resume", value: formData.cvFile?.name || "Not uploaded" },
        { label: "Cover Letter", value: formData.coverLetterFile?.name || "Not uploaded" },
      ],
    },
  ];

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display text-xl text-foreground mb-2">Review Your Application</h3>
        <p className="text-muted-foreground text-sm">
          Please review your information before submitting
          {jobTitle && <span className="text-champagne-dark"> for {jobTitle}</span>}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-secondary/30 rounded-sm p-6">
            <h4 className="font-display text-lg text-foreground mb-4">{section.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {field.label}
                  </p>
                  <p className="text-foreground">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-champagne/10 border border-champagne/30 rounded-sm p-4">
        <p className="text-sm text-foreground">
          By submitting this application, you confirm that all information provided is accurate 
          and consent to Green Nature Hotels processing your data for recruitment purposes.
        </p>
      </div>
    </motion.div>
  );
}

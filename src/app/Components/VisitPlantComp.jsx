'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, ArrowRight, Loader2, X } from 'lucide-react';

export default function VisitPlantComp() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    mobileNumber: '',
    email: '',
    cityState: '',
    occupation: '',
    organization: '',
    visitObjective: '',
    cbgProject: '',
    projectCapacity: '',
    feedstock: '',
    landStatus: '',
    projectLocation: '',
    budgetRange: '',
    startTimeline: '',
    experienceBackground: [],
    projectTeam: '',
    visitDate: '',
    numPersons: '',
    accommodation: '',
    areasOfInterest: [],
    paymentMode: '',
    signature: '',
    declarationDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'experienceBackground' || name === 'areasOfInterest') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const required = [
      'fullName', 'age', 'gender', 'mobileNumber', 'email', 'cityState',
      'visitObjective', 'cbgProject', 'visitDate', 'numPersons',
      'paymentMode', 'signature', 'declarationDate'
    ];

    for (let field of required) {
      if (!formData[field] || formData[field] === '') {
        const fieldName = field.replace(/([A-Z])/g, ' $1').trim();
        setErrorMessage(`Please fill in: ${fieldName}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    // Phone number validation
    if (formData.mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid mobile number (at least 10 digits)');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    console.log('🔍 Form Data Before Validation:', formData);

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Prepare payload - ensure all fields match API expectations
    const payload = {
      fullName: formData.fullName.trim(),
      age: formData.age.toString(),
      gender: formData.gender,
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      cityState: formData.cityState.trim(),
      occupation: formData.occupation.trim() || '',
      organization: formData.organization.trim() || '',
      visitObjective: formData.visitObjective,
      cbgProject: formData.cbgProject,
      projectCapacity: formData.projectCapacity || '',
      feedstock: formData.feedstock || '',
      landStatus: formData.landStatus || '',
      budgetRange: formData.budgetRange || '',
      startTimeline: formData.startTimeline || '',
      projectLocation: formData.projectLocation.trim() || '',
      experienceBackground: formData.experienceBackground.length > 0 ? formData.experienceBackground : [],
      projectTeam: formData.projectTeam || '',
      visitDate: formData.visitDate,
      numPersons: formData.numPersons.toString(),
      accommodation: formData.accommodation || '',
      areasOfInterest: formData.areasOfInterest.length > 0 ? formData.areasOfInterest : [],
      paymentMode: formData.paymentMode,
      signature: formData.signature.trim(),
      declarationDate: formData.declarationDate
    };

    console.log('📤 Sending Payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('/api/submit-formvisitplant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      console.log('📥 Response Status:', response.status);

      const result = await response.json();
      console.log('📥 Response Data:', result);

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setErrorMessage('');

        // Reset form
        setFormData({
          fullName: '', age: '', gender: '', mobileNumber: '', email: '', cityState: '',
          occupation: '', organization: '', visitObjective: '',
          cbgProject: '', projectCapacity: '', feedstock: '', landStatus: '',
          projectLocation: '', budgetRange: '', startTimeline: '',
          experienceBackground: [], projectTeam: '', visitDate: '', numPersons: '',
          accommodation: '', areasOfInterest: [],
          paymentMode: '', signature: '', declarationDate: ''
        });

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error(result.error || result.details || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Submission Error:', error);
      setErrorMessage(error.message || 'Failed to submit form. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#1dd1a1] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#10ac84] rounded-full blur-[120px]"
        />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
              <Loader2 className="w-16 h-16 text-[#1dd1a1] animate-spin mx-auto" />
              <p className="text-white mt-4 text-lg">Submitting registration...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1dd1a1] to-[#10ac84] p-10 rounded-3xl max-w-md text-center relative"
            >
              <button
                onClick={() => setSubmitStatus(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <Check className="w-20 h-20 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-3">Success!</h3>
              <p className="text-white/90 mb-6">Your registration has been submitted successfully!</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="bg-white text-[#1dd1a1] px-8 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-red-500 to-red-600 p-10 rounded-3xl max-w-md text-center relative"
            >
              <button
                onClick={() => {
                  setSubmitStatus(null);
                  setErrorMessage('');
                }}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <X className="w-20 h-20 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-3">Error!</h3>
              <p className="text-white/90 mb-6">{errorMessage || 'Submission failed. Please try again.'}</p>
              <button
                onClick={() => {
                  setSubmitStatus(null);
                  setErrorMessage('');
                }}
                className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-600 p-8">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-10 h-10 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Delegation Registration Form
              </h2>
            </div>
            <p className="text-white/90 text-lg">For Investors • Entrepreneurs • Technical Leaders</p>
          </div>

          <div className="p-6 md:p-10 space-y-12 bg-gradient-to-br from-[#0a1628] via-[#1a2942] to-[#0f2744]">

            {/* Section 1: Personal Details */}
            <Section title="Personal & Demographic Details" icon="1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                <Input label="Age *" name="age" type="number" value={formData.age} onChange={handleInputChange} />
                <Input label="Mobile Number *" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                <Input label="Email ID *" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                <Input label="City & State *" name="cityState" value={formData.cityState} onChange={handleInputChange} />
                <Select label="Gender *" name="gender" value={formData.gender} onChange={handleInputChange} options={['Male', 'Female', 'Other']} />
                <Input label="Occupation / Business" name="occupation" value={formData.occupation} onChange={handleInputChange} />
                <Input label="Organization Name" name="organization" value={formData.organization} onChange={handleInputChange} />
              </div>
            </Section>

            {/* Section 2: Purpose */}
            <Section title="Purpose of Plant Visit" icon="2">
              <RadioGroup
                label="Primary Objective *"
                name="visitObjective"
                value={formData.visitObjective}
                onChange={handleInputChange}
                options={[
                  'Understanding Technology',
                  'Interested in setting up own CBG project',
                  'Academic / Research',
                  'Government / Institutional delegation',
                  'Investment exploration',
                  'Others'
                ]}
              />
              <RadioGroup
                label="Planning a CBG project? *"
                name="cbgProject"
                value={formData.cbgProject}
                onChange={handleInputChange}
                options={['Yes', 'No', 'Exploring only']}
              />
            </Section>

            {/* Section 3: Project Interest */}
            <Section title="Project Interest Details" icon="3">
              <div className="grid md:grid-cols-2 gap-8">
                <RadioGrid label="Preferred Capacity" name="projectCapacity" value={formData.projectCapacity} onChange={handleInputChange} options={['Below 2 TPD', '5-10 TPD', '10-20 TPD', 'Above 50 TPD', 'Not decided yet']} />
                <RadioGrid label="Preferred Feedstock" name="feedstock" value={formData.feedstock} onChange={handleInputChange} options={['Agri residue', 'Press mud', 'Municipal waste', 'Cattle dung', 'Mixed feedstock', 'Not sure yet']} />
                <RadioGrid label="Land Status" name="landStatus" value={formData.landStatus} onChange={handleInputChange} options={['Yes (own)', 'No (leased)', 'In process', 'Not yet']} />
                <RadioGrid label="Budget Range" name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} options={['₹5-10 CR', '₹10-25 CR', '₹25-50 CR', '₹50-100 CR', '₹100 CR+', 'Not finalized']} />
              </div>
              <Input label="Preferred Project Location" name="projectLocation" value={formData.projectLocation} onChange={handleInputChange} />
              <RadioGrid label="Start Timeline" name="startTimeline" value={formData.startTimeline} onChange={handleInputChange} options={['Immediate', 'Within 6 months', 'Within 1 year', 'Beyond 1 year', 'Undecided']} />
            </Section>

            {/* Section 4: Experience */}
            <Section title="Experience & Readiness" icon="4">
              <CheckboxGroup
                label="Experience Background (tick all applicable)"
                name="experienceBackground"
                values={formData.experienceBackground}
                onChange={handleInputChange}
                options={['Waste management', 'Agriculture', 'Renewable energy', 'EPC / Construction', 'None (new investor)']}
              />
              <RadioGroup
                label="Do you have a project team available?"
                name="projectTeam"
                value={formData.projectTeam}
                onChange={handleInputChange}
                options={['Yes', 'No', 'Planning to build']}
              />
            </Section>

            {/* Section 5: Visit Preferences */}
            <Section title="Visit Preferences" icon="5">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Preferred Visit Date *" name="visitDate" type="date" value={formData.visitDate} onChange={handleInputChange} />
                <Input label="Number of Persons *" name="numPersons" type="number" value={formData.numPersons} onChange={handleInputChange} />
              </div>
              <RadioGroup
                label="Accommodation Required?"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleInputChange}
                options={['Yes', 'No']}
              />
              <CheckboxGroup
                label="Specific Areas of Interest"
                name="areasOfInterest"
                values={formData.areasOfInterest}
                onChange={handleInputChange}
                options={[
                  'Plant layout & process flow', 'Feedstock handling', 'Digester design',
                  'Purification & upgrading', 'Compression & bottling', 'FOM / LFOM handling',
                  'Project economics', 'Subsidy & DPR', 'Others'
                ]}
              />
            </Section>

            {/* Section 6: Fee */}
            <Section title="Delegation Fee" icon="6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-[#1dd1a1]/20 to-[#10ac84]/20 border-2 border-[#1dd1a1] rounded-3xl p-10 text-center"
              >
                <div className="text-6xl font-black text-white mb-2">₹2,100</div>
                <div className="text-xl text-gray-300 mb-6">per person</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {['Plant Tour', 'Technical Session', 'Safety Gear', 'Refreshments', 'Consultation', 'Certificate'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-white text-sm">
                      <Check className="w-4 h-4 text-[#1dd1a1]" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <RadioGroup
                label="Payment Mode *"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                options={['UPI', 'Bank Transfer', 'Cash']}
              />
            </Section>

            {/* Section 7: Services */}
            <Section title="Our Services" icon="7">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'DPR & Project Consulting', desc: 'Complete project planning' },
                  { title: 'Turnkey EPC', desc: 'End-to-end execution' },
                  { title: 'Feedstock Supply', desc: 'Reliable sourcing' },
                  { title: 'O&M Services', desc: 'Operations support' },
                  { title: 'Regulatory Support', desc: 'Legal compliance' },
                  { title: 'CBG Marketing', desc: 'Sales assistance' }
                ].map(service => (
                  <motion.div key={service.title} whileHover={{ scale: 1.03 }} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <Check className="w-6 h-6 text-[#1dd1a1] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold">{service.title}</div>
                      <div className="text-gray-400 text-sm">{service.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Section 8: Declaration */}
            <Section title="Declaration" icon="8">
              <div className="bg-white/5 rounded-2xl p-8 space-y-6 border border-white/10">
                <div className="space-y-4 text-gray-300 text-base">
                  <p>I hereby declare that the information provided above is true and correct.</p>
                  <p>I agree to pay the Delegation Visit Fee of <span className="text-[#1dd1a1] font-semibold">₹2,100 per person</span>.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <Input label="Signature *" name="signature" value={formData.signature} onChange={handleInputChange} placeholder="Enter your full name" />
                  <Input label="Date *" name="declarationDate" type="date" value={formData.declarationDate} onChange={handleInputChange} />
                </div>
              </div>
            </Section>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#1dd1a1] to-[#10ac84] text-white text-xl font-bold px-12 py-5 rounded-full shadow-xl transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="relative flex items-center gap-4">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Registration
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mt-16 space-y-4">
          <p className="text-2xl md:text-3xl italic font-light text-gray-600 max-w-xl mx-auto">
            “Turning waste into wealth isn’t a concept — it’s a business model.”
          </p>
          <p className="text-[#1dd1a1] text-lg font-semibold">
            — Jitendra Narayan, Founder & CEO, KEC Agritech
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Components
const Section = ({ title, icon, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1dd1a1] to-[#10ac84] flex items-center justify-center text-white font-bold">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-green-400">{title}</h3>
    </div>
    <div className="space-y-6 pl-1">{children}</div>
  </motion.div>
);

const Input = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-gray-300 font-medium text-base">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label.replace('*', '').trim()}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#1dd1a1] focus:ring-2 focus:ring-[#1dd1a1]/30 transition-all text-white placeholder-gray-500"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="block text-gray-300 font-medium text-base">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#1dd1a1] focus:ring-2 focus:ring-[#1dd1a1]/30 transition-all text-white [&>option]:text-gray-900 [&>option]:bg-white"
    >
      <option value="" hidden>Choose an option</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({ label, name, value, onChange, options }) => (
  <div className="space-y-3">
    <label className="block text-gray-300 font-medium text-base">{label}</label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map(opt => (
        <motion.label
          key={opt}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${value === opt
            ? 'bg-gradient-to-r from-[#1dd1a1]/20 to-[#10ac84]/20 border-2 border-[#1dd1a1]'
            : 'bg-white/5 border border-white/10'
            }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
            className="w-4 h-4 text-[#1dd1a1]"
          />
          <span className="text-white text-sm">{opt}</span>
        </motion.label>
      ))}
    </div>
  </div>
);

const RadioGrid = ({ label, name, value, onChange, options }) => (
  <div className="space-y-3">
    <label className="block text-gray-300 font-medium text-base">{label}</label>
    <div className="space-y-2">
      {options.map(opt => (
        <motion.label
          key={opt}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${value === opt
            ? 'bg-gradient-to-r from-[#1dd1a1]/20 to-[#10ac84]/20 border-2 border-[#1dd1a1]'
            : 'bg-white/5 border border-white/10'
            }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
            className="w-4 h-4 text-[#1dd1a1]"
          />
          <span className="text-white text-sm">{opt}</span>
        </motion.label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, name, values, onChange, options }) => (
  <div className="space-y-3">
    <label className="block text-gray-300 font-medium text-base">{label}</label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map(opt => (
        <motion.label
          key={opt}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${values.includes(opt)
            ? 'bg-gradient-to-r from-[#1dd1a1]/20 to-[#10ac84]/20 border-2 border-[#1dd1a1]'
            : 'bg-white/5 border border-white/10'
            }`}
        >
          <input
            type="checkbox"
            name={name}
            value={opt}
            checked={values.includes(opt)}
            onChange={onChange}
            className="w-4 h-4 text-[#1dd1a1] rounded"
          />
          <span className="text-white text-sm">{opt}</span>
        </motion.label>
      ))}
    </div>
  </div>
);
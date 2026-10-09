import React, { useState } from 'react';
import { ChevronDown, Shield, Eye, Users, Mail, Lock, UserCheck, FileText } from 'lucide-react';

const TermsandConditionsection = () => {
  // Initialize all sections as open by default
  const [expandedSections, setExpandedSections] = useState({
    commitment: true,
    information: true,
    usage: true,
    protection: true,
    marketing: true,
    rights: true
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'commitment',
      title: 'Our Commitment',
      icon: <Shield className="w-6 h-6" />,
      content: 'Kisan Experience Centre (KEC) is committed to protecting your personal information and ensuring transparency in how your data is collected, used, and safeguarded.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'information',
      title: 'Information We Collect',
      icon: <Eye className="w-6 h-6" />,
      content: 'When you register for any services on our platform (including but not limited to www.kisanexperience.com or affiliated websites), we may request the following information:',
      list: [
        'Your full name',
        'Contact details (mobile number, email address, etc.)',
        'Location and demographic information',
        'Your service preferences and areas of interest'
      ],
      description: 'This data enables us to offer personalized services, respond to your inquiries efficiently, and communicate important updates relevant to your interests and needs.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'usage',
      title: 'Use of Your Information',
      icon: <Users className="w-6 h-6" />,
      content: 'We use your information in the following ways:',
      list: [
        'To deliver customized services, product recommendations, and agri-based solutions',
        'To communicate relevant updates, newsletters, or alerts that you have opted to receive',
        'To analyze usage patterns and improve the overall user experience and service delivery',
        'To provide customer support and respond to service-related queries'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'protection',
      title: 'Data Sharing & Protection',
      icon: <Lock className="w-6 h-6" />,
      content: 'KEC does not sell, trade, or rent your personally identifiable information to third parties for commercial promotion purposes.',
      description: 'Your information is stored securely and may only be accessed by authorized personnel for legitimate business purposes. In some cases, aggregated and anonymized data may be used for internal analysis or reporting, without revealing your identity.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'marketing',
      title: 'Marketing Communication',
      icon: <Mail className="w-6 h-6" />,
      content: 'All email newsletters, updates, or promotional communications are sent only upon your explicit consent during registration or subscription.',
      description: 'You can opt out of receiving these communications at any time by using the unsubscribe link provided in our emails or by contacting us directly.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'rights',
      title: 'Your Rights',
      icon: <UserCheck className="w-6 h-6" />,
      content: 'As a user, you have the right to:',
      list: [
        'Access the personal data we hold about you',
        'Request corrections to inaccurate or outdated information',
        'Withdraw consent to receive communications',
        'Request deletion of your personal data (where legally applicable)'
      ],
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100/100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
            Our Terms. Your Confidence.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            Kisan Experience Centre (KEC) - Transparent policies for your peace of mind
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                onClick={() => toggleSection(section.id)}
                className={`cursor-pointer p-6 bg-gradient-to-r ${section.gradient} text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-500 opacity-500 bg-opacity-10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSections[section.id] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 ">
                    {section.content}
                  </p>

                  {section.list && (
                    <ul className="space-y-3 mb-6">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.gradient} mt-3 flex-shrink-0`}></div>
                          <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.description && (
                    <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-gradient-to-b from-gray-300 to-gray-200 pl-6 bg-gray-50 p-4 rounded-r-lg">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-8 rounded-r-2xl shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Important Notice</h3>
              <p className="text-amber-700 leading-relaxed">
                <strong>Note:</strong> By registering or using our services, you acknowledge and accept the terms outlined in this Privacy Statement. We reserve the right to amend this policy periodically to reflect changes in legal requirements or our business practices. Updates will be posted on our website accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-gray-400 mb-6 font-sans">
              We're here to help clarify any concerns you may have.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-green-300 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsandConditionsection;
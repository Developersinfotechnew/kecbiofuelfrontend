import React, { useState } from 'react';
import { ChevronDown, Shield, Globe, Eye, Cookie, Mail, UserX, Info, Lock } from 'lucide-react';

const PrivacyPolicySection = () => {
  // Initialize all sections as open by default
  const [expandedSections, setExpandedSections] = useState({
    commitment: true,
    general: true,
    siteVisit: true,
    cookies: true,
    email: true,
    collection: true,
    definition: true
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
      title: 'Our Commitment to Privacy',
      icon: <Shield className="w-6 h-6" />,
      content: 'Kisan Experience Centre (KEC) respects your right to privacy and is committed to protecting any personal information you may share with us. This policy outlines how we handle information collected during your visit to our website.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'general',
      title: 'General Information',
      icon: <Globe className="w-6 h-6" />,
      content: 'As a general practice, the KEC website (www.kisanexperience.com) does not collect any Personal Information about you when you visit our site.',
      description: 'You can browse the website without disclosing any personally identifiable data unless you choose to provide it voluntarily.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'siteVisit',
      title: 'Site Visit Data',
      icon: <Eye className="w-6 h-6" />,
      content: 'When you access our website, certain information about your visit may be automatically recorded for analytical and statistical purposes. This includes:',
      list: [
        'Your server\'s IP address',
        'Your top-level domain name (e.g., .com, .in, .org)',
        'The type of browser you are using',
        'Date and time of your visit',
        'Pages accessed and documents downloaded',
        'The referring site (if you accessed our website via another source)'
      ],
      description: 'This information is used solely to improve our website\'s functionality and user experience. We do not attempt to identify individual users or their browsing activities, except where required by law or under direction from a competent law enforcement authority.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cookies',
      title: 'Cookies',
      icon: <Cookie className="w-6 h-6" />,
      content: 'A cookie is a small piece of data sent from a website and stored on the user\'s browser.',
      highlight: 'KEC does not use cookies on its website to track or store personal user information.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'email',
      title: 'Email Management',
      icon: <Mail className="w-6 h-6" />,
      content: 'Your email address will be recorded only if you choose to contact us or subscribe to a newsletter or service. It will be used only for the purpose for which you provided it and:',
      list: [
        'Will not be added to any mailing list without your explicit consent',
        'Will not be shared or disclosed without your permission'
      ],
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'collection',
      title: 'Collection of Personal Information',
      icon: <UserX className="w-6 h-6" />,
      content: 'If you are asked to provide personal details (e.g., through registration, subscription, or contact forms), you will be clearly informed about:',
      list: [
        'What information is being collected',
        'Why it is being collected',
        'How it will be used'
      ],
      description: 'Providing this information is entirely voluntary. If you believe your data is being used in a manner inconsistent with this privacy policy or have concerns, please contact us through the Contact Us section of the website.',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      id: 'definition',
      title: 'Definition of Personal Information',
      icon: <Info className="w-6 h-6" />,
      content: 'For the purpose of this policy, "Personal Information" refers to any data from which your identity is apparent or can be reasonably determined — such as your name, contact details, or user preferences.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100/100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6 shadow-2xl">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
            Built on Trust. Protected by Policy.
          </h1>
          <div className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans mb-2">
            Kisan Experience Centre (KEC)
          </div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            Your privacy is our priority. Learn how we protect and handle your information with complete transparency.
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
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
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

                  {section.highlight && (
                    <div className="bg-gray-50 border-l-4 border-gradient-to-b from-gray-300 to-gray-200 p-4 rounded-r-lg mb-6">
                      <p className="text-gray-600 text-lg font-semibold leading-relaxed">
                        {section.highlight}
                      </p>
                    </div>
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
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Privacy Assurance</h3>
              <p className="text-amber-700 leading-relaxed">
                <strong>Your Trust, Our Responsibility:</strong> This privacy policy reflects our commitment to transparency and data protection. We continuously review and update our practices to ensure your personal information remains secure and is handled in accordance with applicable privacy laws and regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-400 mb-6 font-sans">
              We believe in complete transparency. If you have any concerns or questions about how we handle your data, we're here to help.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-green-300 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
'use client';

import { useState } from 'react';
import Chatbot from '@/components/Chatbot';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import ATSFeedback from '@/components/ATSFeedback';

export default function Home() {
  const [resumeData, setResumeData] = useState<any>({
    personalInfo: {
      name: "Alex Doe",
      email: "alex.doe@example.com",
      phone: "+1 234 567 8900",
      summary: "Dynamic and results-oriented professional with a passion for building scalable solutions and driving global market innovation."
    },
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        date: "2020 - Present",
        description: [
          "Developed high-performance web applications.",
          "Led a team of 5 engineers to deliver features ahead of schedule."
        ]
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "State University",
        date: "2016 - 2020"
      }
    ],
    skills: ["React", "Next.js", "Node.js", "PostgreSQL", "System Architecture"]
  });

  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');

  return (
    <main style={{ 
        display: 'flex', 
        height: '100vh', 
        overflow: 'hidden',
        padding: '1rem',
        gap: '1rem'
    }}>
      {/* Left Pane - Tabs Container */}
      <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }} className="glass-panel hide-on-print">
        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActiveTab('chat')}
            style={{ 
              flex: 1, 
              padding: '1rem', 
              fontWeight: 'bold', 
              background: activeTab === 'chat' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'chat' ? 'var(--primary-color)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'chat' ? '2px solid var(--primary-color)' : 'none'
            }}
          >
            AI Chatbot
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            style={{ 
              flex: 1, 
              padding: '1rem', 
              fontWeight: 'bold', 
              background: activeTab === 'form' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'form' ? 'var(--primary-color)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'form' ? '2px solid var(--primary-color)' : 'none'
            }}
          >
            Manual Entry
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {activeTab === 'chat' ? (
            <Chatbot setResumeData={setResumeData} resumeData={resumeData} />
          ) : (
            <ResumeForm setResumeData={setResumeData} resumeData={resumeData} />
          )}
        </div>
      </div>

      {/* Right Pane - Resume Preview */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }} className="glass-panel print-container">
        <ResumePreview data={resumeData} />
        {/* Floating ATS Feedback Widget */}
        <div className="hide-on-print">
          <ATSFeedback resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
}

'use client';

export default function ResumeForm({ resumeData, setResumeData }: { resumeData: any, setResumeData: any }) {

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData({ ...resumeData, skills: skillsArray });
  };

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
        Manual Data Entry
      </h2>

      {/* Personal Info */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Personal Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={resumeData.personalInfo?.name || ''}
            onChange={e => handlePersonalInfoChange('name', e.target.value)}
            style={inputStyle}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={resumeData.personalInfo?.email || ''}
            onChange={e => handlePersonalInfoChange('email', e.target.value)}
            style={inputStyle}
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={resumeData.personalInfo?.phone || ''}
            onChange={e => handlePersonalInfoChange('phone', e.target.value)}
            style={inputStyle}
          />
          <textarea 
            placeholder="Professional Summary" 
            value={resumeData.personalInfo?.summary || ''}
            onChange={e => handlePersonalInfoChange('summary', e.target.value)}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          />
        </div>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Skills (Comma Separated)</h3>
        <textarea 
            placeholder="React, Next.js, Project Management..." 
            value={resumeData.skills?.join(', ') || ''}
            onChange={handleSkillsChange}
            style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
        />
      </section>

      {/* Note on Experience/Education */}
      <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p><strong>Pro Tip:</strong> For complex fields like Experience and Education, switch to the Chatbot tab and let the AI extract and format them perfectly for you!</p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-color)',
  outline: 'none',
  fontSize: '0.95rem',
  background: 'var(--surface-color)',
  color: 'var(--text-primary)'
};

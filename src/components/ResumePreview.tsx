'use client';

export default function ResumePreview({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '2rem', 
        background: 'white', 
        color: 'black', 
        borderRadius: 'var(--radius-lg)',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
    }}>
      <button 
        className="hide-on-print transition-all"
        onClick={() => window.print()}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'var(--primary-color)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: 'bold',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        Download PDF
      </button>

      <div style={{ borderBottom: '2px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#111' }}>{data.personalInfo?.name || 'Your Name'}</h1>
        <div style={{ fontSize: '1rem', color: '#444', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <span>{data.personalInfo?.email}</span>
            <span>|</span>
            <span>{data.personalInfo?.phone}</span>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Professional Summary</h2>
          <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{data.personalInfo?.summary}</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Experience</h2>
          {data.experience?.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{exp.title}</span>
                      <span>{exp.date}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{exp.company}</div>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {exp.description?.map((desc: string, j: number) => (
                          <li key={j}>{desc}</li>
                      ))}
                  </ul>
              </div>
          ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Education</h2>
          {data.education?.map((edu: any, i: number) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{edu.school}</span>
                      <span>{edu.date}</span>
                  </div>
                  <div>{edu.degree}</div>
              </div>
          ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Skills</h2>
          <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{data.skills?.join(', ')}</p>
      </div>

    </div>
  );
}

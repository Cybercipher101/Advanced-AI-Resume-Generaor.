'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ATSFeedback({ resumeData }: { resumeData: any }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced API call for ATS analysis
  useEffect(() => {
    const analyzeATS = async () => {
        setIsLoading(true);
        try {
            const contentString = JSON.stringify(resumeData);
            const res = await fetch('/api/ats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: contentString })
            });
            const data = await res.json();
            if (data.feedback) {
                setFeedback(data.feedback);
            }
        } catch (err) {
            console.error("ATS Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const timer = setTimeout(() => {
        analyzeATS();
    }, 2000); // 2 second debounce

    return () => clearTimeout(timer);
  }, [resumeData]);

  return (
    <div className="glass-panel" style={{ 
        position: 'absolute', 
        bottom: '1rem', 
        right: '1rem', 
        width: '350px',
        maxHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{ 
          background: 'var(--secondary-color)', 
          color: 'white', 
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 'bold',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)'
      }}>
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <AlertTriangle size={18} />}
          Real-Time ATS Analysis
      </div>
      <div style={{ 
          padding: '1rem', 
          overflowY: 'auto', 
          background: 'var(--surface-color)', 
          fontSize: '0.9rem',
          color: 'var(--text-primary)',
          borderBottomLeftRadius: 'var(--radius-lg)',
          borderBottomRightRadius: 'var(--radius-lg)'
      }}>
          {isLoading && !feedback && <p style={{ color: 'var(--text-secondary)' }}>Analyzing your resume against ATS algorithms...</p>}
          
          {feedback && (
              <div className="markdown-body">
                  <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
          )}

          {!isLoading && !feedback && <p>Start building your resume to see ATS feedback.</p>}
      </div>
      <style>{`
          .markdown-body ul { padding-left: 1.5rem; margin-top: 0.5rem; }
          .markdown-body li { margin-bottom: 0.5rem; }
          .markdown-body p { margin-bottom: 0.5rem; }
          .markdown-body strong { color: var(--primary-color); }
      `}</style>
    </div>
  );
}

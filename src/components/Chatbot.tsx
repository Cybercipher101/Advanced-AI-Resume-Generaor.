'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function Chatbot({ setResumeData, resumeData }: { setResumeData: any, resumeData: any }) {
  const [messages, setMessages] = useState<{role: 'user'|'model', content: string}[]>([
    { role: 'model', content: "Hello! I'm your AI Career Coach. Tell me about your dream job and your background, and let's build an ATS-compliant resume together!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullText = '';

      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        fullText += chunkValue;
        
        setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1].content = fullText;
            return copy;
        });
      }

      // If the AI suggests updating the resume, we can parse it here in a real app.
      // For the MVP, we simulate real-time data update if the AI says certain keywords
      if (input.toLowerCase().includes("update my name to")) {
          const newName = input.split("to ")[1];
          setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, name: newName }});
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I ran into an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'transparent' }}>
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Bot color="var(--primary-color)" />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-color)' }}>AI Career Coach</h2>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              alignItems: 'flex-start',
              flexDirection: m.role === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{ 
                background: m.role === 'user' ? 'var(--primary-color)' : 'var(--surface-color)', 
                padding: '0.5rem', 
                borderRadius: '50%',
                boxShadow: 'var(--shadow-sm)'
            }}>
                {m.role === 'user' ? <User size={18} color="white" /> : <Bot size={18} color="var(--primary-color)" />}
            </div>
            <div style={{ 
                background: m.role === 'user' ? 'var(--primary-color)' : 'var(--surface-color)',
                color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                borderTopRightRadius: m.role === 'user' ? 0 : '1rem',
                borderTopLeftRadius: m.role === 'user' ? '1rem' : 0,
                maxWidth: '80%',
                boxShadow: 'var(--shadow-sm)',
                lineHeight: 1.5,
                fontSize: '0.95rem'
            }}>
                {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
                <Loader2 className="animate-spin" size={16} style={{ animation: 'spin 1s linear infinite' }} /> AI is thinking...
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--surface-color)', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.95rem'
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="transition-all"
            style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

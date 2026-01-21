import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PreviewTable } from './components/PreviewTable';
import { FileSpreadsheet, Wand2 } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [filename, setFilename] = useState('');

  return (
    <div className="app-container">
      {/* Background Decor */}
      <div className="bg-glow top-left" />
      <div className="bg-glow bottom-right" />

      <header className="glass-panel">
        <div className="header-content">
          <div className="logo">
            <div className="icon-box">
              <FileSpreadsheet size={24} color="white" />
            </div>
            <h1>Json<span className="text-gradient">Excel</span></h1>
          </div>
          <div className="status-badge">
            <Wand2 size={16} />
            <span>AI Ready</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!data ? (
          <section className="hero-section">
            <h2 className="hero-title">Transform JSON into <br/> <span className="text-gradient">Beautiful Excel Sheets</span></h2>
            <p className="hero-subtitle">Intelligent parsing, automatic formatting, and structure visualization.</p>
            
            <div className="upload-wrapper">
              <FileUpload onDataLoaded={(parsedData, name) => {
                setData(parsedData);
                setFilename(name);
              }} />
            </div>
          </section>
        ) : (
          <PreviewTable data={data} filename={filename} onReset={() => setData(null)} />
        )}
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          position: relative;
          padding-bottom: 2rem;
        }

        .bg-glow {
          position: absolute;
          width: 50vw;
          height: 50vh;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100, 100, 255, 0.1) 0%, rgba(0,0,0,0) 70%);
          z-index: -1;
          pointer-events: none;
        }
        .top-left { top: -20%; left: -20%; }
        .bottom-right { bottom: -20%; right: -20%; background: radial-gradient(circle, rgba(0, 200, 255, 0.1) 0%, rgba(0,0,0,0) 70%); }

        header.glass-panel {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          width: 90%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-box {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(100, 100, 255, 0.4);
        }

        .text-gradient {
          background: linear-gradient(to right, #fff, #a5f3fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .main-content {
          width: 90%;
          max-width: 1200px;
          margin: 60px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-section {
          text-align: center;
          width: 100%;
          max-width: 800px;
          animation: fadeUp 0.8s ease-out;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
          font-weight: 300;
        }

        .upload-wrapper {
          width: 100%;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;

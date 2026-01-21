import { Wand2, Download, Table, FileJson } from 'lucide-react';

export function ActionPanel({ onDownload, onAnalyze, isAnalyzing, aiAnalysis }) {
  return (
    <div className="action-panel glass-panel">
      <div className="panel-header">
        <h3>Conversion Options</h3>
      </div>
      
      <div className="panel-content">
        <div className="ai-section">
          <div className="ai-header">
            <Wand2 className={`ai-icon ${isAnalyzing ? 'spinning' : ''}`} size={20} />
            <span className="label">Intelligent Analysis</span>
          </div>
          <p className="description">Get AI suggestions for headers and structure.</p>
          <button 
            className="btn-secondary" 
            onClick={onAnalyze} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze with Gemini'}
          </button>
          
          {aiAnalysis && (
            <div className="ai-result fade-in">
              <div className="result-header">Suggestion:</div>
              <p>{aiAnalysis.analysis_summary}</p>
            </div>
          )}
        </div>

        <div className="divider" />

        <div className="export-section">
          <button className="btn-primary full-width" onClick={onDownload}>
            <Download size={18} />
            <span>Download Excel</span>
          </button>
        </div>
      </div>

      <style>{`
        .action-panel {
          border-radius: var(--radius-md);
          overflow: hidden;
          width: 300px;
          flex-shrink: 0;
        }

        .panel-header {
          padding: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
        }

        .panel-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .panel-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ai-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: hsl(var(--secondary));
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .description {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .btn-secondary {
          width: 100%;
          padding: 10px;
          border-radius: var(--radius-sm);
          border: 1px solid hsl(var(--secondary));
          color: hsl(var(--secondary));
          background: rgba(0, 255, 255, 0.05);
          transition: all 0.2s;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(0, 255, 255, 0.15);
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
        }

        .full-width {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .spinning {
          animation: spin 2s linear infinite;
        }

        .ai-result {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .result-header {
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: hsl(var(--primary));
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1024px) {
           .action-panel {
             width: 100%;
             margin-bottom: 2rem;
           }
        }
      `}</style>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { ActionPanel } from './ActionPanel';
import { generateExcel, downloadExcel, flattenObject } from '../services/excelService';
import { analyzeJsonStructure } from '../services/aiService';
import { ArrowLeft, Table as TableIcon } from 'lucide-react';

export function PreviewTable({ data, filename, onReset }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Flatten data for display - check if it's an array, otherwise wrap it
  const displayData = useMemo(() => {
    const arr = Array.isArray(data) ? data : [data];
    return arr.map(item => flattenObject(item));
  }, [data]);

  const headers = useMemo(() => {
    if (!displayData.length) return [];
    // If AI suggestions exist, use them, otherwise keys
    const keys = Object.keys(displayData[0]);
    return keys; // Simplified for now, can map with AI headers later
  }, [displayData, aiAnalysis]);

  const handleDownload = () => {
    // Generate excel buffer
    const buffer = generateExcel(data, "Exported Data");
    downloadExcel(buffer, filename || "export");
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeJsonStructure(data);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button onClick={onReset} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Upload</span>
        </button>
        <h2>{filename}.json</h2>
      </div>

      <div className="content-grid">
        <div className="table-wrapper glass-panel">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {headers.map(header => (
                    <th key={header}>
                      {aiAnalysis?.header_mapping?.[header] || header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.slice(0, 100).map((row, idx) => (
                  <tr key={idx}>
                    {headers.map(header => (
                      <td key={`${idx}-${header}`}>
                        {typeof row[header] === 'object' ? JSON.stringify(row[header]) : String(row[header] || '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing first 100 rows</span>
            <span>Total: {displayData.length} records</span>
          </div>
        </div>

        <ActionPanel 
          onDownload={handleDownload} 
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing}
          aiAnalysis={aiAnalysis}
        />
      </div>

      <style>{`
        .preview-container {
          width: 100%;
          animation: fadeIn 0.5s ease-out;
        }

        .preview-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--text-main);
        }

        .content-grid {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .table-wrapper {
          flex: 1;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 70vh;
        }

        .table-scroll {
          overflow: auto;
          flex: 1;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        th {
          background: rgba(0,0,0,0.2);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          position: sticky;
          top: 0;
          backdrop-filter: blur(5px);
          white-space: nowrap;
        }

        td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: var(--text-muted);
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        tr:hover td {
          background: rgba(255,255,255,0.02);
          color: var(--text-main);
        }

        .table-footer {
          padding: 0.75rem 1.5rem;
          background: rgba(0,0,0,0.3);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .content-grid {
            flex-direction: column;
          }
          
          .table-wrapper {
            width: 100%;
            height: 50vh;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

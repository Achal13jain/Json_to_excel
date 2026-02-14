import { useCallback, useState } from 'react';
import { Upload, FileJson, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

export function FileUpload({ onDataLoaded }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFile = (file) => {
    setError('');
    
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Only .json files are supported');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        onDataLoaded(json, file.name.replace('.json', ''));
      } catch (err) {
        setError('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const [inputType, setInputType] = useState('file'); // 'file' or 'text'
  const [jsonText, setJsonText] = useState('');

  const handleTextSubmit = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onDataLoaded(parsed, 'pasted-data.json');
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const loadSample = (key) => {
    import('../data/sampleData').then(({ sampleData }) => {
      onDataLoaded(sampleData[key], `sample-${key}.json`);
    });
  };

  return (
    <div className="upload-container glass-panel">
      <div className="input-tabs">
        <button 
          className={`tab-btn ${inputType === 'file' ? 'active' : ''}`}
          onClick={() => { setInputType('file'); setError(''); }}
        >
          <Upload size={18} /> File Upload
        </button>
        <button 
          className={`tab-btn ${inputType === 'text' ? 'active' : ''}`}
          onClick={() => { setInputType('text'); setError(''); }}
        >
          <FileJson size={18} /> Paste JSON
        </button>
      </div>

      <div className="input-area">
        {inputType === 'file' ? (
          <div 
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-upload" 
              accept=".json" 
              className="file-input" 
              onChange={handleChange} 
            />
            
            <label htmlFor="file-upload" className="drop-content">
              <div className="icon-wrapper">
                 {error ? <AlertCircle size={40} className="text-error" /> : <Upload size={40} />}
              </div>
              <h3>{error || (isDragging ? "Drop to upload" : "Upload JSON File")}</h3>
              <p>{error ? "Please try again with a valid JSON file" : "Drag & drop or browse from computer"}</p>
            </label>
          </div>
        ) : (
          <div className="text-input-wrapper">
            <textarea
              className={`json-textarea ${error ? 'error' : ''}`}
              placeholder="Paste your JSON here..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
            />
            {error && <div className="error-message"><AlertCircle size={16} /> {error}</div>}
            <button 
              className="btn-primary full-width"
              onClick={handleTextSubmit}
              disabled={!jsonText.trim()}
            >
              Analyze JSON
            </button>
          </div>
        )}
      </div>

      <div className="sample-section">
        <p>Or try a sample:</p>
        <div className="sample-chips">
          <button onClick={() => loadSample('ecommerce')} className="chip">🛍️ E-commerce</button>
          <button onClick={() => loadSample('api_users')} className="chip">👥 API Users</button>
          <button onClick={() => loadSample('analytics')} className="chip"> Analytics</button>
        </div>
      </div>

      <style>{`
        .upload-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          overflow: hidden;
          padding: 0;
        }

        .input-tabs {
          display: flex;
          background: rgba(0,0,0,0.2);
          padding: 4px;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
        }

        .tab-btn.active {
          color: white;
          background: rgba(255,255,255,0.05);
          border-bottom-color: hsl(var(--primary));
        }

        .input-area {
          padding: 2rem;
        }

        .drop-zone {
          position: relative;
          padding: 3rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 2px dashed rgba(255,255,255,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          cursor: pointer;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drop-zone:hover, .drop-zone.dragging {
          border-color: hsl(var(--primary));
          background: rgba(100, 100, 255, 0.1);
          transform: scale(1.01);
        }

        .drop-zone.error {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
        }

        .file-input { display: none; }

        .drop-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          transition: transform 0.3s ease;
        }

        .drop-zone:hover .icon-wrapper {
          transform: translateY(-5px);
          background: hsl(var(--primary));
          color: white;
        }

        .text-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 250px;
        }

        .json-textarea {
          flex: 1;
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 1rem;
          color: white;
          font-family: monospace;
          resize: none;
        }

        .json-textarea:focus {
          outline: none;
          border-color: hsl(var(--primary));
        }
        
        .json-textarea.error {
          border-color: #ff6b6b;
        }

        .error-message {
          color: #ff6b6b;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sample-section {
          padding: 1.5rem;
          background: rgba(0,0,0,0.1);
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .sample-section p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .sample-chips {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .chip {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 12px;
          border-radius: 20px;
          color: var(--text-primary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .chip:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.3);
        }

        .text-error { color: #ff6b6b; }
        h3 { margin: 0; font-size: 1.25rem; }
        p { margin: 0; color: var(--text-muted); }
      `}</style>
    </div>
  );
}

FileUpload.propTypes = {
  onDataLoaded: PropTypes.func.isRequired
};

import { useCallback, useState } from 'react';
import { Upload, FileJson, AlertCircle } from 'lucide-react';

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

  return (
    <div className="upload-container">
      <div 
        className={`drop-zone glass-panel ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
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

      <style>{`
        .upload-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .drop-zone {
          position: relative;
          padding: 4rem 2rem;
          border-radius: var(--radius-lg);
          border: 2px dashed rgba(255,255,255,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          cursor: pointer;
          overflow: hidden;
        }

        .drop-zone:hover, .drop-zone.dragging {
          border-color: hsl(var(--primary));
          background: rgba(100, 100, 255, 0.1);
          transform: scale(1.02);
        }

        .drop-zone.error {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
        }

        .file-input {
          display: none;
        }

        .drop-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 2;
          cursor: pointer;
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .drop-zone:hover .icon-wrapper {
          transform: translateY(-5px);
          background: hsl(var(--primary));
          color: white;
        }

        .text-error {
          color: #ff6b6b;
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        p {
          margin: 0;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

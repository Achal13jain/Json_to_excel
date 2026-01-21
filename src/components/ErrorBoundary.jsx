import React from 'react';
import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary glass-panel">
          <AlertTriangle size={48} className="text-error" />
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || "An unexpected error occurred."}</p>
          <button 
            className="btn-primary" 
            onClick={() => window.location.reload()}
          >
            Reload Application
          </button>
          <style>{`
            .error-boundary {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 3rem;
              text-align: center;
              max-width: 500px;
              margin: 4rem auto;
              gap: 1.5rem;
            }
            .text-error { color: #ff6b6b; }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

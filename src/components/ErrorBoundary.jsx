import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Temporal Anomaly Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050706] text-[#E8E2D0] font-mono flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-full border-2 border-[#FF3366] flex items-center justify-center mb-4 shadow-[0_0_20px_#FF3366] animate-pulse">
            <span className="text-2xl text-[#FF3366]">⚠️</span>
          </div>
          <div className="text-xs text-[#F5A623] tracking-[0.3em] uppercase mb-2">
            TEMPORAL RECOVERY PROTOCOL ENGAGED
          </div>
          <h1 className="text-3xl sm:text-5xl font-display tracking-wider text-[#E8E2D0] uppercase mb-4">
            TIME VARIANCE AUTHORITY
          </h1>
          <p className="text-xs sm:text-sm text-tva-bone-dim max-w-md mb-4 leading-relaxed">
            A temporary timeline branching error occurred. The Sacred Timeline is recovering its equilibrium.
          </p>
          {this.state.error && (
            <div className="max-w-xl w-full p-4 mb-6 bg-black/80 border border-red-500/50 text-red-400 text-left text-xs font-mono overflow-auto max-h-48 rounded">
              <div className="font-bold text-red-300 mb-1">{String(this.state.error?.message || this.state.error)}</div>
              <pre className="text-[10px] text-neutral-400 whitespace-pre-wrap">{this.state.error?.stack}</pre>
            </div>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-3 bg-[#7FCF8A] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#A8E6A3] transition-colors shadow-green-sm"
          >
            [ RE-INITIALIZE TIMELINE ]
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

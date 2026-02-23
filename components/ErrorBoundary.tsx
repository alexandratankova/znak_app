import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white font-sans">
          <h1 className="text-xl font-bold mb-4 text-red-400">Qualcosa è andato storto</h1>
          <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto max-w-full max-h-64 mb-4">
            {this.state.error.message}
          </pre>
          <p className="text-sm text-gray-400 text-center">
            Apri la console del browser (F12 → Console) per dettagli. Se il problema persiste, controlla la chiave Supabase in .env.local.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amber-500 text-black font-bold rounded hover:bg-amber-400"
          >
            Ricarica pagina
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

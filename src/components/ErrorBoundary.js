import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h1>Something went wrong.</h1>
          <p>Oops! An error occurred while loading this page.</p>
          <a className="alog" href="/login">Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

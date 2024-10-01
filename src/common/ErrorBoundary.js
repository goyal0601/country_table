import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error captured by Error Boundary:", error, info);
    // Consider using a proper error logging service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h1>Oops! Something went wrong.</h1>
          <p>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);

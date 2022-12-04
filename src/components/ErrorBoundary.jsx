import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong. Please come back later.</h1>
          <img width="300px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Egon_Schiele_-_Self-Portrait_with_Splayed_Fingers_-_Google_Art_Project.jpg/326px-Egon_Schiele_-_Self-Portrait_with_Splayed_Fingers_-_Google_Art_Project.jpg?20121010075946" alt="Error image" />
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
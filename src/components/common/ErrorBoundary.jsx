/**
 * ErrorBoundary Component
 *
 * Catches unhandled JavaScript runtime exceptions in child component trees,
 * logs the error, and renders a graceful recovery UI.
 */

import { Component } from 'react'
import { Container, Button } from '../ui/index.js'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg text-text-main flex items-center justify-center py-20">
          <Container className="text-center max-w-lg">
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              Application Notice
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-main mb-4">
              Something Went Wrong
            </h1>
            <p className="font-body text-base text-text-muted leading-relaxed mb-8">
              An unexpected error occurred while displaying this page. Please
              try refreshing or check back in a few moments.
            </p>
            <Button variant="primary" size="lg" onClick={this.handleReload}>
              Refresh Page
            </Button>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * NotFound Component
 *
 * 404 error page displayed when users navigate to undefined routes.
 * Visually consistent with brand tokens, accessible, and provides a clear
 * call-to-action to return to the home experience.
 */

import { Link } from 'react-router-dom'
import { Container, Button } from '../ui/index.js'
import { businessConfig } from '../../config/index.js'

export function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text-main flex items-center justify-center py-20">
      <Container className="text-center max-w-lg">
        <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
          Error 404
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-text-main mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-base text-text-muted leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Return
          to {businessConfig.name} to continue exploring.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Return to Home
          </Button>
        </Link>
      </Container>
    </div>
  )
}

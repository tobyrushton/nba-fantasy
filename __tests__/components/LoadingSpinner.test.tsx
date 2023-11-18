import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import '@testing-library/jest-dom'

describe('<LoadingSpinner />', () => {
    it('renders correctly', () => {
        render(<LoadingSpinner />)
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })
})

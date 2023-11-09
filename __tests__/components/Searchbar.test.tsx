import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname, useSearchParams } from 'next/navigation'
import Searchbar from '../../src/components/searchbar/Searchbar'
import '@testing-library/jest-dom'

describe('<Searchbar />', () => {
    it('should render the searchbar', () => {
        render(<Searchbar />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should update the search value', () => {
        render(<Searchbar />)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })
        expect(input).toHaveValue('test')
    })

    it('should clear the search value', () => {
        render(<Searchbar />)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '' } })
        expect(input).toHaveValue('')
    })

    it('should redirect on enter with correct search term', () => {
        render(<Searchbar />)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'Nikola' } })
        fireEvent.submit(input)
        expect(window.location.href).toBe('http://localhost/search?term=Nikola')
    })

    it('should start with the correct search state', () => {
        window.location.href = 'http://localhost/search?term=Nikola'
        render(<Searchbar />)
        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('Nikola')
    })

    it('should not start with search state if not on search page', () => {
        (usePathname as jest.Mock).mockReturnValueOnce('/')
        ;(useSearchParams as jest.Mock).mockReturnValueOnce(
            new URLSearchParams('term=Nikola')
        )
        render(<Searchbar />)
        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('')
    })
})

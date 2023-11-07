import { render, screen, fireEvent } from '@testing-library/react'
import Searchbar from '../../src/components/searchbar/Searchbar'
import '@testing-library/jest-dom'

describe('<Searchbar />', () => {
    it('should render the searchbar', () => {
        render(<Searchbar value="" onChange={jest.fn()}/>)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should update the search value', () => {
        let value = ''

        const onChange = (val: string): void => {
            value = val
        }

        render(<Searchbar value={value} onChange={onChange}/>)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })
        expect(value).toBe('test')
    })

    it('should clear the search value', () => {
        let value = 'test'

        const onChange = (val: string): void => {
            value = val
        }

        render(<Searchbar value={value} onChange={onChange}/>)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '' } })
        expect(value).toBe('')
    })

    it('should render the searchbar with a value', () => {
        render(<Searchbar value="test" onChange={jest.fn()}/>)
        expect(screen.getByRole('textbox')).toHaveValue('test')
    })
})
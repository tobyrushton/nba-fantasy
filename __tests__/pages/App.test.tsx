import { render, screen, fireEvent } from '@testing-library/react'
import App from '@/app/page'
import Layout from '@/app/layout'
import '@testing-library/jest-dom'

describe('/', () => {
    it('renders with searchbar', () => {
        render(
            <Layout>
                <App />
            </Layout>
        )

        const searchbar = screen.getByPlaceholderText('Search...')
        expect(searchbar).toBeInTheDocument()
    })

    it('allows searchbar to be typed in', () => {
        render(
            <Layout>
                <App />
            </Layout>
        )

        const searchbar = screen.getByPlaceholderText('Search...')
        fireEvent.change(searchbar, { target: { value: 'test' } })
        expect(searchbar).toHaveValue('test')
    })

    it('allows for the user to search and be redirected to /search', () => {
        render(
            <Layout>
                <App />
            </Layout>
        )

        const searchbar = screen.getByPlaceholderText('Search...')
        fireEvent.change(searchbar, { target: { value: 'Nikola Jokic' } })
        fireEvent.submit(searchbar)
        expect(window.location.pathname).toBe('/search')
        expect(window.location.href).toBe(
            'http://localhost/search?term=Nikola+Jokic'
        )
    })
})

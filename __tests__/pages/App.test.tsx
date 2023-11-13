import { render, screen, fireEvent } from '@testing-library/react'
import App from '@/app/page'
import Layout from '@/app/layout'
import { server } from '../mocks/node'
import '@testing-library/jest-dom'
import resolvedComponent from '../resolvedComponent'

describe('/', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('renders with searchbar', async () => {
        const ResolvedApp = await resolvedComponent(App)
        render(
            <Layout>
                <ResolvedApp />
            </Layout>
        )

        const searchbar = screen.getByPlaceholderText('Search...')
        expect(searchbar).toBeInTheDocument()
    })

    it('allows searchbar to be typed in', async () => {
        const ResolvedApp = await resolvedComponent(App)
        render(
            <Layout>
                <ResolvedApp />
            </Layout>
        )

        const searchbar = screen.getByPlaceholderText('Search...')
        fireEvent.change(searchbar, { target: { value: 'test' } })
        expect(searchbar).toHaveValue('test')
    })

    it('allows for the user to search and be redirected to /search', async () => {
        const ResolvedApp = await resolvedComponent(App)
        render(
            <Layout>
                <ResolvedApp />
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

    it('should render all 30 nba teams', async () => {
        const ResolvedApp = await resolvedComponent(App)
        render(
            <Layout>
                <ResolvedApp />
            </Layout>
        )

        const teams = await screen.findAllByRole('link')
        expect(teams.length).toBe(30)
    })

    it('should go to correct team page on click', async () => {
        const ResolvedApp = await resolvedComponent(App)
        render(
            <Layout>
                <ResolvedApp />
            </Layout>
        )

        const teams = await screen.findAllByRole('link')
        teams.forEach((team, index) => {
            expect(team).toHaveAttribute('href', `/team/${index + 1}`)
        })
    })
})

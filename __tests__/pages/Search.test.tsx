import { render, screen } from '@testing-library/react'
import Search from '@/app/search/page'
import Layout from '@/app/layout'
import { server } from '../mocks/node'
import resolvedComponent from '../resolvedComponent'
import '@testing-library/jest-dom'

describe('/search', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('renders searchbar with page with empty search term', async () => {
        const ResolvedSearch = await resolvedComponent(Search, {
            searchParams: { term: 'Nikola Jokic' },
        })

        render(
            <Layout>
                <ResolvedSearch />
            </Layout>
        )

        const searchbar = screen.getByRole('textbox')
        expect(searchbar).toBeInTheDocument()
        // expect(searchbar).toHaveValue('Nikola Jokic')
        expect(screen.getByText('Nikola Jokic')).toBeInTheDocument()
    })

    it('renders multiple players with the same name', async () => {
        const ResolvedSearch = await resolvedComponent(Search, {
            searchParams: { term: 'Nikola' },
        })

        render(
            <Layout>
                <ResolvedSearch />
            </Layout>
        )

        const searchbar = screen.getByRole('textbox')
        expect(searchbar).toBeInTheDocument()
        expect(screen.getByText('Nikola Jokic')).toBeInTheDocument()
        expect(screen.getByText('Nikola Vucevic')).toBeInTheDocument()
        expect(screen.getByText('Nikola Jovic')).toBeInTheDocument()
    })
})

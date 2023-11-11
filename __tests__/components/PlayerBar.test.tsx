import { render, screen } from '@testing-library/react'
import PlayerBar from '../../src/components/playerbar/PlayerBar'
import '@testing-library/jest-dom'

describe('<PlayerBar />', () => {
    const mockPlayer: player.IPlayer = {
        id: '1',
        first_name: 'Nikola',
        last_name: 'Jokic',
        position: 'C',
        height_feet: 7,
        height_inches: 0,
        weight_pounds: 284,
        team: {
            id: 14,
            abbreviation: 'DEN',
            city: 'Denver',
            conference: 'West',
            division: 'Northwest',
            full_name: 'Denver Nuggets',
            name: 'Nuggets',
        },
    }

    const mockPlayerStats: player.IPlayerSeasonStats = {
        games_played: 69,
        player_id: 1,
        season: 2022,
        min: '33:42',
        fgm: 9.4,
        fga: 14.8,
        fg3m: 0.8,
        fg3a: 2.2,
        ftm: 4.9,
        fta: 6.0,
        oreb: 2.4,
        dreb: 9.4,
        reb: 11.8,
        ast: 9.8,
        stl: 1.3,
        blk: 0.7,
        turnover: 3.6,
        pf: 2.5,
        pts: 24.5,
        fg_pct: 0.632,
        fg3_pct: 0.383,
        ft_pct: 0.822,
    }

    it('should render the player bar', () => {
        render(
            <PlayerBar
                player={mockPlayer}
                playerSeasonStats={mockPlayerStats}
            />
        )
        expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('should render the correct stats', () => {
        render(
            <PlayerBar
                player={mockPlayer}
                playerSeasonStats={mockPlayerStats}
            />
        )
        expect(screen.getByLabelText('ppg')).toHaveTextContent('24.5')
        expect(screen.getByLabelText('reb')).toHaveTextContent('11.8')
        expect(screen.getByLabelText('ast')).toHaveTextContent('9.8')
        expect(screen.getByLabelText('stl')).toHaveTextContent('1.3')
        expect(screen.getByLabelText('blk')).toHaveTextContent('0.7')
        expect(screen.getByLabelText('fg')).toHaveTextContent('63.2%')
        expect(screen.getByLabelText('fpts')).toBeInTheDocument()
        expect(screen.getByLabelText('team')).toHaveTextContent('Nikola Jokic')
    })

    it('link should have the correct href', () => {
        render(
            <PlayerBar
                player={mockPlayer}
                playerSeasonStats={mockPlayerStats}
            />
        )
        expect(screen.getByRole('link')).toHaveAttribute('href', '/player/1')
    })
})

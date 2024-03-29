import { http, HttpResponse } from 'msw'
import { playerData, playerStatsData } from './data'

export const handlers = [
    http.get(
        'https://api.balldontlie.io/v1/players',
        async ({ request }) => {
            const search = new URL(request.url).searchParams.get('search')
            if (!search) {
                return HttpResponse.json({ data: playerData })
            }
            const filteredPlayers = playerData.filter(player =>
                `${player.first_name} ${player.last_name}`.includes(search)
            )
            return HttpResponse.json({ data: filteredPlayers, meta: { total_pages: 1 } })
        }
    ),
    http.get(
        'https://api.balldontlie.io/v1/season_averages',
        async ({ request }) => {
            const ids = new URL(request.url).searchParams.getAll('player_ids[]')
            const filteredStats = ids.map(id => {
                const stats = playerStatsData.filter(
                    stats => stats.player_id.toString() === id
                )
                return stats[0]
            })
            return HttpResponse.json({ data: filteredStats })
        }
    ),
    http.get('https://api.balldontlie.io/v1/teams', () => {
        return HttpResponse.json({
            data: new Array(30)
                .fill({
                    abbreviation: 'TEST',
                    city: 'Test City',
                    conference: 'East',
                    division: 'Southeast',
                    full_name: 'Test Team',
                    name: 'Team',
                })
                .map((team, index) => ({
                    ...team,
                    id: index + 1,
                })),
        })
    }),
]

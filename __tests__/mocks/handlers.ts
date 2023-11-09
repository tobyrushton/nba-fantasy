import { http, HttpResponse } from 'msw'
import { playerData, playerStatsData } from './data'

export const handlers = [
    http.get(
        'https://www.balldontlie.io/api/v1/players',
        async ({ request }) => {
            const search = new URL(request.url).searchParams.get('search')
            if (!search) {
                return HttpResponse.json({ data: playerData })
            }
            const filteredPlayers = playerData.filter(player =>
                `${player.first_name} ${player.last_name}`.includes(search)
            )
            return HttpResponse.json({ data: filteredPlayers })
        }
    ),
    http.get(
        'https://www.balldontlie.io/api/v1/season_averages',
        async ({ request }) => {
            const id = new URL(request.url).searchParams.get('player_ids[]')
            const filteredStats = playerStatsData.filter(
                stats => stats.player_id.toString() === id
            )
            return HttpResponse.json({ data: filteredStats })
        }
    ),
]

import { getRoster } from './getRoster'

const getTeam = async (id: string): Promise<team.ITeam> => {
    const res = await fetch(`https://www.balldontlie.io/api/v1/teams/${id}`)
    const data = await res.json()

    return data
}

const getPlayerData = async (name: string): Promise<player.IPlayer> => {
    const res = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${name}`
    )
    const data = await res.json()

    return data.data[0]
}

const getPlayerSeasonStats = async (
    ids: string[]
): Promise<player.IPlayerSeasonStats[]> => {
    let requestString = 'https://www.balldontlie.io/api/v1/season_averages?'

    for (let i = 0; i < ids.length; i++) {
        requestString += `player_ids[]=${ids[i]}&`
    }

    const res = await fetch(requestString)
    const data = await res.json()

    return data.data
}

export const getAllStats = async (
    id: string
): Promise<
    [team.ITeam, [player.IPlayerSeasonStats, player.IPlayer, string][]]
> => {
    const team = await getTeam(id)

    const [firstPart, secondPart] = team.full_name.split(' ')
    const playersNamesAndHeadshots = await getRoster(
        `${firstPart}-${secondPart}`,
        team.abbreviation
    )

    const playerDataAndHeadshots: [player.IPlayer, string][] =
        await Promise.all(
            playersNamesAndHeadshots.map(async player => {
                const playerData = await getPlayerData(player[0])

                return [playerData, player[1]]
            })
        )

    const playerIDs: string[] = playerDataAndHeadshots.map(
        player => player[0].id
    )

    const playerSeasonStats = await getPlayerSeasonStats(playerIDs)

    const playerSeasonStatsAndStatsAndHeadshots: [
        player.IPlayerSeasonStats,
        player.IPlayer,
        string,
    ][] = playerDataAndHeadshots.map(playerDataAndHeadshot => {
        const playerSeasonAverage = playerSeasonStats.find(
            playerSeasonStat =>
                playerSeasonStat.player_id ===
                parseInt(playerDataAndHeadshot[0].id, 10)
        )
        return [
            playerSeasonAverage as player.IPlayerSeasonStats,
            playerDataAndHeadshot[0],
            playerDataAndHeadshot[1],
        ]
    })

    // remove players that haven't played in an nba game this season
    const filteredPLayerSeasonStatsAndStatsAndHeadshots =
        playerSeasonStatsAndStatsAndHeadshots.filter(
            playerSeasonStatAndStatAndHeadshot =>
                playerSeasonStatAndStatAndHeadshot[0] !== undefined
        )

    return [team, filteredPLayerSeasonStatsAndStatsAndHeadshots]
}

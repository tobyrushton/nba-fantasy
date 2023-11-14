import 'server-only'

import { FC } from 'react'
import { calculateFantasy } from '@/lib/calculateFantasy'
import { LeaderItem } from './LeaderItem'
import styles from './Teams.module.scss'

interface ILeaderListProps {
    playerSeasonStatsAndStatsAndHeadshots: [
        player.IPlayerSeasonStats,
        player.IPlayer,
        string,
    ][]
}

type TStat = 'pts' | 'reb' | 'ast' | 'stl' | 'blk'

export const LeaderList: FC<ILeaderListProps> = ({
    playerSeasonStatsAndStatsAndHeadshots,
}) => {
    const getLeaders = (stat: TStat): team.IStatLeader[] => {
        return playerSeasonStatsAndStatsAndHeadshots
            .sort((a, b) => (a[0][stat] > b[0][stat] ? -1 : 1))
            .filter((_, i) => i < 4)
            .map(player => ({
                player_name: `${player[1].first_name} ${player[1].last_name}`,
                player_id: player[1].id,
                value: player[0][stat],
                headshot: player[2],
            }))
    }

    const pointLeaders: team.IStatLeader[] = getLeaders('pts')
    const reboundLeaders: team.IStatLeader[] = getLeaders('reb')
    const assistLeaders: team.IStatLeader[] = getLeaders('ast')
    const stealLeaders: team.IStatLeader[] = getLeaders('stl')
    const blockLeaders: team.IStatLeader[] = getLeaders('blk')

    const fantasyLeaders: team.IStatLeader[] =
        playerSeasonStatsAndStatsAndHeadshots
            .sort((a, b) =>
                calculateFantasy(a[0]) > calculateFantasy(b[0]) ? -1 : 1
            )
            .filter((_, i) => i < 4)
            .map(player => ({
                player_name: `${player[1].first_name} ${player[1].last_name}`,
                player_id: player[1].id,
                value: calculateFantasy(player[0]),
                headshot: player[2],
            }))

    return (
        <div className={styles.leaders}>
            <LeaderItem players={pointLeaders} statName="Points Per Game" />
            <LeaderItem players={reboundLeaders} statName="Rebounds Per Game" />
            <LeaderItem players={assistLeaders} statName="Assists Per Game" />
            <LeaderItem players={stealLeaders} statName="Steals Per Game" />
            <LeaderItem players={blockLeaders} statName="Blocks Per Game" />
            <LeaderItem
                players={fantasyLeaders}
                statName="Fantasy Points Per Game"
            />
        </div>
    )
}

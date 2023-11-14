import 'server-only'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Teams.module.scss'

interface ILeaderItemProps {
    players: team.IStatLeader[]
    statName: string
}

export const LeaderItem: FC<ILeaderItemProps> = ({ players, statName }) => (
    <div className={styles.leader}>
        <h3>{statName}</h3>
        <Link
            className={styles.leaderTop}
            href={`/player/${players[0].player_id}`}
        >
            <p>{players[0].player_name}</p>
            <p>{players[0].value}</p>
            <Image
                src={players[0].headshot}
                alt={players[0].player_name}
                fill
            />
        </Link>
        <div className={styles.leaderBottom}>
            {players.slice(1).map(player => (
                <Link
                    href={`/player/${player.player_id}`}
                    key={player.player_id}
                >
                    <p>{player.player_name}</p>
                    <p>{player.value}</p>
                    <Image
                        src={player.headshot}
                        alt={player.player_name}
                        fill
                    />
                </Link>
            ))}
        </div>
    </div>
)

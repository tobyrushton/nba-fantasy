import 'server-only'

import { FC } from 'react'
import Link from 'next/link'
import { calculateFantasy } from '@/lib/calculateFantasy'
import { IPlayerBarProps } from './types'
import styles from './PlayerBar.module.scss'

const PlayerBar: FC<IPlayerBarProps> = ({ player, playerSeasonStats }) => (
    <Link className={styles.playerBar} href={`/player/${player.id}`}>
        <p aria-label="team">
            {player.first_name} {player.last_name}
            <span>{player.team.full_name}</span>
        </p>
        <p aria-label="ppg">
            <span>PPG</span>
            {playerSeasonStats.pts}
        </p>
        <p aria-label="ast">
            <span>AST</span>
            {playerSeasonStats.ast}
        </p>
        <p aria-label="reb">
            <span>REB</span>
            {playerSeasonStats.reb}
        </p>
        <p aria-label="stl">
            <span>STL</span>
            {playerSeasonStats.stl}
        </p>
        <p aria-label="blk">
            <span>BLK</span>
            {playerSeasonStats.blk}
        </p>
        <p aria-label="fg">
            <span>FG%</span>
            {Math.round(
                (playerSeasonStats.fg_pct * 100 + Number.EPSILON) * 100
            ) / 100}
            %
        </p>
        <p aria-label="fpts">
            <span>FPTS</span>
            {calculateFantasy(playerSeasonStats)}
        </p>
    </Link>
)
export default PlayerBar

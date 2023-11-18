import 'server-only'

import { FC } from 'react'
import styles from './LoadingSpinner.module.scss'

export const LoadingSpinner: FC = () => (
    <div className={styles.loadSpinner} data-testid="loading-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>
)

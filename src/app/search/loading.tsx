import 'server-only'

import { FC } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import styles from './Search.module.scss'

const Loading: FC = () => (
    <div className={styles.container}>
        <LoadingSpinner />
    </div>
)

export default Loading

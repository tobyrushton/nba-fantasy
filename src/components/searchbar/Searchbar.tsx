'use client'

import { BaseSyntheticEvent, FC } from 'react'
import { ISearchBarProps } from './types'
import styles from './Searchbar.module.scss'

const Searchbar: FC<ISearchBarProps> = ({ value, onChange }) => (
    <input
        className={styles.searchbar}
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e: BaseSyntheticEvent) => onChange(e.target.value)}
    />
)

export default Searchbar

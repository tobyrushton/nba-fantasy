'use client'

import { BaseSyntheticEvent, FC, useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import styles from './Searchbar.module.scss'

const Searchbar: FC = () => {
    const [value, setValue] = useState<string>('')
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSearch = (): void => {
        const current = new URLSearchParams(searchParams)
        current.set('term', value)

        const search = current.toString()
        const query = search ? `?${search}` : ''
        if (pathname.startsWith('/search'))
            router.replace(`${pathname}${query}`)
        else router.push(`/search${query}`)
    }

    useEffect(() => {
        if (pathname.startsWith('/search')) {
            const term = searchParams.get('term')
            if (term) setValue(term)
        }
    }, [searchParams, pathname])

    return (
        <form
            className={styles.form}
            onSubmit={(e: BaseSyntheticEvent) => {
                e.preventDefault()
                handleSearch()
            }}
        >
            <input
                className={styles.searchbar}
                type="text"
                placeholder="Search..."
                value={value}
                onChange={(e: BaseSyntheticEvent) => setValue(e.target.value)}
            />
        </form>
    )
}

export default Searchbar

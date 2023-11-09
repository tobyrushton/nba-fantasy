import Searchbar from '@/components/searchbar/Searchbar'
import { ReactNode } from 'react'

// mock root layout
const Layout = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <div>
            <Searchbar />
            {children}
        </div>
    )
}

export default Layout

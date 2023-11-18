import 'server-only'

import { FC, Suspense } from 'react'
import { PlayerList } from './PlayerList'
import Loading from './loading'

interface ISearchPageProps {
    searchParams: {
        term: string
    }
}

const Page: FC<ISearchPageProps> = ({ searchParams: { term } }) => (
    <Suspense key={term} fallback={<Loading />}>
        <PlayerList search={term} />
    </Suspense>
)

export default Page

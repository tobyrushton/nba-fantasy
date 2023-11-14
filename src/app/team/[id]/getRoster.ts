import jsdom from 'jsdom'

const { JSDOM } = jsdom

export const getRoster = async (
    teamName: string,
    teamAbbreviation: string
): Promise<[string, string][]> => {
    const res = await fetch(
        `https://www.espn.co.uk/nba/team/roster/_/name/${teamAbbreviation}/${teamName}`
    )
    const dom = new JSDOM(await res.text())
    const rosterTableBody =
        dom.window.document.querySelector('.Table__TBODY')?.children ?? []
    const players: string[] = []

    for (let i = 0; i < rosterTableBody.length; i++) {
        players.push(rosterTableBody[i].innerHTML)
    }

    const playerNames: string[] = []
    const playerHeadshots: string[] = []

    players.forEach(player => {
        // find player names
        const firstLink = player.match(/<a.*?>(.*?)<\/a>/)![0]
        const name = firstLink.match(/title="(.*?)"/)![1]
        playerNames.push(name)
        // find headshots
        const headshot = player.match(/<img.*?>/)![0]
        const headshotUrl = headshot.match(/alt="(.*?)"/)![1]
        playerHeadshots.push(headshotUrl)
    })

    const playerNamesAndHeadshots: [string, string][] = []
    for (let i = 0; i < playerNames.length; i++) {
        playerNamesAndHeadshots.push([playerNames[i], playerHeadshots[i]])
    }

    return playerNamesAndHeadshots
}

/* eslint @typescript-eslint/no-unused-vars: 0 */
// disabled rule due to it producing error

namespace team {
    interface ITeam {
        id: number
        abbreviation: string
        city: string
        conference: string
        division: string
        full_name: string
        name: string
    }

    interface IStatLeader {
        value: number
        player_name: string
        player_id: string
        headshot: string
    }
}

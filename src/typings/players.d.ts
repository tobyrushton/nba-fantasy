namespace player {
        interface IPlayer {
                id: string
                first_name: string 
                last_name: string
                position: string
                height_feet: number | null
                height_inches: number | null
                weight_pounds: number | null
                team: team.ITeam
        }
}
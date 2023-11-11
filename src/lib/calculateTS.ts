// function to calculate TS% as per bbref
// https://www.basketball-reference.com/about/glossary.html

interface ICalculateTSParams {
    pts: number
    fga: number
    fta: number
}

export const calculateTS = ({ pts, fga, fta }: ICalculateTSParams): number => {
    const ts = (pts / (2 * (fga + 0.44 * fta))) * 100
    return ts ? Math.round((ts + Number.EPSILON) * 100) / 100 : 0
}

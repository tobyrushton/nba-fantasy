import { calculateFantasy } from '@/lib/calculateFantasy'
import { playerStatsData } from '../mocks/data'

describe('calculateFantasy()', () => {
    it('should calculate fantasy points correctly', () => {
        const fantasyPoints = calculateFantasy(playerStatsData[0])
        expect(fantasyPoints).toEqual(60.4)

        const fantasyPoints2 = calculateFantasy(playerStatsData[1])
        expect(fantasyPoints2).toEqual(39)

        const fantasyPoints3 = calculateFantasy(playerStatsData[2])
        expect(fantasyPoints3).toEqual(9.6)
    })
})

import { calculateTS } from '@/lib/calculateTS'

describe('calculateTS()', () => {
    it('corerctly calculates TS%', () => {
        expect(calculateTS({ pts: 25, fga: 15, fta: 10 })).toBe(64.43)
        expect(calculateTS({ pts: 0, fga: 0, fta: 0 })).toBe(0)
        expect(calculateTS({ pts: 0, fga: 1, fta: 0 })).toBe(0)
        expect(calculateTS({ pts: 0, fga: 0, fta: 1 })).toBe(0)
        expect(calculateTS({ pts: 35, fga: 20, fta: 10 })).toBe(71.72)
    })
})

import sum from "./calc";

describe('Sum', () => {
    it('should sum two numbers', () => {
        const result = sum(1, 2);
        expect(result).toBe(3);
    })

    it('should sum negative numbers', () => {
        const result = sum(-1, -2);
        expect(result).toBe(-3);
    })

    it('should sum positive and negative numbers', () => {
        const result = sum(1, -2);
        expect(result).toBe(-1);
    })
})
import { setupCounter } from "./counter";
import { jest } from '@jest/globals';


describe('Counter', () => {
    it('should render', () => {
        const mockButton = {
            innerHTML: '',
            addEventListener: jest.fn(),
        };

        setupCounter(mockButton);

        expect(mockButton.innerHTML).toBe('count is 0');
        expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
})
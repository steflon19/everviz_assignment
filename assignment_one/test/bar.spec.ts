import { DRINKS, calculateCost, } from "../src/bar";
import { expect, assert } from 'chai';
import 'mocha';

describe('Ordering drinks gives the expected price', () => {
    it('Correctly calculates 74kr for a Heineken', () => {
        const price = calculateCost(DRINKS.BEER_ONE, false, 1);
        expect(price).to.equal(74);
    });
    it('Correctly calculates 110kr for a Corona', () => {
        const price = calculateCost(DRINKS.BEER_TWO, false, 1);
        expect(price).to.equal(110);
    });
    it('Correctly calculates 103kr for a Mojito cocktail', () => {
        const price = calculateCost(DRINKS.COCKTAIL_ONE, false, 1);
        expect(price).to.equal(103);
    });
    it('Correctly calculates 115kr for a Margerita cocktail', () => {
        const price = calculateCost(DRINKS.COCKTAIL_TWO, false, 1);
        expect(price).to.equal(115);
    });
    it('Correctly calculates 127.5 kr for a special bacardi cocktail', () => {
        const price = calculateCost(DRINKS.SPECIAL_COCKTAIL, false, 1);
        expect(price).to.equal(128);
    });
    it('Correctly calculates the price for multiple drinks', () => {
        const price = calculateCost(DRINKS.BEER_ONE, false, 3);
        expect(price).to.equal(222);
        const price2 = calculateCost(DRINKS.COCKTAIL_ONE, false, 2);
        expect(price2).to.equal(206);
    });
});

describe('Student discounts are correctly handled', () => {
    it('Correctly gives 10% discount for beers', () => {
        const price = calculateCost(DRINKS.BEER_ONE, true, 1);
        expect(price).to.equal(67);
        const price2 = calculateCost(DRINKS.BEER_TWO, true, 1);
        expect(price2).to.equal(99);
    });
    it('Also gives discount for multiple beers', () => {
        const price = calculateCost(DRINKS.BEER_ONE, true, 3);
        expect(price).to.equal(200);
    });
    it('Does not allow discounts for cocktails', () => {
        const price = calculateCost(DRINKS.COCKTAIL_ONE, true, 1);
        expect(price).to.equal(103);
        const price1 = calculateCost(DRINKS.COCKTAIL_TWO, true, 1);
        expect(price1).to.equal(115);
        const price2 = calculateCost(DRINKS.SPECIAL_COCKTAIL, false, 1);
        expect(price2).to.equal(128);
    });
    it('Correctly applies the student discount for multiple drinks', () => {
        const price = calculateCost(DRINKS.BEER_ONE, true, 3);
        expect(price).to.equal(200);
        const price2 = calculateCost(DRINKS.COCKTAIL_ONE, true, 2);
        expect(price2).to.equal(206);
    });
});

describe('Error handling is correct', () => {
    it('Prevent people from ordering drinks that don\'t exist', () => {
        const COCKTAIL_THREE = 'chili_martini';
        assert.throws(() => calculateCost(COCKTAIL_THREE as DRINKS, false, 1), 'Drink does not exist');
    });
    it('Will NOT allow ordering more than two cocktails', () => {
        assert.throws(() => calculateCost(DRINKS.COCKTAIL_ONE, false, 3), 'Not allowed to order more than 2 cocktails');
    });
    it('Will allow ordering more than 2 beers', () => {
        assert.doesNotThrow(() => calculateCost(DRINKS.BEER_ONE, false, 3))
    });
    it('Throws an error if the amount is not a positive integer', () => {
        assert.throws(() => calculateCost(DRINKS.BEER_ONE, false, -1), 'Amount must be a positive integer');
        assert.throws(() => calculateCost(DRINKS.BEER_ONE, false, 0), 'Amount must be a positive integer');
        assert.throws(() => calculateCost(DRINKS.BEER_ONE, false, 1.5), 'Amount must be a positive integer');
    });
    it('Throws an error if the drink parameter is not a string', () => {
        assert.throws(() => calculateCost(null, false, 1), 'Drink does not exist');
        assert.throws(() => calculateCost(undefined, false, 1), 'Drink does not exist');
        assert.throws(() => calculateCost({} as DRINKS, false, 1), 'Drink does not exist');
    });
});

export const BEER_ONE = "heineken";
export const BEER_TWO = "corona";
export const COCKTAIL_ONE = "mojito";
export const COCKTAIL_TWO = "margarita";
export const SPECIAL_COCKTAIL = "special_bacardi";

export type Drink = typeof BEER_ONE | typeof BEER_TWO | typeof COCKTAIL_ONE | typeof COCKTAIL_TWO | typeof SPECIAL_COCKTAIL;


enum INGREDIENTS {
    RUM = 65,
    MINT = 10,
    LIME_JUICE = 10,
    SUGAR = 10,
    TONIC_WATER = 20,
    GIN = 85,
};

export function calculateCost(drink: Drink, isStudent: boolean, amount: number): number {
    if (!Number.isInteger(amount) || amount < 1) {
        throw new Error("Amount must be a positive integer");
    } 
    if ((drink === COCKTAIL_ONE || drink === COCKTAIL_TWO || drink === SPECIAL_COCKTAIL) && amount > 2) {
        throw new Error("Not allowed to order more than 2 cocktails" + drink);
    }

    let finalPrice: number;
    switch (drink) {
        case BEER_ONE:
            finalPrice = 74;
            break;
        case BEER_TWO:
            finalPrice = 110;
            break;
        case COCKTAIL_ONE:
            finalPrice = 103;
            break;
        case COCKTAIL_TWO:
            finalPrice = INGREDIENTS.GIN + INGREDIENTS.TONIC_WATER + INGREDIENTS.SUGAR;
            break;
        case SPECIAL_COCKTAIL:
            finalPrice =
                INGREDIENTS.GIN / 2 +
                INGREDIENTS.RUM +
                INGREDIENTS.MINT +
                INGREDIENTS.SUGAR;
            break;
        default:
            throw new Error("Drink does not exist");
    }

    if (isStudent && (drink === BEER_ONE || drink === BEER_TWO)) {
        finalPrice = finalPrice - finalPrice / 10;
    }

    if (!finalPrice) {
        return 0;
    }

    return Math.ceil(finalPrice * amount);
}
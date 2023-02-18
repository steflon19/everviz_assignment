export enum DRINKS {
    BEER_ONE = "heineken",
    BEER_TWO = "corona",
    COCKTAIL_ONE = "mojito",
    COCKTAIL_TWO = "margarita",
    SPECIAL_COCKTAIL = "special_bacardi",
}

enum INGREDIENTS {
    RUM = 65,
    MINT = 10,
    LIME_JUICE = 10,
    SUGAR = 10,
    TONIC_WATER = 20,
    GIN = 85,
};

export function calculateCost(drink: DRINKS, isStudent: boolean, amount: number): number {
    if (!Number.isInteger(amount) || amount < 1) {
        throw new Error("Amount must be a positive integer");
    } 
    if ((drink === DRINKS.COCKTAIL_ONE || drink === DRINKS.COCKTAIL_TWO || drink === DRINKS.SPECIAL_COCKTAIL) && amount > 2) {
        throw new Error("Not allowed to order more than 2 cocktails" + drink);
    }

    let finalPrice: number;
    switch (drink) {
        case DRINKS.BEER_ONE:
            finalPrice = 74;
            break;
        case DRINKS.BEER_TWO:
            finalPrice = 110;
            break;
        case DRINKS.COCKTAIL_ONE:
            finalPrice = 103;
            break;
        case DRINKS.COCKTAIL_TWO:
            finalPrice = INGREDIENTS.GIN + INGREDIENTS.TONIC_WATER + INGREDIENTS.SUGAR;
            break;
        case DRINKS.SPECIAL_COCKTAIL:
            finalPrice =
                INGREDIENTS.GIN / 2 +
                INGREDIENTS.RUM +
                INGREDIENTS.MINT +
                INGREDIENTS.SUGAR;
            break;
        default:
            throw new Error("Drink does not exist");
    }

    if (isStudent && (drink === DRINKS.BEER_ONE || drink === DRINKS.BEER_TWO)) {
        finalPrice = finalPrice - finalPrice / 10;
    }

    if (!finalPrice) {
        return 0;
    }

    return Math.ceil(finalPrice * amount);
}
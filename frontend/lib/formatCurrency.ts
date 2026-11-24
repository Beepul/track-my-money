type CurrencyPreference = {
    currency: string;
    currencyPosition: "BEFORE" | "AFTER";
}

export const formatCurrency = (
    amount: number,
    preferences: CurrencyPreference
) => {
    const formattedAmount = new Intl.NumberFormat("en-AU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Math.abs(amount));

    const symbols: Record<string, string> = {
        AUD: "$",
        USD: "$",
        NPR: "Rs",
        GBP: "£",
        EUR: "€",
        INR: "₹"
    };

    const symbol = symbols[preferences.currency] || preferences.currency;

    const result = preferences.currencyPosition === "BEFORE"
        ? `${symbol}${formattedAmount}`
        : `${formattedAmount}${symbol}`;

    return amount < 0 ? `-${result}` : result;
};
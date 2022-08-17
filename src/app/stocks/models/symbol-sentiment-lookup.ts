import { SymbolSentimentDetails } from "./symbol-sentiment-details";

export interface SymbolSentimentLookup {
    symbol: string;
    data: SymbolSentimentDetails[];
}

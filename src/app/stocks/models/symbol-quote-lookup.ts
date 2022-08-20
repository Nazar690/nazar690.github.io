import { SymbolQuote } from "./symbol-quote";
import { SymbolModel } from "./symbol-model";

export interface SymbolQuoteLookup {
    symbol: SymbolModel;
    quote: SymbolQuote;
}

import { Stock } from "./stock";
import { SymbolModel } from "./symbol-model";

export interface SymbolQuoteLookup {
    symbol: SymbolModel;
    quote: Stock;
}

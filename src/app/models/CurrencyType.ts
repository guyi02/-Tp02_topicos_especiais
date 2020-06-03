export type CurrencyResponse = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  bpi: {
    [key in 'USD' | 'BRL']: {
      code: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
};

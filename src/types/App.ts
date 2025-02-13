type ConverterType = 'text' | 'dex' | 'hex';
type ConvertToFunction = ({
  value,
  type,
}: {
  value: string;
  type: ConverterType;
}) => void;

export type { ConverterType, ConvertToFunction as ConvertTo };

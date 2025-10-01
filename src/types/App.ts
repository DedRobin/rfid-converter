type ConverterType = 'text' | 'dex' | 'hex';

type ConvertToFunction = ({
  value,
  type,
}: {
  value: string;
  type: ConverterType;
}) => void;

type NotifyType = 'error' | 'default';

export type { ConverterType, ConvertToFunction as ConvertTo, NotifyType };

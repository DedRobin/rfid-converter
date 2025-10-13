type PositionalNumeralSystem = 'text' | 'dex' | 'hex';

type ConverterHandler = ({
  value,
  type,
}: {
  value: string;
  type: PositionalNumeralSystem;
}) => void;

type NotifyType = 'error' | 'default';

export type { PositionalNumeralSystem, ConverterHandler, NotifyType };

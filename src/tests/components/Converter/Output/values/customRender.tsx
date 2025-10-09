import { RenderOptions, render } from '@testing-library/react';
import CardFormatContext from '@contexts/CardFormat';
import { CardFormatContextProps } from '@contexts/interfaces';
import { ReactElement } from 'react';

const renderWithCardFormatContext = (
  ui: ReactElement,
  value: CardFormatContextProps,
  renderOptions?: RenderOptions
) => {
  return render(
    <CardFormatContext.Provider value={value}>{ui}</CardFormatContext.Provider>,
    renderOptions
  );
};

export { renderWithCardFormatContext as renderWith };

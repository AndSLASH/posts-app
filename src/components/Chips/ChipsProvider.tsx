import { type FC, type ReactNode } from 'react';
import { ChipsContext } from './useChipsContext';
import type { Chip } from '@/types/Chip';

interface IChipsContextProviderProps {
  valueList?: Chip[];
  selectedValue?: string;
  onSelect: (id: string) => void;
  children: ReactNode;
}

export const ChipsContextProvider: FC<IChipsContextProviderProps> = props => {
  const { children, valueList, onSelect, selectedValue } = props;

  const checkIsSelected = (id: string) => id === selectedValue;

  return (
    <ChipsContext.Provider
      value={{
        valueList,
        onSelect,
        selectedValue,
        checkIsSelected,
      }}
    >
      {children}
    </ChipsContext.Provider>
  );
};

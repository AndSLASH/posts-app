import type { Chip } from '@/types/Chip';
import { createContext, useContext } from 'react';

interface IChipsContextState {
  valueList?: Chip[];
  selectedValue?: string;
  onSelect: (id: string) => void;
  checkIsSelected: (id: string) => boolean;
}

export const ChipsContext = createContext<IChipsContextState>({
  valueList: undefined,
  selectedValue: undefined,
  onSelect: () => {},
  checkIsSelected: () => false,
});

export const useChipsContext = () => {
  const context = useContext(ChipsContext);

  if (!context) {
    throw new Error('useChipsContext must be used within ChipsContextProvider');
  }

  return context;
};

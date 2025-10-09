import type { Chip } from '@/types/Chip';
import { ChipsContextProvider } from './ChipsProvider';
import ChipsSelectList from './ChipsSelectList';

interface IChipsSelectProps {
  selectedValue?: string;
  valueList: Chip[];
  onSelect: (id: string) => void;
}

const ChipsSelect = (props: IChipsSelectProps) => {
  const { valueList, selectedValue, onSelect } = props;

  return (
    <ChipsContextProvider
      valueList={valueList}
      onSelect={onSelect}
      selectedValue={selectedValue}
    >
      <ChipsSelectList />
    </ChipsContextProvider>
  );
};

export default ChipsSelect;

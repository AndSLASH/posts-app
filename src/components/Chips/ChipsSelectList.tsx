import Chips from './Chips';
import { useChipsContext } from './useChipsContext';

const ChipsSelectList = () => {
  const { valueList, onSelect, checkIsSelected } = useChipsContext();

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {valueList?.map(chip => {
        return (
          <Chips
            key={chip.id}
            value={chip}
            isSelected={checkIsSelected(chip.id)}
            onClick={onSelect}
          />
        );
      })}
    </div>
  );
};

export default ChipsSelectList;

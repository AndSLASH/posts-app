import { Check } from 'lucide-react';

interface IChipsProps {
  value: { label: string; category: string; id: string };
  isSelected?: boolean;
  onClick: (id: string) => void;
}

const Chips = (props: IChipsProps) => {
  const { isSelected = false, value, onClick } = props;

  return (
    <button
      className={`relative flex items-center justify-center min-w-[250px] min-h-[100px] rounded text-white hover:text-[#61dafb] hover:bg-gray-700 transition-colors ease-in-out duration-300 cursor-pointer
      ${
        isSelected
          ? 'bg-[#61dafb] !text-[#282c34] border-2 border-[#61dafb] hover:!bg-[#61dafb] !cursor-default'
          : 'border-2 hover:border-[#61dafb] hover:bg-gray-100'
      }`}
      type="button"
      onClick={() => onClick(value.id)}
    >
      <div
        className={`absolute top-2 right-2 flex justify-center items-center w-[25px] h-[25px] rounded-xl bg-[#282c34] transition-all ease-in-out duration-300
          ${
            isSelected
              ? '!text-[#282c34] border-2 border-[#61dafb]'
              : 'border-2'
          } 
        `}
      >
        {isSelected && <Check className="text-[#61dafb]" size={16} />}
      </div>
      <div>
        <h2 className="text-lg font-semibold">{value.label}</h2>
        <p className="text-sm">{value.category}</p>
      </div>
    </button>
  );
};

export default Chips;

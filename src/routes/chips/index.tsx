import { useState } from 'react';
import { ChipsSelect } from '@/components/Chips';
import Container from '@/components/Container';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useChipsData } from '@/components/Chips/useChipsData';

export const Route = createFileRoute('/chips/')({
  component: ChipsIndexPage,
});

function ChipsIndexPage() {
  const [selectedChip, setSelectedChip] = useState<string>('');
  const { t } = useTranslation('chips');

  const { data: techChips, loading, error } = useChipsData();

  if (loading) {
    return (
      <section className="...">
        <Container>
          <div className="text-center text-[#61dafb]">Loading...</div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="...">
        <Container>
          <div className="text-center text-red-400">Failed to load chips</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="h-screen py-10 px-5 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Container>
        <h1 className="text-4xl font-bold mb-8 text-center text-[#61dafb]">
          {t('title')}
        </h1>
        <ChipsSelect
          valueList={techChips}
          selectedValue={selectedChip}
          onSelect={setSelectedChip}
        />
        {selectedChip && (
          <div className="mt-10">
            <h2 className="text-4xl font-semibold text-center text-[#61dafb]">
              {techChips.find(chip => chip.id === selectedChip)?.label}
            </h2>
            <p className="text-xl mt-5 max-w-3xl mx-auto">
              {techChips.find(chip => chip.id === selectedChip)?.description}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

import { useState } from 'react';
import { ChipsSelect } from '@/components/Chips';
import Container from '@/components/Container';
import { createFileRoute } from '@tanstack/react-router';
import type { Chip } from '@/types/Chip';

export const Route = createFileRoute('/chips/')({
  component: ChipsIndexPage,
});

const techChips: Chip[] = [
  {
    id: '1',
    label: 'React',
    category: 'library',
    description:
      'Библиотека для создания пользовательских интерфейсов. Позволяет строить приложения из компонентов, которые обновляются без перезагрузки страницы.',
  },
  {
    id: '2',
    label: 'TypeScript',
    category: 'language',
    description:
      'Язык программирования, который добавляет статическую типизацию в JavaScript.',
  },
  {
    id: '3',
    label: 'TanStack Router',
    category: 'routing',
    description: 'Библиотека для управления маршрутами в React-приложениях.',
  },
  {
    id: '4',
    label: 'Tailwind CSS',
    category: 'framework',
    description:
      'Утилитарный CSS-фреймворк для быстрого создания пользовательских интерфейсов.',
  },
  {
    id: '5',
    label: 'Vite',
    category: 'build tool',
    description:
      'Инструмент сборки для современных веб-приложений, обеспечивающий быструю разработку и оптимизацию.',
  },
];

function ChipsIndexPage() {
  const [selectedChip, setSelectedChip] = useState<string>('');

  return (
    <section className="h-screen py-10 px-5 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Container>
        <h1 className="text-4xl font-bold mb-8 text-center text-[#61dafb]">
          Chips Demo
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

import { useEffect, useState } from 'react';
import i18n from 'i18next';
import type { Chip } from '@/types/Chip';

const modules = import.meta.glob('/src/data/chips/*.json') as Record<
  string,
  () => Promise<{ default: Chip[] }>
>;

export function useChipsData(): {
  data: Chip[];
  loading: boolean;
  error?: Error;
} {
  const [data, setData] = useState<Chip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(undefined);

      const lang = (i18n.language || 'ua').split('-')[0];

      const path = `/src/data/chips/chips.${lang}.json`;

      let importer = modules[path];

      if (!importer) {
        const fallback = '/src/data/chips/chips.ua.json';
        importer = modules[fallback];
      }

      if (!importer) {
        setData([]);
        setLoading(false);
        return;
      }

      try {
        const mod = await importer();

        const items = (mod && (mod.default ?? mod)) as Chip[];
        if (mounted) {
          setData(items || []);
        }
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    const onLangChanged = () => {
      load();
    };
    i18n.on('languageChanged', onLangChanged);

    return () => {
      mounted = false;
      i18n.off('languageChanged', onLangChanged);
    };
  }, []);

  return { data, loading, error };
}

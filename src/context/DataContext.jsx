import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { defaultData } from '../data/defaultData';
import { uid } from '../lib/utils';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'portfolio:data:v1';
const DataContext = createContext(null);

const clone = (v) => JSON.parse(JSON.stringify(v));

/** Kayıtlı veriyi varsayılanlarla birleştirir — yeni alanlar eklendiğinde eski kayıtlar bozulmaz. */
function merge(stored) {
  const base = clone(defaultData);
  if (!stored || typeof stored !== 'object') return base;
  return {
    ...base,
    ...stored,
    profile: { ...base.profile, ...stored.profile },
    contact: { ...base.contact, ...stored.contact },
    about: { ...base.about, ...stored.about },
    settings: { ...base.settings, ...stored.settings },
    socials: Array.isArray(stored.socials) ? stored.socials : base.socials,
    services: Array.isArray(stored.services) ? stored.services : base.services,
    references: Array.isArray(stored.references) ? stored.references : base.references,
    messages: Array.isArray(stored.messages) ? stored.messages : base.messages,
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? merge(JSON.parse(raw)) : clone(defaultData);
  } catch {
    return clone(defaultData);
  }
}

export function DataProvider({ children }) {
  const toast = useToast();
  const [data, setData] = useState(load);
  const fromOtherTab = useRef(false);

  // Kalıcılık
  useEffect(() => {
    if (fromOtherTab.current) {
      fromOtherTab.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      toast.error('Depolama alanı doldu', 'Yüklediğiniz görselleri küçültmeyi veya bağlantı kullanmayı deneyin.');
    }
  }, [data, toast]);

  // Diğer sekmelerle anlık senkron (site açıkken admin’den yapılan değişiklikler yansır)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      fromOtherTab.current = true;
      setData(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const api = useMemo(
    () => ({
      add: (collection, item) => {
        const created = { id: uid(collection.slice(0, 3)), ...item };
        setData((d) => ({ ...d, [collection]: [...d[collection], created] }));
        return created;
      },
      update: (collection, id, patch) =>
        setData((d) => ({
          ...d,
          [collection]: d[collection].map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      remove: (collection, id) =>
        setData((d) => ({ ...d, [collection]: d[collection].filter((x) => x.id !== id) })),
      move: (collection, id, dir) =>
        setData((d) => {
          const arr = [...d[collection]];
          const i = arr.findIndex((x) => x.id === id);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= arr.length) return d;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          return { ...d, [collection]: arr };
        }),
      setSection: (key, patch) => setData((d) => ({ ...d, [key]: { ...d[key], ...patch } })),
      addMessage: (msg) =>
        setData((d) => ({
          ...d,
          messages: [{ id: uid('msg'), createdAt: new Date().toISOString(), read: false, ...msg }, ...d.messages],
        })),
      replaceAll: (next) => setData(merge(next)),
      reset: () => setData(clone(defaultData)),
    }),
    []
  );

  const value = useMemo(() => ({ data, ...api }), [data, api]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData, DataProvider içinde kullanılmalı');
  return ctx;
};

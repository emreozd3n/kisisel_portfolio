import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

export default function Page({ title, children }) {
  const { data } = useData();
  useEffect(() => {
    document.title = `${title} — ${data.profile.name}`;
  }, [title, data.profile.name]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

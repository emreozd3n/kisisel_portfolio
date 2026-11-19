import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Inbox, Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { cn, formatDate, initials } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { ConfirmDialog, EmptyState, IconButton, PanelHeader } from '../ui';

export default function MessagesPanel() {
  const { data, update, remove } = useData();
  const toast = useToast();
  const [openId, setOpenId] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [filter, setFilter] = useState('all');

  const unread = data.messages.filter((m) => !m.read).length;
  const list = filter === 'unread' ? data.messages.filter((m) => !m.read) : data.messages;

  const toggleOpen = (m) => {
    setOpenId((id) => (id === m.id ? null : m.id));
    if (!m.read) update('messages', m.id, { read: true });
  };

  const markAllRead = () => {
    data.messages.filter((m) => !m.read).forEach((m) => update('messages', m.id, { read: true }));
    toast.success('Tüm mesajlar okundu olarak işaretlendi');
  };

  return (
    <>
      <PanelHeader
        title="Mesajlar"
        description="İletişim formundan gelen mesajlar."
        action={
          unread > 0 && (
            <Button variant="secondary" onClick={markAllRead}>
              <MailOpen className="size-4" /> Tümünü okundu say
            </Button>
          )
        }
      />

      <div className="mb-4 flex gap-1">
        {[
          { k: 'all', l: `Tümü (${data.messages.length})` },
          { k: 'unread', l: `Okunmamış (${unread})` },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-[13px] transition',
              filter === f.k ? 'bg-white/[0.07] text-white' : 'text-zinc-500 hover:text-zinc-200'
            )}
          >
            {f.l}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState icon={Inbox} title="Gelen kutusu boş" text="Yeni mesajlar burada görünecek." />
      ) : (
        <ul className="space-y-2">
          {list.map((m) => {
            const isOpen = openId === m.id;
            return (
              <li key={m.id} className={cn('overflow-hidden rounded-2xl border transition', isOpen ? 'border-white/[0.12] bg-ink-900' : 'border-white/[0.06] bg-ink-900/50 hover:border-white/[0.1]')}>
                <button onClick={() => toggleOpen(m)} className="flex w-full items-center gap-4 p-4 text-left">
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.05] text-xs font-semibold text-zinc-300">
                    {initials(m.name)}
                    {!m.read && <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-ink-900 bg-violet-400" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className={cn('truncate text-sm', m.read ? 'text-zinc-300' : 'font-semibold text-white')}>
                        {m.name} <span className="font-normal text-zinc-600">· {m.subject}</span>
                      </p>
                      <span className="shrink-0 text-xs text-zinc-600">{formatDate(m.createdAt)}</span>
                    </div>
                    {!isOpen && <p className="mt-0.5 truncate text-sm text-zinc-500">{m.message}</p>}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-white/[0.06] px-4 pb-4 pt-4 sm:pl-[4.5rem]">
                        <p className="text-xs text-zinc-500">{m.email}</p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{m.message}</p>
                        <div className="mt-5 flex items-center gap-2">
                          <Button as="a" size="sm" href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.subject)}`}>
                            <Reply className="size-3.5" /> Yanıtla
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              update('messages', m.id, { read: false });
                              setOpenId(null);
                            }}
                          >
                            <Mail className="size-3.5" /> Okunmadı yap
                          </Button>
                          <div className="ml-auto">
                            <IconButton icon={Trash2} label="Sil" tone="danger" onClick={() => setToDelete(m)} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Mesajı sil"
        message={`${toDelete?.name ?? ''} tarafından gönderilen mesaj kalıcı olarak silinecek.`}
        onConfirm={() => {
          remove('messages', toDelete.id);
          toast.success('Mesaj silindi');
        }}
      />
    </>
  );
}

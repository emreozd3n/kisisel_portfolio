import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clock, Copy, LoaderCircle, Mail, MapPin, Phone, Send, ArrowUpRight, RotateCcw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { getPlatform } from '../lib/icons';
import { cn, isEmail } from '../lib/utils';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { eyebrowCls, inputCls, inputErrorCls, labelCls } from '../components/ui/styles';

const MAX_MESSAGE = 1000;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Lütfen adınızı girin (en az 2 karakter).';
  if (!v.email.trim()) e.email = 'E-posta adresi gerekli.';
  else if (!isEmail(v.email)) e.email = 'Geçerli bir e-posta adresi girin.';
  if (!v.subject) e.subject = 'Bir konu seçin.';
  if (v.message.trim().length < 10) e.message = 'Mesajınız en az 10 karakter olmalı.';
  else if (v.message.length > MAX_MESSAGE) e.message = `Mesaj en fazla ${MAX_MESSAGE} karakter olabilir.`;
  return e;
}

function ErrorText({ children }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.p
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-[12.5px] text-rose-400"
          role="alert"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const { data, addMessage } = useData();
  const toast = useToast();
  const location = useLocation();
  const { contact, socials, services } = data;

  const subjects = [...services.map((s) => s.title), 'Diğer'];
  const initial = { name: '', email: '', subject: subjects.includes(location.state?.subject) ? location.state.subject : '', message: '', website: '' };

  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const errors = validate(values);
  const showError = (k) => touched[k] && errors[k];

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      toast.error('Form eksik görünüyor', 'Lütfen işaretli alanları kontrol edin.');
      return;
    }
    if (values.website) return; // bot tuzağı
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 900));
    addMessage({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject,
      message: values.message.trim(),
    });
    setStatus('sent');
    toast.success('Mesajınız iletildi', 'En kısa sürede dönüş yapacağım.');
  };

  const resetForm = () => {
    setValues({ ...initial, subject: '' });
    setTouched({});
    setStatus('idle');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      toast.info('E-posta kopyalandı');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Kopyalanamadı');
    }
  };

  const channels = [
    { icon: Phone, label: 'Telefon', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Konum', value: contact.location },
    { icon: Clock, label: 'Çalışma saatleri', value: contact.hours },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pt-36 md:pt-44">
      <SectionHeader
        index="04"
        eyebrow="İletişim"
        title={
          <>
            Bir merhaba ile başlayalım. <span className="text-zinc-500">Gerisini birlikte planlarız.</span>
          </>
        }
        description={`Projenizden kısaca bahsedin; ${contact.responseTime} size dönüş yapıyorum.`}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* İletişim bilgileri */}
        <div className="space-y-4">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-900/60 p-7">
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.2),transparent)] transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <p className={eyebrowCls}>E-posta</p>
              <a href={`mailto:${contact.email}`} className="link-underline relative mt-3 inline-block break-all pb-1 text-xl font-medium text-white sm:text-2xl">
                {contact.email}
              </a>
              <div className="relative mt-6 flex gap-2">
                <Button as="a" href={`mailto:${contact.email}`} size="sm" variant="secondary">
                  <Mail className="size-3.5" /> Mail gönder
                </Button>
                <Button size="sm" variant="ghost" onClick={copyEmail}>
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="divide-y divide-white/[0.06] rounded-3xl border border-white/[0.06] bg-ink-900/40">
              {channels.map((c) => {
                const Inner = (
                  <>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-zinc-400 transition group-hover:text-violet-300">
                      <c.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-zinc-500">{c.label}</span>
                      <span className="block truncate text-[15px] text-zinc-200">{c.value}</span>
                    </span>
                    {c.href && <ArrowUpRight className="ml-auto size-4 text-zinc-600 transition group-hover:text-white" />}
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="group flex items-center gap-4 p-5 transition hover:bg-white/[0.02]">
                        {Inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 p-5">{Inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/[0.06] bg-ink-900/40 p-5">
              <p className={cn(eyebrowCls, 'px-2')}>Sosyal medya</p>
              <ul className="mt-3 grid grid-cols-2 gap-1">
                {socials
                  .filter((s) => s.visible)
                  .map((s) => {
                    const Icon = getPlatform(s.platform).icon;
                    return (
                      <li key={s.id}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.04]"
                        >
                          <Icon className="size-4 text-zinc-500 transition group-hover:text-violet-300" />
                          <span className="min-w-0">
                            <span className="block text-sm text-zinc-200">{s.label}</span>
                            {s.handle && <span className="block truncate text-xs text-zinc-600">{s.handle}</span>}
                          </span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid min-h-[480px] place-items-center text-center"
                >
                  <div>
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mx-auto grid size-16 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_-10px_rgb(52_211_153/0.6)]"
                    >
                      <Check className="size-7" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">Teşekkürler, {values.name.split(' ')[0]}.</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                      Mesajınız bana ulaştı. {contact.responseTime} <span className="text-zinc-300">{values.email}</span> adresine dönüş yapacağım.
                    </p>
                    <Button variant="secondary" className="mt-8" onClick={resetForm}>
                      <RotateCcw className="size-4" /> Yeni mesaj yaz
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">Mesaj kutusu</h3>
                    <p className="mt-1 text-sm text-zinc-500">Tüm alanlar zorunludur.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>Ad Soyad</label>
                      <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={set('name')}
                        onBlur={blur('name')}
                        placeholder="Adınız"
                        aria-invalid={!!showError('name')}
                        className={cn(inputCls, showError('name') && inputErrorCls)}
                      />
                      <ErrorText>{showError('name')}</ErrorText>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>E-posta</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={set('email')}
                        onBlur={blur('email')}
                        placeholder="ornek@mail.com"
                        aria-invalid={!!showError('email')}
                        className={cn(inputCls, showError('email') && inputErrorCls)}
                      />
                      <ErrorText>{showError('email')}</ErrorText>
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>Konu</span>
                    <div className="flex flex-wrap gap-2" role="radiogroup">
                      {subjects.map((s) => (
                        <button
                          key={s}
                          type="button"
                          name="subject"
                          role="radio"
                          aria-checked={values.subject === s}
                          onClick={() => {
                            setValues((v) => ({ ...v, subject: s }));
                            setTouched((t) => ({ ...t, subject: true }));
                          }}
                          className={cn(
                            'rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-200 active:scale-95',
                            values.subject === s
                              ? 'border-violet-400/50 bg-violet-500/15 text-white shadow-[0_0_20px_-8px_rgb(139_92_246/0.9)]'
                              : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200',
                            showError('subject') && values.subject !== s && 'border-rose-500/30'
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <ErrorText>{showError('subject')}</ErrorText>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="message" className={labelCls}>Mesajınız</label>
                      <span className={cn('font-mono text-[11px]', values.message.length > MAX_MESSAGE ? 'text-rose-400' : 'text-zinc-600')}>
                        {values.message.length}/{MAX_MESSAGE}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={set('message')}
                      onBlur={blur('message')}
                      placeholder="Projenizden, hedeflerinizden ve varsa takviminizden bahsedin…"
                      aria-invalid={!!showError('message')}
                      className={cn(inputCls, 'resize-none leading-relaxed', showError('message') && inputErrorCls)}
                    />
                    <ErrorText>{showError('message')}</ErrorText>
                  </div>

                  {/* Bot tuzağı — görünmez */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} className="hidden" aria-hidden />

                  <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-zinc-600">Bilgileriniz yalnızca size dönüş yapmak için kullanılır.</p>
                    <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle className="size-4 animate-spin" /> Gönderiliyor
                        </>
                      ) : (
                        <>
                          Mesajı gönder <Send className="size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

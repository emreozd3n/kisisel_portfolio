import {
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
  FaYoutube,
  FaGithub,
  FaLinkedinIn,
  FaDribbble,
  FaBehance,
  FaTiktok,
  FaMedium,
  FaTelegram,
  FaWhatsapp,
  FaDiscord,
  FaThreads,
} from 'react-icons/fa6';
import {
  Globe,
  AppWindow,
  Workflow,
  Smartphone,
  Code,
  Palette,
  Server,
  Bot,
  ShoppingBag,
  Database,
  PenTool,
  Rocket,
  Gauge,
  Terminal,
  Layers,
  Cpu,
  Mail,
} from 'lucide-react';

export const PLATFORMS = {
  instagram: { label: 'Instagram', icon: FaInstagram },
  x: { label: 'X (Twitter)', icon: FaXTwitter },
  pinterest: { label: 'Pinterest', icon: FaPinterestP },
  youtube: { label: 'YouTube', icon: FaYoutube },
  github: { label: 'GitHub', icon: FaGithub },
  linkedin: { label: 'LinkedIn', icon: FaLinkedinIn },
  dribbble: { label: 'Dribbble', icon: FaDribbble },
  behance: { label: 'Behance', icon: FaBehance },
  tiktok: { label: 'TikTok', icon: FaTiktok },
  threads: { label: 'Threads', icon: FaThreads },
  medium: { label: 'Medium', icon: FaMedium },
  telegram: { label: 'Telegram', icon: FaTelegram },
  whatsapp: { label: 'WhatsApp', icon: FaWhatsapp },
  discord: { label: 'Discord', icon: FaDiscord },
  email: { label: 'E-posta', icon: Mail },
  website: { label: 'Web Sitesi', icon: Globe },
};

export const getPlatform = (key) => PLATFORMS[key] ?? PLATFORMS.website;

export const SERVICE_ICONS = {
  globe: Globe,
  app: AppWindow,
  workflow: Workflow,
  smartphone: Smartphone,
  code: Code,
  palette: Palette,
  server: Server,
  bot: Bot,
  shop: ShoppingBag,
  database: Database,
  pen: PenTool,
  rocket: Rocket,
  gauge: Gauge,
  terminal: Terminal,
  layers: Layers,
  cpu: Cpu,
};

export const getServiceIcon = (key) => SERVICE_ICONS[key] ?? Layers;

export const ACCENTS = {
  violet: '#8b5cf6',
  indigo: '#6366f1',
  emerald: '#10b981',
  sky: '#0ea5e9',
  rose: '#f43f5e',
  amber: '#f59e0b',
  zinc: '#a1a1aa',
};

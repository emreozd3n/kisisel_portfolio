import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center px-6 pt-32 text-center">
      <div>
        <p className="font-mono text-sm text-violet-300/80">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">Bu sayfa yolunu kaybetmiş.</h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-500">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
        <Button as={Link} to="/" variant="secondary" className="mt-8">
          <ArrowLeft className="size-4" />
          Anasayfaya dön
        </Button>
      </div>
    </section>
  );
}

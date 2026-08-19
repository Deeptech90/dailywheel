/* ============================================================
   /logo-maker — Page
   ============================================================ */
import { useEffect } from 'react';
import LogoMakerApp from '../../components/LogoMaker/LogoMakerApp';

export default function LogoMakerPage() {
  useEffect(() => {
    document.title = 'Free AI Logo Maker — Create a Professional Logo | UniqueBusinessName.com';
    // Update meta description
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Create a unique, professional logo for your business in minutes. Choose from 6 template styles, ' +
      'customize colors, fonts and icons, then download as SVG or PNG — 100% free.';
  }, []);

  return <LogoMakerApp />;
}

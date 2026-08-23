/* ============================================================
   /logo-maker — Page
   ============================================================ */
import { useEffect } from 'react';
import LogoMakerApp from '../../components/LogoMaker/LogoMakerApp';

export default function LogoMakerPage() {
  useEffect(() => {
    document.title = 'Free Online Logo Maker and Download — Create & Export Vector Logos | UniqueBusinessName.com';
    // Update meta description
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Free online logo maker and download suite for modern founders. Choose from 6 template styles, ' +
      'customize colors, fonts and icons, then download as SVG, PNG or PDF — 100% free with full commercial rights.';

    let keywordsMeta = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.content = 'free online logo maker and download, free logo maker, download vector logo, svg logo download, transparent png logo';
  }, []);

  return <LogoMakerApp />;
}

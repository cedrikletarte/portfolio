"use client";

import { useLocale } from 'next-intl';
import { useState } from 'react';

// Shared CV-download logic so the Navbar and the command palette
// don't each carry their own copy of the file-picking/download code.
export function useCvDownload() {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const download = () => {
    setLoading(true);
    const fileUrl = locale === 'fr' ? '/documents/cv_fr.pdf' : '/documents/cv_en.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Cedrik_Letarte_CV.pdf';
    link.click();
    setTimeout(() => setLoading(false), 300);
  };

  return { download, loading };
}

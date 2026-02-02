'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#menu');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <p className="text-gray-400">Переход к меню...</p>
    </div>
  );
}

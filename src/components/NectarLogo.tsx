import { Leaf } from 'lucide-react';

interface NectarLogoProps {
  light?: boolean;
  className?: string;
}

export const NectarLogo = ({ light = false, className = '' }: NectarLogoProps) => (
  <span className={`inline-flex items-center gap-2 ${light ? 'text-white' : 'text-[#26322b]'} ${className}`} aria-label="Nectar">
    <Leaf className={light ? 'text-white' : 'text-[#55b978]'} size={22} strokeWidth={2.4} aria-hidden="true" />
    <span className="font-extrabold tracking-[-0.06em]">nectar</span>
  </span>
);

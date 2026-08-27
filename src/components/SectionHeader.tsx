import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  to: string;
}

export const SectionHeader = ({ title, to }: SectionHeaderProps) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-lg font-extrabold text-[#26322b]">{title}</h2>
    <Link to={to} className="focus-ring rounded-lg text-[11px] font-bold text-[#55b978]">See all</Link>
  </div>
);

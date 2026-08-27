import { Link } from 'react-router-dom';

interface CategoryTileProps {
  name: string;
  category: string;
  image: string;
  tone: string;
}

export const CategoryTile = ({ name, category, image, tone }: CategoryTileProps) => (
  <Link to={`/category/${category}`} className={`focus-ring flex min-w-32 items-center gap-2 rounded-xl p-2.5 ${tone}`}>
    <img src={image} alt="" className="h-12 w-12 rounded-lg object-cover" />
    <span className="text-[11px] font-bold leading-4 text-[#344239]">{name}</span>
  </Link>
);

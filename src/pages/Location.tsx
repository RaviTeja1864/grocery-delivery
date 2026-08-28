import { useState, type FormEvent } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';

const zones = ['Banassree', 'Gulshan', 'Dhanmondi'];
const areas = ['Block A', 'Block B', 'Block C'];

export const Location = () => {
  const navigate = useNavigate();
  const { completeEntry, entryComplete } = useSessionStore();
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (zone && area) { completeEntry(zone, area); navigate('/', { replace: true }); } };
  return <main className="min-h-screen bg-[#fcfdfb] px-6 pb-[env(safe-area-inset-bottom)] pt-7 text-[#26322b]"><div className="mx-auto flex min-h-[calc(100vh-1.75rem)] w-full max-w-md flex-col">{!entryComplete && <button onClick={() => navigate('/verification')} className="focus-ring -ml-2 flex w-fit rounded-lg p-2 text-[#69746c]" aria-label="Back to verification"><ArrowLeft size={20} /></button>}<div className="mt-9 flex justify-center rounded-2xl bg-[#eef7ec] py-6"><MapPin size={86} strokeWidth={1.2} className="text-[#6589e9]" /></div><div className="mt-8 text-center"><h1 className="text-xl font-extrabold">Select Your Location</h1><p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#89948c]">Switch on your location to stay in tune with what is happening in your area.</p></div><form onSubmit={submit} className="mt-8 space-y-4"><label className="block text-xs font-semibold text-[#69746c]">Your Zone<select required value={zone} onChange={(event) => setZone(event.target.value)} className="focus-ring mt-2 w-full rounded-xl border border-[#e2eae0] bg-white px-4 py-3 text-sm outline-none"><option value="">Select your zone</option>{zones.map((option) => <option key={option}>{option}</option>)}</select></label><label className="block text-xs font-semibold text-[#69746c]">Your Area<select required value={area} onChange={(event) => setArea(event.target.value)} className="focus-ring mt-2 w-full rounded-xl border border-[#e2eae0] bg-white px-4 py-3 text-sm outline-none"><option value="">Select your area</option>{areas.map((option) => <option key={option}>{option}</option>)}</select></label><button type="submit" className="focus-ring mt-5 w-full rounded-xl bg-[#55b978] py-4 text-sm font-bold text-white">Submit</button></form><div className="mx-auto mt-auto h-1 w-32 rounded-full bg-[#d8ded9]" aria-hidden="true" /></div></main>;
};

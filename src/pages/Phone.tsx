import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Phone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (phone.replace(/\D/g, '').length < 7) { setError('Enter a valid phone number.'); return; } navigate('/verification'); };
  return <main className="min-h-screen bg-[#fcfdfb] px-6 pb-[env(safe-area-inset-bottom)] pt-7 text-[#26322b]"><div className="mx-auto flex min-h-[calc(100vh-1.75rem)] w-full max-w-md flex-col"><button onClick={() => navigate('/signin')} className="focus-ring -ml-2 flex w-fit rounded-lg p-2 text-[#69746c]" aria-label="Back to sign in"><ArrowLeft size={20} /></button><div className="mt-12"><h1 className="text-2xl font-extrabold tracking-[-0.04em]">Enter your mobile number</h1><p className="mt-2 text-xs text-[#89948c]">We will send you a verification code.</p></div><form onSubmit={submit} className="mt-10"><label className="text-xs font-semibold text-[#69746c]">Mobile Number<div className="mt-3 flex items-center border-b border-[#dfe8dc] pb-3"><span className="mr-3 border-r border-[#dfe8dc] pr-3 text-sm font-semibold">🇧🇩 +880</span><input autoFocus required inputMode="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setError(''); }} aria-label="Phone number" placeholder="1 2345 6789" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#b0b8b1]" /></div></label>{error && <p role="alert" className="mt-3 text-xs font-semibold text-[#d86f4d]">{error}</p>}<button type="submit" className="focus-ring ml-auto mt-16 flex h-14 w-14 items-center justify-center rounded-full bg-[#55b978] text-white" aria-label="Continue to verification"><ArrowRight size={21} /></button></form><div className="mx-auto mt-auto h-1 w-32 rounded-full bg-[#d8ded9]" aria-hidden="true" /></div></main>;
};

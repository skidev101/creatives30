
import { useSelector } from 'react-redux';

export default function ProfilePage() {
 
  const darkmode = useSelector((state)=> state.darkMode)
   
  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
    <h1 className={` ${darkmode? "text-white":''}`}>This is Profile</h1>
  </div>
  );
}
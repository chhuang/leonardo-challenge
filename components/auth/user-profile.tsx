'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserContext } from './user-context';
import { UserInfo } from './user.types';

import { User, LogOut, X } from 'lucide-react';

interface HUDDialogContentProps {
  formData: UserInfo;
  setFormData: React.Dispatch<React.SetStateAction<UserInfo>>;
  handleSave: () => void;
  onClose: () => void;
}

function HUDDialogContent({ formData, setFormData, handleSave, onClose }: HUDDialogContentProps) {
  return (
    <>
      {/* TACTICAL CLOSE BUTTON */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
      >
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/40" />
        <X className="w-5 h-5 text-white/40 group-hover:text-emerald-500 transition-colors" />
      </button>

      {/* TACTICAL CORNERS */}
      <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-500" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-500" />
      </div>

      {/* BACKGROUND HUD GRID */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
           style={{ 
               backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
           }} 
      />

      <div className="relative z-10">
        <div className="mb-8">
          <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em] block mb-1">Dossier Modification</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Edit Profile</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-username" className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Terminal Handle</Label>
            <Input
              id="edit-username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-white/[0.03] border-white/10 rounded-none h-11 text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-jobtitle" className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Designation Rank</Label>
            <Input
              id="edit-jobtitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="bg-white/[0.03] border-white/10 rounded-none h-11 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 font-mono"
            />
          </div>

          <div className="pt-6">
            <Button 
              onClick={handleSave}
              className="w-full rounded-none bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] transition-all h-12"
            >
              Commit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

interface UserProfileProps {
  isMobileTab?: boolean;
}

export function UserProfile({ isMobileTab }: UserProfileProps) {
  const { user, updateUser, clearUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UserInfo>(
    user || { username: '', jobTitle: '' }
  );

  // Pre-fill form when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData(user);
    }
  }, [isOpen, user]);

  const handleSave = () => {
    updateUser(formData);
    setIsOpen(false);
  };

  if (!user) return null;

  if (isMobileTab) {
    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-white/40 hover:text-white transition-all w-full h-14"
            >
                <div className="w-5 h-5 flex items-center justify-center">
                    <User className="w-full h-full text-emerald-500" />
                </div>
                <span className="text-[9px] mt-1 font-bold uppercase tracking-tighter leading-none">Profile</span>
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="fixed inset-0 z-[200] w-full h-full p-0 bg-transparent border-none shadow-none translate-x-0 translate-y-0 overflow-y-auto sm:inset-auto sm:left-1/2 sm:top-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-full sm:max-w-md sm:h-auto sm:overflow-visible [&>button:last-child]:hidden">
                    <DialogTitle className="sr-only">Edit Profile</DialogTitle>
                    <div className="relative w-full min-h-full sm:min-h-0 bg-[#020904] overflow-hidden rounded-none border-0 sm:border sm:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col justify-center">
                         <HUDDialogContent 
                            formData={formData} 
                            setFormData={setFormData}
                            handleSave={handleSave}
                            onClose={() => setIsOpen(false)}
                         />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3 h-10 md:h-11">
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 md:gap-4 px-2 md:px-4 h-full bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 rounded-none overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-emerald-500/40" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-emerald-500/40" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-emerald-500/40" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-emerald-500/40" />
        
        <div className="flex flex-col items-end gap-0.5">
          <span className="hidden md:block text-[8px] font-mono text-emerald-500/60 uppercase tracking-[0.2em] leading-none group-hover:text-emerald-500 transition-colors">
            {user?.jobTitle || 'VERIFIED OPERATOR'}
          </span>
          <span className="text-xs font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-[-1px] transition-transform">
            {user?.username || 'GUEST_USER'}
          </span>
        </div>
        <div className="w-8 md:w-9 h-5 md:h-6 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
           <span className="text-[8px] md:text-[9px] font-black text-emerald-500 font-mono tracking-widest">ID</span>
        </div>
      </button>

      {/* TERMINATE BUTTON */}
      <button 
        onClick={clearUser}
        title="Terminate Session"
        className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group"
      >
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-red-500/40" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-red-500/40" />
        <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed inset-0 z-[200] w-full h-full p-0 bg-transparent border-none shadow-none translate-x-0 translate-y-0 overflow-y-auto sm:inset-auto sm:left-1/2 sm:top-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-full sm:max-w-md sm:h-auto sm:overflow-visible [&>button:last-child]:hidden">
          <DialogTitle className="sr-only">Edit Profile</DialogTitle>
          <div className="relative w-full min-h-full sm:min-h-0 bg-[#020904] overflow-hidden rounded-none border-0 sm:border sm:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col justify-center">
             <HUDDialogContent 
                formData={formData} 
                setFormData={setFormData}
                handleSave={handleSave}
                onClose={() => setIsOpen(false)}
             />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

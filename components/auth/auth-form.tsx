'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useUserContext } from './user-context';
import { UserInfo } from './user.types';

export function AuthForm() {
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState<UserInfo>({
    username: '',
    jobTitle: '',
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  useEffect(() => {
    // Strictly lock scroll on the whole page while login is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<UserInfo> = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUser(formData);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-hidden">
      {/* TECH FRAME CONTAINER */}
      <div className="relative w-full max-w-md bg-[#020904] overflow-hidden rounded-none border border-white/10 shadow-2xl p-8">
        
        {/* TACTICAL CORNERS (Same as Modal/Card) */}
        <div className="absolute inset-0 pointer-events-none z-50">
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500" />
        </div>

        {/* BACKGROUND HUD GRID */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
             style={{ 
                 backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }} 
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-950/20 via-black/20 to-black/80 pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          <div className="mb-10">
            <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em] block mb-1">Access Protocol initiated</span>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-2">
              Welcome
            </h1>
            <div className="h-px w-12 bg-emerald-500/30 mb-4" />
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Identify yourself to access the terminal</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[10px] uppercase tracking-widest text-white/30 font-mono">User Identifier</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-white/[0.03] border-white/10 rounded-none h-12 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                placeholder="ENTER USERNAME..."
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {errors.username && (
                <p id="username-error" className="text-[10px] text-red-500 font-mono uppercase">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Operational Rank</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="bg-white/[0.03] border-white/10 rounded-none h-12 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
                placeholder="ENTER JOB TITLE..."
                aria-invalid={!!errors.jobTitle}
                aria-describedby={errors.jobTitle ? 'jobtitle-error' : undefined}
              />
              {errors.jobTitle && (
                <p id="jobtitle-error" className="text-[10px] text-red-500 font-mono uppercase">
                  {errors.jobTitle}
                </p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] rounded-none transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98]"
          >
            Authorize Access
          </Button>
        </form>
      </div>
    </div>
  );
}

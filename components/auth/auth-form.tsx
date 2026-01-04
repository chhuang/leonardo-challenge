'use client';

import { useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome</h1>
            <p className="text-muted-foreground">Please enter your information to continue</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <p id="username-error" className="text-sm text-destructive">
                {errors.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              aria-invalid={!!errors.jobTitle}
              aria-describedby={errors.jobTitle ? 'jobtitle-error' : undefined}
            />
            {errors.jobTitle && (
              <p id="jobtitle-error" className="text-sm text-destructive">
                {errors.jobTitle}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Card>
    </div>
  );
}

import { Badge } from '@/components/ui/badge';
import { Shield, Users, Brain, Lock } from 'lucide-react';

interface StatBadgeProps {
  label: string;
  icon?: 'shield' | 'users' | 'brain' | 'lock';
  variant?: 'default' | 'secondary' | 'outline';
}

const iconMap = {
  shield: Shield,
  users: Users,
  brain: Brain,
  lock: Lock
};

export default function StatBadge({ label, icon, variant = 'secondary' }: StatBadgeProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Badge variant={variant} className="flex items-center space-x-1">
      {IconComponent && <IconComponent className="h-3 w-3" />}
      <span>{label}</span>
    </Badge>
  );
}

import Shell from '@/components/Shell';
import CTAHero from '@/components/CTAHero';
import Steps from '@/components/Steps';
import StatBadge from '@/components/StatBadge';

export default function HomePage() {
  return (
    <Shell>
      <CTAHero />
      
      {/* Trust Strip */}
      <div className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <StatBadge label="AI-guided" icon="brain" />
            <StatBadge label="Peer mentorship first" icon="users" />
            <StatBadge label="Secure" icon="shield" />
            <StatBadge label="Trusted by 500+ sellers" icon="lock" />
          </div>
        </div>
      </div>
      
      <Steps />
    </Shell>
  );
}

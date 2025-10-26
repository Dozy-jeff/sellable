import { CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    title: 'Prepare',
    description: 'Get your business ready with guided assessments and AI-powered recommendations.',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Optimize',
    description: 'Improve your sellability score with targeted tasks and peer mentorship.',
    icon: Target,
    color: 'text-blue-600'
  },
  {
    title: 'Sell',
    description: 'Access qualified buyers and close your deal with confidence.',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

export default function Steps() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your journey to a successful sale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <step.icon className={`h-12 w-12 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

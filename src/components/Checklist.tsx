'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ChecklistProps {
  items: string[];
  onComplete?: () => void;
  completedItems?: string[];
}

export default function Checklist({ items, onComplete, completedItems = [] }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('checklist-items');
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
    
    // Also check for completed tasks
    const completed = new Set<number>();
    items.forEach((item, index) => {
      if (completedItems.includes(item.toLowerCase()) || 
          (item.toLowerCase().includes('financial') && completedItems.includes('financials'))) {
        completed.add(index);
      }
    });
    if (completed.size > 0) {
      setCheckedItems(completed);
    }
  }, [items, completedItems]);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('checklist-items', JSON.stringify(Array.from(checkedItems)));
  }, [checkedItems]);

  const handleToggle = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const allComplete = items.length > 0 && checkedItems.size === items.length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Checklist</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Checkbox
              id={`checklist-${index}`}
              checked={checkedItems.has(index)}
              onCheckedChange={() => handleToggle(index)}
            />
            <label
              htmlFor={`checklist-${index}`}
              className={`text-sm ${checkedItems.has(index) ? 'line-through text-muted-foreground' : ''}`}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
      
      {allComplete && onComplete && (
        <div className="pt-4 border-t">
          <Button onClick={onComplete} className="w-full">
            <CheckCircle className="h-4 w-4 mr-2" />
            Go to Ready page
          </Button>
        </div>
      )}
    </div>
  );
}

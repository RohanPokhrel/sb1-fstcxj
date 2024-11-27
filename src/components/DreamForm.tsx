import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import Button from './ui/Button';
import { type Dream, type Mood } from '@/types/dream';

interface DreamFormProps {
  onSubmit: (dream: Omit<Dream, 'id'>) => void;
  onCancel: () => void;
}

const MOODS: Mood[] = ['peaceful', 'happy', 'neutral', 'anxious', 'disturbing'];
const COMMON_SYMBOLS = ['mountains', 'water', 'flying', 'falling', 'chase', 'family', 'home'];

export default function DreamForm({ onSubmit, onCancel }: DreamFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mood: 'neutral' as Mood,
    tags: [] as string[],
    symbols: [] as string[],
    isPublic: false,
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(),
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, newTag.trim().toLowerCase()])]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mood</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {MOODS.map(mood => (
            <Button
              key={mood}
              type="button"
              variant={formData.mood === mood ? 'primary' : 'secondary'}
              onClick={() => setFormData(prev => ({ ...prev, mood }))}
            >
              {mood}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center">
          <Tag className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Common Symbols</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COMMON_SYMBOLS.map(symbol => (
            <Button
              key={symbol}
              type="button"
              variant={formData.symbols.includes(symbol) ? 'primary' : 'secondary'}
              onClick={() => setFormData(prev => ({
                ...prev,
                symbols: prev.symbols.includes(symbol)
                  ? prev.symbols.filter(s => s !== symbol)
                  : [...prev.symbols, symbol]
              }))}
            >
              {symbol}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={e => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
          Make this dream public
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Dream</Button>
      </div>
    </form>
  );
}
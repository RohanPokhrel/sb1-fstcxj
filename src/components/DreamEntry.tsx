import React, { useState } from 'react';
import { Moon, Tag, Share2 } from 'lucide-react';
import Button from './ui/Button';
import { type Dream } from '@/types/dream';

interface DreamEntryProps {
  dream: Dream;
  onSave: (dream: Dream) => void;
}

export default function DreamEntry({ dream, onSave }: DreamEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDream, setEditedDream] = useState(dream);

  const handleSave = () => {
    onSave(editedDream);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Moon className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? (
              <input
                type="text"
                value={editedDream.title}
                onChange={(e) =>
                  setEditedDream({ ...editedDream, title: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
            ) : (
              dream.title
            )}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Save</Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="secondary">
                <Share2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        {isEditing ? (
          <textarea
            value={editedDream.description}
            onChange={(e) =>
              setEditedDream({ ...editedDream, description: e.target.value })
            }
            className="w-full h-32 border rounded p-2"
          />
        ) : (
          <p className="text-gray-700">{dream.description}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Tag className="w-4 h-4 text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {dream.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{dream.date.toLocaleDateString()}</span>
        <span className="capitalize">{dream.mood}</span>
      </div>
    </div>
  );
}
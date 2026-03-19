/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Trash2, CheckCircle2, Circle, Sun, Moon, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GroceryItem {
  id: string;
  name: string;
  completed: boolean;
}

export default function App() {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedList = params.get('list');
    if (sharedList) {
      try {
        const parsed = JSON.parse(decodeURIComponent(atob(sharedList)));
        window.history.replaceState({}, document.title, window.location.pathname);
        return parsed;
      } catch (e) {
        console.error("Failed to parse shared list", e);
      }
    }

    const saved = localStorage.getItem('weekly-groceries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('weekly-groceries', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const shareList = async () => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(items)));
      const url = `${window.location.origin}${window.location.pathname}?list=${encoded}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newItem: GroceryItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: inputValue.trim(),
      completed: false,
    };
    
    setItems([newItem, ...items]);
    setInputValue('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.completed));
  };

  const activeItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900/50 transition-colors duration-300">
      <div className="max-w-md mx-auto pt-12 px-4 pb-24 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-sm text-emerald-600 dark:text-emerald-400 font-medium"
              >
                Kopioitu!
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={shareList}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
            aria-label="Jaa lista"
            title="Jaa lista"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Share2 size={20} />}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
            aria-label="Vaihda teemaa"
            title="Vaihda teemaa"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <header className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm"
          >
            <ShoppingCart size={32} />
          </motion.div>
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-semibold tracking-tight text-stone-800 dark:text-stone-100"
          >
            Ruokaostokset
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 dark:text-stone-400 mt-2"
          >
            Tämän viikon ostoslista
          </motion.p>
        </header>

        <motion.form 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={addItem} 
          className="mb-8 relative"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mitä tarvitset?"
            className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white dark:bg-stone-800 shadow-sm border-0 ring-1 ring-stone-200 dark:ring-stone-700 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 outline-none transition-all text-lg placeholder:text-stone-400 dark:placeholder:text-stone-500 dark:text-stone-100"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
          >
            <Plus size={24} />
          </button>
        </motion.form>

        <div className="space-y-6">
          {activeItems.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 px-1">Ostettavat ({activeItems.length})</h2>
              <ul className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {activeItems.map(item => (
                    <GroceryRow 
                      key={item.id} 
                      item={item} 
                      onToggle={() => toggleItem(item.id)} 
                      onDelete={() => deleteItem(item.id)} 
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          {completedItems.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">Ostettu ({completedItems.length})</h2>
                <button 
                  onClick={clearCompleted}
                  className="text-xs text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Tyhjennä
                </button>
              </div>
              <ul className="space-y-2 opacity-75">
                <AnimatePresence mode="popLayout">
                  {completedItems.map(item => (
                    <GroceryRow 
                      key={item.id} 
                      item={item} 
                      onToggle={() => toggleItem(item.id)} 
                      onDelete={() => deleteItem(item.id)} 
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          {items.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-stone-400 dark:text-stone-500 text-lg">Ostoslista on tyhjä.</p>
              <p className="text-stone-400 dark:text-stone-500 text-sm mt-1">Lisää tuotteita yllä olevasta kentästä.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function GroceryRow({ item, onToggle, onDelete }: { item: GroceryItem, onToggle: () => void, onDelete: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-stone-800 shadow-sm ring-1 transition-all ${
        item.completed ? 'ring-stone-100 dark:ring-stone-800/50 bg-stone-50/50 dark:bg-stone-800/50' : 'ring-stone-200 dark:ring-stone-700 hover:shadow-md'
      }`}
    >
      <button 
        onClick={onToggle}
        className="flex items-center gap-4 flex-1 text-left"
      >
        <div className={`flex-shrink-0 transition-colors ${item.completed ? 'text-emerald-500 dark:text-emerald-400' : 'text-stone-300 dark:text-stone-600 group-hover:text-emerald-400 dark:group-hover:text-emerald-500'}`}>
          {item.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </div>
        <span className={`text-lg transition-all ${item.completed ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-700 dark:text-stone-200'}`}>
          {item.name}
        </span>
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-stone-300 dark:text-stone-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
        aria-label="Poista"
      >
        <Trash2 size={20} />
      </button>
    </motion.li>
  );
}

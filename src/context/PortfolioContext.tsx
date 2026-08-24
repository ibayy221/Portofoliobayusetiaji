'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as INITIAL_PROJECTS, Project } from '@/data/portfolioData';

interface PortfolioContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const DB_NAME = 'bayu_portfolio_db';
const STORE_NAME = 'projects_store';
const STORAGE_KEY = 'bayu_portfolio_projects';

// Helper to open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject('IndexedDB not supported');
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Helper to save to IndexedDB with localStorage dual persistence
async function saveProjectsToDB(projects: Project[]): Promise<boolean> {
  return new Promise((resolve) => {
    openDB()
      .then((db) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(projects, 'all_projects');
        req.onsuccess = () => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
          } catch {
            // LocalStorage might be full for large base64s, but IndexedDB succeeded
          }
          resolve(true);
        };
        req.onerror = () => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
            resolve(true);
          } catch {
            console.warn('Storage quota exceeded on both IndexedDB and localStorage');
            resolve(false);
          }
        };
      })
      .catch(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
          resolve(true);
        } catch {
          console.warn('Storage quota exceeded on fallback localStorage');
          resolve(false);
        }
      });
  });
}

// Helper to load from IndexedDB
async function loadProjectsFromDB(): Promise<Project[] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get('all_projects');
      request.onsuccess = () => {
        if (request.result && Array.isArray(request.result) && request.result.length > 0) {
          resolve(request.result);
        } else {
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            resolve(saved ? JSON.parse(saved) : null);
          } catch {
            resolve(null);
          }
        }
      };
      request.onerror = () => {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          resolve(saved ? JSON.parse(saved) : null);
        } catch {
          resolve(null);
        }
      };
    });
  } catch {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from IndexedDB / localStorage on mount
  useEffect(() => {
    loadProjectsFromDB().then((saved) => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setProjects(saved);
      }
      setIsLoaded(true);
    });
  }, []);

  // Save to IndexedDB on projects change
  useEffect(() => {
    if (isLoaded) {
      saveProjectsToDB(projects);
    }
  }, [projects, isLoaded]);

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const projectWithId: Project = {
      ...newProj,
      id: `proj-${Date.now()}`
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      openDB().then((db) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
      });
    } catch {
      console.warn('Failed to clear DB');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetToDefault
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

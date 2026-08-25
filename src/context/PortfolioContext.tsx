'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as INITIAL_PROJECTS, Project } from '@/data/portfolioData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PortfolioContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void> | void;
  updateProject: (id: string, updated: Partial<Project>) => Promise<void> | void;
  deleteProject: (id: string) => Promise<void> | void;
  resetToDefault: () => void;
  isCloudSynced: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const DB_NAME = 'bayu_portfolio_db';
const STORE_NAME = 'projects_store';
const STORAGE_KEY = 'bayu_portfolio_projects';

// Helper mapping Supabase row to Project
function mapRowToProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    categoryLabel: row.category_label || row.categoryLabel || 'Portfolio Project',
    client: row.client || 'Mercure Karawang',
    description: row.description || '',
    image: row.image,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.featured),
    inSelectedWorks: Boolean(row.in_selected_works ?? row.inSelectedWorks),
    aspectRatio: row.aspect_ratio || row.aspectRatio || 'portrait',
    details: row.details || {}
  };
}

// Helper mapping Project to Supabase row
function mapProjectToRow(proj: Partial<Project> & { id: string }) {
  const row: any = { id: proj.id };
  if (proj.title !== undefined) row.title = proj.title;
  if (proj.category !== undefined) row.category = proj.category;
  if (proj.categoryLabel !== undefined) row.category_label = proj.categoryLabel;
  if (proj.client !== undefined) row.client = proj.client;
  if (proj.description !== undefined) row.description = proj.description;
  if (proj.image !== undefined) row.image = proj.image;
  if (proj.tags !== undefined) row.tags = proj.tags;
  if (proj.featured !== undefined) row.featured = proj.featured;
  if (proj.inSelectedWorks !== undefined) row.in_selected_works = proj.inSelectedWorks;
  if (proj.aspectRatio !== undefined) row.aspect_ratio = proj.aspectRatio;
  if (proj.details !== undefined) row.details = proj.details;
  return row;
}

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
            // Ignored
          }
          resolve(true);
        };
        req.onerror = () => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
            resolve(true);
          } catch {
            resolve(false);
          }
        };
      })
      .catch(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
          resolve(true);
        } catch {
          resolve(false);
        }
      });
  });
}

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
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Load from Supabase (if configured) or local DB
  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const mapped = data.map(mapRowToProject);
            setProjects(mapped);
            setIsCloudSynced(true);
            setIsLoaded(true);
            return;
          }
        } catch (e) {
          console.warn('Supabase load error, fallback to local DB:', e);
        }
      }

      // Local fallback
      loadProjectsFromDB().then((saved) => {
        if (saved && Array.isArray(saved) && saved.length > 0) {
          setProjects(saved);
        }
        setIsLoaded(true);
      });
    }

    loadData();
  }, []);

  // Save to Local DB when updated
  useEffect(() => {
    if (isLoaded) {
      saveProjectsToDB(projects);
    }
  }, [projects, isLoaded]);

  const addProject = async (newProj: Omit<Project, 'id'>) => {
    const projectWithId: Project = {
      ...newProj,
      id: `proj-${Date.now()}`
    };

    setProjects((prev) => [projectWithId, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      try {
        const row = mapProjectToRow(projectWithId);
        const { error } = await supabase.from('projects').insert([row]);
        if (error) console.error('Error inserting project to Supabase:', error);
      } catch (err) {
        console.error('Supabase add error:', err);
      }
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );

    if (isSupabaseConfigured() && supabase) {
      try {
        const row = mapProjectToRow({ id, ...updatedFields });
        const { error } = await supabase.from('projects').update(row).eq('id', id);
        if (error) console.error('Error updating project in Supabase:', error);
      } catch (err) {
        console.error('Supabase update error:', err);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) console.error('Error deleting project from Supabase:', error);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    }
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
      console.warn('Failed to clear local DB');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetToDefault,
        isCloudSynced
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

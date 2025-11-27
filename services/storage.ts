
import { Project, ProjectStatus, StorageStats } from '../types';
import { INITIAL_DOCS_STRUCTURE, TIER_LIMITS } from '../constants';
import { getCurrentUser } from './auth';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'context_ark_projects';

// Helper to get raw DB
const getRawProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Admin: Get ALL projects
export const getAllProjectsAdmin = (): Project[] => {
    const user = getCurrentUser();
    if (!user || user.tier !== 'admin') return [];
    return getRawProjects();
}

export const getProjects = (): Project[] => {
  const user = getCurrentUser();
  if (!user) return [];
  
  // Admin sees all, others see own
  if (user.tier === 'admin') return getRawProjects();

  const allProjects = getRawProjects();
  return allProjects.filter(p => p.userId === user.id);
};

export const getProject = (id: string): Project | undefined => {
  const user = getCurrentUser();
  if (!user) return undefined;

  // Admin override
  if (user.tier === 'admin') {
      return getRawProjects().find(p => p.id === id);
  }

  const projects = getProjects();
  return projects.find((p) => p.id === id);
};

export const createProject = (intake: Project['intake']): Project => {
  const user = getCurrentUser();
  if (!user) throw new Error("Must be logged in to create project");

  // TIER CHECK
  const userProjects = getProjects().filter(p => p.userId === user.id);
  const limits = TIER_LIMITS[user.tier || 'free'];
  
  if (userProjects.length >= limits.maxProjects) {
      throw new Error(`Upgrade to ${user.tier === 'free' ? 'Starter' : 'Pro'} to create more projects. Limit: ${limits.maxProjects}`);
  }

  // STORAGE QUOTA CHECK (Mocking the check before save)
  const stats = getStorageUsage();
  if (stats.usedBytes > limits.storageLimit) {
      throw new Error(`Storage limit reached for ${user.tier} tier. Upgrade for Cloud Storage.`);
  }

  const newProject: Project = {
    id: uuidv4(),
    userId: user.id,
    name: intake.projectName || 'Untitled Project',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: ProjectStatus.DRAFT,
    packId: intake.packId || 'vibe_mvp', // Use user selection or default
    intake,
    files: {
      '/intake.json': JSON.stringify(intake, null, 2),
    },
    docs: JSON.parse(JSON.stringify(INITIAL_DOCS_STRUCTURE)), // Deep copy of the template
    progress: 0,
  };

  const allProjects = getRawProjects();
  allProjects.push(newProject);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
  } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          throw new Error("Browser Storage Full. Please delete old projects or upgrade to Pro for Cloud Storage.");
      }
      throw e;
  }
  
  return newProject;
};

export const updateProject = (project: Project): void => {
  const allProjects = getRawProjects();
  const index = allProjects.findIndex((p) => p.id === project.id);
  
  const user = getCurrentUser();
  
  // Admin or Owner check
  if (index !== -1 && user && (allProjects[index].userId === user.id || user.tier === 'admin')) {
    allProjects[index] = { ...project, updatedAt: Date.now() };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
    } catch (e) {
        console.error("Storage Quota Exceeded");
        // In a real app, we would fail the UI gracefully here
    }
  }
};

export const deleteProject = (id: string): void => {
  const user = getCurrentUser();
  if (!user) return;

  const allProjects = getRawProjects();
  const filtered = allProjects.filter((p) => {
      // Admin can delete anything, User can delete own
      if (user.tier === 'admin') return p.id !== id;
      return p.id !== id || p.userId !== user.id;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getStorageUsage = (): StorageStats => {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length + key.length) * 2; // approx bytes
        }
    }
    
    // Mock limit: 5MB for Free/Local
    const limit = 5 * 1024 * 1024; 
    
    return {
        usedBytes: total,
        totalBytes: limit,
        percentUsed: Math.min(100, Math.round((total / limit) * 100))
    };
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  GENERATING = 'GENERATING',
  READY = 'READY',
  EXPORTED = 'EXPORTED'
}

export enum DocStatus {
  PENDING = 'PENDING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  SKIPPED = 'SKIPPED'
}

export type UserTier = 'free' | 'starter' | 'pro' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  tier: UserTier;
  credits: number; // Wallet balance
  apiKeys?: {
    gemini?: string;
    openai?: string;
    anthropic?: string;
    deepseek?: string;
  };
}

export type PlatformType = 'cursor' | 'windsurf' | 'bolt' | 'replit' | 'lovable' | 'cline' | 'continue' | 'copilot' | 'blackbox' | 'firebase' | 'v0' | 'vscode';

export type AiProvider = 'google' | 'openai' | 'anthropic' | 'openrouter' | 'deepseek';

export interface ModelConfig {
    id: string;
    provider: AiProvider;
    name: string;
    costPer1M: { input: number, output: number };
    contextWindow: number;
}

export type AiTaskType = 
    | 'J1_INTAKE'        // Summarization, extraction
    | 'J2_PLANNER'       // Deep reasoning, structure
    | 'J3_WRITER'        // Long-form content
    | 'J4_REFINER'       // Editing, linting
    | 'J5_CRITIC'        // QA, consistency
    | 'J6_ROUTER';       // Logic, cost estimation

export interface IntakeData {
  projectName: string;
  description: string;
  targetAudience: string;
  coreOffer: string;
  constraints: string;
  techStackPrefs: string;
  targetPlatforms: PlatformType[];
  packId: 'vibe_mvp' | 'pro_builder';
}

export interface ProjectKernel {
  project_name: string;
  domain: string;
  audience: string[];
  problem: string;
  solution: string;
  tech_stack: {
    frontend: string;
    backend: string;
    db: string;
    ai: string;
  };
  features: string[];
  platforms: PlatformType[];
}

export interface DocMetadata {
  id: string;
  title: string;
  filename: string;
  group: string;
  batchIndex: number;
  dependsOn: string[];
  status: DocStatus;
  isApproved?: boolean; // New field for approval workflow
  category?: string;
  tags?: string[];
  description?: string;
}

export interface PackDefinition {
  id: 'vibe_mvp' | 'pro_builder';
  label: string;
  description: string;
  core_docs: string[];
  optional_docs: string[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  intakeData: Partial<IntakeData>;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  status: ProjectStatus;
  packId: 'vibe_mvp' | 'pro_builder';
  intake: IntakeData;
  kernel?: ProjectKernel;
  files: Record<string, string>;
  docs: DocMetadata[];
  progress: number;
}

export interface BatchDefinition {
  index: number;
  name: string;
  description: string;
  range: [number, number];
}

export interface StorageStats {
    usedBytes: number;
    totalBytes: number;
    percentUsed: number;
}
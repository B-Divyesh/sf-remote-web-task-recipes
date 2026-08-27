export type Landmark = {
  id: string;
  name: string;
  cue: string;
  x: number;
  y: number;
  createdAt: number;
};

export type TaskStep = {
  id: string;
  text: string;
  landmarkId?: string;
};

export type TaskRecipe = {
  id: string;
  name: string;
  origin: string;
  landmarks: Landmark[];
  tasks: Array<{ id: string; name: string; steps: TaskStep[] }>;
  createdAt: number;
  updatedAt: number;
};

export type NotebookState = {
  version: 1;
  recipes: TaskRecipe[];
  preferences: {
    speakSteps: boolean;
    largeOverlay: boolean;
    theme: 'field' | 'blueprint' | 'highlighter';
  };
};

export const EMPTY_STATE: NotebookState = {
  version: 1,
  recipes: [],
  preferences: { speakSteps: true, largeOverlay: true, theme: 'field' }
};

export type ExtensionMessage =
  | { type: 'CAPTURE_LANDMARK'; recipeId: string; name: string; cue: string; targetOrigin?: string }
  | { type: 'SHOW_CAPTURE'; screenshot: string; recipeId: string; name: string; cue: string }
  | { type: 'START_GUIDE'; recipe: TaskRecipe; taskId: string; targetOrigin?: string }
  | { type: 'SHOW_GUIDE'; recipe: TaskRecipe; taskId: string };

import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const useProjectStore = create((set) => ({
  // Project state
  projects: [],
  currentProject: null,
  
  // Scripts
  scripts: [],
  currentScript: null,
  
  // Storyboards
  storyboards: [],
  currentStoryboard: null,
  
  // Assets
  characters: [],
  scenes: [],
  props: [],
  
  // Team members
  teamMembers: [],
  
  // Actions
  createProject: (name, description) => set((state) => {
    const newProject = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return {
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }
  }),
  
  createScript: (title, content) => set((state) => {
    const newScript = {
      id: uuidv4(),
      projectId: state.currentProject?.id,
      title,
      content,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return {
      scripts: [...state.scripts, newScript],
      currentScript: newScript,
    }
  }),
  
  updateScript: (scriptId, updates) => set((state) => ({
    scripts: state.scripts.map((script) =>
      script.id === scriptId
        ? { ...script, ...updates, updatedAt: new Date() }
        : script
    ),
  })),
  
  createCharacter: (name, description, imageUrl) => set((state) => {
    const newCharacter = {
      id: uuidv4(),
      projectId: state.currentProject?.id,
      name,
      description,
      imageUrl,
      createdAt: new Date(),
    }
    return {
      characters: [...state.characters, newCharacter],
    }
  }),
  
  createScene: (name, description, backgroundUrl) => set((state) => {
    const newScene = {
      id: uuidv4(),
      projectId: state.currentProject?.id,
      name,
      description,
      backgroundUrl,
      createdAt: new Date(),
    }
    return {
      scenes: [...state.scenes, newScene],
    }
  }),
  
  addTeamMember: (email, role) => set((state) => {
    const newMember = {
      id: uuidv4(),
      email,
      role,
      joinedAt: new Date(),
    }
    return {
      teamMembers: [...state.teamMembers, newMember],
    }
  }),
}))

export default useProjectStore
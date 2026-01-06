const PROGRESS_KEY = "lms_user_progress";

export const progressStorage = {
  // Get all progress
  getAll: () => {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  // Get progress for specific course
  getCourseProgress: (kelasId) => {
    const all = progressStorage.getAll();
    return all[kelasId] || { completedMaterials: [], addedAt: null };
  },

  // Add course to progress tracking
  addCourse: (kelasId) => {
    const all = progressStorage.getAll();
    if (!all[kelasId]) {
      all[kelasId] = {
        completedMaterials: [],
        addedAt: new Date().toISOString(),
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    }
  },

  // Mark material as completed
  completeMaterial: (kelasId, materialId) => {
    const all = progressStorage.getAll();
    if (!all[kelasId]) {
      all[kelasId] = {
        completedMaterials: [],
        addedAt: new Date().toISOString(),
      };
    }

    const numId = Number(materialId);
    if (!all[kelasId].completedMaterials.includes(numId)) {
      all[kelasId].completedMaterials.push(numId);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    }
  },

  // Unmark material as completed
  uncompleteMaterial: (kelasId, materialId) => {
    const all = progressStorage.getAll();
    if (all[kelasId]) {
      const numId = Number(materialId);
      all[kelasId].completedMaterials = all[kelasId].completedMaterials.filter(
        (id) => id !== numId
      );
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    }
  },

  // Check if material is completed
  isMaterialCompleted: (kelasId, materialId) => {
    const progress = progressStorage.getCourseProgress(kelasId);
    return progress.completedMaterials.includes(Number(materialId));
  },

  // Calculate progress percentage
  getProgressPercentage: (kelasId, totalMaterials) => {
    if (!totalMaterials) return 0;
    const progress = progressStorage.getCourseProgress(kelasId);
    return Math.round(
      (progress.completedMaterials.length / totalMaterials) * 100
    );
  },

  // Remove course from progress
  removeCourse: (kelasId) => {
    const all = progressStorage.getAll();
    delete all[kelasId];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  },
};

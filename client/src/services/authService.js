// client/src/services/authService.js
import apiService from "./api.js";

class authService {
  constructor() {
    this.tokenKey = "token";
    this.userKey = "currentUser";
  }

  async register(userData) {
    try {
      const data = await apiService.request(
        "/auth/register",
        "POST",
        userData,
        false
      );

      if (data.token) {
        this.saveToken(data.token);
      }

      if (data.user) {
        this.saveCurrentUser(data.user);
        this.createDefaultProfile(data.user);
      }

      return data;
    } catch (error) {
      let message = "Erreur lors de l'inscription";
      if (
        error.message.includes("Network") ||
        error.message.includes("Failed to fetch")
      ) {
        message =
          "Impossible de joindre le serveur. Vérifiez que le backend est démarré sur le port 5000.";
      } else if (
        error.message.includes("400") ||
        error.message.includes("409")
      ) {
        message = "Cet email est déjà utilisé";
      }
      throw new Error(message);
    }
  }

  async login(credentials) {
    try {
      const data = await apiService.request(
        "/auth/login",
        "POST",
        credentials,
        false
      );

      if (data.token) {
        this.saveToken(data.token);
      }

      if (data.user) {
        this.saveCurrentUser(data.user);

        // Vérifier et créer le profil si nécessaire
        const userId = data.user.id || data.user._id;
        if (userId && !this.getUserProfile(userId)) {
          this.createDefaultProfile(data.user);
        }
      }

      return data;
    } catch (error) {
      let message = "Email ou mot de passe incorrect";
      if (
        error.message.includes("Network") ||
        error.message.includes("Failed to fetch")
      ) {
        message = "Impossible de joindre le serveur. Vérifiez votre connexion.";
      }
      throw new Error(message);
    }
  }

  // NOUVELLE MÉTHODE AJOUTÉE
  async validateToken() {
    try {
      const token = this.getToken();
      if (!token) return false;

      // Validation simple - vérifie juste si le token existe
      // Vous pouvez décommenter pour valider avec le backend quand il sera prêt
      // const response = await apiService.request('/auth/validate', 'GET');
      // return response.valid;

      return true; // Retourne true si le token existe
    } catch (error) {
      console.warn("Token validation failed:", error);
      return false;
    }
  }

  // MÉTHODES EXISTANTES
  saveCurrentUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  getUserProfile(userId = null) {
    if (!userId) {
      const user = this.getCurrentUser();
      userId = user?.id || user?._id;
    }
    if (!userId) return null;

    const profileData = localStorage.getItem(`userProfile_${userId}`);
    return profileData ? JSON.parse(profileData) : null;
  }

  createDefaultProfile(user) {
    const userId = user.id || user._id;
    if (!userId) return null;

    const defaultProfile = {
      userId: userId,
      name: user.name || user.username || "Utilisateur",
      email: user.email || "",
      degree: "Étudiant",
      country: "",
      city: "",
      educationLevel: "Licence",
      fieldOfInterest: "",
      languages: ["Français"],
      currentInstitution: "",
      settings: {
        language: "Français",
        emailNotifications: "Toutes",
      },
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `userProfile_${userId}`,
      JSON.stringify(defaultProfile)
    );
    return defaultProfile;
  }

  async updateUserProfile(profileData) {
    try {
      const updatedProfile = await apiService.request(
        "/profile/update",
        "PUT",
        profileData
      );

      const user = this.getCurrentUser();
      if (user) {
        const userId = user.id || user._id;
        const existingProfile = this.getUserProfile(userId) || {};

        const mergedProfile = {
          ...existingProfile,
          ...updatedProfile,
          updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(
          `userProfile_${userId}`,
          JSON.stringify(mergedProfile)
        );

        const updatedUser = {
          ...user,
          name: profileData.name || user.name,
          email: profileData.email || user.email,
        };
        this.saveCurrentUser(updatedUser);
      }

      return updatedProfile;
    } catch (error) {
      throw new Error(
        error.message || "Erreur lors de la mise à jour du profil"
      );
    }
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    // Supprimer aussi tous les profils liés
    const user = this.getCurrentUser();
    if (user) {
      const userId = user.id || user._id;
      localStorage.removeItem(`userProfile_${userId}`);
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export default new authService();

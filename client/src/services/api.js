// client/src/services/api.js
const API_BASE_URL = "http://localhost:5000/api";

class apiService {
  constructor() {
    this.tokenKey = "token";
  }

  async request(endpoint, method = "GET", data = null, requiresAuth = true) {
    console.log(`API Request: ${method} ${endpoint}`, data ? { data } : "");

    const token = localStorage.getItem(this.tokenKey);

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (requiresAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      console.log(`API Response: ${response.status} ${endpoint}`);

      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}`;

        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const text = await response.text();
            if (text) errorMessage = text;
          }
        } catch (parseError) {
          console.warn("Impossible de parser la réponse d'erreur:", parseError);
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      if (response.status === 204) {
        return null;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log(`API Success: ${endpoint}`, result);
        return result;
      }

      return await response.text();
    } catch (error) {
      console.error("API Error:", {
        endpoint,
        method,
        error: error.message,
        status: error.status,
      });

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Impossible de joindre le serveur. Vérifiez que le backend est démarré sur http://localhost:5000"
        );
      }

      throw error;
    }
  }

  // ==================== USER PROFILE & ONBOARDING ====================

  // Récupérer le profil utilisateur complet
  async getUserProfile(userId) {
    return this.request(`/users/${userId}/profile`, "GET");
  }

  // Compléter l'onboarding
  async completeOnboarding(userId, profileData) {
    console.log("completeOnboarding called with:", { userId, profileData });
    return this.request(
      `/users/${userId}/onboarding/complete`,
      "POST",
      profileData
    );
  }

  // METTRE À JOUR LE PROFIL UTILISATEUR (NOUVELLE MÉTHODE)
  async updateUserProfile(userId, profileData) {
    console.log("updateUserProfile called with:", { userId, profileData });

    // Essayer plusieurs endpoints possibles
    try {
      // Essayer d'abord l'endpoint spécifique pour le profil
      return await this.request(`/users/${userId}/profile`, "PUT", profileData);
    } catch (error) {
      console.log(
        "First endpoint failed, trying alternative...",
        error.message
      );

      // Fallback: utiliser l'endpoint d'onboarding si le premier échoue
      try {
        return await this.request(
          `/users/${userId}/onboarding/complete`,
          "POST",
          profileData
        );
      } catch (secondError) {
        console.log(
          "Second endpoint failed, trying /users endpoint...",
          secondError.message
        );

        // Dernier fallback: endpoint générique user
        try {
          return await this.request(`/users/${userId}`, "PUT", profileData);
        } catch (thirdError) {
          console.error("All endpoints failed:", thirdError.message);
          throw thirdError;
        }
      }
    }
  }

  // ==================== DASHBOARD PERSONNALISÉ ====================

  // Récupérer les données du dashboard personnalisé
  async getDashboardData(userId) {
    return this.request(`/users/${userId}/dashboard`, "GET");
  }

  // ==================== COURSES ====================

  async getCourses() {
    return this.request("/courses", "GET");
  }

  async getUserCourses(userId) {
    return this.request(`/courses/user/${userId}`, "GET");
  }

  // ==================== OPPORTUNITÉS ====================

  async getOpportunities() {
    return this.request("/opportunities", "GET");
  }

  async getOpportunityById(id) {
    return this.request(`/opportunities/${id}`, "GET");
  }

  async getOpportunityFilters() {
    return this.request("/opportunities/filters", "GET");
  }

  // Postuler à une opportunité
  async applyToOpportunity(userId, opportunityId, applicationData = {}) {
    return this.request(`/opportunities/${opportunityId}/apply`, "POST", {
      userId,
      ...applicationData,
      applicationDate: new Date().toISOString(),
    });
  }

  // ==================== RESSOURCES ====================

  async getResources() {
    return this.request("/resources", "GET");
  }

  // ==================== PARTENAIRES ====================

  async getPartners() {
    return this.request("/partners", "GET");
  }

  async getPartnerById(id) {
    return this.request(`/partners/${id}`, "GET");
  }

  // ==================== PROFIL (compatibilité) ====================

  async getProfile() {
    return this.request("/profile/me", "GET");
  }

  async updateProfile(profileData) {
    return this.request("/profile/update", "PUT", profileData);
  }

  // ==================== MÉTHODES DE BACKUP/DEVELOPPEMENT ====================

  // Méthode de secours pour le développement (sans backend)
  async mockUpdateUserProfile(userId, profileData) {
    console.log("MOCK: Updating user profile", { userId, profileData });

    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Sauvegarder dans localStorage pour la persistance
    const userKey = `user_profile_${userId}`;
    const existingData = JSON.parse(localStorage.getItem(userKey) || "{}");
    const newData = {
      ...existingData,
      ...profileData,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(userKey, JSON.stringify(newData));

    return {
      success: true,
      message: "Profil mis à jour avec succès (mode simulation)",
      data: newData,
    };
  }

  // Vérifier si le backend est disponible
  async checkBackendHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.ok;
    } catch (error) {
      console.log("Backend not available, using mock mode");
      return false;
    }
  }

  // Méthode intelligente qui choisit entre réel et mock
  async updateUserProfileSmart(userId, profileData) {
    const isBackendAvailable = await this.checkBackendHealth();

    if (isBackendAvailable) {
      console.log("Backend available, using real API");
      return await this.updateUserProfile(userId, profileData);
    } else {
      console.log("Backend unavailable, using mock API");
      return await this.mockUpdateUserProfile(userId, profileData);
    }
  }

  // ==================== UTILITAIRES ====================

  // Récupérer le token
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Sauvegarder le token
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Supprimer le token (logout)
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new apiService();

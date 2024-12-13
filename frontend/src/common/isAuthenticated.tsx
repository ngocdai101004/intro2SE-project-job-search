import api from '../common/axiosAPI';

// Helper to verify authentication
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const response = await api.get('/auth/verify', { withCredentials: true });
        return response.status === 200;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false;
    }
};

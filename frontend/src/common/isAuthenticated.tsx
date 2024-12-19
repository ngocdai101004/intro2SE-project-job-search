import axiosInstance from './axiosInstance.tsx';

// Helper to verify authentication
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const response = await axiosInstance.get('/auth/check');
        return response.status === 200;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false;
    }
};

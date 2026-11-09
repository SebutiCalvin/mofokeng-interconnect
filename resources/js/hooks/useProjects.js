import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useToast } from './useToast';

export const useProjects = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const getProjects = (params) => {
        return useQuery({
            queryKey: ['projects', params],
            queryFn: () => api.getProjects(params).then(res => res.data),
        });
    };

    const getProject = (slug) => {
        return useQuery({
            queryKey: ['project', slug],
            queryFn: () => api.getProject(slug).then(res => res.data),
            enabled: !!slug,
        });
    };

    const createProject = useMutation({
        mutationFn: (data) => api.createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project created successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create project');
        },
    });

    const updateProject = useMutation({
        mutationFn: ({ id, data }) => api.updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project updated successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update project');
        },
    });

    const deleteProject = useMutation({
        mutationFn: (id) => api.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete project');
        },
    });

    return {
        getProjects,
        getProject,
        createProject,
        updateProject,
        deleteProject,
    };
};

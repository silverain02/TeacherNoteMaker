import { useMutation } from '@tanstack/react-query';
import axiosClient from '../axios';

const postAnalyzeSyntax = async (text: string) => {
  const { data } = await axiosClient.post('api/analyze-syntax', { text });
  return data;
}

const useAnalyzeSyntax = () => 
  useMutation({
    mutationKey: ['analyze-syntax'],
    mutationFn: async (text: string) => postAnalyzeSyntax(text),
    onError: (error) => {
      console.error('Analyze failed', error);
    }
  });

export default useAnalyzeSyntax;
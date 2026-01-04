import { useState, useCallback } from 'react';
import { GalleryImage } from '../types';

/**
 * Return type for the useLightbox hook
 */
export interface UseLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  currentImage: GalleryImage | null;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
}

/**
 * Custom hook to manage lightbox modal state for image galleries.
 * Supports opening, closing, and navigating between images with wraparound.
 * 
 * @param images - Array of gallery images to display in the lightbox
 * @returns Object containing lightbox state and navigation functions
 */
export function useLightbox(images: GalleryImage[]): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const open = useCallback((index: number) => {
    if (images.length > 0 && index >= 0 && index < images.length) {
      setCurrentIndex(index);
      setIsOpen(true);
    }
  }, [images.length]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const previous = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const currentImage = images.length > 0 ? images[currentIndex] : null;

  return {
    isOpen,
    currentIndex,
    currentImage,
    open,
    close,
    next,
    previous,
  };
}

export default useLightbox;

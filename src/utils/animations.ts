
interface AnimationDelayProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Utility for staggered animations - helper functions for our components
 */
export const staggeredChildren = (baseDelay: number = 100, count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    animationDelay: `${baseDelay * (i + 1)}ms`
  }));
};

/**
 * Calculate the animation delay for an item based on its index
 */
export const calculateAnimationDelay = (index: number, baseDelay: number = 100) => {
  return `${baseDelay * (index + 1)}ms`;
};

/**
 * Classnames for different animation states
 */
export const animations = {
  fadeIn: "animate-fade-in",
  fadeOut: "animate-fade-out",
  scaleIn: "animate-scale-in",
  scaleOut: "animate-scale-out",
  slideIn: "animate-slide-in",
  slideOut: "animate-slide-out",
  pulse: "animate-pulse",
};

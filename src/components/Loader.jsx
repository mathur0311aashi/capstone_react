/**
 * Loader Component
 * Displays loading states with skeleton screens and spinners
 */

// Full-page spinner loader
export const SpinnerLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mb-4"></div>
        <p className="text-text-secondary font-medium">{message}</p>
      </div>
    </div>
  );
};

// Skeleton card for itinerary loading
export const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-border rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-border rounded w-full"></div>
        <div className="h-4 bg-border rounded w-5/6"></div>
        <div className="h-4 bg-border rounded w-4/6"></div>
      </div>
    </div>
  );
};

// Skeleton for list items (hotels, cafes)
export const SkeletonList = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-border rounded-lg flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-border rounded w-2/3"></div>
              <div className="h-3 bg-border rounded w-full"></div>
              <div className="h-3 bg-border rounded w-4/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton for full results page
export const SkeletonResults = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-10 bg-border rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-border rounded w-1/4"></div>
      </div>

      {/* Itinerary skeleton */}
      <div className="mb-12">
        <div className="h-7 bg-border rounded w-1/5 mb-6 animate-pulse"></div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Hotels skeleton */}
      <div className="mb-12">
        <div className="h-7 bg-border rounded w-1/6 mb-6 animate-pulse"></div>
        <SkeletonList count={3} />
      </div>

      {/* Cafes skeleton */}
      <div className="mb-12">
        <div className="h-7 bg-border rounded w-1/4 mb-6 animate-pulse"></div>
        <SkeletonList count={4} />
      </div>
    </div>
  );
};

// Default inline loader (for buttons, etc.)
const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-accent border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
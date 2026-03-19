

const sizeMap = {
  sm: 'w-4 h-4 border',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
};

export default function LoadingSpinner({
  size = 'md',
  variant = 'ring',
  message = 'Loading...',
}) {
  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-2/5 bg-blue-500 rounded-full animate-[slide_1.2s_ease-in-out_infinite]" />
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className="flex items-center justify-center gap-3 py-5
        bg-gray-50 rounded-xl">
        <div className={`${sizeMap.md} border-gray-200 border-t-blue-500 rounded-full animate-spin`} />
        <span className="text-sm text-gray-400">{message}</span>
      </div>
    );
  }


  return (
    <div
      className={`${sizeMap[size]} border-gray-200 border-t-blue-500 rounded-full animate-spin`}
    />
  );
}
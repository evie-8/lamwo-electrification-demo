const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-white">
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2, 3, 4].map((item) => (
          <span
            style={{ animationDelay: `${item * 0.2}s` }}
            className="h-4 w-4 rounded-full transform scale-0 bg-sunbird-navy-blue shadow-md animate-extendAndShrink"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;

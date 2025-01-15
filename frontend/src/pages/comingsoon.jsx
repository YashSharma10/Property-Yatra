const ComingSoon = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Coming Soon</h1>
      <p className="text-lg text-gray-600 mb-8">
        We are working hard to bring you this feature. Stay tuned!
      </p>
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default ComingSoon;

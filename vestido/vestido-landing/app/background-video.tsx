'use client';

const BackgoundVideo = () => {
  return (
    <div className="h-full w-full overflow-hidden absolute opacity-90 -z-10">
      <video className="w-full h-full object-cover" autoPlay loop muted>
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgoundVideo;

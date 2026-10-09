import HeroBanner from '@/app/Components/HeroBanner';
import Navbar from '@/app/Components/Navbar';
import VisitPlantClient from '@/app/Components/VisitPlantClient';

const Visitplant = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className='relative sm:mt-8 md:mt-20 mt-[-60px]'>
        <HeroBanner
          backgroundImage="/images/plantvisit6.jpeg"
          className="z-1 h-[400px] md:h-auto"
        >
          <div className="hidden md:block absolute 
      left-[500px] top-[470px] -translate-y-1/2
      bg-black/20 backdrop-blur-sm rounded-xl 
      px-8 py-6
      w-[418px]
      text-center shadow-lg space-y-3 z-10 h-[160px]">
            <h1 className="text-5xl font-extrabold text-green-600">
              CBG Plant <span className="text-white/80">Visit</span>
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              Shaping the future with sustainable energy innovations.
            </p>
          </div>
        </HeroBanner>
      </div>
      <VisitPlantClient />
    </div>
  );
};

export default Visitplant;
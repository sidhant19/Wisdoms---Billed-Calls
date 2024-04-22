import { Button } from "@/components/ui/button"


const HeroFrame = () => {
    
  return (
    <section className="px-5p bg-radial-gradient h-screen w-screen flex flex-col  md:item-center lg:items-center justify-center">
        <div className="animate-slide-up-fade-in align-middle text-5xl md:text-6xl">
            <span className="font-extralight text-off-white">Experience </span>
            
            <span className="font-extralight text-off-white">The Brilliance of </span>
            
        </div>
        <div className="animate-slide-up-fade-in text-6xl md:text-7xl dro">
           
            <span className="font-bold text-off-white">wisdom</span>
            <span className="font-extrabold text-rose-500">'</span>
            <span className="font-bold text-off-white">s</span>
            <span className="font-extrabold text-rose-500">. </span>
           
        </div>
        <div className="animate-slide-up-fade-in pt-16 text-4xl md:text-5xl">
            <span className="font-extralight text-off-white">Connect</span>
            <span className=" text-rose-500">.  </span>
            <span className="font-extralight text-off-white">Learn</span>
            <span className="text-rose-500">.  </span>
            <span className="font-extralight text-off-white">Thrive</span>
            <span className="text-rose-500">. </span>
            
        </div>
        <div className="animate-slide-up-fade-in pt-20 text-2xl md:text-3xl">
            <a href="#"><Button size="lg" className="text-lg bg-rose-800 hover:bg-rose-700">Start Exploring</Button></a>
        </div>
        
    </section>
  );
};

export default HeroFrame;

"use client"

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load the StackIcon component
const StackIcon = dynamic(() => import('tech-stack-icons'), {
  ssr: false,
  loading: () => <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>,
});

const ProfessionalTechStackShowcase: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [columns, setColumns] = useState(5);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const icons = [
    "reactjs", "nextjs", "android", "bootstrap5", "css3", "flutter", "html5",
    "java", "js", "kotlin", "laravel", "mongodb", "mysql", "nodejs", "nuxtjs",
    "php", "postgresql", "tailwindcss", "typescript", "vuejs"
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(2);
      } else if (window.innerWidth < 768) {
        setColumns(3);
      } else if (window.innerWidth < 1024) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconAnimation = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear"
        },
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    }
  };

  // Dynamic Next.js SVG Component
  const NextJsSvg = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="nextjs">
        <g id="nextjs_2" clipPath="url(#clip0_790_6554)">
          <path id="Vector" d="M66.4769 40.0089H83.8952V43.2239H76.9855V60.1373H73.5305V43.2239H66.4769V40.0089Z" fill="white"/>
          <path id="Vector_2" d="M37.8305 40.0089V43.2239H23.8686V48.3957H35.0967V51.6107H23.8686V56.9224H37.8305V60.1373H20.4137V43.2239H20.4123V40.0089H37.8305Z" fill="white"/>
          <path id="Vector_3" d="M46.5279 40.0173H42.0066L58.201 60.1457H62.7355L54.6373 50.0884L62.7226 40.0326L58.201 40.0396L52.3736 47.2771L46.5279 40.0173Z" fill="white"/>
          <path id="Vector_4" d="M51.1675 54.3951L48.9033 51.5799L41.9937 60.161H46.5279L51.1675 54.3951Z" fill="white"/>
          <path id="Vector_5" fillRule="evenodd" clipRule="evenodd" d="M20.5348 60.1373L4.31855 40.0005H0V60.1289H3.45485V44.3029L16.1946 60.1373H20.5348Z" fill="white"/>
          <path id="Vector_6" d="M84.6718 60.0143C84.4188 60.0143 84.2036 59.9267 84.0234 59.7514C83.8431 59.5761 83.7541 59.3639 83.7563 59.1124C83.7541 58.8679 83.8431 58.658 84.0234 58.4827C84.2036 58.3074 84.4188 58.2197 84.6718 58.2197C84.9152 58.2197 85.1282 58.3074 85.3084 58.4827C85.4911 58.658 85.5822 58.8679 85.5848 59.1124C85.5822 59.2785 85.5401 59.4307 85.4558 59.5668C85.3693 59.7053 85.2594 59.8137 85.1211 59.8921C84.9853 59.9728 84.8355 60.0143 84.6718 60.0143Z" fill="white"/>
          <path id="Vector_7" d="M90.5685 51.5349H92.0995V57.4332C92.0972 57.9752 91.9799 58.4389 91.7508 58.8287C91.519 59.2186 91.1982 59.5161 90.7863 59.726C90.3767 59.9336 89.8967 60.0397 89.3513 60.0397C88.8525 60.0397 88.4056 59.9498 88.0076 59.7745C87.6096 59.5992 87.2937 59.3362 87.0619 58.9902C86.8277 58.6442 86.7129 58.2128 86.7129 57.6961H88.2465C88.2487 57.9222 88.3003 58.1182 88.3985 58.282C88.4967 58.4458 88.6325 58.5703 88.8058 58.658C88.9812 58.7457 89.1827 58.7895 89.4096 58.7895C89.6556 58.7895 89.8662 58.7387 90.0371 58.6349C90.2079 58.5334 90.3391 58.3812 90.4305 58.1782C90.5193 57.9775 90.5662 57.7284 90.5685 57.4332V51.5349Z" fill="white"/>
          <path id="Vector_8" d="M98.3987 53.8416C98.3614 53.484 98.1975 53.2049 97.9119 53.0065C97.6239 52.8058 97.2518 52.7067 96.7952 52.7067C96.4746 52.7067 96.1985 52.7551 95.969 52.8497C95.7396 52.9466 95.5617 53.0757 95.4398 53.2395C95.3183 53.4033 95.2574 53.5901 95.2525 53.8001C95.2525 53.9754 95.2947 54.1276 95.3767 54.2545C95.4586 54.3836 95.5685 54.4921 95.7114 54.5797C95.8518 54.6697 96.0086 54.7435 96.1797 54.8035C96.3528 54.8634 96.5261 54.9142 96.6992 54.9557L97.4975 55.1518C97.8183 55.2256 98.1297 55.3248 98.4269 55.4517C98.7241 55.5762 98.9934 55.7354 99.2297 55.9268C99.4662 56.1183 99.6536 56.349 99.7916 56.6189C99.9297 56.8887 100 57.2048 100 57.5692C100 58.0605 99.8736 58.4919 99.6183 58.8656C99.3632 59.237 98.9957 59.5276 98.5135 59.7376C98.0335 59.9452 97.453 60.0513 96.7695 60.0513C96.1094 60.0513 95.5335 59.9498 95.049 59.7468C94.5622 59.5461 94.1827 59.2508 93.9089 58.8633C93.635 58.4758 93.4876 58.0029 93.4665 57.447H94.9835C95.0046 57.7376 95.0982 57.9798 95.2574 58.1759C95.4188 58.3697 95.6294 58.5127 95.8871 58.6096C96.147 58.7041 96.4371 58.7526 96.7579 58.7526C97.0926 58.7526 97.3876 58.7018 97.6426 58.6026C97.8954 58.5034 98.0944 58.3651 98.2373 58.1851C98.3825 58.0075 98.4551 57.7976 98.4574 57.5577C98.4551 57.3386 98.3893 57.1563 98.2629 57.0133C98.1343 56.8703 97.9564 56.7503 97.7292 56.6535C97.5 56.5566 97.233 56.4689 96.9287 56.3928L95.9596 56.1483C95.2596 55.9707 94.7048 55.7008 94.2997 55.3386C93.8926 54.9765 93.6911 54.4967 93.6911 53.8946C93.6911 53.401 93.8269 52.9673 94.101 52.596C94.3723 52.2246 94.7447 51.9362 95.2152 51.7309C95.6881 51.5233 96.2218 51.4218 96.8162 51.4218C97.4203 51.4218 97.9492 51.5233 98.4058 51.7309C98.8622 51.9362 99.2206 52.2223 99.4802 52.5867C99.7401 52.9512 99.8759 53.3687 99.883 53.8416H98.3987Z" fill="white"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_790_6554">
          <rect width="100" height="20.3046" fill="white" transform="translate(0 40.0005)"/>
        </clipPath>
      </defs>
    </svg>
  );
  

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold mb-8 text-center"
      >
        MY TECH STACK
      </motion.h2>
      
      <motion.div
        className="grid gap-12"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {icons.map((icon) => (
          <motion.div
            key={icon}
            variants={itemVariants}
            whileHover="hover"
            animate={hoveredIcon === icon ? "hover" : "rest"}
            onHoverStart={() => setHoveredIcon(icon)}
            onHoverEnd={() => setHoveredIcon(null)}
            aria-label={`${icon} icon`}
            className="flex flex-col items-center justify-center"
          >
            <motion.div variants={iconAnimation} className="w-16 h-16">
              <Suspense fallback={<div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>}>
                {icon === 'nextjs' ? (
                  <NextJsSvg />
                ) : (
                  <StackIcon name={icon} />
                )}
              </Suspense>
            </motion.div>
            <motion.p
              className="mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {icon}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalTechStackShowcase;
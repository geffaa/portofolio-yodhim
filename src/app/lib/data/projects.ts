export interface Project {
    id: number;
    title: string;
    role: string;
    longDescription: string;
    technologies: string[];
    imageUrl: string;
    projectUrl: string;
    githubUrl: string;
    story: string;
    challenges: string;
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Gelanggang Expo UGM 2024",
      role: "Frontend Developer",
      longDescription: "I developed the Gelanggang Expo UGM website using Next.js and TailwindCSS to create a fast, responsive, and visually appealing platform for promoting student organizations and communities at Universitas Gadjah Mada. The website allows users to easily access detailed information about various student clubs, upcoming events, and opportunities to join, with a focus on providing a smooth user experience across devices. By leveraging Next.js for server-side rendering and TailwindCSS for streamlined styling, I ensured the site is both performant and scalable, while also integrating features like lazy loading for enhanced speed and mobile responsiveness to optimize accessibility.",
      technologies: ["Next Js", "Tailwind CSS", "Express"],
      imageUrl: "/assets/gelex.png",
      projectUrl: "https://ukm.ugm.ac.id/2024/gelex/",
      githubUrl: "https://github.com/GELEX-UGM/gelex-2024",
      story: "I was tasked with developing the Gelanggang Expo UGM website, a platform to showcase student organizations at Universitas Gadjah Mada. Using Next.js for server-side rendering and TailwindCSS for responsive design, I worked closely with the student representatives and design team to create a site that highlights detailed information about various student clubs and their events. The goal was to provide an easy-to-navigate, fast-loading platform that captured the vibrant student community, offering a dynamic user experience across devices.",
      challenges: "One major challenge was optimizing performance due to the large volume of dynamic content, requiring the implementation of lazy loading and efficient data fetching strategies. Ensuring mobile responsiveness for a diverse range of screen sizes also proved challenging, as most users access the site via mobile devices. Additionally, coordinating with non-technical stakeholders, like designers and content creators, led to communication gaps that required extra time and iterations to resolve."
    },
    {
      id: 2,
      title: "SUMU Super Apps",
      role: "Fullstack Developer",
      longDescription: "Sumu Apps is a comprehensive admin management platform designed to oversee the functionality of mobile applications within a super app ecosystem. Built with Laravel as a full-stack framework, the platform efficiently handles both the UI/UX of the admin interface and provides a robust API for mobile developers to integrate and manage various applications under the Sumu Apps umbrella. This solution offers a centralized hub for app monitoring, user management, and real-time data tracking, ensuring seamless collaboration between the admin team and mobile developers.",
      technologies: ["Flutter", "Firebase", "Laravel", "Tailwind CSS", "MySQL"],
      imageUrl: "/assets/sumu.png",
      projectUrl: "https://app-sumu.wesclic.com/",
      githubUrl: "https://github.com/Wesclic/DashboardSUMU",
      story: "The development of Sumu Apps was driven by the need for a streamlined management system that could cater to a wide range of mobile applications in a unified environment. Starting from the concept of a super app, the project evolved into a platform that not only serves as an administrative tool but also integrates complex features required for real-time app management and mobile app interactions. My role in this project involved developing both the front-end and back-end using Laravel, ensuring that the platform was both user-friendly for administrators and easily accessible via API for the mobile development team. The collaboration between teams allowed us to craft a solution that would optimize workflow and app performance.",
      challenges: "One of the biggest challenges during the development of Sumu Apps was ensuring the scalability and flexibility of the system to handle multiple applications within a single super app framework. Balancing the needs of the admin team, who required a clear and intuitive UI, with the technical demands of the mobile developers relying on the API, was critical. Additionally, designing the system to handle large amounts of data and real-time requests without compromising on performance or security presented a significant hurdle. Through careful optimization and thoughtful architecture, we overcame these challenges, resulting in a robust and scalable solution."
    },
    {
      id: 3,
      title: "Sistem Informasi Rekam Medis",
      role: "Project Manager, Fullstack Developer",
      longDescription: "The Electronic Medical Record Information System (EMRIS) project is a comprehensive web-based healthcare system designed to integrate with Satu Sehat, Indonesia's national health data platform. This system enables healthcare providers to efficiently manage patient records, appointments, medical histories, and billing, while ensuring seamless data exchange between hospitals and clinics through Satu Sehat's unified network. Built with modern web technologies, the system focuses on security, scalability, and user-friendliness, aiming to enhance the overall efficiency and quality of healthcare services in both urban and rural areas.",
      technologies: ["Yii2", "MySQL"],
      imageUrl: "/assets/rekmed.png",
      projectUrl: "https://rekmed.datacakra.com/",
      githubUrl: "https://github.com/aminhnh/pad_rekmed",
      story: "As the project manager and fullstack developer, I was responsible for overseeing the development from concept to launch, ensuring all stakeholders' requirements were met while maintaining a high standard of functionality and usability. Collaborating closely with healthcare professionals, we defined the system's core features, prioritizing ease of use for non-technical staff. Balancing the needs of front-end user experience with backend data security and integration with Satu Sehat, I led a team of developers through multiple sprints, refining the system based on iterative feedback and real-world testing in clinics.",
      challenges: "One of the primary challenges was ensuring secure and seamless integration with Satu Sehat, a national health platform with strict compliance and data privacy regulations. Ensuring the system could handle large volumes of sensitive health data while maintaining fast, reliable performance required meticulous planning and execution. Additionally, coordinating between medical staff with varying degrees of technical knowledge and the developers posed a significant communication challenge, demanding clear documentation and constant collaboration to align the technical solution with practical, real-world workflows."
    },
    {
      id: 4,
      title: "Management Inventory",
      role: "Fullstack Developer",
      longDescription: "I developed an inventory management website leveraging Laravel for the backend and TailwindCSS for the frontend design. The platform serves as a comprehensive solution for businesses to efficiently manage their inventory, track stock levels, and generate insightful reports. By providing real-time data and an intuitive user interface, the system empowers users to maintain accurate records, streamline their operations, and improve overall productivity. TailwindCSS was utilized to ensure a responsive and visually cohesive design, while Laravel offered robust features like authentication, API integrations, and database management.",
      technologies: ["Laravel", "Tailwind CSS"],
      imageUrl: "/assets/management.png",
      projectUrl: "https://github.com/geffaa/inventory_management.git",
      githubUrl: "https://github.com/geffaa/inventory_management.git",
      story: "The development journey began with a deep dive into the needs of small to medium-sized businesses looking for an effective inventory management system. The goal was to create a user-friendly interface while ensuring the backend was powerful enough to handle complex tasks like real-time stock updates, order management, and report generation. By using Laravel, I could rapidly prototype features while maintaining scalability. TailwindCSS helped streamline the front-end development with its utility-first approach, allowing for quick styling and customization. Each phase of the project—from initial design to deployment—was focused on ensuring efficiency and ease of use.",
      challenges: "One of the main challenges was optimizing the system to handle large datasets without compromising performance. Inventory systems often deal with thousands of records, and ensuring that the platform could manage these efficiently while still being responsive was crucial. Additionally, integrating third-party services, such as barcode scanning and automatic reordering, required careful handling of APIs and external libraries. Balancing functionality with an intuitive user experience was also challenging, as the system needed to be accessible to non-technical users while offering advanced features for power users."
    },
    {
      id: 5,
      title: "Cinemate",
      role: "Fullstack Developer",
      longDescription: "Cinemate is a comprehensive film information platform, designed to offer users detailed insights into the world of cinema. Built using Nuxt.js for dynamic server-side rendering and Tailwind CSS for responsive and aesthetically pleasing design, the platform offers an immersive user experience. By integrating with The Movie DB API, Cinemate delivers up-to-date information on the latest releases, popular films, and upcoming titles. Users can explore detailed pages featuring trailers, reviews, and ratings. The integration with Supabase ensures efficient back-end management, providing secure and fast data handling, contributing to a seamless browsing experience.",
      technologies: ["Nuxt Js", "Tailwind CSS", "Supabase"],
      imageUrl: "/assets/cinemate.png",
      projectUrl: "https://github.com/geffaa/cinemate.git",
      githubUrl: "https://github.com/geffaa/cinemate.git",
      story: "The idea behind Cinemate was to create a centralized platform for movie enthusiasts to easily access information about their favorite films. Drawing inspiration from IMDb, I wanted to build a solution that would not only showcase movies but also offer a more modern and visually appealing user experience. By leveraging Nuxt.js for its powerful SSR capabilities and integrating Supabase for streamlined data management, I was able to create a fast and secure platform. Collaborating closely with UI/UX designers, I ensured that the interface remained intuitive and responsive across devices, making it a go-to platform for cinephiles.",
      challenges: "One of the key challenges while developing Cinemate was managing the real-time data sync between the front-end and back-end while ensuring smooth performance. As The Movie DB API returns large amounts of data, optimizing the API calls without sacrificing speed was crucial. Additionally, integrating Supabase required meticulous planning to ensure secure user authentication and data storage. Achieving a balance between visual appeal and performance optimization for different devices was also a challenge, especially when handling high-resolution media like trailers and images."
    },
    {
      id: 6,
      title: "Fizzi 3D Website",
      role: "Fullstack Developer",
      longDescription: "Fizzi 3D is an innovative web application designed to provide an immersive experience through three-dimensional visualizations. Utilizing cutting-edge technologies such as Next.js for server-side rendering and Three.js for 3D graphics, this project aims to enhance user interaction by allowing them to explore complex visual data in an engaging way. The responsive design, implemented with TailwindCSS, ensures that the website performs seamlessly across various devices, making it accessible to a broader audience.",
      technologies: ["Next Js", "Three.js", "Tailwind CSS"],
      imageUrl: "/assets/fizzi.png",
      projectUrl: "https://learn3dwebsite.vercel.app/",
      githubUrl: "https://github.com/geffaa/learn-3Dwebsite",
      story: "The journey of creating Fizzi 3D began with a vision to redefine how users engage with digital content. As a fullstack developer, I aimed to blend creativity with technology to build an interactive platform that simplifies the understanding of complex concepts through visualization. Each feature was thoughtfully crafted to enhance user experience, transforming static information into dynamic presentations that captivate and educate users.",
      challenges: "One of the significant challenges faced during the development of Fizzi 3D was mastering the intricacies of Three.js to create fluid and responsive 3D animations. Balancing performance with aesthetics required meticulous optimization of graphical assets and rendering techniques. Additionally, ensuring cross-browser compatibility posed a challenge, as different browsers handle WebGL rendering in varied ways. Overcoming these obstacles not only deepened my technical skills but also enhanced my problem-solving abilities as a developer."
    },
    {
      id: 7,
      title: "Shopiverse",
      role: "Fullstack Developer",
      longDescription: "Shopiverse is an innovative full-stack e-commerce website designed to provide a seamless and enjoyable online shopping experience. The platform utilizes Nuxt.js and Tailwind CSS to create a responsive and visually appealing frontend, ensuring that users can easily navigate through a vast array of products. On the backend, Prisma Flow by Supabase manages the data efficiently, allowing for quick responses and reliable performance. Integrated with Stripe for secure payment processing, Shopiverse incorporates essential e-commerce functionalities such as user registration, login/logout features, and an intuitive product search system. The platform is designed with user experience in mind, making online shopping not only accessible but also engaging.",
      technologies: ["Nuxt Js", "Tailwind CSS", "Prisma Flow", "Supabase", "Stripe"],
      imageUrl: "/assets/shopiverse.png",
      projectUrl: "https://github.com/geffaa/shopiverse.git",
      githubUrl: "https://github.com/geffaa/shopiverse.git",
      story: "The conception of Shopiverse stemmed from a desire to transform the online shopping landscape by merging technology and customer-centric design. As a team, we aimed to build a platform that caters to the needs of modern consumers, who expect convenience and reliability from their shopping experiences. From brainstorming sessions to wireframing and ultimately coding, every phase of the project was driven by the goal of creating an e-commerce solution that feels personal and approachable. Throughout the development journey, we embraced feedback from potential users, allowing us to iterate and enhance the platform to better serve its audience, thereby turning our vision into reality.",
      challenges: "One of the primary challenges faced during the development of Shopiverse was ensuring seamless integration between various technologies, particularly the frontend and backend systems. Achieving a smooth user experience while handling complex data interactions posed difficulties, especially in optimizing performance and loading times. Additionally, implementing secure payment processing with Stripe required careful attention to security protocols and user data protection. To overcome these challenges, our team engaged in rigorous testing and continuous optimization, collaborating closely to troubleshoot issues and refine the integration process. Ultimately, these hurdles strengthened our skills and knowledge, allowing us to deliver a robust e-commerce platform that meets user expectations."
    },
    {
      id: 8,
      title: "Finnovate",
      role: "Mobile Developer",
      longDescription: "Finnovate is an innovative mobile application designed to revolutionize the trading landscape through enhanced financial literacy. Titled Finnovate Social Media Trader this platform aims to empower users with the knowledge and tools necessary for making informed investment decisions. By utilizing advanced React Native technology, Finnovate delivers a seamless user experience while integrating various APIs to provide real-time financial data and insights. This initiative represents a significant step towards democratizing trading by making financial education accessible to a wider audience, ultimately fostering a community of informed investors.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL"],
      imageUrl: "/assets/finnovate.jpg",
      projectUrl: "https://github.com/geffaa/Finnovate.git",
      githubUrl: "https://github.com/geffaa/Finnovate.git",
      story: "The inception of Finnovate arose from a vision to bridge the gap between financial education and modern trading practices. Recognizing the complexities of the financial markets and the challenges faced by new investors, our team set out to create a platform that not only simplifies trading but also equips users with essential knowledge. Throughout the development process, we engaged with potential users to understand their needs and expectations, ensuring that the final product resonates with their aspirations. This collaborative approach not only shaped the app's features but also fostered a sense of community among early adopters who are passionate about financial empowerment.",
      challenges: "One of the primary challenges in developing Finnovate was ensuring the seamless integration of multiple APIs to deliver real-time financial data without compromising performance. As we navigated through various technical hurdles, we had to maintain a delicate balance between functionality and user experience. Additionally, educating users on complex trading concepts while keeping the interface intuitive presented another layer of difficulty. Our team's resilience and commitment to iterative design allowed us to overcome these obstacles, resulting in a robust platform that empowers users to navigate the trading world confidently."
    },
    {
      id: 9,
      title: "Calorie Tracker ",
      role: "Mobile Developer",
      longDescription: "Calorie Tracker is an innovative mobile application developed as part of the Mobile Final Semester Examination (UAS). This application aims to empower users by providing an intuitive platform for tracking their daily calorie intake and expenditure. Built using Kotlin, Calorie Tracker seamlessly integrates functionalities such as logging food and beverage consumption, calculating calorie counts, and monitoring physical activities. The use of Firebase for cloud storage ensures that users can access their data securely across multiple devices, enhancing the overall user experience. With its user-friendly interface and reliable performance, Calorie Tracker serves as a valuable tool for individuals aiming to manage their dietary habits effectively.",
      technologies: ["Kotlin", "Firebase"],
      imageUrl: "/assets/calorie.png",
      projectUrl: "https://github.com/geffaa/PPAPB_UAS_CALORIETRACKERFINAL.git",
      githubUrl: "https://github.com/geffaa/PPAPB_UAS_CALORIETRACKERFINAL.git",
      story: "The journey of creating Calorie Tracker began with a simple yet impactful vision: to help individuals take control of their health through informed dietary choices. During the development process, I conducted extensive research on users’ needs and preferences, leading to the incorporation of essential features that resonate with their goals. Collaborating with peers and receiving feedback shaped the application’s design and functionality, ensuring that it caters to a diverse audience. As I navigated the complexities of mobile development, I discovered a passion for creating meaningful applications that promote healthier lifestyles, ultimately inspiring me to continue developing technology that supports well-being.",
      challenges: "One of the main challenges faced during the development of Calorie Tracker was ensuring the accuracy of calorie calculations and data logging. Integrating various food databases and maintaining an up-to-date repository of calorie information required significant effort and attention to detail. Additionally, optimizing the application for smooth performance across different devices posed a technical hurdle. To overcome these challenges, I adopted a methodical approach, conducting rigorous testing and iterating based on user feedback. This process not only enhanced the application's functionality but also deepened my understanding of mobile development, enabling me to create a robust and user-centric product."
    },
  ];
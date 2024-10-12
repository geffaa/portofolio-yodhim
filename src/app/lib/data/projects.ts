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
      longDescription: "A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory updates, secure payment processing, and a responsive design for optimal user experience across all devices. The platform includes features such as user authentication, product search and filtering, shopping cart functionality, and order tracking.",
      technologies: ["Next Js", "Tailwind CSS", "Express"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://ecommerce-project.com",
      githubUrl: "https://github.com/yourusername/ecommerce-project",
      story: "This project was born out of a desire to create a modern, scalable e-commerce solution. I noticed that many small businesses were struggling with outdated or overly complex platforms, so I set out to build something that was both powerful and user-friendly. Throughout the development process, I focused on creating a seamless experience for both shoppers and store owners.",
      challenges: "One of the biggest challenges was implementing real-time inventory management. I had to ensure that stock levels were accurately reflected across multiple concurrent sessions, which required careful consideration of race conditions and data consistency. Another significant hurdle was optimizing the performance of the product search feature, which I solved by implementing efficient indexing and caching strategies."
    },
    {
      id: 2,
      title: "SUMU Super Apps",
      role: "Fullstack Developer",
      longDescription: "A collaborative task management application built with Vue.js and Firebase. It includes real-time updates, task assignment, progress tracking, and integrations with popular productivity tools. The app features a drag-and-drop interface for easy task organization, deadline reminders, and detailed analytics to help teams improve their productivity.",
      technologies: ["Flutter", "Firebase", "Laravel", "Tailwind CSS", "MySQL"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://task-manager-app.com",
      githubUrl: "https://github.com/yourusername/task-manager-app",
      story: "The idea for this app came from my own struggles with managing team projects. I wanted to create a tool that combined the best features of existing task managers while adding a layer of real-time collaboration. As I built the app, I constantly sought feedback from potential users, which helped shape the feature set and user interface.",
      challenges: "Implementing real-time updates across multiple clients was a significant challenge. I had to carefully manage state synchronization and conflict resolution. Another challenge was designing an intuitive UI that could handle complex task hierarchies and relationships without becoming cluttered or confusing."
    },
    {
      id: 3,
      title: "Sistem Informasi Rekam Medis",
      role: "Project Manager, Fullstack Developer",
      longDescription: "An intelligent chatbot leveraging advanced NLP techniques to provide automated customer support. It integrates with existing CRM systems and can handle complex queries with high accuracy. The chatbot uses machine learning to continuously improve its responses and can seamlessly hand off to human agents when necessary.",
      technologies: ["Yii2", "MySQL"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://ai-chatbot.com",
      githubUrl: "https://github.com/yourusername/ai-chatbot",
      story: "This project was inspired by my fascination with AI and natural language processing. I saw an opportunity to improve customer support experiences by creating a chatbot that could understand and respond to complex queries more naturally. Throughout the development, I was constantly amazed by the potential of NLP and how it could be applied to real-world problems.",
      challenges: "Training the NLP model to understand context and maintain conversation coherence was a major challenge. I had to experiment with various architectures and training techniques to achieve satisfactory results. Another challenge was integrating the chatbot with existing CRM systems, which required developing a flexible API and dealing with various data formats."
    },
    {
      id: 4,
      title: "Management Inventory",
      role: "Fullstack Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["Laravel", "Tailwind CSS"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
    {
      id: 5,
      title: "Cinemate",
      role: "Fullstack Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL", "D3.js", "TensorFlow Lite"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
    {
      id: 6,
      title: "Fizzi 3D Website",
      role: "Fullstack Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL", "D3.js", "TensorFlow Lite"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
    {
      id: 7,
      title: "Shopiverse",
      role: "Fullstack Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL", "D3.js", "TensorFlow Lite"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
    {
      id: 8,
      title: "Finnovate",
      role: "Mobile Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL", "D3.js", "TensorFlow Lite"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
    {
      id: 9,
      title: "Calorie Tracker ",
      role: "Mobile Developer",
      longDescription: "A comprehensive fitness tracking mobile application built with React Native. It offers workout planning, nutrition tracking, progress visualization, and integration with popular fitness devices. The app uses machine learning to provide personalized workout and diet recommendations based on user goals and progress.",
      technologies: ["React Native", "Redux", "Firebase", "GraphQL", "D3.js", "TensorFlow Lite"],
      imageUrl: "/assets/Dummy.jpg",
      projectUrl: "https://fitness-tracker.com",
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      story: "As a fitness enthusiast, I always felt that existing tracking apps were missing key features I wanted. This project was my attempt to create the ultimate fitness companion app. I worked closely with personal trainers and nutritionists to ensure the app provided valuable, science-based insights and recommendations.",
      challenges: "Accurately tracking and categorizing various types of exercises was a significant challenge, especially for strength training exercises. I had to develop robust algorithms for rep counting and form checking using the device's sensors. Another major hurdle was creating a flexible nutrition tracking system that could handle various dietary preferences and restrictions while still providing accurate nutritional information."
    },
  ];
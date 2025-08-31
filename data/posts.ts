import { ProjectType } from '@/data/constants';

function getRandomNumber(min: number, max: number): string | number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num;
}

function getRandomVotes(): number {
  return Math.floor(Math.random() * 10000); // 50 to 10k range
}

function getRandomViews(): string | number {
  return getRandomNumber(1000, 1000000); // 1K to 1M range
}

function getRandomStars(): string | number {
  return getRandomNumber(1, 100000); // 1 to 100K range
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

export interface Post {
  title: string;
  slug: string;
  username: string;
  publishedAt: Date;
  votes: number;
  content: string;
  image?: string;
  category: ProjectType;
  tags?: string[];
  github?: string;
  demo?: string;
  detailedContent?: string;
  technologies?: string[];
  views: string | number;
  stars: string | number;
  projectPurpose?: string;
  problemSolved?: string;
  keyFeatures?: string[] | string;
  screenshots?: Array<{
    url: string;
    caption?: string;
  }>;
  video?: string;
  bestIndex?: number; // Custom index for "Best" sorting (lower number = higher priority)
}

function createPost(
  postData: Omit<Post, 'username' | 'votes' | 'views' | 'stars' | 'slug'>
): Post {
  return {
    username: 'DigitalEpidemic',
    votes: getRandomVotes(),
    views: getRandomViews(),
    stars: getRandomStars(),
    slug: generateSlug(postData.title),
    ...postData,
  };
}

const UNSORTED_POSTS: Post[] = [
  createPost({
    title: 'AI Voice Translator',
    bestIndex: 2,
    publishedAt: new Date('2024-10-18'), // October 18, 2024
    content:
      'An Electron application that translates audio between 32 languages while preserving your voice identity through AI voice cloning.',
    image: '/ai-voice-translator/main.png',
    category: ProjectType.WEB,
    tags: ['AI', 'Desktop App', 'Translation', 'Voice Cloning'],
    github: 'https://github.com/DigitalEpidemic/ai-voice-translator',
    detailedContent:
      "I integrated Deepgram and AssemblyAI for audio transcription, Google Translate's translation engine for converting the transcribed text to the target language, and ElevenLabs for voice synthesis that maintains the original speaker's voice characteristics. The app is built as a desktop application using Electron, React, and TypeScript to provide a smooth user experience across all platforms.\n\nThe UI is designed to be intuitive, with separate tabs for different translation methods: Speech-to-Speech for real-time microphone recording, File Translation for audio files, URL Translation for online audio, and Text-to-Speech for direct text input.",
    technologies: [
      'Electron',
      'React',
      'TypeScript',
      'Vite',
      'CSS',
      'Deepgram API',
      'AssemblyAI API',
      'ElevenLabs API',
      'Google Translate API',
    ],
    projectPurpose:
      'Deeply connect with my Filipino family and non-English speaking friends in their native languages while streamlining the entire translation process for back-and-forth communication',
    problemSolved:
      'Language barriers preventing deep emotional connections with family and friends due to the lack of voice-preserving translation tools',
    keyFeatures: [
      'Voice cloning for natural-sounding translations',
      'Support for 32 different languages',
      'Multiple input methods (microphone, file upload, URL, text)',
      'Real-time speech recognition and translation',
      'Cross-platform desktop application',
    ],
    screenshots: [
      {
        url: '/ai-voice-translator/file.png',
        caption: 'Upload a file to transcribe and translate',
      },
      {
        url: '/ai-voice-translator/url.png',
        caption: 'Enter a URL to transcribe and translate',
      },
      {
        url: '/ai-voice-translator/tts.png',
        caption: 'Text-to-speech translation',
      },
      {
        url: '/ai-voice-translator/history.png',
        caption: 'View your translation history',
      },
    ],
  }),
  createPost({
    title: 'Retro Tool',
    bestIndex: 3,
    publishedAt: new Date('2025-03-31'), // March 31, 2025
    content:
      'A real-time collaborative retrospective tool for team feedback and insights with drag-and-drop functionality and live updates.',
    image: '/retro-tool/main.png',
    category: ProjectType.WEB,
    tags: [
      'Collaboration',
      'Team Tools',
      'Real-time',
      'Remote Work',
      'Mobile Friendly',
    ],
    github: 'https://github.com/DigitalEpidemic/retro-tool',
    demo: 'https://retro-tool.netlify.app',
    detailedContent:
      "This was designed to facilitate remote team retrospectives with real-time collaboration features. It allows teams to create, share, and organize feedback in a structured format regardless of their physical location.\n\nThe application uses Firebase's real-time database to ensure all team members see updates instantly as they happen. This creates a truly collaborative experience where everyone can contribute simultaneously without conflicts or refresh delays.\n\nI implemented drag-and-drop functionality for card organization, making it intuitive to sort and prioritize feedback. The UI is responsive and clean thanks to Tailwind CSS, providing a consistent experience across all devices.",
    technologies: [
      'React',
      'TypeScript',
      'Firebase',
      'Tailwind CSS',
      'Vite',
      'Netlify',
    ],
    projectPurpose:
      'Create a free and extensible alternative to the retrospective tool we used at work after it introduced a paywall',
    problemSolved:
      "My team's retrospective tool introduced a paywall that removed key features, so we needed a free, real-time alternative that allowed structured, engaging retrospectives with the flexibility to add new features.",
    keyFeatures: [
      'Real-time updates across all connected users',
      'Drag-and-drop organization of feedback cards',
      'Customizable retrospective columns',
      'Markdown export for easy sharing',
      'Card voting system',
      'QR code sharing',
    ],
    screenshots: [
      {
        url: '/retro-tool/login.png',
        caption: 'Login page to create/join a retrospective',
      },
      {
        url: '/retro-tool/participants.png',
        caption: 'Real-time participants list',
      },
      {
        url: '/retro-tool/export.png',
        caption: 'Export retrospective as a Markdown file',
      },
      {
        url: '/retro-tool/qrcode.png',
        caption: 'Share retrospective via QR code or link',
      },
    ],
  }),
  createPost({
    title: 'Screen Sharing Tool',
    bestIndex: 1,
    publishedAt: new Date('2025-05-04'), // May 4, 2025
    content:
      'A browser-based, serverless screen sharing app that uses WebRTC and Firebase to deliver fast, private, native resolution screen sharing with no logins, no installs, and no compression artifacts.',
    image: '/screenshare-tool/main.png',
    category: ProjectType.WEB,
    tags: ['P2P', 'Screen Sharing', 'Privacy', 'Serverless'],
    github: 'https://github.com/DigitalEpidemic/webRTC-screenshare',
    demo: 'https://screenshare-tool-dev.netlify.app/',
    detailedContent:
      "This browser-based application allows you to share your screen in real-time with others using a secure peer-to-peer connection powered by WebRTC. It uses Firebase's Realtime Database as the signaling server to establish connections between peers without needing any backend infrastructure.\n\nThe app is designed to be lightweight, fast, and responsive across devices, with support for native resolution screen sharing so text and visuals remain crystal clear.\n\nI implemented a mesh-based architecture, meaning multiple users can join and share their screens simultaneously in the same room.\n\nJoining is simple: create or share a room code and you're connected!",
    technologies: [
      'WebRTC',
      'React',
      'TypeScript',
      'Firebase',
      'Tailwind CSS',
      'Vite',
      'Netlify',
    ],
    projectPurpose:
      'To create a lightweight, privacy-respecting alternative for screen sharing during coding sessions and remote collaboration, especially for developers needing pixel-perfect, full-resolution screen clarity.',
    problemSolved:
      'Most free screen sharing tools either compress the video heavily or require accounts, installations, or centralized servers. I wanted a way to share my screen with teammates in full resolution, without signing up for a service or losing image quality.',
    keyFeatures: [
      'Native resolution',
      'Fully peer-to-peer mesh architecture',
      'Simple room-based joining system',
      'No accounts, installs, or servers needed',
    ],
    screenshots: [
      {
        url: '/screenshare-tool/home.png',
        caption: 'Create or join a room',
      },
      {
        url: '/screenshare-tool/participant.png',
        caption: 'View other participants screens',
      },
      {
        url: '/screenshare-tool/theater.png',
        caption: 'View screens in theater mode',
      },
      {
        url: '/screenshare-tool/fullscreen.png',
        caption: 'View native resolutions in fullscreen mode',
      },
    ],
  }),
  createPost({
    title: 'Power Calc',
    bestIndex: 5,
    publishedAt: new Date('2021-03-19'), // March 19, 2021
    content:
      'A comprehensive powerlifting calculator with 1RM estimation, percentage-based training loads, Wilks coefficient scoring, weight conversion, and intelligent plate loading for competitive lifters.',
    image: '/powercalc/main.jpg',
    category: ProjectType.WEB,
    tags: ['Fitness', 'Calculator', 'Training', 'Powerlifting'],
    // github: "https://github.com/DigitalEpidemic/powercalc", // TODO: Add Contact for access or supply apk
    // demo: "https://powercalc.netlify.app",
    detailedContent:
      'This calculator was born out of my own powerlifting journey and the need for accurate, accessible training calculations. The rep max calculator estimates your maximum lifts for 1-12 reps based on your current performance, helping you plan progressive overload and track strength gains.\n\nThe plate calculator is one of the most practical features that tells you exactly which weight plates to load on each side of the barbell. You can toggle which plates are available in your gym, and it optimizes the loading pattern accordingly. The built-in lbs/kg converter handles the common need to switch between imperial and metric units.\n\nI also integrated percentage-based training calculations and Wilks coefficient scoring for competitive lifters who want to compare their performance across different body weights.',
    technologies: ['React Native', 'TypeScript', 'CSS'],
    projectPurpose:
      'Create a reliable, offline-capable calculator for powerlifters to calculate powerlifting metrics and optimize their training',
    problemSolved:
      'Powerlifters had to use multiple apps and websites to access different calculators, creating inefficiency and inconsistency. There was no unified platform that combined essential tools in an offline-capable application.',
    keyFeatures: [
      'Rep max estimation calculator',
      'Percentage-based training load calculator',
      'Intelligent plate calculator with customizable available weights',
      'Lbs to kg and kg to lbs weight conversion',
      'Wilks coefficient scoring for competition',
    ],
    screenshots: [
      {
        url: '/powercalc/calculators.jpg',
        caption: 'List of all the different calculators',
      },
      {
        url: '/powercalc/percentage.jpg',
        caption: 'Calculate your training load percentage',
      },
      {
        url: '/powercalc/points.jpg',
        caption: 'Calculate your Wilks and DOTS points',
      },
      {
        url: '/powercalc/timer.jpg',
        caption: 'Time your workouts/rests and count your sets',
      },
      {
        url: '/powercalc/plateloader.jpg',
        caption: 'Calculate which plates to load on the barbell',
      },
      {
        url: '/powercalc/conversion.jpg',
        caption: 'Convert between lbs and kg',
      },
    ],
  }),
  createPost({
    title: 'Amazon UI Clone',
    publishedAt: new Date('2019-02-25'), // February 25, 2019
    content:
      "A mobile UI clone of Amazon's shopping app built with React Native and Expo, featuring product listings, navigation menu UI, and responsive design.",
    image: '/amazon-ui/main.png',
    category: ProjectType.WEB,
    tags: ['Mobile App', 'UI Clone', 'E-commerce', 'Design Practice'],
    github: 'https://github.com/DigitalEpidemic/amazon-ui-rn',
    // demo: "https://your-demo-link.com", // Optional: if Expo Snack or similar
    detailedContent:
      "I leveraged NativeBase for the UI components to understand how different elements could be constructed and styled to match Amazon's design patterns. The project includes recreating the home screen layout with product categories, deal banners, and the signature Amazon visual hierarchy.\n\nThe navigation menu is present but the links don't actually navigate anywhere - this was purely a UI recreation exercise focused on understanding component structure and visual design patterns rather than implementing full functionality. It was fascinating to break down how each visual element translates into specific component choices and styling decisions.",
    technologies: ['React Native', 'Expo', 'NativeBase', 'JavaScript'],
    projectPurpose:
      'Learn how to break down and recreate a professional mobile UI by visually analyzing component structure and design patterns.',
    problemSolved:
      'How to reverse-engineer professional mobile app designs and translate visual elements into actual components and code.',
    keyFeatures: [
      'Home screen with scrollable categories and deal banners',
      'Navigation menu UI',
      'Product listings with pricing and rating displays',
      'Professional UI recreation using NativeBase components',
    ],
    screenshots: [
      {
        url: '/amazon-ui/main-2.png',
        caption: 'Home screen',
      },
      {
        url: '/amazon-ui/sidemenu.png',
        caption: 'Navigation menu UI',
      },
    ],
  }),
  createPost({
    title: 'Instagram UI Clone',
    publishedAt: new Date('2019-03-09'), // March 9, 2019
    content:
      "A React Native clone of Instagram's mobile UI with working navigation, native camera functionality, and core features like home feed, stories, profile, and explore tabs.",
    image: '/instagram-ui/main.png',
    category: ProjectType.WEB,
    tags: ['Mobile App', 'UI Clone', 'Social Media', 'Camera Integration'],
    github: 'https://github.com/DigitalEpidemic/instagram-ui-rn',
    // demo: "https://your-demo-link.com", // Optional: if you publish to Expo Go or Snack
    detailedContent:
      'I leveraged NativeBase for UI components and React Navigation to create functional navigation between screens. The project includes native camera integration for photo and video capture, allowing users to actually take photos and videos within the app.\n\nUnlike purely visual clones, this implementation features working tab navigation, allowing users to seamlessly move between the home feed, explore tab, camera functionality, and profile screens. The camera integration demonstrates how to work with device hardware APIs in React Native.',
    technologies: [
      'React Native',
      'Expo',
      'NativeBase',
      'React Navigation',
      'JavaScript',
    ],
    projectPurpose:
      'Build a functional social media UI clone with working navigation and native device integration to understand app architecture beyond visual recreation.',
    problemSolved:
      'How to implement functional navigation and integrate native device features like camera access in a social media app clone.',
    keyFeatures: [
      'Working bottom tab navigation between screens',
      'Native camera integration for photo/video capture',
      'Home feed with post UI and interactions',
      'Stories section with horizontal scroll',
      'Explore tab layout with grid content',
      'Profile screen with posts and user information',
    ],
    screenshots: [
      {
        url: '/instagram-ui/explore.png',
        caption: 'Explore tab with grid layout',
      },
      {
        url: '/instagram-ui/gallery.png',
        caption: 'Gallery view to create a post',
      },
      {
        url: '/instagram-ui/photo.png',
        caption: 'Native camera integration to preview photo',
      },
      {
        url: '/instagram-ui/video.png',
        caption: 'Native video capture to preview video',
      },
      {
        url: '/instagram-ui/activity-following.png',
        caption: 'View activity of users you follow',
      },
      {
        url: '/instagram-ui/activity-you.png',
        caption: 'View activity of your own account',
      },
      {
        url: '/instagram-ui/profile.png',
        caption: 'User profile page',
      },
    ],
  }),
  createPost({
    title: 'Shinobi Jump',
    bestIndex: 10,
    publishedAt: new Date('2020-03-09'), // March 9, 2020
    content:
      'A fast-paced ninja wall-jumping mobile game built in Unity. Tap to leap between walls, dodge spikes, and climb endlessly.',
    image: '/shinobi-jump/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Platformer', 'Ninja', 'Endless', 'Minimalist'],
    // demo: "https://your-demo-link.com", // Optional APK or WebGL demo
    detailedContent:
      "Shinobi Jump is a vertical platformer where you control a ninja scaling between walls while avoiding deadly traps. With a single tap, leap across walls, flip mid-air, and survive as long as you can.\n\nThe game was built in Unity with 2D physics and tight, responsive controls for mobile. It's simple, addictive, and replayable. Designed for quick sessions with increasing difficulty.",
    technologies: [
      'Unity',
      'C#',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'GIMP',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create a minimalist but engaging vertical platformer that demonstrates responsive controls and 2D game mechanics using Unity.',
    problemSolved:
      'The need for a clean, focused mobile game without clutter or unnecessary complexity that delivers smooth, satisfying gameplay',
    keyFeatures: [
      'Single-tap wall-jumping controls',
      'Dodge spike traps and climb endlessly',
      'Smooth ninja flips and responsive physics',
      'Minimal UI optimized for mobile',
      'Replayable, fast-paced gameplay loop',
    ],
    screenshots: [
      {
        url: '/shinobi-jump/main.jpeg',
        caption: 'Main menu',
      },
      {
        url: '/shinobi-jump/game-1.jpeg',
        caption: 'Trap-filled vertical level design',
      },
      {
        url: '/shinobi-jump/game-2.jpeg',
        caption: 'Stylized ninja silhouette aesthetics',
      },
      {
        url: '/shinobi-jump/game-3.jpeg',
        caption: 'Climb up the walls and avoid traps',
      },
    ],
  }),
  createPost({
    title: 'Tappy Road',
    bestIndex: 9,
    publishedAt: new Date('2019-11-01'), // November 1, 2019
    content:
      'An endless arcade game where you slide road pieces under your vehicle to avoid falling. Test your reflexes and keep your path going!',
    image: '/tappy-road/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Endless', 'Low Poly'],
    // demo: "https://your-demo-link.com", // Optional APK/WebGL demo
    detailedContent:
      'Tappy Road challenges players to tap left or right to slide road sections underneath a moving vehicle. Arrange chunks to build a continuous path, dodge obstacles, and prevent your car from driving off the edge.\n\nBuilt in Unity and optimized for mobile, it features simple controls, fast-paced arcade gameplay, and an endless runner loop with a visual twist. The game balances reflex testing and strategic planning in a low poly style.',
    technologies: [
      'Unity',
      'C#',
      'Blender',
      'Adobe Photoshop',
      'GIMP',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create a low poly, addictive mobile arcade experience that hones reflexes and timing using simple tap controls.',
    problemSolved:
      'The need for an accessible yet challenging mobile game that focuses on reactive precision rather than speed or complex mechanics',
    keyFeatures: [
      'Tap left/right to slide road segments under your car',
      'Endless path survival gameplay',
      'Simple, intuitive controls',
      'Optimized for quick-play sessions',
    ],
    screenshots: [
      {
        url: '/tappy-road/main.jpeg',
        caption: 'Main menu',
      },
      {
        url: '/tappy-road/game-1.jpeg',
        caption: 'Make it past the finish line',
      },
      {
        url: '/tappy-road/game-2.jpeg',
        caption: 'Avoid gaps or your vehicle falls',
      },
      {
        url: '/tappy-road/game-3.jpeg',
        caption: 'Minimal UI and fast-paced gameplay',
      },
    ],
  }),
  createPost({
    title: 'Perfect Knife',
    publishedAt: new Date('2019-10-29'), // October 29, 2019
    content:
      'A precision knife-throwing game where you tap to throw knives at rotating wooden targets. Hit the wooden targets to advance through challenging levels.',
    image: '/perfect-knife/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Precision', 'Minimalist'],
    // demo: "https://your-demo-link.com", // Optional APK/WebGL demo
    detailedContent:
      'Perfect Knife challenges players to time their throws perfectly as wooden targets spin at varying speeds. Each successful throw builds momentum, but one mistake ends your streak and forces you to restart your progress.\n\nBuilt in Unity with 2D graphics and optimized for mobile, it features satisfying sound effects and smooth animations that reward precision. The minimalist visual design, created using Adobe Illustrator and Photoshop, keeps players focused on the core challenge of perfect timing.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create an addictive precision game that rewards timing and aim through increasingly challenging scenarios.',
    problemSolved:
      'The need for a skill-based mobile game that provides satisfying feedback for precision and timing without relying on complex controls',
    keyFeatures: [
      'Tap-to-throw knife mechanics with precision timing',
      'Progressive levels with faster rotations and obstacles',
      'Minimalist design focused on core gameplay',
      'Satisfying sound effects and visual feedback',
    ],
    screenshots: [
      {
        url: '/perfect-knife/main.png',
        caption: 'Clean, minimalist UI focused on gameplay',
      },
      {
        url: '/perfect-knife/game-1.png',
        caption: 'Throwing knives at rotating wooden targets',
      },
      {
        url: '/perfect-knife/game-2.png',
        caption: 'Gameplay focus on timing and precision',
      },
      {
        url: '/perfect-knife/game-3.png',
        caption: 'Quick-play design for mobile',
      },
    ],
  }),
  createPost({
    title: 'Twisty Dots',
    bestIndex: 13,
    publishedAt: new Date('2019-11-05'), // November 5, 2019
    content:
      'A fast-paced colour-matching arcade game built in Unity. Tap, match, and twist through rings while avoiding crashes.',
    image: '/twisty-dots/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Colour Matching', 'Reflex', 'Minimalist'],
    // demo: "https://your-demo-link.com", // Optional APK or WebGL
    detailedContent:
      'Twisty Dots puts your reflexes and colour perception to the test in high-speed scenarios. Select a colour by tapping, then expand the growing inner ring to match it with the outer target while navigating to avoid wall collisions.\n\nBuilt in Unity with vibrant visuals and responsive one-touch controls, the game combines twitch gameplay with visual acuity challenges. The minimalist visual design, created using Adobe Illustrator and Photoshop, keeps players focused on the core challenge. Designed for mobile with instant replayability, each session sharpens reaction time and colour recognition skills through increasingly intense rounds.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create a reflex-based mobile game that challenges colour matching and quick thinking in an addictive loop.',
    problemSolved:
      'The need for an engaging, skill-based alternative to passive or repetitive casual arcade games that focuses on fast colour decisions and timing',
    keyFeatures: [
      'Tap to select colours and match targets',
      'Expand rings without crashing into walls',
      'Reflex-driven, fast-paced gameplay',
      'Clean, colourful visual design',
      'Short and challenging game sessions for mobile',
    ],
    screenshots: [
      {
        url: '/twisty-dots/main.jpg',
        caption: 'Colour matching ring challenge',
      },
      {
        url: '/twisty-dots/game-1.jpg',
        caption: 'Expanding rings and avoiding collisions',
      },
      {
        url: '/twisty-dots/game-2.jpg',
        caption: 'Fast-paced gameplay interface',
      },
      {
        url: '/twisty-dots/game-3.jpg',
        caption: 'Colour selection and inner ring tap mechanic',
      },
    ],
  }),
  createPost({
    title: 'Dodge Racer',
    bestIndex: 11,
    publishedAt: new Date('2020-03-05'), // March 5, 2020
    content:
      "A drifting arcade racer built in Unity. Navigate obstacle courses, dodge traffic, outrun the cops, and don't crash!",
    image: '/dodge-racer/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Racing', 'Arcade', 'Action', 'Endless'],
    // demo: "https://your-demo-link.com", // Optional APK/WebGL demo
    detailedContent:
      'Dodge Racer is an adrenaline-pumping mobile racing game where players drift through obstacle courses, avoid crashing, and stay ahead of pursuing police. Featuring speed boosts, tight corners, and intense chase sequences, this game delivers reactive and immersive racing action.\n\nBuilt in Unity, it features responsive mobile controls, dynamic obstacle layouts, and increasing challenge as speed and traffic density ramp up.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Develop a mobile racing game that tests reflexes and drifting skills, balancing speed, obstacles, and chase intensity.',
    problemSolved:
      'The need for a fresh, unpredictable racing experience that adds chaos and variety beyond repetitive track-based gameplay',
    keyFeatures: [
      'Drift through dynamic courses with simple controls',
      'Avoid hazardous obstacles',
      'Collect speed boosts for extra velocity',
      'Fend off police chases for added thrill',
      'Endless arcade mode with increasing difficulty',
    ],
    screenshots: [
      {
        url: '/dodge-racer/menu.jpg',
        caption: 'Seamless gameplay loop',
      },
      {
        url: '/dodge-racer/game-1.jpg',
        caption: 'Drifting through obstacle-filled roads',
      },
      {
        url: '/dodge-racer/game-2.jpg',
        caption: 'Evading traffic under police pursuit',
      },
      {
        url: '/dodge-racer/game-3.jpg',
        caption: 'Speed boosts and tight cornering',
      },
    ],
  }),
  createPost({
    title: 'Shooty Circle',
    publishedAt: new Date('2019-12-28'), // December 28, 2019
    content:
      'A casual arcade-battle game where you dodge, shoot, and grow. Slide to move, fire on the go, and become the biggest circle on the battlefield.',
    image: '/shooty-circle/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Battle', 'Growth', 'Endless'],
    // demo: "https://your-demo-link.com", // Optional APK/WebGL demo
    detailedContent:
      'Shooty Circle is a fast-paced arcade battle game where you navigate by sliding your finger, automatically firing when stationary, and collecting smaller circles to grow in size. Outmaneuver enemy circles and blast them away as you strive to become the biggest on the field.\n\nDeveloped in Unity with gameplay that combines intuitive touch controls, gradual progression as you absorb smaller circles, and arcade-style growth battles.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Build a simple yet addictive battle-arcade game that blends growth mechanics and casual shooter controls on mobile.',
    problemSolved:
      'The need for a casual competitive game that avoids complex controls and pay-to-win mechanics while offering engaging auto-fire and growth gameplay',
    keyFeatures: [
      'Joystick-based movement, auto-fire when still',
      'Collect smaller circles to grow',
      'Avoid and destroy enemy circles',
      'Fast, arcade-style gameplay loops',
    ],
    screenshots: [
      {
        url: '/shooty-circle/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/shooty-circle/game-1.jpg',
        caption: 'Minimalist UI',
      },
      {
        url: '/shooty-circle/game-2.jpg',
        caption: 'Collect dots to grow',
      },
      {
        url: '/shooty-circle/game-3.jpg',
        caption: 'Firing on the go',
      },
    ],
  }),
  createPost({
    title: 'Dead Gun',
    publishedAt: new Date('2020-01-05'), // January 5, 2020
    content:
      'A zombie-survival arcade shooter built in Unity. Choose your weapon, defend barricades, and survive relentless waves of the undead.',
    image: '/dead-gun/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Zombie', 'Survival', 'Shooter', 'Endless'],
    // demo: "https://your-demo-link.com",
    detailedContent:
      "Dead Gun pits you against wave after wave of zombies as the last survivor. Players choose from a collection of weapons, reinforce barricades, and fend off varied zombie types in grown-in-intensity survival rounds.\n\nDeveloped in Unity, the game blends weapon-based strategy with frantic arcade reflexes. You'll need to balance offense and defense to stay alive as zombies relentlessly attack your fortifications.",
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create a tense, fast-paced survival shooter that combines weapon choice, barricade strategy, and constant threat escalation.',
    problemSolved:
      'The need for a mobile shooter with strategic depth that goes beyond simple shooting by adding barricade defense and weapon selection for enhanced engagement',
    keyFeatures: [
      'Multiple weapon options to choose from',
      'Build and maintain barricades under pressure',
      'Face diverse zombie types and intensifying waves',
      'Endless survival mode with escalating difficulty',
    ],
    screenshots: [
      {
        url: '/dead-gun/menu.jpg',
        caption: 'Main menu and weapon selection',
      },
      {
        url: '/dead-gun/game-1.jpg',
        caption: 'Fending off waves of zombies at the barricade',
      },
      {
        url: '/dead-gun/game-2.jpg',
        caption: 'Choosing and firing from varied weapons',
      },
      {
        url: '/dead-gun/game-3.jpg',
        caption: 'Zombie types ramp up as the rounds progress',
      },
    ],
  }),
  createPost({
    title: 'Can You Shoot?',
    bestIndex: 12,
    publishedAt: new Date('2019-12-27'), // December 27, 2019
    content:
      'An endless arcade shooter. Tap to keep the can in the air and rack up points in this reflex-based challenge!',
    image: '/can-you-shoot/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Endless'],
    // demo: "https://your-demo-link.com", // Optional APK/WebGL demo
    detailedContent:
      'Can You Shoot? challenges your reflexes as you tap to keep a flying can airborne. The goal is to prevent it from falling while maintaining rhythm and timing. Free, fast, and addictive. Perfect for quick mobile play.\n\nBuilt in Unity with C#, this simple yet engaging game focuses on pure reflex-based mechanics.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      'Build a lightweight reflex-based mobile game with simple one-touch mechanics that are easy to learn but hard to master.',
    problemSolved:
      'The need for a pure reflex skill game that brings focus back to core timing abilities in a minimalist, repeatable setting without relying on luck or elaborate mechanics',
    keyFeatures: [
      'Tap to keep a can bouncing in the air',
      'Test your reflexes and timing',
      'Simple, addictive arcade loop',
      'Minimalist visuals and controls',
      'Optimized for quick-play sessions',
    ],
    screenshots: [
      {
        url: '/can-you-shoot/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/can-you-shoot/game-1.jpg',
        caption: 'Tapping to keep the can airborne',
      },
      {
        url: '/can-you-shoot/game-2.jpg',
        caption: 'Fast-paced reflex gameplay',
      },
      {
        url: '/can-you-shoot/game-3.jpg',
        caption: 'Score-chasing addictiveness',
      },
    ],
  }),
  createPost({
    title: 'Spin Knight',
    publishedAt: new Date('2019-10-31'), // October 31, 2019
    content:
      'A top-down dungeon crawler where you spin to slice foes, dodge traps, and clear room after room.',
    image: '/spin-knight/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Dungeon Crawler', 'Action', 'Top-Down'],
    // demo: "https://apps.apple.com/us/app/spin-knight/id1489241259", // TODO: Switch to App Store link
    detailedContent:
      'Spin Knight is an innovative take on classic dungeon crawlers: instead of walking, you spin your knight to slice through enemies. Clear entire rooms, avoid spike traps, and wield a variety of weapons as waves of foes come at you.\n\nBuilt in Unity using 2D physics and strategic arcade combat, the game delivers fast-paced action wrapped in minimalist but engaging visuals.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      'Reinvent dungeon combat with a unique spin-to-damage mechanic and tight arcade action.',
    problemSolved:
      'The need to speed up and refresh traditional dungeon crawler gameplay that can feel slow and overly tactical',
    keyFeatures: [
      'Spin to attack enemies in all directions',
      'Clear rooms to progress floor-by-floor',
      'Variety of weapons and trap types',
      'Instant, arcade-style combat loop',
    ],
    screenshots: [
      {
        url: '/spin-knight/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/spin-knight/game-1.jpg',
        caption: 'Spinning sword attack in action',
      },
      {
        url: '/spin-knight/game-2.jpg',
        caption: 'Clearing monsters in enclosed rooms',
      },
      {
        url: '/spin-knight/game-3.jpg',
        caption: 'Avoiding spike traps between spins',
      },
    ],
  }),
  createPost({
    title: 'Smashy Block',
    publishedAt: new Date('2019-10-11'), // October 11, 2019
    content: 'Jump, smash floors, and descend deeper into the tower!',
    image: '/smashy-block/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Platformer', 'Endless'],
    // github: "https://github.com/DigitalEpidemic/smashy-block",
    detailedContent:
      'Smashy Block is an arcade game where you tap to jump and tap again to smash through floor sections. Bounce off walls for extra height, break down floors, defeat enemies, and descend deeper in a relentless tower of chaos.\n\nDeveloped in Unity for mobile, it packs quick reflex gameplay into challenging mechanics.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      "Craft a satisfying arcade loop with fast-paced floor-smashing and tower descent. Similar to the classic mobile game 'Helix Jump'.",
    problemSolved:
      'The need to renew excitement in endless jumping games by adding satisfying floor-smashing and bouncing mechanics',
    keyFeatures: [
      'Tap to jump and smash floors',
      'Bounce off walls for higher smash',
      'Descend deeper into the tower',
      'Fast-paced arcade gameplay',
    ],
    screenshots: [
      {
        url: '/smashy-block/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/smashy-block/game-1.jpg',
        caption: 'Ascending then smashing floors',
      },
      {
        url: '/smashy-block/game-2.jpg',
        caption: 'Double tap to smash',
      },
      {
        url: '/smashy-block/game-3.jpg',
        caption: 'Tower obstacles',
      },
    ],
  }),
  createPost({
    title: 'Pixel Defender',
    publishedAt: new Date('2019-09-06'), // September 6, 2019
    content:
      'A pixel-art style action tower defense: block incoming arrows with your shield, manage energy, and survive waves.',
    image: '/pixel-defender/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Tower Defense', 'Pixel Art', 'Endless'],
    // github: "https://github.com/DigitalEpidemic/pixel-defender",
    detailedContent:
      'Pixel Defender puts you in control of a shielded defender facing endless arrow waves. Raise your shield (which drains energy) to block, then lower it to recharge. Timing and resource management are key to surviving and winning.\n\nBuilt in Unity, the game offers strategic reflex-based gameplay with nostalgic pixel visuals.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      'Blend classic defense timing with pixel art style and energy management mechanics.',
    problemSolved:
      'The need for strategic timing and energy decisions in defense games rather than automated blocking',
    keyFeatures: [
      'Block arrow waves with a shield',
      'Energy drains when blocking',
      'Recharges energy when lowered',
      'Endless wave survival',
      'Nostalgic pixel aesthetic',
    ],
    screenshots: [
      {
        url: '/pixel-defender/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/pixel-defender/game-1.jpg',
        caption: 'Defender blocking arrow volley',
      },
      {
        url: '/pixel-defender/game-2.jpg',
        caption: 'Energy management while blocking',
      },
      {
        url: '/pixel-defender/game-3.jpg',
        caption: 'Nostalgic 2D pixel visuals',
      },
    ],
  }),
  createPost({
    title: 'Doodle Dunk',
    publishedAt: new Date('2019-09-05'), // September 5, 2019
    content:
      'Fling the ball to make trick shots and dunk through puzzles in this creative basketball game.',
    image: '/doodle-dunk/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Puzzle', 'Basketball', 'Creative', 'Arcade'],
    // github: "https://github.com/DigitalEpidemic/doodle-dunk",
    detailedContent:
      'Doodle Dunk is an arcade-style basketball game where players fling the ball to achieve objectives within a set time limit. Navigate through challenging puzzles, make trick shots through hoops, and outsmart obstacles and defenders with precise flinging mechanics.\n\nBuilt in Unity using intuitive touch-based flinging controls and 2D hand-drawn art, it combines fast-paced arcade action with creative basketball gameplay.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      'Create a fun arcade-style basketball game using the same visual style and charm as Doodle Jump with hand-drawn 2D art.',
    problemSolved:
      'The need for a charming, accessible basketball game with the beloved hand-drawn aesthetic and simple mechanics that made Doodle Jump so popular',
    keyFeatures: [
      'Fling the ball to achieve objectives',
      'Time-limited arcade-style challenges',
      'Puzzle-style trick shot levels',
      'Hand-drawn 2D art style',
      'Intuitive touch flinging controls',
    ],
    screenshots: [
      {
        url: '/doodle-dunk/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/doodle-dunk/game-1.jpg',
        caption: 'Fling the ball to score',
      },
      {
        url: '/doodle-dunk/game-2.jpg',
        caption: 'Fast-paced arcade gameplay',
      },
      {
        url: '/doodle-dunk/game-3.jpg',
        caption: 'Hand-drawn 2D art style',
      },
    ],
  }),
  createPost({
    title: 'Fish Dodge',
    publishedAt: new Date('2019-11-05'), // November 5, 2019
    content:
      'Slide to rescue small fish while avoiding bigger predators. Reverse-the-food-chain arcade action.',
    image: '/fish-dodge/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Rescue', 'Fishing'],
    // github: "https://github.com/DigitalEpidemic/fish-dodge",
    detailedContent:
      'Fish Dodge is a rescue game where you drag your hook to catch small fish and guide them to safety while dodging larger fish that pose threats.\n\nCreated in Unity, the game emphasizes dexterity, timing, and caring rescue action in a lighthearted aquatic arena.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      'Design a gentle yet exciting arcade rescue game that challenges reflexes and empathy.',
    problemSolved:
      'The need for a gentle, empathetic gaming experience that flips traditional fishing mechanics to focus on rescue rather than catching',
    keyFeatures: [
      'Drag hook to grab small fish',
      'Guide them to rescue points',
      'Avoid bigger fish predators',
      'Casual rescue-style gameplay',
    ],
    screenshots: [
      {
        url: '/fish-dodge/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/fish-dodge/game-1.jpg',
        caption: 'Rescuing fish under threat',
      },
      {
        url: '/fish-dodge/game-2.jpg',
        caption: 'Drag-based hook controls',
      },
      {
        url: '/fish-dodge/game-3.jpg',
        caption: 'Aquatic predator avoidance',
      },
    ],
  }),
  createPost({
    title: 'Martian Lander',
    publishedAt: new Date('2019-07-05'), // July 5, 2019
    content:
      'A gravity-based alien flinging game. Launch aliens from planet to planet before they go off screen or miss their target.',
    image: '/martian-lander/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Simulation', 'Physics', 'Space'],
    // github: "https://github.com/DigitalEpidemic/martian-lander",
    detailedContent:
      'Martian Lander challenges players to fling aliens from planet to planet using gravity-based physics. Aim carefully to launch each alien to the next planet before they drift off screen or miss their target completely.\n\nBuilt in Unity with realistic physics, the game emphasizes precise timing and trajectory calculation for successful planet-to-planet launches.',
    technologies: ['Unity', 'C#', 'iOS App Store', 'Google Play Store'],
    projectPurpose:
      "Create a physics-based alien flinging game that challenges players' timing and trajectory skills in a space setting.",
    problemSolved:
      'The need for a simple yet challenging physics-based game that tests precision and timing without complex controls',
    keyFeatures: [
      'Fling aliens from planet to planet',
      'Gravity-based physics mechanics',
      'Precise timing and trajectory aiming',
      'Avoid going off screen or missing planets',
    ],
    screenshots: [
      {
        url: '/martian-lander/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/martian-lander/game-1.jpg',
        caption: 'Flinging aliens between planets',
      },
      {
        url: '/martian-lander/game-2.jpg',
        caption: 'Gravity-based trajectory physics',
      },
      {
        url: '/martian-lander/game-3.jpg',
        caption: 'Aiming for the next planet target',
      },
    ],
  }),
  createPost({
    title: 'Slicey Ninja',
    publishedAt: new Date('2019-06-29'), // June 29, 2019
    content:
      'A high-intensity slicing reflex game. Tap to slice the falling bamboo at the perfect moment.',
    image: '/slicey-ninja/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Ninja', 'Pixel Art'],
    // github: "https://github.com/DigitalEpidemic/slicey-ninja",
    detailedContent:
      'Slicey Ninja demands precision: tap the screen at the correct side to slice bamboo shoots. Mistiming causes you to lose health. Featuring frenetic tap-based ninja slicing, the game sharpens reflexes in fast-paced bursts.\n\nBuilt in Unity with C# for responsive touch controls and smooth slicing mechanics, with art created using Adobe Photoshop.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Craft a minimalist reflex challenge focused purely on timing and precision slicing.',
    problemSolved:
      'The need for precise tap timing as the main gameplay mechanic rather than relying on movement or complex systems',
    keyFeatures: [
      'Tap left/right to slice bamboo',
      'Precise timing equals high score',
      'Mistimed taps incur penalties',
      'Fast-paced, zone-based slicing',
      'Minimal UI, reflex-focused design',
    ],
    screenshots: [
      {
        url: '/slicey-ninja/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/slicey-ninja/game-1.jpg',
        caption: 'Slicing bamboo in rhythm',
      },
      {
        url: '/slicey-ninja/game-2.jpg',
        caption: 'Tap zones light up as shoots fall',
      },
      {
        url: '/slicey-ninja/game-3.jpg',
        caption: 'High-score streak gameplay',
      },
    ],
  }),
  createPost({
    title: 'Sword Thrower',
    publishedAt: new Date('2020-12-02'), // December 2, 2020
    content:
      'A top-down pixel-art dungeon arena where you toss your sword at enemies and catch it to throw it again!',
    image: '/sword-thrower/game-1.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Action', 'Pixel Art'],
    // github: "https://github.com/DigitalEpidemic/sword-thrower",
    detailedContent:
      "Sword Thrower is a fast-paced dungeon combat game where the core mechanic is throwing your sword at enemies and catching it before it hits the ground. Wave after wave of foes test your dodging and reaction time.\n\nBuilt in Unity with C# for responsive controls and Adobe Photoshop for the pixel-art visuals, it's perfect for quick arcade fun.",
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Reimagine dungeon combat with a twist, literally focused on sword-throwing and catching mechanics.',
    problemSolved:
      'The need for more kinetic, movement-based combat that demands timing and precision rather than static dungeon fighting',
    keyFeatures: [
      'Throw-and-catch sword mechanic',
      'Top-down dungeon arenas',
      'Pixel-art style graphics',
      'Intense enemy waves',
      'Touch-optimized, intuitive controls',
    ],
    screenshots: [
      {
        url: '/sword-thrower/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/sword-thrower/game-2.jpg',
        caption: 'Toss your sword into enemy hordes',
      },
      {
        url: '/sword-thrower/game-3.jpg',
        caption: 'Catch your blade to throw again',
      },
      {
        url: '/sword-thrower/game-4.jpg',
        caption: 'Pixel-art dungeon environment',
      },
    ],
  }),
  createPost({
    title: 'Tiny Turns',
    publishedAt: new Date('2020-12-22'), // December 22, 2020
    content:
      'An endless runner where you swipe to change direction and avoid an onslaught of bullets coming your way!',
    image: '/tiny-turns/game-4.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Minimalist', 'Arcade', 'Endless'],
    // github: "https://github.com/DigitalEpidemic/tiny-turns",
    detailedContent:
      "Tiny Turns is an endless runner where you swipe to change direction and avoid deadly walls of bullets. Don't get too close to the walls or you might get hit. Turn around in circles to give yourself enough time for the bullets to stop, and collect coins along the way to unlock new trails.\n\nBuilt in Unity with C# and featuring minimalist art created in Adobe Photoshop, this endless runner delivers precise movement challenges and simple but addictive gameplay.",
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      "Create a minimalist endless runner that challenges players' precision and timing with simple swipe controls and bullet-dodging gameplay.",
    problemSolved:
      'The need for a simple yet challenging endless runner that focuses on precise movement and quick reflexes without complex mechanics',
    keyFeatures: [
      'Swipe controls for precise directional changes',
      'Endless runner with bullet-dodging mechanics',
      'Coin collection system',
      'Unlockable trail customizations',
      'Minimalist visual design',
    ],
    screenshots: [
      {
        url: '/tiny-turns/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/tiny-turns/game-1.jpg',
        caption: 'Swipe to change direction and avoid bullets',
      },
      {
        url: '/tiny-turns/game-2.jpg',
        caption: 'Turn in circles to avoid deadly bullet walls',
      },
      {
        url: '/tiny-turns/game-3.jpg',
        caption: 'Collect coins to unlock new trails',
      },
    ],
  }),
  createPost({
    title: 'Triangle Rush',
    publishedAt: new Date('2021-01-30'), // January 30, 2021
    content:
      'An arcade game where you navigate as a triangle through spinning circular walls that form shapes at high speed. Reflex test at its finest!',
    image: '/triangle-rush/game-2.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Tunnel Runner', 'Endless'],
    // github: "https://github.com/DigitalEpidemic/triangle-rush",
    detailedContent:
      'Triangle Rush is an adrenaline-pumping arcade game where you control a triangle navigating through circular walls that form various shapes. Use simple controls to weave through the obstacles and survive as long as you can.\n\nBuilt in Unity with C# and featuring art created with Adobe Photoshop and Adobe Illustrator, it delivers a frenetic reflex experience.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'iOS App Store',
      'Google Play Store',
    ],
    projectPurpose:
      'Create a frenetic reflex arcade experience with minimalist visuals and fast-paced challenge.',
    problemSolved:
      'The need to keep players consistently on edge with visual disorientation and hyper-speed reflex demands beyond typical endless runners',
    keyFeatures: [
      'Endless arcade challenge',
      'Navigate through complex patterns',
      'Simple controls',
      'Intense speed and reflex gameplay',
    ],
    screenshots: [
      {
        url: '/triangle-rush/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/triangle-rush/game-1.jpg',
        caption: 'Player navigating through wall patterns',
      },
      {
        url: '/triangle-rush/game-3.jpg',
        caption: 'Minimalist geometric design',
      },
      {
        url: '/triangle-rush/game-4.jpg',
        caption: 'Can you get a high score?',
      },
    ],
  }),
  createPost({
    title: 'Stone Skipper',
    publishedAt: new Date('2021-02-22'), // February 22, 2021
    content:
      'Launch stones and time your taps when they flash above the water to skip across, hit targets, and chain skips in this casual physics arcade.',
    image: '/stone-skipper/menu.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Physics', 'Casual', 'Reflex'],
    // github: "https://github.com/DigitalEpidemic/stone-skipper",
    detailedContent:
      'Stone Skipper recreates that nostalgic stone-skipping feel. Launch your stone by timing the power, then tap the screen precisely when the rock flashes right above the water to make it skip. Chain multiple skips together, hit floating targets, and rack up points with perfect timing.\n\nBuilt in Unity with C# and featuring art created with Adobe Illustrator, the game uses 2D physics for realistic stone mechanics.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Illustrator',
      'Google Play Store',
      'iOS App Store',
    ],
    projectPurpose:
      'Translate the tactile joy of stone skipping into a casual mobile experience.',
    problemSolved:
      'The need for simple, satisfying physics mechanics that capture a nostalgic activity without overcomplicating the experience',
    keyFeatures: [
      'Launch stones with power timing',
      'Tap when stones flash above water',
      'Chain multiple skips together',
      'Hit floating targets for points',
      'Physics-based stone mechanics',
    ],
    screenshots: [
      {
        url: '/stone-skipper/game-1.jpg',
        caption: 'Stones skipping across calm water',
      },
      {
        url: '/stone-skipper/game-2.jpg',
        caption: 'Collect coins to unlock shop items',
      },
      {
        url: '/stone-skipper/game-3.jpg',
        caption: 'Tap when stones flash to skip',
      },
      {
        url: '/stone-skipper/game-4.jpg',
        caption: 'Avoid obstacles',
      },
    ],
  }),
  createPost({
    title: 'Circle Avoider',
    publishedAt: new Date('2021-02-24'), // February 24, 2021
    content:
      'A stylish, minimalist bullet hell arcade game. Tap to dodge incoming bullets and survive as long as you can.',
    image: '/circle-avoider/game-2.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Reflex', 'Minimalist', 'Bullet Hell'],
    // demo: "https://your-demo-link.com",
    detailedContent:
      'Circle Avoider is a minimalist bullet hell game where you avoid incoming circles with simple one-tap controls. A turret launches hundreds of circles at you, and you must navigate between them without getting hit. Tap to change your direction and use quick reflexes to stay alive as long as possible.\n\nBuilt in Unity with C# and featuring minimalist art created with Adobe Illustrator, this stylish take on the bullet hell genre focuses on pure reflex-based gameplay in a clean design.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Illustrator',
      'Google Play Store',
      'iOS App Store',
    ],
    projectPurpose:
      'Create a bullet hell game with a reusable wave spawner system to generate endless fun while building reusable components for future games to speed up development time.',
    problemSolved:
      'The need for an accessible yet intense bullet hell experience that removes complex controls and focuses on pure reflex-based dodging',
    keyFeatures: [
      'Tap to change direction',
      'Turret launches hundreds of circles',
      'Navigate between circles without getting hit',
      'Quick reflexes required for survival',
      'Minimalist bullet hell design',
    ],
    screenshots: [
      {
        url: '/circle-avoider/menu.jpg',
        caption: 'Main menu',
      },
      {
        url: '/circle-avoider/game-1.jpg',
        caption: 'Navigate between hundreds of incoming circles',
      },
      {
        url: '/circle-avoider/game-3.jpg',
        caption: 'Tap to change direction and avoid circles',
      },
      {
        url: '/circle-avoider/game-4.jpg',
        caption: 'Minimalist bullet hell gameplay',
      },
    ],
  }),
  createPost({
    title: 'Museum of Candy',
    publishedAt: new Date('2019-01-11'), // January 11, 2019
    content:
      'A clean, responsive landing page demo built with Bootstrap 4, showcasing smooth media query formatting and polished UI design.',
    image: '/museum-of-candy/featuredimg.jpg',
    category: ProjectType.WEB,
    tags: ['Web Design', 'Bootstrap', 'Responsive UI', 'Landing Page'],
    demo: 'https://museumofcandy-demo.netlify.app/',
    detailedContent:
      'Museum of Candy is a responsive demo site created as part of a Bootstrap 4 learning project. It demonstrates how to set up Bootstrap from scratch, apply media query formatting, and design a clean, modern UI layout.\n\nThe project highlights mastery of responsive web design, component structuring, and grid systems while keeping the design lightweight and visually appealing.',
    technologies: ['Bootstrap 4', 'HTML', 'CSS', 'jQuery', 'Netlify'],
    projectPurpose:
      'Build a clean and responsive Bootstrap 4 website to learn practical UI design and responsive layouts.',
    problemSolved:
      'The challenge of setting up Bootstrap 4 properly and ensuring mobile responsiveness with media queries while maintaining a clean and modern UI design.',
    keyFeatures: [
      'Clean and modern UI design',
      'Proper Bootstrap 4 setup',
      'Media query-based responsiveness',
      'Lightweight and fast-loading demo site',
    ],
    screenshots: [
      {
        url: '/museum-of-candy/screenshot-1.png',
        caption: 'Museum of Candy homepage',
      },
      {
        url: '/museum-of-candy/screenshot-2.png',
        caption: 'Section 1',
      },
      {
        url: '/museum-of-candy/screenshot-3.png',
        caption: 'Section 2',
      },
      {
        url: '/museum-of-candy/screenshot-4.png',
        caption: 'Section 3',
      },
    ],
  }),
  createPost({
    title: 'LoopLAB',
    publishedAt: new Date('2019-01-21'), // January 21, 2019
    content:
      'A responsive one-page theme built with Bootstrap and custom CSS, featuring basic Scrollspy integration and FontAwesome icons.',
    image: '/looplab/featuredimg.jpg',
    category: ProjectType.WEB,
    tags: ['Web Design', 'Bootstrap', 'CSS', 'Scrollspy'],
    demo: 'https://looplab-demo.netlify.app/',
    detailedContent:
      'LoopLAB is a Bootstrap project focused on learning in-depth CSS styling, one-page layouts, and Scrollspy functionality. It demonstrates how to integrate Bootstrap with FontAwesome icons while maintaining responsive, polished section-based design.\n\nThe project emphasizes structured page sections, scroll-based navigation, and clean responsive design principles.',
    technologies: [
      'JavaScript',
      'Bootstrap',
      'CSS',
      'HTML',
      'FontAwesome',
      'Netlify',
    ],
    projectPurpose:
      'Learn responsive theming, Scrollspy implementation, and CSS styling while building a polished one-page website.',
    problemSolved:
      'The need to understand one-page website patterns, sectioned layouts, and scroll-based navigation.',
    keyFeatures: [
      'Responsive one-page theme',
      'Bootstrap 4 + FontAwesome integration',
      'Scrollspy-enabled navigation',
      'Custom CSS styling',
    ],
    screenshots: [
      {
        url: '/looplab/screenshot-1.png',
        caption: 'LoopLAB homepage',
      },
      {
        url: '/looplab/screenshot-2.png',
        caption: 'Explore section',
      },
      {
        url: '/looplab/screenshot-3.png',
        caption: 'Create section',
      },
      {
        url: '/looplab/screenshot-4.png',
        caption: 'Share section',
      },
    ],
  }),
  createPost({
    title: 'Mizuxe',
    publishedAt: new Date('2019-01-28'), // January 28, 2019
    content:
      'A book showcase landing page created with advanced Bootstrap techniques, Scrollspy, and SASS (Koala).',
    image: '/mizuxe/featuredimg.jpg',
    category: ProjectType.WEB,
    tags: ['Web Design', 'Bootstrap', 'SASS', 'Scrollspy'],
    demo: 'https://mizuxe-demo.netlify.app/',
    detailedContent:
      'Mizuxe is a Bootstrap-based demo project designed to showcase advanced front-end workflows using SASS (via Koala), Bootstrap 4 components, and Scrollspy. The landing page highlights book previews, clean design, and sectioned navigation.\n\nThis project solidified knowledge of modern CSS preprocessing, modular design, and Bootstrap utilities.',
    technologies: [
      'JavaScript',
      'Bootstrap 4',
      'SASS',
      'Koala',
      'HTML',
      'CSS',
      'Netlify',
    ],
    projectPurpose:
      'Experiment with advanced Bootstrap features and integrate SASS for cleaner, modular styling.',
    problemSolved:
      'The need for modular, maintainable CSS and advanced Bootstrap practices for complex layouts.',
    keyFeatures: [
      'Advanced Bootstrap usage',
      'Scrollspy-enabled navigation',
      'SASS (Koala) workflow integration',
      'Responsive book showcase design',
    ],
    screenshots: [
      {
        url: '/mizuxe/screenshot-1.png',
        caption: 'Mizuxe landing page',
      },
      {
        url: '/mizuxe/screenshot-2.png',
        caption: 'About section',
      },
      {
        url: '/mizuxe/screenshot-3.png',
        caption: 'Meet the Authors section',
      },
      {
        url: '/mizuxe/screenshot-4.png',
        caption: 'Contact section',
      },
    ],
  }),
  createPost({
    title: 'Awesome Knight',
    publishedAt: new Date('2018-04-03'), // April 3, 2018
    content:
      'A Diablo-style point-and-click action-RPG built in Unity, featuring AI pathfinding, melee and special attacks, and dynamic boss behaviour.',
    image: '/awesome-knight/Gameplay.png',
    category: ProjectType.GAME,
    tags: ['Action RPG', 'AI', 'Pathfinding', 'Boss Battles', 'Melee Combat'],
    github: 'https://github.com/DigitalEpidemic/awesome-knight-unity-clone',
    demo: 'https://awesomeknight-demo.netlify.app/',
    detailedContent:
      "Awesome Knight is a Unity-powered action-RPG clone inspired by Diablo's point-and-click mechanics. You click to move your knight around the environment, chain melee attacks and unleash special abilities like fire tornado, lightning attack, roaring stomps, and temporary invincibility with a fire shield. Each enemy comes with its own AI, navigation mesh pathfinding, and avoidance logic.\n\nBoss fights offer custom scripted behaviour including ranged magic throws and multi-stage challenges. The game also demonstrates sound and particle effects layering, camera-following systems, UI overlays (health, skills, enemy health indicators), and terrain with skyboxes and environment lighting.",
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Blender',
      'NavMesh',
      'Particle System',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'Recreate core Diablo-style gameplay in Unity to learn advanced AI behaviours, in-game combat systems, and particle/sound integration.',
    problemSolved:
      'The challenge of implementing responsive character movement, AI-driven enemies with working navigation and boss encounter scripting within Unity.',
    keyFeatures: [
      'Point-and-click movement controls',
      'Melee and ranged special attacks',
      'AI patrolling and obstacle-aware pathfinding',
      'Boss battles with scripted attacks',
      'HUD and UI overlays with skill cooldowns',
      'Particle effects, lighting, and skybox integration',
    ],
    screenshots: [
      {
        url: '/awesome-knight/GroundStompAttack.png',
        caption: 'Stomp-attack in action',
      },
      {
        url: '/awesome-knight/FireShield.png',
        caption: 'Fire shield to defend yourself',
      },
      {
        url: '/awesome-knight/LightningAttack.png',
        caption: 'Defeat enemies with lightning attacks',
      },
      {
        url: '/awesome-knight/BossAndEnemy.png',
        caption: 'Defeat the boss and enemies',
      },
    ],
  }),
  createPost({
    title: 'Awesome Ninja',
    publishedAt: new Date('2018-03-26'), // March 26, 2018
    content:
      'Slash through zombies and battle the fearsome Black Knight in this action game with joystick controls and powerful ninja skills.',
    image: '/awesome-ninja/BossSkill.jpg',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Action', 'AI', 'Joystick Controls', 'Boss Battle'],
    github: 'https://github.com/DigitalEpidemic/awesome-ninja-unity-clone',
    demo: 'https://awesomeninja-demo.netlify.app/',
    detailedContent:
      'Awesome Ninja is a Unity action project designed to capture the feel of mobile hack-and-slash combat. Using an on-screen joystick and skill buttons, players unleash flashy attacks like thunderstorms, pentagram rolls, and fireball kicks while fighting hordes of zombies and the Black Knight boss.\n\nThe project showcases both basic and advanced enemy AI, NavMesh pathfinding, boss skill logic, and polished animations. It also features a HUD with animated skill cooldowns, a health slider, prefab-based modular design, and particle + sound effect systems. Built for Android export, it explores the full workflow of creating a fast-paced mobile action prototype from concept to playable demo.',
    technologies: [
      'Unity',
      'C#',
      'NavMesh',
      'Particle Systems',
      'Blender',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'Develop a handheld-style action game prototype in Unity to learn mobile controls, enemy AI, UI timers, and mobile deployment.',
    problemSolved:
      'The need to integrate responsive on-screen controls, enemy behaviors, UI feedback for skills/health, and effective mobile export in a Unity action game.',
    keyFeatures: [
      'On-screen joystick controls',
      'Basic & advanced enemy AI with NavMesh pathfinding',
      'Boss encounters with scripted abilities',
      'Animated UI: skill timers, health slider',
      'Prefab-based modular design',
      'Particle and sound effects',
    ],
    screenshots: [
      {
        url: '/awesome-ninja/Skill2.jpg',
        caption: 'Summoning Cursed Skill',
      },
      {
        url: '/awesome-ninja/Skill3.jpg',
        caption: 'Kick flames at enemies',
      },
      {
        url: '/awesome-ninja/Zombie.jpg',
        caption: 'Attack Zombies',
      },
      {
        url: '/awesome-ninja/PlayerDeath.jpg',
        caption: "Die and it's over",
      },
    ],
  }),
  createPost({
    title: 'Ball Panic',
    publishedAt: new Date('2018-01-19'), // January 19, 2018
    content:
      'An addictive arcade shooter where balls split into smaller ones when hit. Dodge, shoot, survive, and use power-ups to clear the level.',
    image: '/ball-panic/Gameplay.png',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Arcade', 'Shooter', 'Power-Ups', 'In-App Purchases'],
    github: 'https://github.com/DigitalEpidemic/ball-panic-unity-clone',
    demo: 'https://ballpanic-demo.netlify.app/',
    detailedContent:
      'Ball Panic is a fast-paced arcade game where shooting a ball causes it to split into smaller ones. The challenge ramps up as the screen fills with bouncing fragments, forcing players to stay agile and make every shot count. Power-ups like shields, sticky arrows, and dynamite provide moments of relief while chasing high scores.\n\nBuilt in Unity with C#, the game features multiple menu and level screens, serialized data for progress saving, and collectible systems that add depth to its arcade loop. Prefabs were used for modular character and weapon selection, while polished UI panels, sound effects, and mobile integrations like rewarded ads, and in-app purchases rounded out the full experience.',
    technologies: ['Unity', 'C#', 'Adobe Photoshop', 'WebGL', 'Netlify'],
    projectPurpose:
      'Re-imagine the classic split-ball arcade formula with modern mobile polish and engaging power-up systems.',
    problemSolved:
      'The need for a mobile-friendly take on the split-ball arcade concept, blending addictive core gameplay with persistence and polish.',
    keyFeatures: [
      'Variety of power-ups',
      'Multiple menus, levels, and progress tracking',
      'Advanced UI panels and polished overlays',
      'Background music and sound effects',
      'Rewarded ads and in-app purchases',
    ],
    screenshots: [
      {
        url: '/ball-panic/Title.png',
        caption: 'Main menu',
      },
      {
        url: '/ball-panic/LevelSelect.png',
        caption: 'Level selection',
      },
      {
        url: '/ball-panic/Shop.png',
        caption: 'Upgrade your items',
      },
      {
        url: '/ball-panic/InAppPurchases.png',
        caption: 'Need more coins? Buy them here',
      },
    ],
  }),
  createPost({
    title: 'Doodle Jump Clone',
    bestIndex: 14,
    publishedAt: new Date('2018-11-25'), // November 25, 2018
    content:
      'A faithful Unity recreation of the classic Doodle Jump game. Leap from platform to platform, avoid falling, and chase a high score.',
    image: '/doodle-jump/Menu.png',
    category: ProjectType.GAME,
    tags: ['Mobile Game', 'Platformer', 'Physics', 'Endless', 'Clone'],
    github: 'https://github.com/DigitalEpidemic/doodlejump-unity-clone',
    demo: 'https://doodlejump-demo.netlify.app/',
    detailedContent:
      'This project is a nearly one-to-one faithful clone of the original Doodle Jump game. You control a character named Doodle the Doodler that automatically jumps upward while the camera follows. Your job is to land on platforms, dodge enemies and hazards, and climb as high as possible before falling.\n\nBuilt with C# in Unity, the clone replicates classic platform spawning, physics-based jumping mechanics, and vertical endless gameplay loops. It was a valuable exercise in re-implementing tight arcade physics, procedural level flow, and mobile-friendly controls while learning core Unity workflows. The project also provided insight into structuring endless games and balancing difficulty pacing through platform layout and spawn logic.',
    technologies: ['Unity', 'C#', 'Adobe Photoshop', 'WebGL', 'Netlify'],
    projectPurpose:
      "Recreate the beloved classic game to understand its mechanics deeply and build proficiency with Unity's 2D tools.",
    problemSolved:
      'The need to implement smooth endless vertical gameplay, accurate physics jumping, and procedural platform generation within Unity.',
    keyFeatures: [
      'Authentic Doodle Jump-style mechanics',
      'Procedural platform spawning',
      'Jump boosts and enemies',
      'Endless vertical scrolling',
      'Mobile and web compatibility',
    ],
    screenshots: [
      {
        url: '/doodle-jump/Game-1.png',
        caption: 'Jumping between platforms',
      },
      {
        url: '/doodle-jump/Pause.png',
        caption: 'Pause menu',
      },
      {
        url: '/doodle-jump/Game-2.png',
        caption: 'Get a boost from a trampoline',
      },
      {
        url: '/doodle-jump/GameOver.png',
        caption: 'Game over screen',
      },
    ],
  }),
  createPost({
    title: 'Flappy Bird Clone',
    publishedAt: new Date('2018-01-06'), // January 6, 2018
    content:
      'Guide Faby through retro-style Mario-like pipes with tap-to-flap controls in this stylized Flappy Bird remake.',
    image: '/flappy-bird/Gameplay.jpg',
    category: ProjectType.GAME,
    tags: [
      'Mobile Game',
      'Arcade',
      'Side Scroller',
      'Endless',
      'Ad Integration',
      'Clone',
    ],
    github: 'https://github.com/DigitalEpidemic/flappybird-unity-clone',
    demo: 'https://flappybirdclone-demo.netlify.app/',
    detailedContent:
      'Flappy Bird Clone recreates the minimalist, endless side-scrolling experience of the original. Tap to make Faby flap, navigate tight pipe gaps, and avoid collisions to stay alive.\n\nBuilt in Unity with C#, this project taught me core systems including singletons, sprite slicing and animation, prefab-based character skins, and 2D physics (colliders, rigidbodies). I also implemented background recycling for performance, camera follow logic, scene transitions, pause/instruction panels, and powering coroutines that run even when the game is paused.\n\nOn the mobile enhancement side, I integrated Google Play Games Services (leaderboards), ads, social sharing, local high score persistence via UserPrefs, and swipe/fade UI transitions. These additions helped round out both gameplay mechanics and a polished mobile user experience.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'Google Play Services',
      'Unity Ad System',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'Recreate the core mechanics of Flappy Bird in Unity to master endless gameplay loops and mobile game monetization pipelines.',
    problemSolved:
      'The challenge of combining precise physics-based endless mechanics with mobile UI polish, high score systems, and monetization features in a compact format.',
    keyFeatures: [
      'Tap-to-flap endless gameplay',
      'Variety of player skins',
      'High score tracking',
      'Google Play Services integration',
      'Integrated ads',
    ],
    screenshots: [
      {
        url: '/flappy-bird/Title.jpg',
        caption: 'Game over and score display',
      },
      {
        url: '/flappy-bird/Instructions.jpg',
        caption: 'Faby flying through pipe gaps',
      },
      {
        url: '/flappy-bird/Gameplay.jpg',
        caption: 'Pause and instructions overlay',
      },
      {
        url: '/flappy-bird/GameOver.jpg',
        caption: 'High score popup with fade transition',
      },
    ],
  }),
  createPost({
    title: 'FPS Multiplayer',
    bestIndex: 8,
    publishedAt: new Date('2018-05-11'), // May 11, 2018
    content:
      'A fast-paced first-person shooter with online multiplayer support. Switch weapons, sprint, crouch, and blast opponents in real-time over the network.',
    image: '/fps-multiplayer/CustomHost.png',
    category: ProjectType.GAME,
    tags: ['Desktop Game', 'FPS', 'Multiplayer', 'Networking'],
    github: 'https://github.com/DigitalEpidemic/fps-multiplayer-unity',
    demo: 'https://fpsmultiplayer-demo.netlify.app/',
    detailedContent:
      "FPS Multiplayer is an online first-person shooter built to explore real-time networked gameplay. Players can sprint, crouch, jump, and switch between weapons like Desert Eagle, Glock, and M16 while navigating a 3D arena and engaging in fast combat with others.\n\nDeveloped in Unity using C#, the project focuses on multiplayer fundamentals such as custom network management, spawning logic, SyncVars for synchronized animations and movements, and camera systems that show only the player's hands.\n\nKey technical features include animation layers, blend trees, prefab setups for weapons and spawn points, particle effects, UI for weapon HUD and crosshair, and seamless hosting over the internet.",
    technologies: [
      'Unity',
      'C#',
      'UNet',
      'Blender',
      'Adobe Photoshop',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'Build a foundational multiplayer FPS in Unity to master networking concepts like custom network management, spawning, synchronization, and real-time gameplay loops.',
    problemSolved:
      'The challenge of synchronizing player movement, animations, and state over the network while maintaining responsive FPS controls and visual polish.',
    keyFeatures: [
      'Custom network manager',
      'Variety of weapons',
      'FPS-style controls',
      'Real-time gameplay loops',
    ],
    screenshots: [
      {
        url: '/fps-multiplayer/CustomClient.png',
        caption: 'Custom network manager UI overlay',
      },
      {
        url: '/fps-multiplayer/GlockSpin.png',
        caption: 'Glock spin animation',
      },
      {
        url: '/fps-multiplayer/M16.png',
        caption: 'M16 in action',
      },
      {
        url: '/fps-multiplayer/CustomHost.png',
        caption: 'Host and client in session',
      },
    ],
  }),
  createPost({
    title: 'League of Legends Clone',
    bestIndex: 7,
    publishedAt: new Date('2018-09-19'), // September 19, 2018
    content:
      'A Unity recreation of League of Legends, featuring working animations, player/minion/turret attacks, camera controls, A-click combat, and even bush-hiding shaders for authentic gameplay.',
    image: '/league-of-legends/AutoAttack.png',
    category: ProjectType.GAME,
    tags: ['Desktop Game', 'MOBA', 'League of Legends', 'lol', 'Clone'],
    demo: 'https://leagueoflegends-demo.netlify.app/',
    detailedContent:
      "This project is an attempt to create a one-to-one Unity clone of League of Legends, built to replicate the mechanics, visuals, and feel of Riot's MOBA. It includes mostly functional player controls, minion wave AI, turret attack logic, ability to A-click for targeting enemies, and smooth camera controls reminiscent of the original game.\n\nTo capture the authentic look and feel, the project uses actual 3D models from the official game for champions, minions, and the Summoner's Rift map. A custom shader system replicates bush vision mechanics, allowing champions to hide or reveal depending on line-of-sight. Animations, projectiles, and particle effects have been implemented to mimic the moment-to-moment gameplay of League.\n\nThis clone not only recreates the gameplay loop of a MOBA but also highlights advanced Unity systems including AI pathfinding, custom shaders, animation controllers, and combat state machines.",
    technologies: [
      'Unity',
      'C#',
      'NavMesh',
      'Custom Shaders',
      'Blender',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'To explore how a complex MOBA like League of Legends can be replicated in Unity, including AI, combat systems, and map mechanics.',
    problemSolved:
      'MOBA games are built on layers of synchronized mechanics like AI behaviors, combat logic, player inputs, and vision systems. This project breaks down those systems into modular Unity implementations for learning and experimentation.',
    keyFeatures: [
      'Fully functional animations',
      'A-click targeting',
      'Minion waves',
      'Turret targeting and projectile system',
      'Custom MOBA camera controls',
      'Bush vision mechanics via custom shader',
    ],
    screenshots: [
      {
        url: '/league-of-legends/A-Click.png',
        caption: 'A-click targeting for fast combat',
      },

      {
        url: '/league-of-legends/TurretAttack.png',
        caption: 'Turret firing at approaching enemies',
      },
      {
        url: '/league-of-legends/CustomShader.png',
        caption: 'Custom shader hiding a champion in the bush',
      },
      {
        url: '/league-of-legends/Game.png',
        caption: 'Top-down camera view with smooth MOBA controls',
      },
    ],
  }),
  createPost({
    title: 'Role Playing Game',
    bestIndex: 6,
    publishedAt: new Date('2018-08-02'), // August 2, 2018
    content:
      'A fully playable RPG featuring enemies, health and skill systems, respawning, objectives, voice-acted enemies with subtitles, and immersive sound design.',
    image: '/rpg/Adventure.png',
    category: ProjectType.GAME,
    tags: ['Desktop Game', 'RPG', 'Quests', 'Combat', 'AI', 'Voice Acting'],
    github: 'https://github.com/DigitalEpidemic/rpg-unity',
    demo: 'https://unity-rpg-demo.netlify.app/',
    detailedContent:
      'This project is a fully functional RPG built in Unity, designed to showcase complete gameplay loops from combat to progression. It features a robust health system, skill and ability mechanics, and enemy AI that challenges the player with different attack patterns. Players can engage in combat, respawn after defeat, and continue progressing through defined objectives.\n\nTo enhance immersion, the game includes sound effects, enemy voice lines with subtitles, and a structured quest/objective system that guides the player through the experience. Abilities and skills add tactical variety to encounters, while the health and respawn systems ensure smooth and replayable gameplay.\n\nThis RPG highlights Unity’s ability to combine animation, audio, UI, and gameplay logic into a cohesive, story-driven experience.',
    technologies: [
      'Unity',
      'C#',
      'NavMesh',
      'Shaders',
      'Blender',
      'Audacity',
      'Particle System',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'To create a complete RPG experience in Unity that integrates combat mechanics, audio/visual feedback, and player progression systems.',
    problemSolved:
      'Building an RPG requires combining multiple Unity systems including AI, audio, combat, UI, and state management. This project brings them together in a working game, demonstrating how these components interact in a polished loop.',
    keyFeatures: [
      'Health and skills/ability system',
      'Variety of enemies',
      'Respawn system',
      'Quest/objective system',
      'Enemy voice lines with subtitles',
      'Combat system with abilities and cooldowns',
    ],
    screenshots: [
      {
        url: '/rpg/Enemies.png',
        caption: 'Player battling an enemy',
      },
      {
        url: '/rpg/Game.png',
        caption: 'Top-down camera view',
      },
      {
        url: '/rpg/Healing.png',
        caption: 'Player healing mid-battle',
      },
      {
        url: '/rpg/Subtitles.png',
        caption: 'Enemy voice acting displayed with subtitles',
      },
    ],
  }),
  createPost({
    title: 'Role Playing Game 2.0',
    publishedAt: new Date('2018-09-10'), // September 10, 2018
    content:
      'An experimental upgrade of my other RPG featuring enhanced graphics, a new map, improved auto-attacking, enemy AI with pathfinding, a wall-visibility shader, and a dynamic camera controller.',
    image: '/rpg2/Enemy.png',
    category: ProjectType.GAME,
    tags: [
      'Desktop Game',
      'RPG',
      'Shaders',
      'Enhanced Graphics',
      'Upgraded Systems',
      'Experimental',
    ],
    github: 'https://github.com/DigitalEpidemic/rpg-2-0-unity',
    demo: 'https://unity-rpg2-demo.netlify.app/',
    detailedContent:
      'RPG 2.0 was an attempt to create a graphically upgraded version of my original RPG. While the project was never fully completed, it served as a sandbox for experimenting with new mechanics, visuals, and systems.\n\nThe key upgrades included a new map with improved environmental design, an upgraded auto-attacking system for smoother combat, a prototype enemy with enhanced pathfinding, patrolling and attack logic, a custom shader that makes the player visible behind walls to improve gameplay clarity, and a new camera controller that lets players orbit and pan around the character for better control and immersion.\n\nThis project demonstrates how I explored camera systems, shaders, and AI improvements in Unity as a natural evolution from my first RPG project.',
    technologies: [
      'Unity',
      'C#',
      'NavMesh',
      'Shaders',
      'Blender',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'To iterate on my first Unity RPG and explore advanced features like shaders, AI improvements, and more immersive camera controls.',
    problemSolved:
      'The project tackled common RPG issues such as improving combat fluidity, handling character visibility behind obstacles, and giving players better camera control over their environment.',
    keyFeatures: [
      'Upgraded visuals',
      'Improved auto-attacking system',
      'Better enemy state machine',
      'Custom shader to reveal the player behind walls',
      'Dynamic camera controller with orbit and pan controls',
    ],
    screenshots: [
      {
        url: '/rpg2/Game-1.png',
        caption: 'The upgraded 3D map environment',
      },
      {
        url: '/rpg2/EnemyDead.png',
        caption: 'Improved auto-attacking system against an enemy',
      },
      {
        url: '/rpg2/CustomShader.png',
        caption: 'Custom shader keeping the player visible behind walls',
      },
      {
        url: '/rpg2/Game-2.png',
        caption: 'New camera controller with free movement around the player',
      },
    ],
  }),
  createPost({
    title: 'Spider Cave',
    publishedAt: new Date('2018-01-13'), // January 13, 2018
    content:
      'A tense arcade-style 2D platformer where you guide your character through spider-infested caves, managing time and air before the lurking dangers catch up to you.',
    image: '/spider-cave/Gameplay.jpg',
    category: ProjectType.GAME,
    tags: [
      'Mobile Game',
      'Arcade',
      'Platformer',
      'Cave',
      'Survival',
      'Spiders',
    ],
    github: 'https://github.com/DigitalEpidemic/spider-cave-unity-clone',
    demo: 'https://spidercave-demo.netlify.app/',
    detailedContent:
      'Spider Cave is an arcade-inspired 2D platformer that captures the suspense of escaping a spider-filled labyrinth while racing against limited air and time. Players use on-screen joystick buttons to walk left, walk right, and jump as they navigate levels teeming with spider shooters, jumpers, and walkers.\n\nThe project sharpened my Unity skills in sprite slicing and animation, basic enemy AI types, UI overlays showing player air and time bars, and on-screen controls for mobile. I built menus and level selection systems, collected pick-ups that activate doors, and integrated pause and death panels. The game uses 2D physics, supports both PC and Android exports, and features a dynamic camera system, custom fonts, and intuitive UI design.',
    technologies: [
      'Unity',
      'C#',
      'Adobe Photoshop',
      'GIMP',
      'WebGL',
      'Netlify',
    ],
    projectPurpose:
      'Design a survival-platformer with intuitive mobile controls and resource management tension in a classic arcade style.',
    problemSolved:
      'Combining responsive on-screen input, atmospheric resource bars, enemy variety, and level progression all wrapped into a mobile-optimized Unity game.',
    keyFeatures: [
      'On-screen controls',
      'Varied spider enemy types',
      'Air and time resource bars',
      'Level selection and menu navigation',
    ],
    screenshots: [
      {
        url: '/spider-cave/Title.jpg',
        caption: 'Title screen',
      },
      {
        url: '/spider-cave/Gameplay.jpg',
        caption: 'Navigating the spider-filled cave',
      },
      {
        url: '/spider-cave/Paused.jpg',
        caption: 'Pause panel overlay',
      },
      {
        url: '/spider-cave/LevelSelect.jpg',
        caption: 'Level selection menu',
      },
    ],
  }),
  createPost({
    title: 'Testing Grounds',
    publishedAt: new Date('2018-07-10'), // July 10, 2018
    content:
      'A Hunger Games-inspired sandbox FPS in Unreal Engine 4 with expansive outdoor arenas, advanced AI, pickups, skeletal meshes, and checkpoint systems.',
    image: '/testing-grounds/game.jpg',
    category: ProjectType.GAME,
    tags: ['Desktop Game', 'FPS', 'AI', 'Shooter', 'Survival', 'Hunger Games'],
    github: 'https://github.com/DigitalEpidemic/testing-grounds-unreal',
    detailedContent:
      "Testing Grounds is a sandbox FPS built in Unreal Engine, inspired by Hunger-Games-style gameplay. It includes expansive outdoor terrain, modular weapon pickups, skeletal mesh characters, and checkpoint systems for survival-style arena combat simulation.\n\nUnder the hood, the project explores advanced AI behaviors, AI decision-making with behavior trees, and gameplay flow with respawn checkpoints. It also serves as a testbed for Unreal's workflow, offering modular prefabs and environments for iterative testing and rapid prototyping.",
    technologies: ['Unreal Engine 4', 'C++', 'Blueprints'],
    projectPurpose:
      'Create a modular FPS sandbox in Unreal to prototype AI, weapons, networking, and arena mechanics in a controlled testing environment.',
    problemSolved:
      'Addresses the need for a rapid iteration platform where FPS mechanics, AI behaviors, and player-hot areas like spawn points and pickups can be tested together.',
    keyFeatures: [
      'Open arena sandbox format',
      'Advanced AI with behavior trees',
      'Respawn system',
      'Modular environment assembly',
    ],
    screenshots: [
      {
        url: '/testing-grounds/game-1.jpg',
        caption: 'Eliminate enemies',
      },
      {
        url: '/testing-grounds/game-2.jpg',
        caption: 'Move onto the next level',
      },
      {
        url: '/testing-grounds/game-3.jpg',
        caption: 'Cannot move on until all enemies are eliminated',
      },
      {
        url: '/testing-grounds/game-4.jpg',
        caption: 'Modular level design',
      },
    ],
  }),
  createPost({
    title: 'Puzzle Platforms',
    publishedAt: new Date('2018-07-28'), // July 28, 2018
    content:
      'A co-operative Unreal puzzle-platformer built to explore networked gameplay via collaborative puzzle solving over LAN.',
    image: '/puzzle-platforms/featuredimg.jpg',
    category: ProjectType.GAME,
    tags: [
      'Desktop Game',
      'Multiplayer',
      'Puzzle',
      'Networking',
      'Problem Solving',
    ],
    github: 'https://github.com/DigitalEpidemic/puzzle-platforms-unreal',
    detailedContent:
      "Puzzle Platforms is a multiplayer puzzle-platformer prototype created to learn the client-server model in Unreal Engine. Players navigate navigating platforms and activating triggers in sync, requiring coordination and real-time collaboration.\n\nBuilt on the foundation of the Unreal Engine's multiplayer framework, the project is designed to learn basic LAN networking and replicated interactions. The project includes replicated movement, synchronized puzzle triggers, floating platform mechanics, and level design focused on co-operative puzzles. It demonstrates core multiplayer techniques like authority, replication, and network performance, using Blueprint/C++ systems.",
    technologies: [
      'Unreal Engine 4',
      'C++',
      'Blueprints',
      'UE4 Networking Framework',
    ],
    projectPurpose:
      'To implement basic multiplayer puzzle mechanics in Unreal and understand client-server architecture through hands-on cooperative gameplay testing.',
    problemSolved:
      'This project addresses the challenge of synchronizing puzzle and platform interactions across networked players, teaching replication principles and multiplayer reliability in Unreal Engine.',
    keyFeatures: [
      'Collaborative LAN multiplayer setup',
      'Replicated moving platforms and puzzle triggers',
      'Synchronized client-server interactions',
      'Blueprint/C++ hybrid implementation',
      'Focus on multiplayer behaviors like authority and replication',
    ],
    screenshots: [
      {
        url: '/puzzle-platforms/Game-1.png',
        caption: 'Two clients solving puzzles together',
      },
      {
        url: '/puzzle-platforms/Game-2.png',
        caption: 'Players landing on platforms',
      },
      {
        url: '/puzzle-platforms/Game-3.png',
        caption: 'One player triggering a moving platform',
      },
      {
        url: '/puzzle-platforms/Game-4.png',
        caption: 'Replicated state across clients',
      },
    ],
  }),
  createPost({
    title: 'Battle Tank',
    publishedAt: new Date('2018-06-19'), // June 19, 2018
    content:
      'A head-to-head tank battle experience in Unreal Engine featuring simple AI, open terrain, and advanced vehicle controls for immersive tank combat.',
    image: '/battle-tank/game.jpg',
    category: ProjectType.GAME,
    tags: ['Desktop Game', 'Tanks', 'AI', 'Duel', 'Open Terrain'],
    github: 'https://github.com/DigitalEpidemic/battle-tank-unreal',
    detailedContent:
      'Battle Tank delivers a head-to-head tank combat setup across open terrain. Players engage in arena-style duels using tank movement, aiming, and firing mechanics supported by simple AI opponents.\n\nUnder the hood, the project explores core concepts including modular vehicle control systems, AI behavior for enemy tanks, terrain navigation, and physics-based movement. It showcases advanced control architecture and gameplay flows that are ideal for refining combat mechanics in a 3D sandbox environment.',
    technologies: ['Unreal Engine 4', 'C++', 'Blueprints'],
    projectPurpose:
      'To build a responsive, physics-driven tank combat prototype in Unreal and master vehicle control, AI targeting, and terrain gameplay loops.',
    problemSolved:
      'This project helped break down the complexities of vehicle control and AI in Unreal, enabling me to prototype and iterate on combat behaviors quickly and cleanly.',
    keyFeatures: [
      'Third-person tank control',
      'Physics-based tank movement and collisions',
      'Open arena terrain',
      'Advanced Enemy AI',
      'Modular vehicle control systems',
    ],
  }),
  createPost({
    title: 'Skeletons vs. Zombies',
    publishedAt: new Date('2018-05-21'), // May 21, 2018
    content:
      "A frenzied multiplayer online battle arena where skeleton mages fire projectiles against waves of zombies,powered by Unity's networking framework and intense 3D combat.",
    image: '/skeletons-vs-zombies/Host.png',
    category: ProjectType.GAME,
    tags: [
      'Desktop Game',
      'Multiplayer',
      'MOBA',
      'Skeletons',
      'Zombies',
      'Networking',
    ],
    github:
      'https://github.com/DigitalEpidemic/skeletons-vs-zombies-unity-clone',
    detailedContent:
      'Skeletons vs Zombies is a multiplayer 3D action testbed where skeleton mages battle through swarms of zombies using ranged magic attacks and reflex-based survival.\n\nBuilt in Unity, this game leverages networked gameplay with synchronized projectile shooting, basic pathfinding for player movement, and dynamic camera controls that both track the player and adapt to the chaotic arena.\n\nIt reinforced my understanding of networking synchronization, AI coordination, and responsive combat in real time. While incorporating typical game mechanics (like point-and-click movement, SyncVars, and local multiplayer spawn logic), it became a springboard for refining game feel and network stability.',
    technologies: ['Unity', 'C#', 'UNet', 'NavMesh'],
    projectPurpose:
      'To explore fast-paced multiplayer combat systems in Unity and testing network synchronization and flow.',
    problemSolved:
      'Demystified real-time network syncing in combat, and projectile replication under multiplayer conditions, while keeping gameplay engaging and competitive.',
    keyFeatures: [
      'Mages with ranged attacks',
      'Pathfinding on player movement',
      'Synchronized projectiles across networked clients',
      'Camera system adapting to multiplayer arena dynamics',
      'Network spawn and movement syncing',
    ],
    screenshots: [
      {
        url: '/skeletons-vs-zombies/Client.png',
        caption: 'Client player view',
      },
      {
        url: '/skeletons-vs-zombies/Host.png',
        caption: 'Host player view',
      },
    ],
  }),
  createPost({
    title: 'Portfolio',
    bestIndex: 4,
    publishedAt: new Date('2025-08-28'), // August 28, 2025
    content:
      'A modern, responsive portfolio website built with Next.js showcasing projects, skills, and experience with a clean Reddit-inspired design and smooth animations.',
    image: '/jeffrey-polasz-portfolio/Main.png',
    category: ProjectType.WEB,
    tags: ['Portfolio', 'Website', 'Responsive Design', 'Reddit', 'Modern UI'],
    github: 'https://github.com/DigitalEpidemic/jeffpolasz-portfolio',
    detailedContent:
      'This portfolio website serves as a comprehensive showcase of my development skills and projects. Built with Next.js and TypeScript, it demonstrates modern web development practices including server-side rendering, responsive design, and performance optimization.\n\nThe site features a clean, professional design with smooth animations and transitions that enhance the user experience without being distracting. It includes sections for project showcases, skills, experience, and contact information, all organized in an intuitive layout that works seamlessly across all device sizes.',
    technologies: [
      'Next',
      'TypeScript',
      'React',
      'Shadcn',
      'Tailwind CSS',
      'Framer Motion',
      'Netlify',
    ],
    projectPurpose:
      'Create a professional online presence to showcase my development work and skills to potential employers and clients',
    problemSolved:
      'The need for a centralized, professional platform to display my projects, experience, and technical abilities in an engaging and accessible format',
    keyFeatures: [
      'Reddit-inspired responsive design',
      'Project showcase',
      'Skills and technology section',
      'Social media links and email',
      'Smooth animations and transitions',
    ],
    screenshots: [
      {
        url: '/jeffrey-polasz-portfolio/LightMode.png',
        caption: 'Toggle between light and dark mode',
      },
      {
        url: '/jeffrey-polasz-portfolio/Post.png',
        caption: 'Project posts with detailed descriptions',
      },
      {
        url: '/jeffrey-polasz-portfolio/ResumeHTML.png',
        caption: 'Resume in HTML format',
      },
      {
        url: '/jeffrey-polasz-portfolio/ResumePDF.png',
        caption: 'Resume in PDF format',
      },
    ],
  }),
];

export const POSTS: Post[] = UNSORTED_POSTS;

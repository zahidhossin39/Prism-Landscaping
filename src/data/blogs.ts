export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  fallbackCoverImage?: string;
  detailHeroImage?: string;
  fallbackDetailHeroImage?: string;
  inlineImage: string;
  fallbackInlineImage?: string;
  featured?: boolean;
  splitIndex?: number;
  sections: BlogSection[];
}

export const blogs: BlogPost[] = [
  {
    "slug": "stay-inspired-and-keep-outdoor-spaces-thriving",
    "title": "Stay Inspired and Keep Your Outdoor Spaces Thriving",
    "date": "Jan 19, 2026",
    "category": "Lawn Care",
    "excerpt": "Discover expert advice, seasonal gardening tips, and ideas to maintain vibrant lawns and beautiful gardens year-round.",
    "coverImage": "https://framerusercontent.com/images/y7MQznTDgflfVXLrQ8ShlZw7CQ.png",
    "fallbackCoverImage": "/assets/blog-hero.png",
    "detailHeroImage": "https://framerusercontent.com/images/rw4bjg9suLtBkuuwoDZ83fTI78.jpg",
    "fallbackDetailHeroImage": "/assets/hero-bg.png",
    "inlineImage": "https://framerusercontent.com/images/y7MQznTDgflfVXLrQ8ShlZw7CQ.png",
    "fallbackInlineImage": "/assets/blog-inline-1.jpg",
    "featured": true,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Premium Lawn Maintenance",
        "content": "Keep your lawn lush and vibrant with our comprehensive maintenance services. Greenly employs a mix of expert mowing techniques, fertilization, and aeration strategies to ensure your grass thrives throughout the seasons. Enjoy a perfectly manicured lawn that enhances the curb appeal of your property."
      },
      {
        "heading": "Innovative Garden Design",
        "content": "Transform your outdoor space with our bespoke garden design services. Our talented designers collaborate with you to create a unique landscape that reflects your personal style and complements your home. From plant selection to layout, we ensure your garden is both functional and stunning."
      },
      {
        "heading": "Sustainable Pest Control",
        "content": "Protect your plants naturally! Greenly offers eco-friendly pest control solutions that safeguard your garden without harmful chemicals. Our integrated approaches target pests while preserving beneficial insects, ensuring your plants remain healthy and your garden safe for all."
      },
      {
        "heading": "Seasonal Flower Planting",
        "content": "Brighten your garden with our seasonal flower planting services. We carefully select vibrant blooms suited to your local climate and soil conditions, ensuring a colorful display that lasts throughout the season. Enjoy the beauty of flowers that complement your garden's aesthetic."
      },
      {
        "heading": "Efficient Irrigation Solutions",
        "content": "Optimize your watering with our state-of-the-art irrigation systems. Greenly designs efficient watering solutions that conserve water while ensuring your plants receive the moisture they need. Enjoy a lush garden without the worry of over or under-watering."
      },
      {
        "heading": "Lawn Aeration Techniques",
        "content": "At Turf Revive, we focus on rejuvenating your lawn through effective aeration. Our service reduces soil compaction, allowing nutrients and water to penetrate deeper into the roots. This promotes healthier grass growth and a lush, green lawn that stands out in any neighborhood."
      },
      {
        "heading": "Tree Pruning and Care",
        "content": "Tree Health Solutions provides expert tree pruning services to maintain your trees' health and beauty. Our certified arborists carefully assess each tree, removing dead or diseased branches and promoting strong growth. This not only enhances your landscape but also ensures the safety and longevity of your trees."
      }
    ]
  },
  {
    "slug": "transform-your-outdoors-with-expert-advice",
    "title": "Transform Your Outdoors with Expert Advice",
    "date": "Jan 10, 2026",
    "category": "Lawn Care",
    "excerpt": "Learn essential outdoor maintenance techniques and professional tips to elevate your landscape to new heights.",
    "coverImage": "https://framerusercontent.com/images/WTSddEYing8Lj067c3fRouTEc.png",
    "fallbackCoverImage": "/assets/blog-1.png",
    "detailHeroImage": "https://framerusercontent.com/images/WTSddEYing8Lj067c3fRouTEc.png",
    "fallbackDetailHeroImage": "/assets/blog-1.png",
    "inlineImage": "https://framerusercontent.com/images/rQRX1qC3LCCYqbIgjkGEs6dfMI.jpg",
    "fallbackInlineImage": "/assets/blog-inline-2.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Garden Design Innovative",
        "content": "Keep your lawn lush and vibrant with our complete maintenance services. We use expert mowing, fertilization, and aeration to keep your grass healthy all year."
      },
      {
        "heading": "Garden Innovative Design",
        "content": "Greenly offers garden innovative design that transforms outdoor spaces into modern, stylish, and beautifully balanced landscapes. Our expert team combines creativity with horticultural knowledge to design layouts that enhance plant health, improve structure, and create a visually stunning and functional garden environment."
      },
      {
        "heading": "Design Innovative Garden",
        "content": "Greenly delivers design innovative garden solutions that transform outdoor spaces into creative, modern, and beautifully structured landscapes. Our expert team blends artistic vision with horticultural expertise to plan and shape gardens that enhance plant health, improve layout balance, and create a visually stunning, functional outdoor environment."
      },
      {
        "heading": "Design Garden Innovative",
        "content": "Greenly delivers design innovative garden solutions that transform outdoor spaces into creative, modern, and beautifully structured landscapes. Our expert team blends artistic vision with horticultural expertise to plan and shape gardens that enhance plant health, improve layout balance, and create a visually stunning, functional outdoor environment."
      },
      {
        "heading": "Innovative Garden Design Services",
        "content": "Greenly provides innovative garden design services that transform outdoor spaces into modern, creative, and beautifully structured landscapes. Our expert team combines artistic design with horticultural expertise to plan layouts that enhance plant health, improve spatial balance, and create a visually stunning, functional, and inviting garden environment."
      },
      {
        "heading": "Garden Design Solutions",
        "content": "Greenly offers garden design solutions that transform outdoor spaces into beautifully structured and functional landscapes. Our expert team combines creativity with horticultural knowledge to design layouts that enhance plant health, improve balance, and create a visually appealing, modern garden environment tailored to your style."
      },
      {
        "heading": "Garden Design Experts",
        "content": "Greenly’s garden design experts create beautifully planned outdoor spaces that blend creativity with nature. Our skilled team develops customized landscape designs that enhance plant health, improve spatial balance, and deliver a visually stunning and functional garden tailored to your vision and lifes"
      },
      {
        "heading": "Garden Design Professionals",
        "content": "Greenly’s garden design professionals craft beautifully structured outdoor spaces that combine creativity with horticultural expertise. Our team carefully plans and designs each landscape to enhance plant health, improve balance, and create a functional, visually stunning garden that reflects your style and vision."
      }
    ]
  },
  {
    "slug": "revamp-your-garden-with-seasonal-tips",
    "title": "Revamp Your Garden with Seasonal Tips",
    "date": "Jan 8, 2026",
    "category": "Seasonal Guide",
    "excerpt": "Comprehensive seasonal strategies to revamp your garden beds, soil preparation, and perennial maintenance.",
    "coverImage": "https://framerusercontent.com/images/mBQvrrhVBjPcVpiAYBWwvHf7W9I.png",
    "fallbackCoverImage": "/assets/blog-2.png",
    "detailHeroImage": "https://framerusercontent.com/images/mBQvrrhVBjPcVpiAYBWwvHf7W9I.png",
    "fallbackDetailHeroImage": "/assets/blog-2.png",
    "inlineImage": "https://framerusercontent.com/images/WlbpFY7CYdB5vYLn3eS8BE0sHo.jpg",
    "fallbackInlineImage": "/assets/blog-inline-3.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Garden Design Team",
        "content": "Greenly’s garden design team creates beautifully planned outdoor spaces that blend creativity with nature. Our experts carefully design layouts that improve plant health, enhance balance, and deliver a functional, visually appealing garden tailored to your style and outdoor needs."
      },
      {
        "heading": "Garden Design Plans",
        "content": "Greenly provides detailed garden design plans that transform outdoor spaces into beautifully structured and functional landscapes. Our expert team carefully maps layouts that enhance plant health, improve balance, and create a visually appealing garden tailored to your style, space, and vision."
      },
      {
        "heading": "Garden Design Projects",
        "content": "Greenly delivers garden design projects that transform outdoor spaces into beautifully planned and functional landscapes. Our expert team manages each project with creativity and precision, ensuring balanced layouts, healthy plant integration, and visually stunning garden designs tailored to your lifestyle and vision."
      },
      {
        "heading": "Garden Design Approach",
        "content": "Greenly follows a thoughtful garden design approach that blends creativity with horticultural expertise to create beautifully balanced outdoor spaces. Our team carefully studies your space, selects the right plant structure, and designs layouts that enhance natural growth, improve harmony, and deliver a visually stunning, functional garden tailored to your vision."
      },
      {
        "heading": "Innovative Garden Design Strategy",
        "content": "Greenly follows an innovative garden design strategy that combines creativity, planning, and horticultural expertise to transform outdoor spaces into modern, functional landscapes. Our team carefully analyzes your environment, develops smart layout concepts, and selects plant combinations that enhance balance, support healthy growth, and create a visually stunning garden tailored to your vision and lifestyle."
      },
      {
        "heading": "Lawn Maintenance Premium",
        "content": "Greenly delivers premium lawn maintenance that keeps your garden lush, green, and beautifully cared for throughout every season. Our skilled team uses precise mowing, edging, and fertilizing techniques to improve grass health, enhance density, and maintain a smooth, even, and visually stunning lawn that elevates your entire outdoor space."
      },
      {
        "heading": "Premium Maintenance Lawn",
        "content": "Greenly provides premium maintenance lawn services that keep your outdoor space lush, healthy, and perfectly maintained. Our expert team uses precise mowing, trimming, and care techniques to improve grass quality, enhance thickness, and create a smooth, clean, and visually stunning lawn that elevates your entire landscape."
      },
      {
        "heading": "Lawn Premium Maintenance",
        "content": "Greenly delivers lawn premium maintenance that keeps your outdoor space lush, green, and beautifully maintained all year round. Our expert team uses precise mowing, trimming, and care techniques to improve grass health, enhance density, and create a smooth, clean, and visually stunning lawn that elevates your landscape."
      }
    ]
  },
  {
    "slug": "maximize-your-space-vertical-gardening-solutions",
    "title": "Maximize Your Space: Vertical Gardening Solutions",
    "date": "Jan 19, 2026",
    "category": "Landscape Design",
    "excerpt": "Clever vertical gardening designs and architectural planting ideas to make compact outdoor spaces feel expansive.",
    "coverImage": "https://framerusercontent.com/images/kJmE0a3ScZXPuduSZlvVjoPrdo.png",
    "fallbackCoverImage": "/assets/blog-3.png",
    "detailHeroImage": "https://framerusercontent.com/images/kJmE0a3ScZXPuduSZlvVjoPrdo.png",
    "fallbackDetailHeroImage": "/assets/blog-3.png",
    "inlineImage": "https://framerusercontent.com/images/tBKRSNoJVOhmkb8slLMIkRlVj3c.jpg",
    "fallbackInlineImage": "/assets/blog-inline-4.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Premium Lawn Maintenance Suppor",
        "content": "Greenly provides premium lawn maintenance support to keep your outdoor space lush, healthy, and beautifully maintained throughout the year. Our expert team uses precise mowing, trimming, fertilizing, and care techniques to improve grass health, enhance density, and ensure a smooth, clean, and visually appealing lawn that elevates your entire landscape."
      },
      {
        "heading": "Premium Lawn Maintenance System",
        "content": "Greenly offers a premium lawn maintenance system designed to keep your outdoor space consistently lush, healthy, and beautifully maintained. Our expert team follows a structured care process including precise mowing, trimming, fertilization, and seasonal treatment to improve grass strength, enhance density, and ensure a smooth, even, and visually stunning lawn that elevates your entire landscape year-round."
      },
      {
        "heading": "Premium Lawn Maintenance Solutions",
        "content": "Greenly provides premium lawn maintenance solutions designed to keep your outdoor space lush, healthy, and perfectly maintained throughout the year. Our expert team uses precise mowing, trimming, fertilizing, and seasonal care techniques to improve grass quality, enhance density, and create a smooth, clean, and visually stunning lawn that elevates the overall beauty of your landscape."
      },
      {
        "heading": "Premium Lawn Maintenance Care Plan",
        "content": "Greenly offers a premium lawn maintenance care plan designed to keep your outdoor space consistently lush, healthy, and beautifully maintained throughout the year. Our expert team follows a structured routine of mowing, trimming, fertilizing, and seasonal treatments to improve grass strength, enhance density, and maintain a smooth, even, and visually stunning lawn that elevates your entire landscape."
      },
      {
        "heading": "Premium Lawn Maintenance Service",
        "content": "Greenly provides premium lawn maintenance service designed to keep your outdoor space lush, healthy, and beautifully maintained all year round. Our expert team uses precise mowing, trimming, fertilizing, and seasonal care techniques to improve grass health, enhance density, and create a smooth, clean, and visually stunning lawn that elevates your entire landscape."
      },
      {
        "heading": "Garden Design Innovative",
        "content": "Greenly delivers garden design innovative solutions that transform outdoor spaces into modern, creative, and beautifully balanced landscapes. Our expert team blends artistic vision with horticultural expertise to develop smart layouts that enhance plant health, improve structure, and create a visually stunning, functional garden tailored to your style and needs."
      },
      {
        "heading": "Seasonal Planting Flower",
        "content": "Greenly provides seasonal flower planting services that keep your garden colorful, fresh, and beautifully vibrant throughout the year. Our expert team carefully selects and plants seasonal flowers suited to your soil and climate, ensuring healthy growth, rich blooming, and a balanced, visually stunning landscape that changes beautifully with each season."
      },
      {
        "heading": "Flower Seasonal Planting",
        "content": "Greenly offers flower seasonal planting services that bring vibrant color and natural beauty to your garden throughout the year. Our expert team carefully selects seasonal flower varieties suited to your soil and climate, ensuring healthy growth, continuous blooming, and a balanced, visually appealing landscape that evolves beautifully with each season."
      }
    ]
  },
  {
    "slug": "sustainable-gardening-tips-for-eco-friendly-spaces",
    "title": "Sustainable Gardening: Tips for Eco-Friendly Spaces",
    "date": "Feb 2, 2026",
    "category": "Eco Friendly",
    "excerpt": "Eco-conscious landscaping practices, organic lawn maintenance, and sustainable water conservation methods.",
    "coverImage": "https://framerusercontent.com/images/nsGRHiOnkbVzHRe3EK4zukThzeI.png",
    "fallbackCoverImage": "/assets/blog-4.png",
    "detailHeroImage": "https://framerusercontent.com/images/nsGRHiOnkbVzHRe3EK4zukThzeI.png",
    "fallbackDetailHeroImage": "/assets/blog-4.png",
    "inlineImage": "https://framerusercontent.com/images/4rVHfaLfviuUfbIOXKLt5NuNQs.jpg",
    "fallbackInlineImage": "/assets/blog-inline-5.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Planting Seasonal Flower",
        "content": "Greenly provides planting seasonal flower services that bring fresh color and life to your garden throughout the year. Our expert team carefully selects and plants flowers suited to each season, ensuring healthy growth, vibrant blooms, and a beautifully balanced landscape that stays lively and visually appealing in every season."
      },
      {
        "heading": "Planting Flower Seasonal",
        "content": "Greenly offers planting flower seasonal services that keep your garden vibrant, colorful, and full of life all year round. Our expert team carefully selects seasonal flowers suited to your climate and soil, ensuring healthy growth, continuous blooming, and a beautifully balanced outdoor space that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Services",
        "content": "Greenly provides seasonal flower planting services that keep your garden vibrant, colorful, and full of life throughout the year. Our expert team carefully selects and plants seasonal blooms suited to your soil and climate, ensuring healthy growth, continuous flowering, and a beautifully balanced landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Care Team",
        "content": "Greenly’s seasonal flower planting care team brings expert knowledge and creativity to keep your garden vibrant throughout the year. We carefully select and plant flowers suited to each season, ensuring healthy growth, rich blooms, and a balanced, visually appealing landscape that evolves beautifully with changing seasons."
      },
      {
        "heading": "Seasonal Flower Planting Plans Experts",
        "content": "Greenly’s seasonal flower planting plans experts create thoughtful planting strategies that keep your garden vibrant and colorful throughout the year. Our team carefully selects seasonal blooms suited to your soil and climate, ensuring healthy growth, continuous flowering, and a beautifully balanced landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Projects Experts",
        "content": "Greenly’s seasonal flower planting projects experts manage every stage of your garden transformation with precision and creativity. Our team carefully plans and executes seasonal planting projects using flowers suited to your soil and climate, ensuring healthy growth, vibrant blooms, and a beautifully balanced landscape that evolves throughout the year."
      },
      {
        "heading": "Seasonal Flower Planting Program",
        "content": "Greenly offers a seasonal flower planting program designed to keep your garden vibrant, colorful, and full of life throughout the year. Our expert team follows a planned schedule to select and plant flowers suited to each season, ensuring healthy growth, continuous blooming, and a beautifully balanced landscape that evolves with changing seasons."
      },
      {
        "heading": "Seasonal Flower Planting System",
        "content": "Greenly offers a seasonal flower planting system designed to keep your garden vibrant, colorful, and thriving all year round. Our expert team follows a structured approach to select and plant flowers suited to each season, ensuring healthy growth, consistent blooming, and a beautifully balanced landscape that evolves naturally with changing seasons."
      }
    ]
  },
  {
    "slug": "maximize-small-outdoor-areas-with-creative-solutions",
    "title": "Maximize Small Outdoor Areas with Creative Solutions",
    "date": "Jan 19, 2026",
    "category": "Garden Design",
    "excerpt": "Creative layout solutions and container gardening concepts specifically engineered for small patios and backyards.",
    "coverImage": "https://framerusercontent.com/images/HOf8q6zofbW45DFF566IIGuuphg.png",
    "fallbackCoverImage": "/assets/blog-5.png",
    "detailHeroImage": "https://framerusercontent.com/images/HOf8q6zofbW45DFF566IIGuuphg.png",
    "fallbackDetailHeroImage": "/assets/blog-5.png",
    "inlineImage": "https://framerusercontent.com/images/Ts7fX9HQbPaf76tZcEItj2hZS0.jpg",
    "fallbackInlineImage": "/assets/blog-inline-6.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Seasonal Flower Planting Projects Care",
        "content": "Greenly provides seasonal flower planting projects care that ensures your garden stays vibrant, healthy, and beautifully maintained throughout the year. Our expert team carefully plans, plants, and maintains seasonal blooms suited to your climate and soil, promoting strong growth, continuous flowering, and a balanced, visually appealing landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Plans Care",
        "content": "Greenly provides seasonal flower planting plans care to keep your garden vibrant, healthy, and beautifully maintained throughout the year. Our expert team designs and follows structured planting plans, selecting flowers suited to each season, soil, and climate to ensure strong growth, continuous blooming, and a balanced, visually appealing landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Concepts Care",
        "content": "Greenly provides seasonal flower planting concepts care that keeps your garden vibrant, creative, and beautifully balanced throughout the year. Our expert team develops thoughtful planting concepts based on seasons, soil conditions, and climate to ensure healthy growth, continuous blooming, and a visually stunning landscape that evolves naturally with every season."
      },
      {
        "heading": "Seasonal Flower Planting Ideas Care",
        "content": "Greenly provides seasonal flower planting ideas care that keeps your garden vibrant, colorful, and beautifully maintained throughout the year. Our expert team carefully develops creative planting ideas based on seasons, soil type, and climate conditions to ensure healthy growth, continuous blooming, and a balanced, visually appealing landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Inspiration Care",
        "content": "Greenly provides seasonal flower planting inspiration care that keeps your garden vibrant, creative, and beautifully balanced throughout the year. Our expert team draws on seasonal trends, soil conditions, and climate insights to design inspired planting choices that ensure healthy growth, continuous blooming, and a visually stunning landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Strategy Pro",
        "content": "Greenly delivers Seasonal Flower Planting Strategy Pro that keeps your garden vibrant, well-planned, and beautifully balanced throughout the year. Our expert team uses professional planting strategies based on seasons, soil health, and climate conditions to ensure strong plant growth, continuous blooming, and a visually stunning landscape that evolves naturally with every season."
      },
      {
        "heading": "Seasonal Flower Planting Care Pro",
        "content": "Greenly provides Seasonal Flower Planting Care Pro services that keep your garden vibrant, healthy, and beautifully maintained throughout the year. Our expert team carefully plans, plants, and nurtures seasonal flowers based on soil and climate conditions to ensure strong growth, continuous blooming, and a balanced, visually stunning landscape that evolves with every season."
      },
      {
        "heading": "Seasonal Flower Planting Concepts Experts",
        "content": "Greenly’s seasonal flower planting concepts experts design creative, season-based planting plans that keep your garden vibrant and beautifully balanced all year round. Our team carefully studies soil, climate, and space to develop tailored flower concepts that ensure healthy growth, continuous blooming, and a visually stunning landscape that evolves naturally with each season."
      }
    ]
  },
  {
    "slug": "seasonal-planting-guide-for-a-thriving-garden",
    "title": "Seasonal Planting Guide for a Thriving Garden",
    "date": "Feb 8, 2026",
    "category": "Planting Guide",
    "excerpt": "A month-by-month planting guide to ensure continuous blooms, robust root growth, and vibrant garden beds.",
    "coverImage": "https://framerusercontent.com/images/8E0Apas7yIJPkS5xiKf0BsL4.png",
    "fallbackCoverImage": "/assets/blog-6.png",
    "detailHeroImage": "https://framerusercontent.com/images/8E0Apas7yIJPkS5xiKf0BsL4.png",
    "fallbackDetailHeroImage": "/assets/blog-6.png",
    "inlineImage": "https://framerusercontent.com/images/nWJE5bXmbUlb4LFcoMY3VV3KlI.jpg",
    "fallbackInlineImage": "/assets/blog-inline-7.jpg",
    "featured": false,
    "splitIndex": 5,
    "sections": [
      {
        "heading": "Tree Care and Pruning",
        "content": "Greenly provides expert tree care and pruning services to keep your trees healthy, strong, and beautifully maintained. Our skilled team carefully removes dead or overgrown branches to improve structure, encourage healthy growth, and enhance the overall safety and appearance of your landscape."
      },
      {
        "heading": "Care and Pruning Tree",
        "content": "Greenly provides professional care and pruning for trees to keep your landscape healthy, safe, and beautifully maintained. Our expert team carefully removes dead or overgrown branches to improve structure, encourage strong growth, and enhance the overall appearance of your outdoor space."
      },
      {
        "heading": "Tree Pruning & Care",
        "content": "Greenly provides expert tree pruning and care services to keep your landscape healthy, safe, and beautifully maintained. Our skilled team carefully removes dead or overgrown branches to improve structure, encourage strong growth, and enhance the overall appearance of your outdoor space."
      },
      {
        "heading": "Tree Care & Pruning",
        "content": "Greenly offers expert tree care & pruning services to keep your landscape healthy, safe, and beautifully maintained. Our skilled team carefully trims and removes overgrown or dead branches to improve tree structure, encourage strong growth, and enhance the overall beauty of your outdoor space."
      },
      {
        "heading": "Tree Pruning and Care Services",
        "content": "Greenly provides professional tree pruning and care services to keep your landscape healthy, safe, and beautifully maintained. Our expert team carefully trims and removes overgrown or dead branches to improve tree structure, promote strong growth, and enhance the overall beauty of your outdoor space."
      },
      {
        "heading": "Tree Pruning and Care Solutions",
        "content": "Greenly offers expert tree pruning and care solutions designed to keep your landscape healthy, safe, and beautifully maintained. Our skilled team carefully removes dead or overgrown branches to improve tree structure, encourage strong growth, and enhance the overall beauty and balance of your outdoor space."
      },
      {
        "heading": "Tree Pruning and Care Experts",
        "content": "Greenly’s tree pruning and care experts provide professional maintenance to keep your trees healthy, safe, and beautifully structured. Our skilled team carefully removes dead or overgrown branches to improve tree health, encourage strong growth, and enhance the overall beauty and balance of your outdoor landscape."
      },
      {
        "heading": "Tree Pruning and Care Specialists",
        "content": "Greenly’s tree pruning and care specialists provide expert maintenance to keep your trees healthy, safe, and beautifully balanced. Our skilled team carefully removes dead or overgrown branches to improve tree structure, promote strong growth, and enhance the overall beauty and safety of your outdoor landscape."
      }
    ]
  }
];

export function getAllBlogs(): BlogPost[] {
  return blogs;
}

export function getFeaturedBlog(): BlogPost {
  return blogs.find((b) => b.featured) || blogs[0];
}

export function getRecentBlogs(): BlogPost[] {
  return blogs.filter((b) => !b.featured);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

// Recommended posts prioritized by date or matching reference design
const recommendedPriority: Record<string, string[]> = {
  'revamp-your-garden-with-seasonal-tips': [
    'seasonal-planting-guide-for-a-thriving-garden',
    'sustainable-gardening-tips-for-eco-friendly-spaces',
    'maximize-small-outdoor-areas-with-creative-solutions'
  ]
};

export function getRecommendedBlogs(currentSlug: string, count = 3): BlogPost[] {
  if (recommendedPriority[currentSlug]) {
    const matched = recommendedPriority[currentSlug]
      .map((s) => getBlogBySlug(s))
      .filter((b): b is BlogPost => Boolean(b));
    if (matched.length === count) return matched;
  }

  // Fallback: Return latest posts excluding current
  const others = blogs.filter((b) => b.slug !== currentSlug);
  return others.slice(0, count);
}

export interface ServiceSection {
  heading: string;
  content: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cardImage: string;
  heroImage: string;
  fallbackHeroImage?: string;
  inlineImage: string;
  fallbackInlineImage?: string;
  inlineImageAlt?: string;
  leadParagraph: string;
  splitIndex?: number;
  ctaText?: string;
  sections: ServiceSection[];
}

export const services: ServiceDetail[] = [
  {
    slug: "garden-maintenance",
    title: "Garden Maintenance",
    subtitle:
      "Professional Garden Maintenance Services with Greenly, tailored to keep your garden vibrant and healthy.",
    description:
      "With our full-service care you can keep garden lush lively and exquisitely arranged.",
    cardImage: "/assets/service-card-garden.png",
    heroImage: "/assets/service-hero-garden-maintenance.png",
    fallbackHeroImage: "/assets/service-garden.png",
    inlineImage: "/assets/service-inline-garden-maintenance.jpg",
    fallbackInlineImage: "/assets/blog-inline-1.jpg",
    inlineImageAlt: "Vibrant garden flowers and plants in greenhouse nursery",
    leadParagraph:
      "The rapid advancement of AI has enabled sales teams to apply machine learning techniques to analyze extensive datasets and identify meaningful patterns.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Expert Shrub Care for healthy gardens",
        content:
          "Our friendly team ensures your shrubs receive the best attention possible to elevate the visual charm of your outdoor space. Detailed horticulture methods include precision pruning and trimming techniques to maintain plant health. In addition, each step is performed using safe, balanced, and sustainable growth. Every shrub is nurtured to enrich your garden's overall design, creating harmony between beauty and seasonality.",
      },
      {
        heading: "Professional shrub care by Greenly",
        content:
          "Greenly combines expert cultivation techniques to maintain your greenery into pristine condition and vigorous growth. We combine science and artistry in every service, fostering healthy plant structures, preventing rot, and ensuring every shrub is a true garden pride.",
      },
      {
        heading: "Expert care for beautiful shrubs",
        content:
          "We specialize in transforming overgrown foliage into refined, structured, and visually appealing botanical features. Our experienced team uses precision tools to trim and shape shrubs into harmonious elements of your garden landscape.",
      },
      {
        heading: "Clean, healthy shrubs with expert care",
        content:
          "Greenly provides professional shrub care that improves both aesthetics and garden vitality through precise trimming and nurturing techniques designed for long-lasting growth.",
      },
      {
        heading: "Greenly expert shrub maintenance",
        content:
          "Our skilled team ensures your shrubs are neat, perfectly shaped, and disease-free throughout every season, creating exceptional beauty in your outdoor space.",
      },
      {
        heading: "Precision care for your shrubs",
        content:
          "We shape each plant with great precision, ensuring garden health and elevating visual charm through bespoke maintenance practices.",
      },
      {
        heading: "Expert trimming and shrub care",
        content:
          "Greenly enhances your garden's shrubs with attentive, handcrafted solutions that maintain health and aesthetic perfection.",
      },
      {
        heading: "Expert trimming and shrub care",
        content:
          "Our shrub care services ensure your garden remains clean, structured, and visually balanced throughout every season.",
      },
    ],
  },
  {
    slug: "shrub-trimming",
    title: "Shrub Trimming",
    subtitle:
      "Maintain a neat vibrant garden with our expert shrub trimming services, tailored to keep foliage healthy and structured.",
    description:
      "Maintain a neat vibrant garden with our expert shrub trimming services. Schedule.",
    cardImage: "/assets/service-card-shrub.png",
    heroImage: "/assets/service-hero-shrub-trimming.png",
    fallbackHeroImage: "/assets/service-card-shrub.png",
    inlineImage: "/assets/service-inline-shrub-trimming.png",
    fallbackInlineImage: "/assets/about-flower.jpg",
    inlineImageAlt: "Expert arborist pruning ornamental shrubbery",
    leadParagraph:
      "Maintain a neat vibrant garden with our expert shrub trimming services. Schedule professional care that enhances curb appeal and botanical longevity.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Precision Pruning Techniques",
        content:
          "We selectively remove overgrown stems and dead wood to open canopies for sunlight penetration, stimulating healthy new vegetative shoots across all seasons.",
      },
      {
        heading: "Structural Hedge Shaping",
        content:
          "Our arborists sculpt formal hedges and natural shrubs into crisp geometric lines or soft organic silhouettes that complement your home architecture and boundary aesthetics.",
      },
      {
        heading: "Disease Prevention & Botanical Hygiene",
        content:
          "By clearing dense inner growth and sterilizing cutting equipment between plants, we halt fungal spores, powdery mildew, and pest infestations before they spread to adjoining beds.",
      },
      {
        heading: "Seasonal Growth Cycles & Timing",
        content:
          "Trimming at the ideal physiological moment ensures abundant flowering for ornamental shrubs without stunting spring budding or exposing tender tips to winter frost.",
      },
      {
        heading: "Complete Debris Cleanup & Mulch Care",
        content:
          "Every cut branch and leaf clipping is meticulously raked, bagged, or chipped into nutrient-rich compost, leaving garden borders and lawn perimeters spotless.",
      },
      {
        heading: "Rejuvenation of Overgrown Specimens",
        content:
          "Older shrubs that have grown leggy, sparse, or woody receive multi-stage restorative cuts that coax vigorous green growth from the crown.",
      },
      {
        heading: "Root & Foliage Equilibrium",
        content:
          "We balance the ratio of foliage to root absorption capacity, ensuring shrubs withstand drought stress and midsummer heatwaves without dropping leaves.",
      },
      {
        heading: "Customized Recurring Maintenance Plans",
        content:
          "Flexible seasonal service cadences keep your hedge lines razor-sharp throughout the entire growing season without guesswork.",
      },
    ],
  },
  {
    slug: "landscaping-design",
    title: "Landscaping Design",
    subtitle:
      "Elevate your property's appeal with Greenly premier landscaping design solutions, blending natural beauty with functional spaces.",
    description:
      "Elevate your property's appeal with Greenly premier landscaping design solutions. Reach.",
    cardImage: "/assets/service-card-landscaping.png",
    heroImage: "/assets/service-hero-landscaping-design.png",
    fallbackHeroImage: "/assets/service-card-landscaping.png",
    inlineImage: "/assets/service-inline-landscaping-design.jpg",
    fallbackInlineImage: "/assets/gallery-hero.png",
    inlineImageAlt: "Modern landscaped backyard patio and garden layout",
    leadParagraph:
      "Elevate your property's appeal with Greenly premier landscaping design solutions. Reach an unparalleled standard of outdoor living crafted specifically for your home.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Architectural Site Analysis",
        content:
          "We evaluate sun exposure, topography, drainage corridors, and existing soil chemistry to build a landscape master plan engineered for aesthetic harmony and ecological longevity.",
      },
      {
        heading: "3D Visualizations & Spatial Planning",
        content:
          "Visualize your transformed garden before breaking ground with photo-realistic renderings that depict mature plant canopies, paver pathways, and outdoor seating alcoves.",
      },
      {
        heading: "Hardscape & Stonework Integration",
        content:
          "From natural flagstone walkways and dry-stack retaining walls to inviting fire pits, we marry durable artisanal masonry with lush horticultural plantings.",
      },
      {
        heading: "Native Flora & Climate Adaptation",
        content:
          "We curate drought-tolerant native perennials, flowering shrubs, and ornamental grasses that require minimal irrigation while supporting local pollinators and avian wildlife.",
      },
      {
        heading: "Atmospheric Landscape Lighting",
        content:
          "Low-voltage LED illumination accents mature trees, illuminates stone walkways, and extends your outdoor entertaining hours into warm evenings.",
      },
      {
        heading: "Tranquil Water Features & Focal Points",
        content:
          "Soothing bubbling urns, cascading rock waterfalls, and reflective ponds create acoustic buffers against city noise, establishing peaceful backyard sanctuaries.",
      },
      {
        heading: "Outdoor Living & Entertaining Zones",
        content:
          "We designate intentional functional zones for alfresco dining, quiet reading, and active family recreation framed by living green boundaries.",
      },
      {
        heading: "Sustainable Environmental Construction",
        content:
          "Our build process prioritizes permeable surfaces, rain runoff capture, and organic soil enrichment for lasting ecological health.",
      },
    ],
  },
  {
    slug: "mulching",
    title: "Mulching",
    subtitle:
      "Enhance moisture retention and suppress weeds in your garden beds with premium organic mulch applications.",
    description:
      "Enhance moisture retention and suppress weeds in your garden beds premium.",
    cardImage: "/assets/service-card-mulching.png",
    heroImage: "/assets/service-hero-mulching.png",
    fallbackHeroImage: "/assets/service-garden.png",
    inlineImage: "/assets/service-inline-mulching.png",
    fallbackInlineImage: "/assets/blog-inline-2.jpg",
    inlineImageAlt: "Freshly mulched ornamental flower garden beds",
    leadParagraph:
      "Enhance moisture retention and suppress weeds in your garden beds premium organic mulch materials that feed soil microbiology and frame your plants.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Maximum Soil Moisture Retention",
        content:
          "A uniform 3-inch layer of triple-shredded organic mulch drastically slows evaporation, keeping delicate root systems cool and hydrated during scorching summer stretches.",
      },
      {
        heading: "Natural Weed Suppression",
        content:
          "Mulch establishes an opaque physical barrier that prevents sunlight from reaching dormant weed seeds, reducing time-consuming manual weeding by up to 80%.",
      },
      {
        heading: "Organic Humus & Nutrient Enrichment",
        content:
          "As the organic wood fibers slowly decompose, they continuously feed beneficial mycorrhizal fungi and earthworms, creating rich loamy topsoil for surrounding plants.",
      },
      {
        heading: "Thermal Insulation for Root Zones",
        content:
          "Mulch buffers soil temperatures against sudden fluctuations, shielding roots from baking heat in mid-July and guarding crowns against winter frost-heaving.",
      },
      {
        heading: "Precision Trench Bed Edging",
        content:
          "Before applying fresh mulch, our team cuts crisp 3-inch spade trenches along turf boundaries to produce razor-sharp edges that prevent mulch spillover onto lawns.",
      },
      {
        heading: "Natural & Eco-Safe Material Options",
        content:
          "Choose from double-shredded dark hardwood, aromatic cedar, rich hemlock, or pine bark nuggets sourced from sustainably managed timberland.",
      },
      {
        heading: "Soil Erosion & Compaction Prevention",
        content:
          "Mulch cushions heavy rainfall impact, preventing topsoil crusting, slope erosion, and nutrient runoff during intense seasonal storms.",
      },
      {
        heading: "Seasonal Refresh & Color Maintenance",
        content:
          "Annual top-dressing restores dark, contrast-rich hues that make colorful perennial blossoms and evergreen shrubs pop with curb appeal.",
      },
    ],
  },
  {
    slug: "irrigation-installation",
    title: "Irrigation Installation",
    subtitle:
      "Optimise water usage and ensure your plants thrive with our efficient irrigation installation and smart watering systems.",
    description:
      "Optimise water usage and ensure your plants thrive with our efficient irrigation installation.",
    cardImage: "/assets/service-card-irrigation.png",
    heroImage: "/assets/service-hero-irrigation-installation.png",
    fallbackHeroImage: "/assets/service-card-aeration.png",
    inlineImage: "/assets/service-inline-irrigation-installation.png",
    fallbackInlineImage: "/assets/blog-inline-3.jpg",
    inlineImageAlt: "Automated smart irrigation sprayers across lawn",
    leadParagraph:
      "Optimise water usage and ensure your plants thrive with our efficient irrigation installation systems engineered for maximum water conservation.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Hydraulic Micro-Zoning",
        content:
          "We calibrate dedicated zones that match water pressure and volume to specific plant types—separating sunny turfgrass lawns from shaded shrub beds and sensitive flower boxes.",
      },
      {
        heading: "Smart Weather-Adaptive Controllers",
        content:
          "Next-generation Wi-Fi controllers sync with hyper-local rainfall radars and evaporation metrics, automatically adjusting watering runtimes or skipping cycles when rain arrives.",
      },
      {
        heading: "Targeted Low-Volume Drip Emitters",
        content:
          "Sub-surface and surface drip systems deposit water directly at root systems, virtually eliminating wind drift, evaporation loss, and foliar fungal disease.",
      },
      {
        heading: "High-Efficiency Rotary Spray Heads",
        content:
          "Pressure-regulated rotators project uniform, wind-resistant streams that eliminate dry spots while using up to 35% less municipal water than traditional sprayers.",
      },
      {
        heading: "Trenchless Lawn Installation",
        content:
          "Using vibratory plows, we install underground supply lines without destructive trench digging, leaving your established turf grass virtually unblemished.",
      },
      {
        heading: "Backflow Prevention & Code Safety",
        content:
          "Every installation incorporates certified backflow prevention assemblies tested to municipal standards, protecting domestic drinking water from cross-contamination.",
      },
      {
        heading: "Seasonal Winterization & Spring Audits",
        content:
          "High-volume air blowouts protect subterranean piping from freeze cracks before winter, followed by comprehensive spring head inspections and pressure recalibration.",
      },
      {
        heading: "Water Audits & Ongoing Efficiency",
        content:
          "We perform catch-cup distribution uniformity tests to ensure every gallon is utilized with optimal conservation and botanical efficacy.",
      },
    ],
  },
  {
    slug: "soil-testing",
    title: "Soil Testing",
    subtitle:
      "Ensure your plants get the right nutrients with our comprehensive soil testing and custom amendment programs.",
    description:
      "Ensure your plants get the right nutrients with our comprehensive soil testing and amendment.",
    cardImage: "/assets/service-card-soil.png",
    heroImage: "/assets/service-hero-soil-testing.png",
    fallbackHeroImage: "/assets/about-flower.jpg",
    inlineImage: "/assets/service-inline-soil-testing.jpg",
    fallbackInlineImage: "/assets/blog-inline-4.jpg",
    inlineImageAlt: "Horticultural expert examining loamy soil sample",
    leadParagraph:
      "Ensure your plants get the right nutrients with our comprehensive soil testing and amendment services that create fertile foundations for vibrant gardens.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Laboratory Chemical & Nutrient Profiling",
        content:
          "We collect stratified core samples across multiple property zones and analyze them for nitrogen, phosphorus, potassium, calcium, magnesium, sulfur, and trace micronutrients.",
      },
      {
        heading: "Soil pH Calibration & Optimization",
        content:
          "Discover whether your ground is too acidic or alkaline. We calculate precise application rates of calcitic lime or elemental sulfur to achieve the ideal 6.2–6.8 pH window.",
      },
      {
        heading: "Cation Exchange Capacity (CEC) & Humus",
        content:
          "By measuring CEC, we determine your soil's capacity to store and exchange vital nutrient cations, identifying where compost amendments can boost nutrient retention.",
      },
      {
        heading: "Texture & Infiltration Analysis",
        content:
          "We identify the proportions of sand, silt, and clay in your beds, diagnosing percolation roadblocks, subsoil hardpans, or rapid nutrient leaching.",
      },
      {
        heading: "Custom Organic Amendment Formulations",
        content:
          "No generic bag fertilizer. We formulate bespoke biological amendments, compost top-dressings, and microbial inoculants that supply exactly what your soil lacks.",
      },
      {
        heading: "Heavy Metal & Safety Screening",
        content:
          "Ensure kitchen herb gardens and raised vegetable beds are grown in untainted, healthy earth with rigorous screening for lead, arsenic, and environmental pollutants.",
      },
      {
        heading: "Mycorrhizal & Microbial Bio-Assay",
        content:
          "Healthy soil is alive. We evaluate beneficial fungal networks and bacterial density that unlock bound phosphorus and protect roots from soil-borne pathogens.",
      },
      {
        heading: "Year-Over-Year Soil Progress Reports",
        content:
          "Track measured improvements in soil structure, microbial respiration, and organic percentage over multi-year stewardship cycles.",
      },
    ],
  },
  {
    slug: "lawn-aeration",
    title: "Lawn Aeration",
    subtitle:
      "Improve the health of your lawn by allowing air, water, and nutrients to penetrate dense, compacted turf roots.",
    description:
      "Improve the health of your lawn by allowing air water and nutrients to penetrate.",
    cardImage: "/assets/service-card-aeration.png",
    heroImage: "/assets/service-hero-lawn-aeration.png",
    fallbackHeroImage: "/assets/service-hero-3.png",
    inlineImage: "/assets/service-inline-lawn-aeration.png",
    fallbackInlineImage: "/assets/blog-inline-5.jpg",
    inlineImageAlt: "Commercial core aeration machine extracting soil plugs",
    leadParagraph:
      "Improve the health of your lawn by allowing air water and nutrients to penetrate deeply into compacted soil beds with commercial core aeration.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Deep Core Extraction Mechanics",
        content:
          "Our commercial aerators extract thousands of hollow 2.5- to 3-inch soil cores across your turf, relieving intense compaction caused by foot traffic, mowing, and clay density.",
      },
      {
        heading: "Biological Thatch Layer Decomposition",
        content:
          "As the extracted soil cores dissolve in rainwater over subsequent weeks, they deposit native microbes onto surface thatch, naturally digesting dead grass stems.",
      },
      {
        heading: "Direct Root Oxygenation & Respiration",
        content:
          "Fresh oxygen channels allow grass root cells to respirate at peak metabolic efficiency, triggering new root branch development throughout the subsoil.",
      },
      {
        heading: "Superior Water & Moisture Infiltration",
        content:
          "Say goodbye to standing puddles and slope runoff. Core cavities serve as natural percolation funnels, guiding rainwater straight to thirsty root tips.",
      },
      {
        heading: "Optimal Seed-to-Soil Overseeding Synergy",
        content:
          "Pairing core aeration with premium seed blends allows seeds to drop directly into moist, sheltered cavities where germination rates exceed 90%.",
      },
      {
        heading: "Enhanced Fertilizer Absorption",
        content:
          "Granular organics and biological humates bypass dense surface crusts and reach the active root rhizosphere immediately.",
      },
      {
        heading: "Root Deepening & Heat Tolerance",
        content:
          "Grass roots follow moisture down the open core channels, growing several inches deeper and staying green through summer drought conditions.",
      },
      {
        heading: "Seasonal Spring & Autumn Timetables",
        content:
          "We perform aeration during vigorous cool-season growth peaks so your turf repairs rapidly and creates a thick, weed-choking green carpet.",
      },
    ],
  },
  {
    slug: "seasonal-cleanup",
    title: "Seasonal Cleanup",
    subtitle:
      "Prepare your garden for the changing seasons with our thorough seasonal cleanup and winterization services.",
    description:
      "Prepare your garden for the changing seasons with our thorough seasonal cleanup services.",
    cardImage: "/assets/service-card-cleanup.png",
    heroImage: "/assets/service-hero-seasonal-cleanup.png",
    fallbackHeroImage: "/assets/gallery-5.png",
    inlineImage: "/assets/service-inline-seasonal-cleanup.jpg",
    fallbackInlineImage: "/assets/blog-inline-6.jpg",
    inlineImageAlt: "Grounds crew clearing autumn foliage and garden beds",
    leadParagraph:
      "Prepare your garden for the changing seasons with our thorough seasonal cleanup services that rejuvenate beds and protect delicate foliage.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Autumn Leaf & Foliage Clearing",
        content:
          "Removing heavy, waterlogged leaf blankets from turfgrass and groundcovers prevents crown suffocation, turf rot, and lethal spring snow mold outbreaks.",
      },
      {
        heading: "Perennial Cutback & Crown Protection",
        content:
          "We carefully cut back spent perennial stalks and diseased foliage while intentionally preserving decorative seed heads for winter bird feeding.",
      },
      {
        heading: "Spring Garden Bed Revival",
        content:
          "We clear storm debris, gently rake winter gravel, and cultivate topsoil crusts to give emerging spring bulbs and tender shoots room to thrive.",
      },
      {
        heading: "Shrub Winterization & Burlap Wrapping",
        content:
          "Tender evergreens, hydrangeas, and boxwoods receive protective anti-desiccant coatings and breathable burlap wraps against harsh winter winds and heavy snow loads.",
      },
      {
        heading: "Drainage Channel & Gutter Clearing",
        content:
          "Runoff catch basins, decorative dry creek beds, and exterior drainage grates are cleared of pine needles and silt to eliminate standing winter water.",
      },
      {
        heading: "Pre-Emergent Weed Barrier Applications",
        content:
          "We apply clean organic pre-emergent barriers during cleanup visits to prevent nuisance crabgrass and seasonal broadleaf seeds from sprouting in warm weather.",
      },
      {
        heading: "Responsible Eco-Composting Stewardship",
        content:
          "All organic yard waste, twigs, and leaf matter are transported to certified composting hubs to be converted into clean, fertile mulch for future cycles.",
      },
      {
        heading: "Pre-Season Health & Structure Audits",
        content:
          "Our arborists inspect structural branch integrity, irrigation readiness, and bark vitality to prepare your landscape for whatever weather lies ahead.",
      },
    ],
  },
  {
    slug: "pest-control",
    title: "Pest Control",
    subtitle:
      "Protect your garden from harmful pests with our environmentally friendly pest control and plant defense solutions.",
    description:
      "Protect your garden from harmful pests with our environmentally friendly pest control.",
    cardImage: "/assets/service-card-pest.png",
    heroImage: "/assets/service-hero-pest-control.png",
    fallbackHeroImage: "/assets/service-card-shrub.png",
    inlineImage: "/assets/service-inline-pest-control.jpg",
    fallbackInlineImage: "/assets/blog-inline-7.jpg",
    inlineImageAlt: "Horticultural specialist monitoring garden foliage for pests",
    leadParagraph:
      "Protect your garden from harmful pests with our environmentally friendly pest control programs that preserve ecological balance and plant beauty.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Integrated Pest Management (IPM)",
        content:
          "Rather than indiscriminate spraying, we practice scientific IPM—monitoring insect life cycles, setting damage thresholds, and targeting interventions solely where needed.",
      },
      {
        heading: "Pollinator-Safe Bio-Botanical Solutions",
        content:
          "Our botanical oils, insecticidal soaps, and neem derivatives eliminate destructive mites, aphids, and scale without endangering essential honeybees or butterflies.",
      },
      {
        heading: "Subterranean Grub & Beetle Management",
        content:
          "We introduce beneficial parasitic nematodes and milky spore to eradicate Japanese beetle larvae before they devour turfgrass root crowns.",
      },
      {
        heading: "Foliar Fungal & Blight Protection",
        content:
          "Targeted biological bio-fungicides strengthen plant leaf cuticles, shielding prized roses, hydrangeas, and dogwoods from black spot, powdery mildew, and rust.",
      },
      {
        heading: "Natural Perimeter Tick & Mosquito Shield",
        content:
          "Essential cedar and garlic oils misted across property perimeters create natural repellant zones, keeping biting pests away from family patio gatherings.",
      },
      {
        heading: "Targeted Micro-Injection Tree Defense",
        content:
          "For majestic shade trees threatened by emerald ash borers or bark beetles, trunk micro-injections deliver targeted defense directly through the sapstream without airborne drift.",
      },
      {
        heading: "Ecosystem Balance & Beneficial Predators",
        content:
          "We encourage natural garden protectors—such as ladybugs, lacewings, and praying mantises—fostering self-regulating ecological resilience in your backyard.",
      },
      {
        heading: "Proactive Seasonal Monitoring Visits",
        content:
          "Regular monthly inspections identify emerging pest hotspots early, ensuring your prized plants remain lush, unharmed, and disease-free all summer.",
      },
    ],
  },
  {
    slug: "lawn-mowing",
    title: "Lawn Mowing",
    subtitle:
      "Professional lawn mowing, crisp perimeter edging, and clean cleanup tailored to keep your grass healthy, green, and vibrant.",
    description:
      "Precision weekly and bi-weekly lawn mowing, edging, and debris blowing for crisp, manicured curb appeal.",
    cardImage: "/assets/service-hero-3.png",
    heroImage: "/assets/service-hero-3.png",
    fallbackHeroImage: "/assets/service-card-aeration.png",
    inlineImage: "/assets/hero-bg.png",
    fallbackInlineImage: "/assets/service-hero-2.png",
    inlineImageAlt: "Manicured green lawn with clean mowing stripes",
    leadParagraph:
      "Keep your lawn pristine, evenly cut, and striped to perfection with Greenly's professional mowing services engineered for turf health and beauty.",
    splitIndex: 5,
    ctaText: "Book Your Service",
    sections: [
      {
        heading: "Sharp Commercial Blade Cutting",
        content:
          "We sharpen mower blades daily to produce razor-sharp shears on every blade of grass, avoiding the torn, ragged brown tips caused by dull commercial decks.",
      },
      {
        heading: "The 1/3 Botanical Cutting Rule",
        content:
          "We never cut more than one-third of the grass blade length in a single pass. This preserves root carbohydrates, deters weed seeds, and ensures vibrant chlorophyll production.",
      },
      {
        heading: "Vertical Steel Perimeter Edging",
        content:
          "Every visit includes precision string trimming and steel edging along all curbs, concrete driveways, stone patios, and garden bed trenches for pristine curb appeal.",
      },
      {
        heading: "Nutrient-Recycling Mulch Mowing",
        content:
          "Commercial mulching decks micro-shred grass clippings, returning over 25% of natural nitrogen back to your lawn's soil without clumping or thatch buildup.",
      },
      {
        heading: "Spotless Surface Debris Blowoff",
        content:
          "We blow all clippings and dust off porches, driveways, decks, and garden beds back into the turf so your property looks immaculate the moment we finish.",
      },
      {
        heading: "Alternating Striping Diamond Patterns",
        content:
          "By rotating mowing patterns each week (checkerboard, diagonal, parallel), we prevent tire ruts, discourage grass leaning, and produce luxury diamond stripes.",
      },
      {
        heading: "Flexible Weekly & Bi-Weekly Scheduling",
        content:
          "Automated recurring service matched to rainfall and seasonal growth cycles keeps your lawn reliably manicured without you ever having to lift a finger.",
      },
      {
        heading: "Eco-Conscious Commercial Equipment",
        content:
          "Modern high-torque equipment reduces carbon emissions and neighborhood noise while delivering world-class lawn care precision.",
      },
    ],
  },
];

export function getAllServices(): ServiceDetail[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  // Normalize slug to handle aliases (e.g. seasonal-cleanups -> seasonal-cleanup)
  const normalized = slug === "seasonal-cleanups" ? "seasonal-cleanup" : slug;
  return services.find((s) => s.slug === normalized);
}

export function getOtherServices(currentSlug: string, count = 3): ServiceDetail[] {
  const others = services.filter((s) => s.slug !== currentSlug);
  return others.slice(0, count);
}

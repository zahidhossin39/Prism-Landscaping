import { NextResponse } from "next/server";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * System prompt strictly grounded in website knowledge and unslop principles.
 * Incorporates unslop skill doctrine:
 * - Eliminates AI vocabulary, corporate fluff, fake cheer, sycophantic greetings, and chatbot sign-offs.
 * - Enforces concise, factual prose, plain language, active voice, and concrete numbers.
 * - Bans em dashes, en dashes, colon mid-sentence connectors, decorative emojis, and boldface overuse.
 * - Exhaustively grounded in Greenly Landscaping website data (services, blogs, gallery, pricing, team, reviews, FAQ, bookings).
 */
const SYSTEM_PROMPT = `You are the customer service assistant for Greenly Landscaping (Prism Landscaping). You help homeowners and property managers understand services, schedule estimates, read published gardening guides, explore gallery projects, and answer landscaping questions based strictly on website information.

VOICE AND WRITING RULES (STRICT UNSLOP):
1. Cut AI vocabulary and corporate fluff entirely. Never use: delve, foster, showcase, tapestry, vibrant, crucial, enhance, additionally, furthermore, testament, interplay, enduring, bolster, garnered, pivotal, intricate, underscore, plethora, symphony, picturesque, boasts, stands as, serves as. Use plain words: "use" instead of "utilize" or "leverage", "help" instead of "facilitate", "many" instead of "numerous", "is" or "has" instead of "boasts/stands as/serves as", "if" instead of "in the event that".
2. No sycophancy or fake cheer. Never begin responses with: "Great question!", "Certainly!", "Of course!", "I would be happy to help with that!", "You have come to the right place!". Answer directly starting with facts.
3. No chatbot boilerplate sign-offs. Never end responses with: "I hope this helps!", "Let me know if you have any questions!", "Feel free to reach out anytime!", "Have a wonderful day!". When the answer is complete, simply stop.
4. No decorative emojis. Do not sprinkle leaf, sparkle, or house emojis across sentences and headings. Write clean, readable text.
5. No em dashes or en dashes. Avoid em dashes and en dashes completely. Use periods or commas only.
6. Avoid boldface overuse. Do not bold every proper noun, price, or sentence. Bold only key headers or primary terms where clarity requires it.
7. Ban "Not just X, but Y" framing. State points directly without comparing.
8. Ban superficial -ing clauses. Do not use phrases like "highlighting...", "ensuring...", "reflecting...", "fostering...". Write complete, direct sentences.
9. Say what it does, what it costs, and specific facts. Name exact numbers, techniques, procedures, and timelines instead of abstract feelings. Prefer active voice.
10. Scope discipline: You only answer about Greenly Landscaping, its services, blog guides, gallery projects, pricing, estimates, and outdoor maintenance. If a user asks something unrelated, state plainly that you only assist with Greenly Landscaping services and outdoor care.

COMPANY INFORMATION:
- Business: Greenly Landscaping (Prism Landscaping)
- Track record: 10+ years in business, 820+ clients, 180+ commercial projects completed, 200+ lawns maintained, 22+ industry awards, 100+ trained gardeners and certified arborists. 99% customer satisfaction rate.
- Phone: +1 (000) 123-4567 (direct calling line and 24/7 priority emergency dispatch for fallen trees or storm damage)
- Email: info@gardencare.com
- Address: 23 Greenway Street, City Name (also listed as 123 Greenway Street, City Name)
- Business hours: Monday through Saturday from 8:00 AM to 6:00 PM. Closed on Sundays, with 24/7 phone dispatch available for emergency tree hazards.
- Mission: To deliver high-quality, sustainable gardening and lawn care services that improve outdoor living and bring lasting beauty to every space we serve.
- Pillars: Passion for nature and dedication to quality ("What Drives Us"), dependable service ("Our Commitment"), and reliable communication ("Quality You Can Trust").

ESTIMATES, BOOKINGS, AND DEMOS:
- Request online: Visitors can click "Book Your Service", "Get A Free Quote", or "Book A Demo" on the site.
- Quote form details: Requests name, email, phone number, service type, and yard dimensions or notes.
- Demo form details: Located on the contact page at /contact-us, requesting name, email, phone number, and address.
- Phone bookings: Call +1 (000) 123-4567.
- Free written estimates arrive within 24 hours. Large projects and custom designs include a free on-site walk-through.
- 4-step process: 1. Receive a Quote, 2. Schedule the Service, 3. Service Completion, 4. Follow-Up Support.

SERVICES CATALOG AND PRICING:
1. Lawn Mowing and Edging:
   - Cadence: Weekly and bi-weekly recurring schedules.
   - Blades sharpened daily to prevent frayed grass tips.
   - 1/3 cutting rule followed on every cut to protect root systems and turf moisture.
   - Vertical steel perimeter edging along sidewalks, curbs, patios, and garden trenches.
   - Mulch mowing recycles micro-shredded clippings, returning roughly 25% of natural nitrogen to the turf without thatch buildup.
   - Walkways and driveways blown clean after every visit.
   - Alternating diamond, diagonal, and parallel striping patterns prevent wheel ruts.
   - Pricing: Starts from $45 to $65 per visit.

2. Garden Maintenance:
   - Regular plant care, selective hand weeding, flower deadheading, soil cultivation, and bed shaping.
   - Pricing: Starts from $95 per visit.

3. Shrub and Tree Trimming:
   - Certified arborists and trained trimmers.
   - Selective pruning clears dead wood and opens canopies for sunlight and airflow.
   - Geometric hedge sculpting or natural organic silhouettes to match home architecture.
   - Cutting blades are sterilized between plants to stop fungal spores and powdery mildew.
   - All branch trimmings and leaf debris raked, bagged, or chipped into compost.
   - Multi-stage restorative pruning for older, woody, or overgrown shrubs.

4. Landscaping Design:
   - Architectural site assessment covering sun angles, soil chemistry, slope, and drainage corridors.
   - Photo-realistic 3D visualizations and spatial layouts before ground is broken.
   - Hardscaping integration: natural flagstone walkways, dry-stack stone retaining walls, paver patios, fire pits.
   - Curated native plants and drought-tolerant perennials that support pollinators with low water needs.
   - Low-voltage LED night lighting for pathways and canopy accents.
   - Water features: bubbling rock urns, tiered stone waterfalls, reflection ponds.
   - Permeable surface construction and rain catchment.
   - Pricing: Free on-site consultation and tailored quote.

5. Mulching and Trench Edging:
   - Uniform 3-inch layer of triple-shredded organic mulch.
   - Retains soil moisture through summer heat and protects roots against winter frost heave.
   - Suppresses weed seed germination by up to 80%.
   - Natural wood breakdown feeds soil microbiology and earthworms.
   - Precision 3-inch spade trench edging cut along lawn borders to prevent mulch drift.
   - Material options: double-shredded dark hardwood, cedar, hemlock, pine bark nuggets.

6. Smart Irrigation Installation and Repair:
   - Hydraulic micro-zoning separates turfgrass zones from low-demand shrub beds and sensitive flower boxes.
   - Wi-Fi controllers connect with local weather radar to skip runs when rain arrives, saving up to 40% on water bills.
   - Low-volume drip tubing deposits water right at root crowns, cutting evaporation and leaf fungus.
   - Pressure-regulated rotary sprinkler nozzles reduce water consumption by up to 35% compared to standard sprays.
   - Trenchless vibratory plow installation places supply lines without digging up established turf.
   - Certified backflow prevention meets municipal code to protect drinking water.
   - Compressed air winterization blowouts prevent freeze bursts; full spring startup audits.

7. Soil Testing and Custom Amendments:
   - Stratified soil core sampling across property zones.
   - Lab testing for nitrogen, phosphorus, potassium, calcium, magnesium, sulfur, and micronutrients.
   - pH calibration targeting the ideal 6.2 to 6.8 range using calcitic lime or elemental sulfur.
   - Cation Exchange Capacity (CEC) and texture analysis (sand, silt, clay ratio).
   - Custom organic biological compost and microbial inoculants based on lab results.
   - Safety screening for lead, arsenic, and contaminants in vegetable and herb beds.

8. Lawn Aeration and Overseeding:
   - Commercial core aerators pull thousands of 2.5- to 3-inch soil plugs.
   - Relieves compaction from heavy foot traffic, lawn equipment, and dense clay soils.
   - Plugs dissolve over weeks, releasing natural microbes that break down excess thatch.
   - Creates open channels for oxygen, water percolation, and fertilizer absorption directly into the root zone.
   - Paired with premium grass seed blends; seed falling into core holes sees germination rates above 90%.
   - Optimal timing: Early spring and early autumn during active growth cycles.

9. Seasonal Cleanups:
   - Autumn cleanup clears heavy wet leaf mats before they rot turf or cause spring snow mold, cuts back perennials while keeping select decorative bird seed heads, and wraps sensitive shrubs in breathable burlap with anti-desiccant spray.
   - Spring cleanup clears storm debris, rakes winter grit, loosens crusted topsoil, and applies organic pre-emergent weed barriers.
   - Clears drainage swales, grates, and dry creek beds.
   - Pricing: Starts from $180.

10. Pest Control and Plant Defense:
    - Integrated Pest Management (IPM) monitors life cycles and targets pests only when necessary.
    - Pollinator-safe horticultural oils, insecticidal soaps, and neem treatments that protect bees and butterflies.
    - Beneficial parasitic nematodes and milky spore control Japanese beetle grubs in the soil before they damage turf roots.
    - Bio-fungicides protect roses, hydrangeas, and dogwoods against black spot, powdery mildew, and leaf rust.
    - Perimeter cedar and garlic oil misting deters ticks and mosquitoes from outdoor seating areas.
    - Direct trunk micro-injections protect shade trees against emerald ash borers and bark beetles without drift.
    - Monthly recurring monitoring during active seasons.

PRICING SUMMARY:
- Routine Lawn Mowing and Edging: From $45 to $65 per visit
- Garden Maintenance: From $95 per visit
- Seasonal Cleanups (Spring or Fall): From $180
- Landscape Design, Hardscaping, Irrigation: Free on-site assessment and custom quote

BLOG ARTICLES AND GARDENING GUIDES (PUBLISHED AT /blog):
1. "Stay Inspired and Keep Your Outdoor Spaces Thriving" (Category: Lawn Care): Mowing practices, fertilization schedules, and aeration to keep lawns manicured.
2. "Transform Your Outdoors with Expert Advice" (Category: Lawn Care): Essential outdoor maintenance techniques and lawn health tips.
3. "Revamp Your Garden with Seasonal Tips" (Category: Seasonal Guide): Seasonal strategies for garden beds, soil preparation, and perennial maintenance.
4. "Maximize Your Space: Vertical Gardening Solutions" (Category: Landscape Design): Vertical gardening structures and planting methods for compact outdoor spaces.
5. "Sustainable Gardening: Tips for Eco-Friendly Spaces" (Category: Eco Friendly): Eco-conscious landscaping, organic lawn maintenance, and water conservation.
6. "Maximize Small Outdoor Areas with Creative Solutions" (Category: Garden Design): Container gardening concepts and patio layouts for small backyards.
7. "Seasonal Planting Guide for a Thriving Garden" (Category: Planting Guide): Month-by-month planting timetable for continuous blooms and strong roots.

GALLERY AND FEATURED PROJECTS (PUBLISHED AT /gallery):
- Residential Lawn Mowing and Edging
- Country Estate Landscape and Cottage Front Gardens
- Commercial Orchard and Field Mowing
- Flower Bed and Shrub Pruning
- Tall Hedge Precision Shearing
- Backyard Turf Restoration
- Stone Villa Estate Walkway and Lawn
- Family Garden Care and Sustainable Terrace Planters

TEAM MEMBERS:
- Evelyn Hayes: Head of Landscaping
- Arthur Morales: Senior Horticulturist
- Naomi Williams: Certified Arborist
- Jamal Crawford: Regional Sales Director

CUSTOMER REVIEWS:
- Daniel K. (Commercial Property Manager): 5-star review for commercial campus lawn health and consistent scheduling.
- Angela R. (Asset Management Specialist): 5-star review for curb appeal and courteous crew.
- Jessica P. (Property Investment Advisor): 5-star review for garden renovation and property value increase.
- Marcus Vance (Homeowner): 5-star review for precision hedge trimming and spotless debris cleanup.
- Sophia Chen (Landscape Architect): 5-star review for organic mulching and water-saving smart irrigation.
- David Miller (Private Estate Owner): 5-star review for reliable recurring maintenance without hassle.

COMMON FAQ ANSWERS:
- Mowing schedule: Weekly or bi-weekly depending on turf type, shade, and rain.
- Aeration benefit: Relieves hard soil, lets water and air reach roots, and provides holes for seed germination.
- Fertilizing timing: Early spring and autumn during peak growth cycles.
- Weed control: We combine organic pre-emergents, dense overseeding, and proper 1/3 mowing height so turf crowds out weeds.
- Grass selection: Recommendations based on local sunlight, climate, and soil composition for cool-season or warm-season turf.
- Emergency storm damage: Call +1 (000) 123-4567 immediately for priority response to fallen limbs or safety hazards.`;

// Dynamic contextual suggestion chip generator
function getDynamicSuggestions(query: string, reply: string): string[] {
  const combined = (query + " " + reply).toLowerCase();

  if (combined.includes("emergency") || combined.includes("storm") || combined.includes("hazard") || combined.includes("fallen")) {
    return ["Call +1 (000) 123-4567", "Request Priority Inspection", "Contact Us"];
  }
  if (combined.includes("blog") || combined.includes("article") || combined.includes("guide") || combined.includes("read")) {
    return ["Read Our Blog", "Seasonal Planting Guide", "Explore Services"];
  }
  if (combined.includes("gallery") || combined.includes("photo") || combined.includes("project") || combined.includes("portfolio") || combined.includes("picture")) {
    return ["View Gallery", "Residential Projects", "Get A Free Quote"];
  }
  if (combined.includes("demo") || combined.includes("book demo") || combined.includes("schedule demo")) {
    return ["Schedule A Demo", "Get A Free Quote", "Contact Us"];
  }
  if (combined.includes("quote") || combined.includes("estimate") || combined.includes("pricing") || combined.includes("cost") || combined.includes("rate")) {
    return ["Get A Free Quote", "Lawn Mowing Rates", "Seasonal Cleanup Cost", "Contact Us"];
  }
  if (combined.includes("mow") || combined.includes("aerat") || combined.includes("turf") || combined.includes("grass")) {
    return ["Routine Lawn Mowing", "Lawn Aeration", "Get A Free Quote", "Lawn Mowing Rates"];
  }
  if (combined.includes("shrub") || combined.includes("tree") || combined.includes("trim") || combined.includes("prun") || combined.includes("hedge")) {
    return ["Shrub Trimming", "Seasonal Cleanup", "Get A Free Quote", "Contact Us"];
  }
  if (combined.includes("design") || combined.includes("hardscape") || combined.includes("patio") || combined.includes("wall")) {
    return ["Landscape Design", "Get A Free Quote", "View Gallery", "Contact Us"];
  }
  if (combined.includes("irrigat") || combined.includes("sprinkler") || combined.includes("water")) {
    return ["Irrigation Installation", "Soil Testing", "Get A Free Quote"];
  }
  if (combined.includes("hour") || combined.includes("location") || combined.includes("address") || combined.includes("phone")) {
    return ["Get A Free Quote", "Business Hours", "Contact Us"];
  }
  if (combined.includes("team") || combined.includes("about") || combined.includes("mission") || combined.includes("review") || combined.includes("testimonial")) {
    return ["Meet Our Team", "Our Mission", "Read Reviews", "Get A Free Quote"];
  }

  return ["Get A Free Quote", "Explore Services", "Pricing & Estimates", "Emergency Hotline"];
}

// Built-in intelligent response generator (unslop-aligned knowledge base)
function generateGreenlyResponse(input: string | ChatMessage[]): { reply: string; suggestions?: string[] } {
  let lastUserMessage = "";
  let fullConversation = "";

  if (Array.isArray(input)) {
    lastUserMessage = [...input].reverse().find((m) => m.role === "user")?.content || "";
    fullConversation = input.map((m) => m.content).join(" ").toLowerCase();
  } else {
    lastUserMessage = input || "";
    fullConversation = lastUserMessage.toLowerCase();
  }

  const query = lastUserMessage.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings|yo)\b/i.test(query)) {
    return {
      reply: "Hello. Welcome to Greenly Landscaping. I can answer questions about lawn mowing, shrub care, seasonal cleanups, irrigation, pricing, blog articles, gallery projects, or setting up a free quote. What would you like to know?",
      suggestions: ["Get A Free Quote", "Explore Services", "Pricing & Estimates", "Emergency Hotline"],
    };
  }

  // Emergency lawn care / urgent requests
  if (/emergency|urgent|storm|fallen|tree down|asap|rescue|hazard|danger|damage/i.test(query)) {
    return {
      reply: "For urgent hazards such as fallen branches, storm debris, or property hazards, our priority crew operates a direct phone line.\n\nCall our hotline at +1 (000) 123-4567 for immediate dispatch and hazard clearing.",
      suggestions: ["Call +1 (000) 123-4567", "Contact Information", "Get A Free Quote"],
    };
  }

  // Blog articles and guides
  if (/blog|article|guide|read|planting guide|seasonal tips|vertical garden/i.test(query)) {
    return {
      reply: "We publish gardening guides and seasonal maintenance advice on our blog at /blog:\n\n• Stay Inspired and Keep Your Outdoor Spaces Thriving (Lawn Care): Mowing, fertilization, and aeration practices.\n• Transform Your Outdoors with Expert Advice (Lawn Care): Essential outdoor maintenance and turf health.\n• Revamp Your Garden with Seasonal Tips (Seasonal Guide): Garden bed revitalization and perennial care.\n• Maximize Your Space: Vertical Gardening Solutions (Landscape Design): Compact planting and vertical garden structures.\n• Sustainable Gardening: Tips for Eco-Friendly Spaces (Eco Friendly): Organic lawn maintenance and water conservation.\n• Maximize Small Outdoor Areas with Creative Solutions (Garden Design): Layouts and container planting for small yards.\n• Seasonal Planting Guide for a Thriving Garden (Planting Guide): Timetable for root health and continuous blooms.",
      suggestions: ["Read Our Blog", "Explore Services", "Get A Free Quote"],
    };
  }

  // Gallery and previous work
  if (/gallery|photo|picture|portfolio|project|past work|example/i.test(query)) {
    return {
      reply: "You can view completed landscaping projects on our gallery page at /gallery. Featured projects include:\n\n• Residential Lawn Mowing and Edging\n• Country Estate Landscapes and Cottage Front Gardens\n• Commercial Orchard and Field Mowing\n• Precision Flower Bed and Shrub Pruning\n• Tall Hedge Shearing\n• Backyard Turf Restoration\n• Stone Villa Estate Walkways and Lawns\n• Family Garden Care and Sustainable Terrace Planters",
      suggestions: ["View Gallery", "Residential Projects", "Get A Free Quote"],
    };
  }

  // Demo scheduling
  if (/demo|book demo|schedule demo/i.test(query)) {
    return {
      reply: "You can schedule a consultation demo on the contact page at /contact-us by submitting your name, email, phone number, and address. You can also call us directly at +1 (000) 123-4567.",
      suggestions: ["Schedule A Demo", "Get A Free Quote", "Contact Us"],
    };
  }

  // Multi-turn context resolution: When / Timing questions
  if (/\b(when|timing|time of year|best time|how often|what season)\b/i.test(query)) {
    if (fullConversation.includes("aerat") || fullConversation.includes("clay") || fullConversation.includes("thatch") || fullConversation.includes("overseed")) {
      return {
        reply: "We recommend core aeration in early spring or early autumn during active growth cycles. Early autumn is especially effective for cool-season grasses because seed falling into core holes sees germination rates above 90% without summer weed pressure.",
        suggestions: ["Lawn Aeration", "Get A Free Quote", "Explore Services"],
      };
    }
    if (fullConversation.includes("fertiliz") || fullConversation.includes("weed")) {
      return {
        reply: "Early spring and autumn are ideal times to fertilize lawns. This delivers key nutrients during peak root and blade growth phases.",
        suggestions: ["Soil Testing", "Get A Free Quote", "Explore Services"],
      };
    }
    if (fullConversation.includes("mow") || fullConversation.includes("grass") || fullConversation.includes("turf")) {
      return {
        reply: "Our routine lawn mowing is scheduled weekly or bi-weekly depending on seasonal rainfall, sun exposure, and grass variety.",
        suggestions: ["Routine Lawn Mowing", "Lawn Mowing Rates", "Get A Free Quote"],
      };
    }
    if (fullConversation.includes("clean") || fullConversation.includes("leaf") || fullConversation.includes("leaves")) {
      return {
        reply: "Seasonal cleanups take place twice each year: in autumn to clear heavy leaf mats and winterize tender shrubs, and in early spring to clear storm debris and apply pre-emergent weed barriers.",
        suggestions: ["Seasonal Cleanup", "Get A Free Quote", "Pricing & Estimates"],
      };
    }
  }

  // Quote or estimate request
  if (/quote|estimate|cost|pricing|price|rate|how much|fee/i.test(query)) {
    if (fullConversation.includes("mow") && !fullConversation.includes("clean") && !fullConversation.includes("design")) {
      return {
        reply: "Routine lawn mowing and edging starts from $45 to $65 per visit. It includes weekly or bi-weekly visits, daily blade sharpening, vertical steel edging, mulch mowing, and hard surface cleanup.",
        suggestions: ["Get A Free Quote", "Routine Lawn Mowing", "Contact Us"],
      };
    }
    if (fullConversation.includes("clean") && !fullConversation.includes("mow")) {
      return {
        reply: "Seasonal cleanups start from $180 per visit for thorough spring or autumn property clearing.",
        suggestions: ["Get A Free Quote", "Seasonal Cleanup", "Contact Us"],
      };
    }

    return {
      reply: "Our pricing structure:\n\n• Routine Lawn Mowing and Edging: Starting from $45 to $65 per visit\n• Garden Maintenance: From $95 per visit\n• Seasonal Cleanup (Spring or Fall): From $180\n• Custom Landscape Design, Hardscaping, and Irrigation: Free on-site consultation and tailored quote\n\nTo request a free written quote within 24 hours, click 'Get A Free Quote' on the site or call +1 (000) 123-4567.",
      suggestions: ["Get A Free Quote", "Routine Lawn Mowing", "Seasonal Cleanups", "Contact Us"],
    };
  }

  // Lawn Aeration & Overseeding
  if (/aerat|overseed|thatch/i.test(query)) {
    return {
      reply: "Core aeration extracts 2.5- to 3-inch soil plugs across your lawn. This relieves compacted soil from foot traffic and heavy clay, opens pathways for oxygen and water, and naturally breaks down surface thatch.\n\nWhen paired with overseeding, grass seed drops directly into core cavities where germination rates exceed 90%. We recommend aeration in early spring or early autumn during active growth.",
      suggestions: ["Get A Free Quote", "Pricing & Estimates", "Explore Services"],
    };
  }

  // Shrub & Tree Trimming
  if (/shrub|tree|hedge|bush|trim|prun/i.test(query)) {
    return {
      reply: "Our certified arborists provide precision trimming and hedge shaping:\n\n• Selective pruning removes dead wood and opens canopies for sunlight and airflow\n• Cutting equipment is sterilized between plants to stop the spread of fungal spores and powdery mildew\n• All trimmings and clippings are raked, bagged, or chipped into compost\n• Multi-stage restorative pruning rejuvenates older overgrown shrubs",
      suggestions: ["Get A Free Quote", "Seasonal Cleanup", "Explore Services"],
    };
  }

  // Irrigation
  if (/irrigat|sprinkler|water system/i.test(query)) {
    return {
      reply: "We install and service water-efficient irrigation systems:\n\n• Hydraulic micro-zoning separates turfgrass zones from flower and shrub beds\n• Smart Wi-Fi controllers connect to local rain radar to skip cycles automatically, cutting water bills by up to 40%\n• Low-volume root drip lines reduce evaporation and foliar disease\n• Trenchless vibratory plow installation places supply lines without ripping up established grass\n• Certified backflow prevention and seasonal winterization blowouts",
      suggestions: ["Get A Free Quote", "Soil Testing", "Contact Us"],
    };
  }

  // Mulching & Soil Testing
  if (/mulch|soil|fertiliz|compost/i.test(query)) {
    return {
      reply: "We provide organic mulching and lab soil testing:\n\n• Mulching: A 3-inch layer of triple-shredded hardwood, cedar, hemlock, or pine bark insulates roots, slows evaporation, and reduces weeds by up to 80%. We cut a clean 3-inch spade trench along turf borders to stop spillover.\n• Soil Testing: Stratified core samples are lab-tested for N-P-K, micronutrients, and pH. We apply calcitic lime or elemental sulfur to balance pH within the 6.2 to 6.8 range.",
      suggestions: ["Get A Free Quote", "Garden Maintenance", "Explore Services"],
    };
  }

  // Lawn Mowing
  if (/lawn|mow|mowing|grass|turf|cut/i.test(query)) {
    return {
      reply: "Our recurring mowing service includes:\n\n• Weekly or bi-weekly visits\n• Daily blade sharpening for clean cuts without ripped, brown tips\n• The 1/3 cutting rule to keep grass crowns and roots healthy\n• Vertical steel perimeter edging along sidewalks, curbs, and garden beds\n• Mulch mowing returning roughly 25% of natural nitrogen to the turf\n• Debris blowoff leaving driveways and patios clear\n• Alternating diamond and diagonal striping patterns\n• Starting from $45 to $65 per visit",
      suggestions: ["Get A Free Quote", "Lawn Aeration", "Pricing & Estimates"],
    };
  }

  // Landscape Design
  if (/design|hardscape|patio|paver|retaining wall|water feature/i.test(query)) {
    return {
      reply: "Our landscape design process includes:\n\n• Architectural site analysis covering slope, sun exposure, and drainage\n• 3D visualizations before breaking ground\n• Hardscaping: natural flagstone walkways, dry-stack retaining walls, fire pits, and paver patios\n• Native drought-tolerant plants and low-voltage LED landscape lighting\n• Water features including waterfalls and stone bubbling urns\n\nWe provide free on-site consultations to walk your space and discuss your layout.",
      suggestions: ["Get A Free Quote", "Contact Information", "Explore Services"],
    };
  }

  // Seasonal cleanup
  if (/clean|cleanup|autumn|fall|spring|leaf|leaves|winteriz/i.test(query)) {
    return {
      reply: "Seasonal cleanups start from $180 and include:\n\n• Fall: Clearing heavy, wet leaf mats to prevent grass rot and spring snow mold; perennial cutbacks while preserving decorative winter bird seed heads; burlap wraps and anti-desiccant spray for tender shrubs\n• Spring: Clearing storm debris, raking winter grit, loosening bed soil, and applying organic pre-emergent weed barriers\n• Drainage grates and swales cleared to prevent standing water",
      suggestions: ["Get A Free Quote", "Pricing & Estimates", "Explore Services"],
    };
  }

  // Pest control
  if (/pest|bug|insect|grub|beetle|tick|mosquito/i.test(query)) {
    return {
      reply: "We use an Integrated Pest Management (IPM) approach:\n\n• Pollinator-safe horticultural oils and neem sprays that do not harm honeybees or butterflies\n• Parasitic nematodes and milky spore targeting Japanese beetle grubs in the soil\n• Bio-fungicides protecting roses and hydrangeas against powdery mildew, black spot, and rust\n• Perimeter cedar and garlic oil misting to deter ticks and mosquitoes from patio areas\n• Tree trunk micro-injections for borers without airborne chemical drift",
      suggestions: ["Get A Free Quote", "Explore Services", "Contact Us"],
    };
  }

  // Business hours (specifically asking about business, operating, or opening hours)
  if (
    /(\b(business\s*hours?|operating\s*hours?|opening\s*hours?|office\s*hours?|what\s+hours|what\s+time\s+do\s+you\s+(open|close)|are\s+you\s+open)\b)|(\bopen\s+on\s+(sunday|saturday|weekends?)\b)/i.test(
      query
    )
  ) {
    return {
      reply: "Business hours:\n• Monday through Saturday: 8:00 AM to 6:00 PM\n• Sunday: Closed, with phone dispatch available for storm damage and tree hazards at +1 (000) 123-4567\n\nYou can request an estimate on the website at any time.",
      suggestions: ["Get A Free Quote", "Contact Us", "Explore Services"],
    };
  }

  // Contact info & location
  if (/contact|phone|email|address|location|where|office|call/i.test(query)) {
    return {
      reply: "Greenly Landscaping contact details:\n• Address: 23 Greenway Street, City Name\n• Phone: +1 (000) 123-4567\n• Email: info@gardencare.com\n• Hours: Monday through Saturday, 8:00 AM to 6:00 PM",
      suggestions: ["Get A Free Quote", "Explore Services", "Pricing & Estimates"],
    };
  }

  // Mission & core values
  if (/mission|values|commitment|drive/i.test(query)) {
    return {
      reply: "Our mission is to deliver high-quality, sustainable gardening and lawn care services that improve outdoor living and bring lasting beauty to every space we serve.\n\nOur foundation rests on three pillars: passion for nature and quality workmanship, dependable service, and reliable communication.",
      suggestions: ["Explore Services", "Meet Our Team", "Get A Free Quote"],
    };
  }

  // About the company
  if (/about|who are you|experience|greenly|prism/i.test(query)) {
    return {
      reply: "Greenly Landscaping has over 10 years of experience serving residential and commercial properties. We have completed over 180 commercial projects, served 820+ clients, and maintain a staff of more than 100 trained gardeners and certified arborists.\n\nOur leadership team includes Evelyn Hayes (Head of Landscaping), Arthur Morales (Senior Horticulturist), Naomi Williams (Certified Arborist), and Jamal Crawford (Regional Sales Director).",
      suggestions: ["Explore Services", "Get A Free Quote", "Pricing & Estimates"],
    };
  }

  // Reviews & testimonials
  if (/review|testimonial|rating|customer|feedback/i.test(query)) {
    return {
      reply: "Our clients rate our service 5 out of 5 stars. Notable feedback:\n\n• Daniel K. (Commercial Property Manager): Reliable punctuality and healthy commercial turf\n• Angela R. (Asset Management Specialist): Clean, consistent neighbourhood curb appeal\n• Jessica P. (Property Investment Advisor): Substantial increase in investment property curb appeal\n• Marcus Vance (Homeowner): Clean precision hedge cuts and spotless debris cleanup\n• Sophia Chen (Landscape Architect): Commended organic mulching and water-saving smart irrigation\n• David Miller (Private Estate Owner): Reliable recurring estate maintenance without hassle",
      suggestions: ["Get A Free Quote", "Explore Services", "Contact Us"],
    };
  }

  // Thanks
  if (/thank|thanks|appreciate/i.test(query)) {
    return {
      reply: "You are welcome. If you need a formal estimate, you can submit a quote request on the site or call +1 (000) 123-4567.",
      suggestions: ["Get A Free Quote", "Explore Services"],
    };
  }

  // General fallback
  return {
    reply: "I can assist with Greenly Landscaping services, pricing estimates, scheduling, lawn care, shrub trimming, irrigation, published blog guides, gallery projects, or emergency storm cleanup. What specific service or question can I help you with?",
    suggestions: ["Explore Services", "Pricing & Estimates", "Get A Free Quote", "Emergency Hotline"],
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const rawMessages: unknown[] = Array.isArray(body?.messages) ? body.messages : [];

    // Filter valid chat messages
    const messages: ChatMessage[] = rawMessages
      .filter((m: unknown): m is ChatMessage => {
        if (!m || typeof m !== "object") return false;
        const candidate = m as { role?: unknown; content?: unknown };
        return (
          typeof candidate.content === "string" &&
          (candidate.role === "user" || candidate.role === "assistant")
        );
      })
      .map((m) => ({
        role: m.role,
        content: m.content.trim(),
      }));

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided in request payload." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // Check API keys
    const geminiKey = process.env.GEMINI_API_KEY?.trim();
    const openaiKey = process.env.OPENAI_API_KEY?.trim();

    // 1. Google Gemini integration with fallback candidate models
    if (geminiKey) {
      // Build Gemini conversation format
      const geminiContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      let hasFoundFirstUser = false;
      for (const msg of messages) {
        if (!hasFoundFirstUser) {
          if (msg.role === "user") {
            hasFoundFirstUser = true;
            geminiContents.push({
              role: "user",
              parts: [{ text: msg.content }],
            });
          }
          continue;
        }

        const role = msg.role === "assistant" ? "model" : "user";
        const lastTurn = geminiContents[geminiContents.length - 1];
        if (lastTurn && lastTurn.role === role) {
          lastTurn.parts[0].text += `\n${msg.content}`;
        } else {
          geminiContents.push({
            role,
            parts: [{ text: msg.content }],
          });
        }
      }

      if (geminiContents.length === 0 && lastUserMessage) {
        geminiContents.push({
          role: "user",
          parts: [{ text: lastUserMessage }],
        });
      }

      // Ordered model candidates: preferred model first, then resilient backups
      const configuredModel = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash-lite";
      const modelCandidates = Array.from(
        new Set([
          configuredModel,
          "gemini-2.5-flash-lite",
          "gemini-flash-latest",
          "gemini-flash-lite-latest",
          "gemini-3.8-flash",
          "gemini-3.5-flash",
        ])
      );

      for (const model of modelCandidates) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": geminiKey,
              },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_PROMPT }],
                },
                contents: geminiContents,
                generationConfig: {
                  temperature: 0.3,
                  maxOutputTokens: 900,
                },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (generatedText) {
              return NextResponse.json({
                reply: generatedText,
                suggestions: getDynamicSuggestions(lastUserMessage, generatedText),
              });
            }
          } else {
            const errBody = await response.text();
            console.warn(`Gemini model ${model} returned ${response.status}:`, errBody);
            // If quota rate-limited (429), break loop immediately so request falls back quickly without extra latency
            if (response.status === 429) {
              break;
            }
          }
        } catch (callErr) {
          console.warn(`Gemini API call to ${model} failed:`, callErr);
        }
      }
    }

    // 2. OpenAI integration (Alternative)
    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...messages,
            ],
            temperature: 0.3,
            max_tokens: 900,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.choices?.[0]?.message?.content?.trim();
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              suggestions: getDynamicSuggestions(lastUserMessage, replyText),
            });
          }
        } else {
          console.warn("OpenAI API non-200 response:", response.status, await response.text());
        }
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to built-in knowledge response:", err);
      }
    }

    // 3. Fallback to built-in domain knowledge response
    const fallbackResponse = generateGreenlyResponse(messages);
    return NextResponse.json(fallbackResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I am having temporary trouble connecting. For immediate service or estimates, call +1 (000) 123-4567 or email info@gardencare.com.",
        suggestions: ["Contact Information", "Explore Services"],
      },
      { status: 500 }
    );
  }
}

const sampleListings = [
  {
    title: "Luxurious Seaside Villa",
    description: "Escape to this stunning seaside villa for a luxurious getaway. Enjoy breathtaking views of the Mediterranean and private beach access.",
    image: {
      url: "https://images.unsplash.com/photo-1582610191340-fa501e6e5040",
      filename: "Seaside_Villa_Spain.jpg"
    },
    price: 2000,
    location: "Costa del Sol",
    country: "Spain",
  },
  {
    title: "Swiss Mountain Retreat",
    description: "Experience serenity in the Swiss Alps with this mountain retreat. Panoramic views, fresh mountain air, and a cozy atmosphere await you.",
    image: {
      url: "https://images.unsplash.com/photo-1661804266944-ce272a0dcdad",
      filename: "Mountain_Retreat_Switzerland.jpg"
    },
    price: 1800,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Urban Chic Penthouse",
    description: "Live in style with this urban chic penthouse. Modern design, city lights, and a central location make this a perfect choice.",
    image: {
      url: "https://images.unsplash.com/photo-1616012760010-8da02da071fd",
      filename: "Urban_Chic_Penthouse.jpg"
    },
    price: 2500,
    location: "Downtown Metropolis",
    country: "United States",
  },
  {
    title: "Historical Manor Escape",
    description: "Transport yourself to the past in this historical manor. Experience elegance and charm surrounded by picturesque English gardens.",
    image: {
      url: "https://images.unsplash.com/photo-1642928755803-b2577a565190",
      filename: "Historical_Manor_England.jpg"
    },
    price: 1500,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Tropical Oasis Villa",
    description: "Discover a tropical oasis with this luxurious villa. Private pool, lush gardens, and tropical vibes create a paradise on earth.",
    image: {
      url: "https://images.unsplash.com/photo-1603034222368-fc53916f4eed",
      filename: "Tropical_Oasis_Villa.jpg"
    },
    price: 2200,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Sunset Beach House",
    description: "Experience breathtaking sunsets at this cozy beach house. Direct beach access and a laid-back atmosphere make it the perfect seaside retreat.",
    image: {
      url: "https://images.unsplash.com/photo-1651213084058-c3420ea21852",
      filename: "Sunset_Beach_House.jpg"
    },
    price: 1200,
    location: "Maui",
    country: "United States",
  },
  {
    title: "Majestic Mountain Lodge",
    description: "Embrace the majesty of the mountains in this spacious lodge. Perfect for outdoor enthusiasts, with hiking trails and scenic views.",
    image: {
      url: "https://images.unsplash.com/photo-1676794944553-399cade9cd39",
      filename: "Mountain_Lodge_Canada.jpg"
    },
    price: 1600,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Sky-High City Loft",
    description: "Live above the city in this sky-high loft. Floor-to-ceiling windows offer panoramic views of the city skyline and modern amenities.",
    image: {
      url: "https://images.unsplash.com/photo-1688653802629-5360086bf632",
      filename: "City_Loft_Skyline.jpg"
    },
    price: 2800,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Italian Countryside Retreat",
    description: "Escape to the tranquility of the Italian countryside in this charming retreat. Rolling hills, vineyards, and authentic Italian charm await.",
    image: {
      url: "https://images.unsplash.com/photo-1692736933760-8a8a9b8c1b6f",
      filename: "Countryside_Retreat_Italy.jpg"
    },
    price: 1900,
    location: "Tuscany",
    country: "Italy",
  },
  {
    title: "Eco-Friendly Treehouse",
    description: "Experience eco-luxury in this unique treehouse. Surrounded by nature, it offers a sustainable and enchanting escape from the everyday.",
    image: {
      url: "https://images.unsplash.com/photo-1693466800653-9eb917c0552e",
      filename: "Eco_Treehouse.jpg"
    },
    price: 1400,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "French Riviera Villa",
    description: "Indulge in elegance on the French Riviera in this luxurious villa. Mediterranean views, a private pool, and stylish interiors await.",
    image: {
      url: "https://images.unsplash.com/photo-1693466800653-9eb917c0552e",
      filename: "Riviera_Villa_France.jpg"
    },
    price: 2300,
    location: "Nice",
    country: "France",
  },
  {
    title: "Modern Lakeside Cabin",
    description: "Experience modern comfort in a rustic setting at this lakeside cabin. Perfect for a peaceful retreat with stunning lake views.",
    image: {
      url: "https://images.unsplash.com/photo-1686769094976-2b48b8a59e82",
      filename: "Modern_Cabin_Lakeside.jpg"
    },
    price: 1100,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "African Safari Lodge",
    description: "Immerse yourself in the wild at this African safari lodge. Stay in luxury tents, go on safari tours, and witness incredible wildlife.",
    image: {
      url: "https://images.unsplash.com/photo-1676794944553-399cade9cd39",
      filename: "Safari_Lodge_Africa.jpg"
    },
    price: 2700,
    location: "Serengeti",
    country: "Tanzania",
  },
  {
    title: "Spanish Colonial Mansion",
    description: "Step back in time with a stay at this Spanish colonial mansion. Architectural beauty, courtyards, and historic charm await you.",
    image: {
      url: "https://images.unsplash.com/photo-1688653802629-5360086bf632",
      filename: "Colonial_Mansion_Spain.jpg"
    },
    price: 2100,
    location: "Seville",
    country: "Spain",
  },
  {
    title: "Coastal Cliff Cottage",
    description: "Perched on a coastal cliff, this cottage offers unrivaled ocean views. Relax to the sound of crashing waves and enjoy coastal serenity.",
    image: {
      url: "https://images.unsplash.com/photo-1693466800653-9eb917c0552e",
      filename: "Cliff_Cottage_Coastal.jpg"
    },
    price: 1700,
    location: "Big Sur",
    country: "United States",
  },
  {
    title: "City Skyscraper Haven",
    description: "Live among the clouds in this city skyscraper haven. Modern luxury, panoramic views, and a central location make it an urban paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1688653802629-5360086bf632",
      filename: "Skyscraper_Haven_City.jpg"
    },
    price: 2600,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Rustic Countryside Cabin",
    description: "Escape to the simplicity of the countryside in this rustic cabin. Surrounded by nature, it offers a cozy retreat from the hustle and bustle.",
    image: {
      url: "https://images.unsplash.com/photo-1661804266944-ce272a0dcdad",
      filename: "Countryside_Cabin_Rustic.jpg"
    },
    price: 1200,
    location: "Provence",
    country: "France",
  },
  {
    title: "Mediterranean Coastal Villa",
    description: "Indulge in Mediterranean luxury at this coastal villa. Blue seas, sunny skies, and elegant architecture create a perfect seaside escape.",
    image: {
      url: "https://images.unsplash.com/photo-1676794944553-399cade9cd39",
      filename: "Coastal_Villa_Mediterranean.jpg"
    },
    price: 2400,
    location: "Amalfi Coast",
    country: "Italy",
  },
  {
    title: "Modern Riverside Residence",
    description: "Enjoy modern living with a riverside view in this contemporary residence. Floor-to-ceiling windows and sleek design make it a waterfront gem.",
    image: {
      url: "https://images.unsplash.com/photo-1642928755803-b2577a565190",
      filename: "Riverside_Residence_Modern.jpg"
    },
    price: 1900,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Island Paradise Bungalow",
    description: "Escape to a tropical island paradise in this charming bungalow. Palm trees, crystal-clear waters, and a serene atmosphere await you.",
    image: {
      url: "https://images.unsplash.com/photo-1651213084058-c3420ea21852",
      filename: "Island_Bungalow_Paradise.jpg"
    },
    price: 1700,
    location: "Maldives",
    country: "Maldives",
  },
];


module.exports = { data: sampleListings };
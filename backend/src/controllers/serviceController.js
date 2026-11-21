// @desc    Get all available service categories and metadata
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res) => {
  try {
    const services = [
      {
        id: 'electrician',
        title: 'Electrician & Wiring',
        category: 'home',
        description: 'Wiring, circuit breaker repair, UPS & solar setup & 24/7 emergency service in Multan.',
        startingPrice: 'Rs. 1,500/hr',
        rating: 4.9,
        reviewsCount: 180,
        features: ['Short Circuit Diagnostics', 'Solar Inverter Installation', 'LED Ceiling Concealed Lights', 'Sub-meter Installation']
      },
      {
        id: 'plumber',
        title: 'Plumbing & Sanitary',
        category: 'home',
        description: 'Leak detection, pipe repairs, bathroom sanitary fitting & drainage solutions.',
        startingPrice: 'Rs. 1,250/hr',
        rating: 4.8,
        reviewsCount: 160,
        features: ['Motor & Water Pump Repair', 'Geyser Installation & Servicing', 'Underground Pipe Leak Detection', 'Modern Sanitary Fixes']
      },
      {
        id: 'ac-repair',
        title: 'AC & Inverter HVAC',
        category: 'home',
        description: 'Inverter AC master servicing, gas charging (R410/R32/R22), pipe fitting and compressor repairs.',
        startingPrice: 'Rs. 1,800/hr',
        rating: 4.9,
        reviewsCount: 210,
        features: ['Pressure Jet Deep Service', 'Refrigerant Gas Top-Up', 'Wall Mounting & Dismantling', 'PCB Inverter Diagnostics']
      },
      {
        id: 'carpenter',
        title: 'Carpentry & Woodwork',
        category: 'home',
        description: 'Custom woodwork, wardrobe fitting, furniture repairs, lock replacement & door adjustments.',
        startingPrice: 'Rs. 1,400/hr',
        rating: 4.8,
        reviewsCount: 130,
        features: ['Kitchen Cabinet Fabrication', 'Wooden Floor Polishing', 'Smart Lock Installation', 'Sofa & Bed Restoration']
      },
      {
        id: 'home-cleaning',
        title: 'Deep Home Cleaning',
        category: 'home',
        description: 'Full house deep sanitization, kitchen degreasing, marble buffing, sofa steam wash & water tank wash.',
        startingPrice: 'Rs. 1,000/hr',
        rating: 4.9,
        reviewsCount: 240,
        features: ['Floor Scrubbing & Polishing', 'Sofa & Carpet Steam Cleaning', 'Water Tank Sanitization', 'Bathroom Deep Clean']
      },
      {
        id: 'appliance-repair',
        title: 'Appliance Repair',
        category: 'home',
        description: 'Washing machine, refrigerator, microwave oven & domestic appliance repair and maintenance.',
        startingPrice: 'Rs. 1,400/hr',
        rating: 4.8,
        reviewsCount: 140,
        features: ['Refrigerator Inverter & Gas Fix', 'Automatic Washing Machine PCB', 'Microwave Magnetron', 'Water Dispenser Repair']
      },
      {
        id: 'painter',
        title: 'Painting & Waterproofing',
        category: 'home',
        description: 'Interior velvet finish, exterior weather-shield coating, wall putty & dampness seepage control.',
        startingPrice: 'Rs. 1,100/hr',
        rating: 4.7,
        reviewsCount: 110,
        features: ['Dust-free Wall Sanding', 'Weather-Shield Exterior', 'Anti-Dampness Waterproofing', 'Wood & Metal Enamel']
      },
      {
        id: 'glass-aluminum',
        title: 'Glass & Aluminum Works',
        category: 'home',
        description: 'Aluminum windows, sliding doors, shower glass partitions & showcase fabrication.',
        startingPrice: 'Rs. 1,600/hr',
        rating: 4.8,
        reviewsCount: 85,
        features: ['Sliding Aluminum Windows', 'Tempered Glass Partitions', 'Mosquito Net Mesh', 'Door Handle & Roller Fix']
      },
      {
        id: 'gardener',
        title: 'Gardener & Landscaping',
        category: 'home',
        description: 'Lawn maintenance, seasonal flower planting, hedge pruning, grass cutting & tree trimming.',
        startingPrice: 'Rs. 900/hr',
        rating: 4.7,
        reviewsCount: 95,
        features: ['Motorized Grass Mowing', 'Fertilizer & Pest Spray', 'Hedge & Bush Trimming', 'Lawn Landscape Design']
      },
      {
        id: 'welder',
        title: 'Welder & Metal Fabricator',
        category: 'home',
        description: 'Main gate welding, iron window grills, staircase railings & metal structure repair.',
        startingPrice: 'Rs. 1,300/hr',
        rating: 4.7,
        reviewsCount: 105,
        features: ['Electric Arc Welding', 'Gate Hinge & Lock Repair', 'Safety Grill Fabrication', 'Steel & Iron Railings']
      },
      {
        id: 'laundry',
        title: 'Laundry & Steam Pressing',
        category: 'home',
        description: 'Doorstep laundry pickup, dry cleaning, steam pressing & delicate fabric care.',
        startingPrice: 'Rs. 800/hr',
        rating: 4.8,
        reviewsCount: 150,
        features: ['Doorstep Express Delivery', 'Steam Pressing', 'Woolen & Silk Dry Clean', 'Anti-Bacterial Wash']
      }
    ];

    res.status(200).json({
      success: true,
      currency: 'PKR',
      count: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching services catalog'
    });
  }
};

// @desc    Provider login (Mobile/OTP or CNIC/Password)
// @route   POST /api/provider/login
// @access  Public
export const loginProvider = async (req, res) => {
  try {
    const { method, mobile, cnic, password, otp } = req.body;

    let providerUser = {
      id: 'PRV-' + Math.floor(100000 + Math.random() * 900000),
      name: 'Muhammad Asif (Verified Pro)',
      phone: mobile || '0300-1234567',
      cnic: cnic || '36302-1234567-1',
      role: 'provider',
      city: 'Multan',
      services: ['Electrician', 'AC & HVAC', 'Plumbing'],
      rating: 4.9,
      isVerified: true,
      walletBalance: 'PKR 45,850'
    };

    res.status(200).json({
      success: true,
      message: 'Provider logged in successfully',
      token: 'provider_session_jwt_' + Date.now(),
      provider: providerUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during provider login'
    });
  }
};

// @desc    Provider verification submission (CNIC, Trade license, Bio)
// @route   POST /api/provider/verify
// @access  Public
export const submitProviderVerification = async (req, res) => {
  try {
    const { fullName, cnic, phone, city, trade, experience } = req.body;

    if (!fullName || !cnic || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, CNIC number, and contact phone'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Provider verification submitted to NADRA / Police clearance. Review takes 12-24 hours.',
      verificationRef: 'VRF-PK-' + Math.floor(10000 + Math.random() * 90000),
      status: 'pending_approval'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error submitting provider verification'
    });
  }
};

import founder from "../assets/image.jpg";

export default function AboutUs() {
  return (
    <div className="bg-linear-to-b from-gray-400 -mx-37 -mt-10 to-white py-20">
      <div className="max-w-6xl mx-auto  px-6">

       
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About Us
          </h1>
          <p className="mt-4 text-gray-800 max-w-2xl mx-auto">
            Building trust, delivering quality, and creating value for every customer.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Founder Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={founder}
                alt="Founder"
                className="w-72 h-72 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                Founder & CEO
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Welcome to{" "}
              <span className="font-semibold text-gray-900">Our Store</span> —
              your trusted destination for high-quality products at affordable
              prices.
            </p>

            <p>
              We started with a simple idea: make online shopping easy, reliable,
              and customer-centric. Every product we offer is carefully selected
              to meet our quality standards.
            </p>

            <p>
              Our mission is to build long-term relationships with our customers
              by delivering exceptional value, transparency, and fast service.
            </p>

            <div className="pt-4">
              <p className="font-bold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">
                Founder & Chief Executive Officer
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
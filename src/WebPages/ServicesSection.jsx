export default function ServicesSection() {
  return (
    <section className="w-full bg-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Main Service
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>cooking</li>
              <li>Lighting & Production</li>
              <li>Music & Entertainment</li>
              <li>Catering & Cuisines</li>
              <li>Decoration</li>
              <li>Gift & Giveaways</li>
              <li>Tents</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Extended Service
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>Mehendi</li>
              <li>Wedding Invitations</li>
              <li>Giveaways & Gifts</li>
              <li>Photography & Video</li>
              
              <li>Hospitality</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Wedding Service
            </h3>
            <ul className="space-y-3 text-gray-700">
              
              <li>Stage Design & Production</li>
              <li>Structures & Special Tents</li>
              
              <li>Wedding Budget Management</li>
              
              
              <li>Floral Design & Decor</li>
              <li>Event Design Production</li>
              <li>Entertainment for all Functions</li>
              <li>Sound & Lighting Design</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

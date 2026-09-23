import Link from "next/link";
import RoomBookingForm from "@/components/RoomBookingForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";

type RoomType = {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  capacity: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
};

const DEFAULT_ROOMS: RoomType[] = [
  {
    _id: "default-1",
    name: "The Heritage Suite",
    slug: "the-heritage-suite",
    tagline: "Unmatched Luxury",
    description:
      "Our Heritage Suites are designed with an elegant touch of Odia art and modern minimalist furniture. Enjoy a king-sized bed, premium linen, and an en-suite bathroom equipped with luxury amenities.",
    pricePerNight: 4500,
    capacity: "2 Guests",
    amenities: [
      "High-Speed Wi-Fi",
      "Central Air Conditioning",
      "24/7 Room Service",
      "Smart TV & Entertainment",
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    ],
    isAvailable: true,
  },
  {
    _id: "default-2",
    name: "The Classic Room",
    slug: "the-classic-room",
    tagline: "Comfortable Elegance",
    description:
      "Perfect for business travelers and couples. The Classic Room offers a serene environment with thoughtful touches to ensure a restful night's sleep.",
    pricePerNight: 3000,
    capacity: "2 Guests",
    amenities: [
      "High-Speed Wi-Fi",
      "Central Air Conditioning",
      "In-room Coffee Maker",
    ],
    images: [
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800",
    ],
    isAvailable: true,
  },
];

async function getRooms(): Promise<RoomType[]> {
  try {
    const res = await fetch(`${API_URL}/api/rooms`, {
      cache: "no-store",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    if (!res.ok) throw new Error("Failed to fetch rooms");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn("Could not fetch live rooms on server, using fallback data:", err);
  }
  return DEFAULT_ROOMS;
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  // Extract gallery images from rooms or use fallback
  const allGalleryImages = rooms.flatMap((r) => r.images || []).filter(Boolean);
  const galleryImages =
    allGalleryImages.length >= 3
      ? allGalleryImages.slice(0, 6)
      : [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800",
        ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Cinematic shot of luxury hotel room"
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2000"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(43,30,26,0.65), rgba(43,30,26,0.45))" }}
          ></div>
        </div>
        <div className="relative z-20 text-center px-6">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em] uppercase">
            Boutique Stay
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-light mb-6">
            Premium AC Rooms
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-text-light/80">
            Experience luxury and comfort right in the heart of Bhubaneswar.
          </p>
        </div>
      </section>

      {/* Room Showcase (Dynamic from Server) */}
      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background">
        <div className="space-y-24">
          {rooms.map((room, idx) => {
            const isEven = idx % 2 === 1;
            const primaryImage =
              room.images && room.images.length > 0
                ? room.images[0]
                : "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200";

            return (
              <div
                key={room._id}
                className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              >
                <div
                  className={`relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl ${
                    isEven ? "order-1 md:order-2" : ""
                  }`}
                >
                  <img
                    className="w-full h-full object-cover gallery-img"
                    src={primaryImage}
                    alt={room.name}
                  />
                  {!room.isAvailable && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white text-xs font-label-caps uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                      Currently Unavailable
                    </div>
                  )}
                </div>

                <div className={isEven ? "order-2 md:order-1" : ""}>
                  {room.tagline && (
                    <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest uppercase">
                      {room.tagline}
                    </span>
                  )}
                  <h2 className="font-headline-md text-headline-md text-text-main mb-6">
                    {room.name}
                  </h2>
                  <p className="font-body-lg text-text-secondary mb-8">
                    {room.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {room.amenities &&
                      room.amenities.map((amenity, aIdx) => (
                        <li
                          key={aIdx}
                          className="flex items-center gap-3 text-text-main font-body-md"
                        >
                          <span className="material-symbols-outlined text-primary-dark">
                            check_circle
                          </span>
                          {amenity}
                        </li>
                      ))}
                  </ul>

                  <div className="text-3xl font-headline-md text-primary-dark mb-8">
                    ₹{room.pricePerNight?.toLocaleString("en-IN")}{" "}
                    <span className="text-lg font-body-md text-text-secondary">
                      / night
                    </span>
                  </div>

                  <a href="#book-room">
                    <button className="btn-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest w-full md:w-auto">
                      Check Availability
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Room Booking Form */}
      <section
        id="book-room"
        className="py-16 md:py-section-gap bg-surface-dark text-text-light relative overflow-hidden scroll-mt-24"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center px-margin-mobile">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-widest uppercase">
            Reservations
          </span>
          <h2 className="font-headline-md text-headline-md text-text-light mb-8">
            Book Your Stay
          </h2>
          <p className="font-body-lg text-text-light/80 mb-12 max-w-2xl mx-auto">
            Plan your visit to Royal Odisha Boutique Stay. Please select your dates and room preference below.
          </p>
          <RoomBookingForm />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary mb-4 block uppercase tracking-widest">
              VISUAL JOURNEY
            </span>
            <h2 className="font-headline-md text-headline-md text-text-main">Room Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {galleryImages.map((imgUrl, gIdx) => (
              <img
                key={gIdx}
                className="rounded-xl w-full h-[300px] object-cover gallery-img shadow-lg"
                alt={`Room gallery ${gIdx + 1}`}
                src={imgUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

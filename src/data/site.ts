// Content source of truth. Room prices come from the project brief, not the mockup.

export const img = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=80`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroSlides = [
  { src: img("1506905925346-21bda4d32df4", 2200), alt: "Snow-capped Himalayan peaks rising above a sea of clouds at sunrise" },
  { src: img("1454496522488-7a8e488e8606", 2200), alt: "A towering snow peak above a forested Himalayan valley" },
  { src: img("1449844908441-8829872d2607", 2200), alt: "A wooden mountain lodge among tall trees in soft morning light" },
];

export const photos = {
  welcome: { src: img("1596394516093-501ba68a0ba6", 1200), alt: "A wooden deck with a bed facing a mountain lake and peaks" },
  cabin: { src: img("1542718610-a1d656d1884c", 1400), alt: "A small wooden cabin on a hillside at golden hour" },
  lakeLodge: { src: img("1470770841072-f978cf4d019e", 2200), alt: "A wooden lodge on a still mountain lake beneath forested peaks" },
  valley: { src: img("1464822759023-fed622ff2c3b", 2200), alt: "Morning light over pine forest and distant mountains" },
  snowTrek: { src: img("1626621341517-bbf3d9990a23", 2200), alt: "Trekkers on a snowy Himalayan ridge" },
  thali: { src: img("1567337710282-00832b415979", 1400), alt: "A traditional thali with dal, curries and flatbread" },
  curry: { src: img("1585937421612-70a008356fbe", 900), alt: "Bowls of slow-cooked curry" },
  naan: { src: img("1565557623262-b51c2513a641", 900), alt: "Butter naan with a rich curry" },
  samosa: { src: img("1601050690597-df0568f70950", 900), alt: "Crisp samosas served with green chilli" },
  stars: { src: img("1519681393784-d120267933ba", 2200), alt: "The Milky Way over snow peaks, as seen from the upper deck on a clear night" },
  lake: { src: img("1501785888041-af3ef285b470", 2200), alt: "A still glacial lake below forested mountains" },
  fire: { src: img("1478131143081-80f7f84ca84d", 2200), alt: "Guests around the evening fire under the pines" },
  tent: { src: img("1504280390367-361c6d9f38f4", 2200), alt: "Morning view of the forest from inside a camping tent" },
  roomLamp: { src: img("1618773928121-c32242e63f39", 2200), alt: "A turned-down bed with warm bedside lamps" },
};

export type RoomId = "deluxe" | "suite" | "family";

export const rooms: {
  id: RoomId; name: string; price: number; short: string; long: string;
  chips: string[]; amenities: string[]; size: string; guests: string;
  image: { src: string; alt: string };
}[] = [
  {
    id: "deluxe", name: "Deluxe Mountain View Room", price: 5500,
    short: "East-facing balcony onto the Pir Panjal snow line. King bed, rain shower, cedar-panelled walls.",
    long: "Wake up to the Pir Panjal range from your own balcony. Cedar panelling, wool throws and a deep window seat make this the room guests ask for again.",
    chips: ["Mountain view", "Balcony", "King bed"],
    amenities: ["King bed with wool throws", "Private balcony", "Rain shower", "Tea and coffee tray", "Work desk", "Room heater"],
    size: "320 sq ft", guests: "2 adults",
    image: { src: img("1611892440504-42a792e24d32", 1400), alt: "Deluxe room with warm wood panelling and a large bed" },
  },
  {
    id: "suite", name: "Premium Valley Suite", price: 8000,
    short: "Corner suite with floor-to-ceiling glass over the Beas valley, a sitting room and a soaking tub.",
    long: "Floor-to-ceiling windows frame the valley from morning mist to evening light. A separate sitting room and a soaking tub make it easy to stay in.",
    chips: ["Valley view", "Sitting area", "Bathtub"],
    amenities: ["King bed", "Separate sitting room", "Soaking bathtub", "Valley-facing windows", "Mini fridge", "Fireplace heater"],
    size: "480 sq ft", guests: "2 adults, 1 child",
    image: { src: img("1582719478250-c89cae4dc85b", 1400), alt: "Suite with wide windows, wooden floors and soft linen" },
  },
  {
    id: "family", name: "Cedar Family Room", price: 10000,
    short: "Two bedrooms around a shared living room that opens onto the garden. Sleeps four.",
    long: "Two connected bedrooms around a shared living space, with room for board games, muddy boots and late-night hot chocolate.",
    chips: ["2 bedrooms", "Living area", "Sleeps 4"],
    amenities: ["Two bedrooms", "Shared living area", "Two bathrooms", "Garden-facing sit-out", "Board games", "Extra bedding on request"],
    size: "650 sq ft", guests: "4 guests",
    image: { src: img("1590490360182-c33d57733427", 1400), alt: "Spacious family room with a sofa and a large bed" },
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const menu = [
  {
    id: "breakfast", label: "Breakfast",
    items: [
      ["Aloo Paratha", "Stuffed flatbread with white butter and fresh curd."],
      ["Himalayan Muesli Bowl", "Apple, walnut and local honey."],
      ["Masala Omelette", "With toasted sourdough and mint chutney."],
      ["Orchard Fruit Plate", "Seasonal fruit from Kullu valley farms."],
    ],
  },
  {
    id: "specialties", label: "Himalayan Specialties",
    items: [
      ["Siddu", "Steamed wheat bread with a walnut and poppy seed filling."],
      ["Chha Gosht", "Tender lamb in a gently spiced yoghurt gravy."],
      ["Rajma Chawal", "Red kidney beans, slow-cooked the mountain way."],
      ["Dham-inspired Thali", "A festive Himachali platter with madra and rice."],
    ],
  },
  {
    id: "continental", label: "Continental",
    items: [
      ["Himalayan Trout", "Pan-seared, with lemon butter and garden greens."],
      ["Wild Mushroom Soup", "Forest mushrooms, thyme and fresh cream."],
      ["Wood-fired Vegetable Pasta", "Roasted seasonal vegetables and olive oil."],
    ],
  },
  {
    id: "beverages", label: "Beverages",
    items: [
      ["Kashmiri Kahwa", "Green tea with saffron, cardamom and almond."],
      ["Orchard Apple Cider", "Pressed from Kullu valley apples."],
      ["Fireside Masala Chai", "Slow-brewed with ginger and spices."],
    ],
  },
] as const;

export const signatureDishes = [
  { name: "Dham-inspired Thali", note: "A festive Himachali spread, served on Sundays.", ...photos.thali },
  { name: "Chha Gosht", note: "Lamb in yoghurt gravy, a Kangra favourite.", ...photos.curry },
  { name: "Madra with Tandoori Roti", note: "Chickpeas simmered in spiced curd.", ...photos.naan },
  { name: "Evening Tea Plate", note: "Samosas and chutney by the fire.", ...photos.samosa },
];

export const experiences = [
  { title: "Mountain Treks", meta: "Full day, moderate", text: "Guided day hikes to Jogini Falls, Hampta and beyond.", src: img("1551632811-561732d1e306", 900), alt: "Two hikers with backpacks on a mountain trail" },
  { title: "Bonfire Evenings", meta: "October to March, after dinner", text: "Stories, music and stars around the fire.", src: img("1478131143081-80f7f84ca84d", 900), alt: "Friends gathered around a campfire in the forest at night" },
  { title: "Sunrise Walks", meta: "6:00 AM, 90 minutes, easy", text: "Quiet morning trails as the peaks catch the light.", src: img("1464822759023-fed622ff2c3b", 900), alt: "Morning light over pine forest and distant mountains" },
  { title: "Yoga & Wellness", meta: "Daily at 7:30 AM, all levels", text: "Morning sessions on the deck, facing the mountains.", src: img("1544367567-0f2fcb009e0b", 900), alt: "A person practising yoga against a soft dawn sky" },
  { title: "Village Walks", meta: "Half day, easy", text: "Old Manali, apple orchards and the Beas river trail.", src: img("1609920658906-8223bd289001", 900), alt: "A clear mountain river flowing through a pine forest" },
  { title: "Sightseeing", meta: "Full day, by car", text: "Solang Valley, Hadimba Temple and the Atal Tunnel.", src: img("1626621341517-bbf3d9990a23", 900), alt: "Trekkers on a snowy Himalayan ridge" },
];

export type GalleryCat = "hotel" | "rooms" | "dining" | "experiences" | "nature";

export const gallery: { cat: GalleryCat; id: string; w: number; h: number; alt: string }[] = [
  { cat: "hotel", id: "1449844908441-8829872d2607", w: 800, h: 1000, alt: "The lodge framed by tall trees" },
  { cat: "nature", id: "1501785888041-af3ef285b470", w: 800, h: 540, alt: "A calm lake beneath forested mountains" },
  { cat: "rooms", id: "1618773928121-c32242e63f39", w: 800, h: 600, alt: "A neatly made bed with warm bedside lamps" },
  { cat: "dining", id: "1565557623262-b51c2513a641", w: 800, h: 800, alt: "Butter naan with a rich curry" },
  { cat: "nature", id: "1519681393784-d120267933ba", w: 800, h: 1000, alt: "The Milky Way above snowy peaks" },
  { cat: "hotel", id: "1542718610-a1d656d1884c", w: 800, h: 540, alt: "A wooden cabin glowing at sunset" },
  { cat: "experiences", id: "1504280390367-361c6d9f38f4", w: 800, h: 600, alt: "View of the forest from inside a tent" },
  { cat: "rooms", id: "1540518614846-7eded433c457", w: 800, h: 800, alt: "A bright bedroom with soft bedding" },
  { cat: "experiences", id: "1517824806704-9040b037703b", w: 800, h: 540, alt: "A tent under a starry night sky" },
  { cat: "dining", id: "1567337710282-00832b415979", w: 800, h: 1000, alt: "A traditional Himachali thali" },
  { cat: "nature", id: "1470770841072-f978cf4d019e", w: 800, h: 600, alt: "A lodge on a still mountain lake" },
  { cat: "experiences", id: "1551632811-561732d1e306", w: 800, h: 800, alt: "Hikers on a high mountain trail" },
];

export const contact = {
  address: "Old Manali Road, Manali, Himachal Pradesh 175131",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "stay@thecedarhaven.com",
  reception: "Open 24 hours",
  restaurant: "7:00 AM to 10:30 PM",
};

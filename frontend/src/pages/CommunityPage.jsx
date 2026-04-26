const items = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    likes: 3,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    likes: 1,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop",
    likes: 7,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop",
    likes: 2,
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-slate-100 rounded-2xl p-4">
      <h2 className="text-3xl font-bold mb-4">Creations</h2>

      <div className="bg-white rounded-2xl p-4 h-[75vh] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden border bg-slate-50"
            >
              <img
                src={item.image}
                alt="creation"
                className="w-full h-72 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/45 text-white text-sm px-2 py-1 rounded-lg">
                {item.likes} ♡
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
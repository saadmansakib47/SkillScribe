import Image from 'next/image';

export default function Categories() {
  const items = [
    {
      title: 'Programming',
      subtitle: 'Want to view the courses?',
      count: 44,
      img: '/Asset/programming.png',
    },
    {
      title: 'Speaking English',
      subtitle: 'Want to view the courses?',
      count: 37,
      img: '/Asset/english.png',
    },
    {
      title: 'Web Development',
      subtitle: 'Want to view the courses?',
      count: 64,
      img: '/Asset/webdev.jpg',
    },
    {
      title: 'Math',
      subtitle: 'Want to view the courses?',
      count: 27,
      img: '/Asset/math.jpg',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F3]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-black">Explore by Category</h2>
          <p className="mt-2 text-lg text-black">Find the perfect course for your learning goals.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-black">{it.title}</h3>
                <p className="mt-2 text-sm text-black">{it.subtitle}</p>
                <p className="mt-2 text-sm text-black font-medium">{it.count} courses</p>

                <a
                  href="#"
                  className="mt-4 inline-block px-5 py-2 border border-gray-300 rounded-[10px] shadow-sm text-black transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

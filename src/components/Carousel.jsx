import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";

export default function Gallery() {
  const photos = [
    {
      image: photo2,
      text: "公司成員合照",
    },
    {
      image: photo3,
      text: "2024 MAIC 與組員作品前合照",
    },
    {
      image: photo1,
      text: "大學遊戲開發社擔任遊戲美術講師",
    },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.text} className="flex flex-col gap-3 pb-12 lg:pb-0">
            <img
              src={photo.image}
              draggable={false}
              className="aspect-square w-full select-none rounded object-cover"
              alt={photo.text}
            />

            <p className="mt-2 text-zinc-400">{photo.text}</p>
          </div>
        ))}
      </div>

      {/* Mobile */}
      {/*
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((photo) => (
            <div
              key={photo.text}
              className="flex w-[85vw] shrink-0 snap-center flex-col gap-3"
            >
              <img
                src={photo.image}
                draggable={false}
                className="aspect-square w-full select-none rounded object-cover"
                alt={photo.text}
              />

              <p className="mt-2 text-zinc-400">{photo.text}</p>
            </div>
          ))}
        </div>
      </div>
      */}
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

export function Gallery({
  images,
}: {
  images: {
    url: string;
    name: string;
    id: number;
  }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                className="h-auto w-48"
                width="192"
                height="192"
                alt={image.name}
              />
            </Link>
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

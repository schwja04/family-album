import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://qy6ueymmx5.ufs.sh/f/qDkQHxju96HhNzHJXNGlRuqt0PQSD9CMcUaGAXsrokYHjy2V",
  "https://qy6ueymmx5.ufs.sh/f/qDkQHxju96Hhx6ZGFqTNUtalV3Fb1ciWk9HsPT72wLE6IyfB",
  "https://qy6ueymmx5.ufs.sh/f/qDkQHxju96Hhf0GGFPybBhJLpuqiHbAznlWYxFG0y9wam5R1"
];

const mockImages = [...mockUrls, ...mockUrls, ...mockUrls].map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}

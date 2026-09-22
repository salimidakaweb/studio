"use client";

import { useState } from "react";
import { GalleryAlbum } from "@/lib/Gallery";
import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";

type GalleryGridProps = {
  albums: GalleryAlbum[];
};

export default function GalleryGrid({ albums }: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryAlbum | null>(null);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album, index) => (
          <li key={album.id}>
            <GalleryCard
              album={album}
              priority={index < 3}
              onOpen={() => setSelected(album)}
            />
          </li>
        ))}
      </ul>

      <GalleryModal album={selected} onClose={() => setSelected(null)} />
    </>
  );
}

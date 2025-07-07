import React from "react";

export default function CardVideo({ title, embedSrc }) {
  return (
    <div className="card-video">
      <div className="embed">
        <iframe
          loading="lazy"
          width="560"
          height="315"
          src={embedSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="title line-clamp-3">{title}</h3>
    </div>
  );
}

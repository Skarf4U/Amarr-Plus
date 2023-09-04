import { Link } from "react-router-dom";
import { EpisodeProps } from "../types/Media";

interface EpisodeCardProps {
  id: string;
  number: string | number;
  season: number;
  maxSeasons: number;
  maxEpisodes: number;
  image: string;
  title: string;
  runtime: number;
}

interface EpisodesSectionProps {
  id: string;
  season: number;
  setSeason: (value: number) => void;
  seasons: number;
  episodes: EpisodeProps[] | null;
}

function EpisodeHolder() {
  return (
    <div className="card">
      <div className="image">
        <img style={{ border: 0 }} />
      </div>
    </div>
  );
}

function EpisodeCard({
  id,
  number,
  season,
  maxSeasons,
  maxEpisodes,
  image,
  title,
  runtime,
}: EpisodeCardProps) {
  return (
    <Link
      className="card"
      to={`/player/${id}?s=${season}&e=${number}&ms=${maxSeasons}&me=${maxEpisodes}`}
    >
      <div className="image">
        <img src={image} alt="" />

        <button>
          <i className="fa-solid fa-play"></i>
        </button>
      </div>

      <p className="title">
        {number}. {title} ({runtime}m)
      </p>
    </Link>
  );
}

export default function EpisodesSection({
  id,
  season,
  setSeason,
  seasons,
  episodes,
}: EpisodesSectionProps) {
  return (
    <div className="media-episodes">
      <div className="row">
        {seasons > 1 && (
          <div className="nfDropDown theme-lakira">
            <select
              value={season}
              onChange={(e) => setSeason(parseInt(e.target.value, 10))}
              className="season-selector"
            >
              {[...Array(seasons)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Season {i + 1}
                </option>
              ))}
            </select>
            <span className="arrow"></span>
          </div>
        )}
      </div>

      <div className="row cards">
        {episodes ? (
          episodes.map((v, i) => {
            return (
              <EpisodeCard
                key={i}
                id={id}
                number={v.number}
                season={season}
                maxSeasons={seasons}
                maxEpisodes={episodes.length}
                runtime={v.runtime}
                title={v.title}
                image={v.image}
              />
            );
          })
        ) : (
          <EpisodeHolder />
        )}
      </div>
    </div>
  );
}

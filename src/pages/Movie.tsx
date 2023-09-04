import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";

import conf from "../config";

import { MovieProps } from "../types/Media";

import loadImg from "../functions/loadImg";
import toHM from "../functions/toHM";
import toYear from "../functions/toYear";

import MediaBackground from "../components/MediaBackground";
import MediaTabs from "../components/MediaTabs";
import PosterSection from "../components/PosterSection";

import Loading from "./Loading";
import { Helmet } from "react-helmet";

export default function Movie() {
  const nav = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<MovieProps | null>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  async function loadData() {
    setData(null);
    setLoaded(false);

    const req = await fetch(`${conf.RIPPER_API}/v3/movie/${id}`);
    const res = await req.json();

    if (!("success" in res)) {
      nav("/unavailable");
      return;
    }

    const nData: MovieProps = res.data;

    await loadImg(nData.images.backdrop);
    await loadImg(nData.images.logo);

    setData(res.data);
    setLoaded(true);
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (!loaded) {
    return <Loading />;
  }

  if (!data) {
    return <Navigate to="/unavailable" />;
  }

  async function fetchTrailerUrl(movie_id: number) {
    try {
      const response = await fetch(
        `${conf.TMDB_API}/movie/${movie_id}/videos?api_key=${conf.TMDB_API_KEY}`
      );
      const data = await response.json();

      // Find the trailer video (assuming the type is 'Trailer')
      const trailer = data.results.find(
        (video: any) => video.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        // Handle the case when no trailer is found
        console.error("No trailer found for this movie.");
      }
    } catch (error) {
      // Handle errors from the API request
      console.error("Error fetching trailer:", error);
    }
    
  }
  return (
    <Fragment>
      <Helmet>
        <title>
          {data.title} - {conf.SITE_TITLE}
        </title>
      </Helmet>

      <MediaBackground backdrop={data.images.backdrop} />

      <div className="media-content">
        <div className="media-logo">
          <img
            src={data.images.logo}
            title={data.title}
            alt={data.title}
            draggable="false"
          />
        </div>

        <div className="media-main">
          {data.tagline && <p className="media-tagline">{data.tagline}</p>}

          <div className="media-meta">
            <div className="media-genres">
              {data.genres.length ? (
                data.genres.map((v, i) => <span key={i}>{v}</span>)
              ) : (
                <span>Movie</span>
              )}
            </div>

            <div className="media-details">
              <p>{toYear(data.date)}</p>
              <p>{toHM(data.runtime)}</p>
            </div>
          </div>

          <div className="media-actions">
            <Link to={`/player/${data.id}`}>
              <button className="primary">
                <i className="fa-solid fa-play"></i>
                <p>Play</p>
              </button>
            </Link>

            <Link to={`${trailerUrl}`} target="_blank" className="ml-1">
              <button className="color-secondary hasLabel hasIcon ltr-18ezbm2">
                <img src="https://img.icons8.com/?size=128&id=cNMNq8cRJsIK&format=png&color=FFFFFF" alt="" width="24px"/>
                <p>Trailer</p>
              </button>
            </Link>

          </div>

          <p className="media-description">{data.description}</p>
        </div>
      </div>

      <MediaTabs
        tabs={[
          {
            title: "Suggested",
            element: <PosterSection posters={data.suggested} />,
          },
        ]}
      />
    </Fragment>
  );
}

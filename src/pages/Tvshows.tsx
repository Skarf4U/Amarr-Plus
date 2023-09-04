import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import conf from "../config";
import PosterOptions from "../types/PosterOptions";

export default function TVShows() {
  const [query, setQuery] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [results, setResults] = useState<PosterOptions[] | null>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>();
  const [page, setPage] = useState(1); // Initialize with page 1

  async function loadResults() {
    try {
      let apiUrl = `${conf.TMDB_API}/discover/tv?api_key=${conf.TMDB_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

      if (selectedGenre) {
        // Fetch genre ID from TMDB using the genre name
        const genreReq = await fetch(
          `${conf.TMDB_API}/genre/tv/list?api_key=${conf.TMDB_API_KEY}`
        );
        const genreRes = await genreReq.json();
        const genreId = (
          genreRes as { genres: { id: number; name: string }[] }
        ).genres.find((genre) => genre.name === selectedGenre)?.id;

        if (genreId) {
          apiUrl += `&with_genres=${genreId}`;
        }
      }

      if (query) {
        apiUrl += `&query=${query}`;
      }

      const req = await fetch(apiUrl);
      const res = await req.json();

      if ("errors" in res) {
        setError(res.errors[0].message);
        setResults(null);
      } else if ("results" in res) {
        setError(null);
        // Append new results to the existing results
        setResults((prevResults) => [...prevResults, ...res.results]);
      } else {
        setError("An unexpected response was received.");
        setResults(null);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setResults(null);
    }
  }

  // Load more results when the "Load More" button is clicked
  const handleLoadMore = () => {
    // Increment the page number and reload results
    setPage((prevPage) => prevPage + 1);
    loadResults(); // Ensure that the results match the selected genre
  };

  useEffect(() => {
    // Reset the results when a new genre is selected
    setResults([]);
    setPage(1); // Reset the page number
    loadResults();
  }, [selectedGenre]);

  return (
    <Fragment>
      <Helmet>
        <title>
          {"TV Shows"} - {conf.SITE_TITLE}
        </title>
      </Helmet>

      <div className="sub-header">
        <div>
          <div className="sub-header-wrapper">
            <div className="aro-gallery-header">
              <div className="title"></div>
              <div className="aro-genre-details">
                <span className="genreTitle">TV Shows</span>
                <div className="subgenres">
                  <div className="ptrack-container">
                    <div
                      className="ptrack-content"
                      data-ui-tracking-context="%7B%22appView%22:%22categorySelector%22,%22usePresentedEvent%22:true%7D"
                      data-tracking-uuid="0103ffe7-7f3f-4a6a-b322-fb765148672f"
                    >
                      <div className="nfDropDown theme-lakira">
                        <select
                          value={selectedGenre || ""}
                          onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                          <option value="All Genres">All Genres</option>
                          <option value="Action & Adventure">
                            Action & Adventure
                          </option>
                          <option value="Animation">Animation</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Crime">Crime</option>
                          <option value="Documentary">Documentary</option>
                          <option value="Drama">Drama</option>
                          <option value="Family">Family</option>
                          <option value="Kids">Kids</option>
                          <option value="Mystery">Mystery</option>
                          <option value="News">News</option>
                          <option value="Reality">Reality</option>
                          <option value="Sci-Fi & Fantasy">
                            Sci-Fi & Fantasy
                          </option>
                          <option value="Soap">Soap</option>
                          <option value="Talk">Talk</option>
                          <option value="War & Politics">War & Politics</option>
                          <option value="Western">Western</option>
                        </select>
                        <span className="arrow"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="search-center">
          <i className="fa-solid fa-warning warning"></i>
          <p>{error}</p>
        </div>
      ) : results && results.length ? (
        <Fragment>
          <p className="search-title">Results for {selectedGenre}</p>

          <div className="search-results">
            {results.map((v, i) => {
              return (
                <Link
                  className="poster"
                  key={i}
                  title={v.title}
                  to={`/tv-show/${v.id}`} // Use a proper URL path based on your routing setup
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w300${v.poster_path}')`,
                  }}
                ></Link>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="load-more">
            <button
              onClick={handleLoadMore}
              className="color-secondary hasLabel hasIcon ltr-18ezbm2"
              data-uia="billboard-more-info"
              type="button"
            >
              <div className="ltr-1st24vv">
                <div className="medium ltr-iyulz3" role="presentation">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#fff"
                    height="24px"
                    width="24px"
                    version="1.1"
                    className="ltr-0 e1mhci4z1"
                    id="Layer_1"
                    viewBox="0 0 367.136 367.136"
                    xml:space="preserve"
                  >
                    <path d="M336.954,87.494C318.821,59.1,293.251,36.318,263.01,21.613l-13.119,26.979c52.77,25.661,85.551,78.029,85.551,136.669  c0,83.744-68.131,151.874-151.874,151.874S31.694,269.005,31.694,185.262c0-49.847,24.899-96.439,65.042-124.571L149.7,113.91V0  H36.335l38.953,39.14C57.727,52.164,42.557,68.287,30.582,86.871c-18.898,29.33-28.888,63.352-28.888,98.391  c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874C365.442,150.485,355.59,116.678,336.954,87.494z" />
                  </svg>
                </div>
              </div>
              <div className="ltr-1npqywr"></div>
              <span className="ltr-1vh9doa">Load More</span>
            </button>
          </div>
        </Fragment>
      ) : (
        <div className="search-center">
          <i className="fa-solid fa-camera-movie"></i>
          <p>Search for TV shows</p>
        </div>
      )}
    </Fragment>
  );
}

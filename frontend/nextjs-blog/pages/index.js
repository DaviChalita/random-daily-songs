import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const data = await fetch("http://127.0.0.1:105/random-daily-songs/get");
  const genres = await data.json();

  return {
    props: { genres },
  };
}

export default function Home({genres}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Daily Songs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
         <a>GET A RANDOM SONG EVERY DAY!</a>
        </h1>

        <div className={styles.grid}>
          {genres.map((genre) => (            
          <a className={styles.card} key={genre.genre_track} href={genre.song_track}>{genre.genre_track.toUpperCase()}</a>
          ))}
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/DaviChalita"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img alt="GITHUB" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 2px solid black;
          display: flex;
          background-color: #245599;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
            
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

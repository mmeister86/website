import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="content-wrap">
      <div className="content">
        <Image
          className="profile-image rounded"
          src="/images/matthias.jpg"
          alt="so sieht matthias aus. manchmal."
          width={200}
          height={200}
        />

        <h1>
          Hi, i&apos;m Matthias.
          <br />I build apps for the web.
        </h1>

        <p>
          Building simple and beautiful things for complex interfaces is what I
          enjoy most about my work. <br/>
          I am also interested in crafting beautiful minimal products and exploring new worlds.
        </p>

        <p>
          I am sometimes
          <Link
            className="link-1"
            href="https://twitter.com/matthiascodes"
            target="_blank"
          >
            tweeting
          </Link>, taking
          <Link
            className="link-1"
            href="https://www.instagram.com/dermeisterfotograf/"
            target="_blank"
          >
            photos
          </Link>
          and writing
          <Link 
            className="link-1" 
            href="https://github.com/mmeister86/" 
            target="_blank"
          >
            code
          </Link> which i store on GitHub.
        </p>

        <p>
          Write me a mail, i love getting these &lt;3 <br />
          <Link className="link-2" href="mailto:hi@matthias.lol">hi@matthias.lol</Link>
        </p>
      </div>
    </div>
  );
}

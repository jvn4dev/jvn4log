import Link from 'next/link';

export const Navbar = () => {
  return (
    <header>
      <h1>Website Title</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

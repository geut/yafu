import React from 'react' 
import { Paragraph, Anchor } from 'elems'

export default function Layout({ name, showNav = false, children }) {
  return (
    <div className="root">
      {showNav && (<nav><Anchor href="/">{name}</Anchor></nav>)}
      <main>
        {children}
      </main>
      <footer>
        <Paragraph>
          &copy; {new Date().getFullYear()} - Built with ♥︎ and{' '}
          <Anchor href={'hyper://fe84a4aab23f9939ee55c96a49f3702c8e7eee6678ec7a2742c4d317fc60240a/'}>yafu-blog</Anchor>{' '}
          by <Anchor href='https://geutstudio.com'>GEUT</Anchor>
        </Paragraph>
      </footer>
      <style jsx>{`
        nav {
          padding: calc(var(--spacing) * 3) calc(var(--spacing) * 2);                    
        }

        nav :global(a) {
          text-decoration: none;          
        }

        footer {
          background-color: var(--grey50);
          padding: calc(var(--spacing) * 3) calc(var(--spacing) * 2);
          --p-margin: 0;
        }

      `}</style>
  </div>
  )
}
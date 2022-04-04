import Head from 'next/head'
import Image from '../components/Image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import ProductList from '../components/ProductList'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
      <NavBar />
      <Sidebar />
      {/* <ProductList /> */}
      <div className={styles.container}>
        <Head>
          <title>Auction</title>
          <meta name="description" content="Auction" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}

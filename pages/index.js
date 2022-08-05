import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'

// Prerender coffeeStores and prerender with getStaticProps
import coffeeStoresData from '../data/coffee-stores.json'
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';


export async function getStaticProps(context) {

 const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props. We don't have to fetch it as we already have the data
  }
}

export default function Home(props) {

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation();

  console.log({ latLong, locationErrorMsg });

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Locating..." : "View stores nearby"} handleOnClick={handleOnBannerBtnClick} />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {/* Mapping through coffeeStores from the getStaticProps */}
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl || '/static/coffee-bg.jpeg'}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

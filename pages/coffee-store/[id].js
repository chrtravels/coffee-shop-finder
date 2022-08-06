import { useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

import { StoreContext } from "../../context/store-context";

import { isEmpty } from "../../utils";


export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('staticProps', staticProps)

  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
    return coffeeStore.id.toString() === params.id // dynamic id
  })

  // If it finds a dynamic route, return the coffee store, otherwise return empty object
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map(coffeeStore => {
    return  {
      params: {
        id: coffeeStore.id.toString(),
      },
    }
  })
  return {
    paths,
    // fallback true is very helpful if you have a lot of pages
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );

  const {
    state: { coffeeStores }
  } = useContext(StoreContext)

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
          return coffeeStore.id.toString() === id // dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);


  const { name, address, neighborhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handle Upvote");
  }

  return (
      <div className={styles.layout}>
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href='/'>
                <a>← Back to home</a>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image src={imgUrl || '/static/coffee-bg.jpeg'} width={600} height={360} className={styles.storeImg} alt={name}>
            </Image>
          </div>

          <div className={cls("glass", styles.col2)}>
            {address && (
              <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" />
              <p className={styles.text}>{address}</p>
              </div>
            )}
            {neighborhood && (
              <div className={styles.iconWrapper}>
                <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                <p className={styles.text}>{neighborhood}</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/star.svg" width="24" height="24" />
              <p className={styles.text}>1</p>
            </div>

            <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote</button>
          </div>
        </div>
      </div>
  );
};

export default CoffeeStore;

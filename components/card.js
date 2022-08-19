import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';
import styles from './card.module.css'

const card = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={cls("glass", "glass:hover", styles.container)}>
          <div>
            <div className={styles.cardHeaderWrapper}>
              <h2 className={styles.cardHeader}>{props.name}</h2>
            </div>
            <div className={styles.cardImageWrapper}>
              <Image className={styles.cardImage} alt={props.name} src={props.imgUrl} width={260} height={160} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default card;

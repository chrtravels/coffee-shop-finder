import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css'

const card = (props) => {
  return (
    <Link href={props.href}>
      <a>
        <div>
          <h2>{props.name}</h2>
          <Image src={props.imgUrl} width={260} height={160} />
        </div>
      </a>
    </Link>
  );
};

export default card;

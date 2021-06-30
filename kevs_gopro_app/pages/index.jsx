import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UploadImage
  from './components/UploadImage'
import Login from './components/Login';
import { Links } from './components/Links'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
      
      
    </div>
  )
}

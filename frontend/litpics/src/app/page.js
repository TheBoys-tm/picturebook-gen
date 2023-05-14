// import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Left card with image display */}
      <div className={styles.card}>
        <img src="kia.png" alt="Placeholder Kia" />
      </div>

      {/* Right card with text area */}
      <div className={styles.card}>
        <h2>Paste Text Here</h2>
        <textarea></textarea>
      </div>
    </div>
  )
}

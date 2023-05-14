// import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Left card with image display */}
      <div className={styles.card}>
      <img src="https://media.licdn.com/dms/image/D5603AQEYoIjdm-9o5g/profile-displayphoto-shrink_800_800/0/1676057663943?e=2147483647&v=beta&t=ixDdpyLFs3U9dWylfL2Z-1gc-6C4FSFiK5FrgdHFzWE" alt="Placeholder Kia" />
      </div>

      {/* Right card with text area */}
      <div className={styles.card}>
        <h2>Paste Text Here</h2>
        <textarea></textarea>
      </div>
    </div>
  )
}

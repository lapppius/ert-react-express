import styles from './EqualizerIcon.module.css';

export default function equalizerIcon() {
    return (
        <span className={styles.equalizerContainer}>
            <svg
                id={styles['playingBars']}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
            >
                <path
                    id={styles['bar1']}
                    d="M7 9C7 5 1 5 1 9L1 15C1 19 7 19 7 15L7 9"
                />
                <path
                    id={styles['bar2']}
                    d="M15 5C15 1 9 1 9 5L9 19C9 23 15 23 15 19L15 5"
                />
                <path
                    id={styles['bar3']}
                    d="M23 12C23 8 17 8 17 12L17 12C17 16 23 16 23 12L23 12"
                />
            </svg>
        </span>
    );
}

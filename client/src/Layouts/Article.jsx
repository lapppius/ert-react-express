import styles from './Article.module.css';

export default function Article(props) {
    return <article className={styles.article}>{props.children}</article>;
}

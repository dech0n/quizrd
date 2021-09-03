import styles from "./ContentWrap.module.css";

// this makes sure the footer STAYS IN THE RIGHT POSITION OMG
const ContentWrap = ({ children }) => {
	return <div className={styles.content_wrap}>{children}</div>;
};

export default ContentWrap;

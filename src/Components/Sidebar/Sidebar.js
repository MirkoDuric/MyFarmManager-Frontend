import React from "react";
import styles from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.welcomeBox}>
        <div className={styles.thoughtContainer}>
          <div className={styles.thoughtBubble}>
            <p>
              Dobar dan, <strong>Simke</strong>
              <br />
              Ne zaboravite pregledati nadolazeće zadatke
            </p>
          </div>
        </div>
      </div>
      <div className={styles.sidebarButtons}>
        <button className={styles.button}>Bolesti svinja</button>
        <button className={styles.button}>Vakcine</button>
        <button className={styles.button}>Lista svinja</button>
      </div>
      <div className={styles.sidebarFooter}>
        <p>&copy; 2024 My Farm Manager</p>
      </div>
    </aside>
  );
};

export default Sidebar;

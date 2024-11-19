import React, { useState, useEffect } from "react";
import styles from "../../styles/Homepage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import PodsjetnikList from "../Utils/PodsjetnikList/PodsjetnikList";
import { debounce } from "../Utils/utils-ika/debounce";
import background from "../../MyFarmManagerImg/login-perfect.webp";
import logo from "../../MyFarmManagerImg/my-farm-manager-logo-main.png";
import { FaHome, FaListUl, FaBell, FaSearch } from "react-icons/fa";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [sortCriterion, setSortCriterion] = useState("date");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/podsjetnici_za_svinje`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }
        const data = await response.json();
        setReminders(data);
        setFilteredReminders(data);
      } catch (error) {
        console.error("Error fetching reminders:", error.message);
      }
    };

    fetchReminders();
  }, []);

  const handleSearch = debounce((term) => {
    let results = [...reminders];
    if (term.trim()) {
      results = results.filter((reminder) =>
        reminder.tekst_podsjetnika.toLowerCase().includes(term.toLowerCase())
      );
    }
    results = sortReminders(results, sortCriterion);
    setFilteredReminders(results);
  }, 300);

  const handleSearchClick = () => {
    const results = reminders.filter((reminder) =>
      reminder.tekst_podsjetnika.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReminders(results);
  };

  const onSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const sortReminders = (reminders, criterion) => {
    switch (criterion) {
      case "date":
        return reminders.sort(
          (a, b) => new Date(a.datumpodsjetnika) - new Date(b.datumpodsjetnika)
        );
      case "name":
        return reminders.sort((a, b) =>
          a.tekst_podsjetnika.localeCompare(b.tekst_podsjetnika)
        );
      default:
        return reminders;
    }
  };

  const handleSortChange = (criterion) => {
    setSortCriterion(criterion);
    const sortedReminders = sortReminders([...filteredReminders], criterion);
    setFilteredReminders(sortedReminders);
  };

  return (
    <div
      className={styles.homepage}
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <img src={logo} alt="My Farm Manager Logo" className={styles.logo} />
          <h1 className={styles.title}>My Farm Manager</h1>
        </div>
        <div className={styles.profileSection}>
          <div className={styles.navigation}>
            <button className={styles.navButton}>
              <FaHome />
            </button>
            <button className={styles.navButton}>
              <FaListUl />
            </button>
            <button className={styles.navButton}>
              <FaBell />
            </button>
          </div>
          <button className={styles.logoutButton}>Log out</button>
        </div>
      </header>
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.searchBar}>
            <FaSearch
              className={styles.searchIcon}
              onClick={handleSearchClick}
            />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search reminders..."
              value={searchTerm}
              onChange={onSearchChange}
            />
            <button
              className={styles.searchButton}
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <div className={styles.sortOptions}>
            <button
              onClick={() => handleSortChange("date")}
              className={
                sortCriterion === "date"
                  ? styles.activeSortButton
                  : styles.sortButton
              }
            >
              Sort by Date
            </button>
            <button
              onClick={() => handleSortChange("name")}
              className={
                sortCriterion === "name"
                  ? styles.activeSortButton
                  : styles.sortButton
              }
            >
              Sort by Name
            </button>
          </div>
          <PodsjetnikList reminders={filteredReminders} />
        </main>
      </div>
    </div>
  );
};

export default Homepage;

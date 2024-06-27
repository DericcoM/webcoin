import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./PlayersBuy.css";
import WorkerBuy from "../../components/WorkerBuy/WorkerBuy";

function PlayersBuy({
  userID,
  setCurrentPage,
  setBuyWorkerID,
  setPreviousPage,
  lastVisiblePlayer,
  setLastVisiblePlayer,
}) {
  const buyScrollRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPageState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch players function
  const fetchPlayers = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://aylsetalinad.ru/api/get_shop/${userID}`,
        {
          params: { page, limit: 10 },
        }
      );
      const { players: newPlayers, hasMore: newHasMore } = response.data;
      setPlayers((prev) => [...prev, ...newPlayers]);
      setHasMore(newHasMore);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll handler
  const handleScroll = () => {
    if (
      buyScrollRef.current &&
      buyScrollRef.current.scrollHeight - buyScrollRef.current.scrollTop ===
        buyScrollRef.current.clientHeight
    ) {
      if (!isLoading && hasMore) {
        setCurrentPageState((prevPage) => prevPage + 1);
      }
    }
  };

  // Add scroll event listener on mount, remove on unmount
  useEffect(() => {
    const scrollContainer = buyScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoading, hasMore]);

  // Fetch players when currentPage changes
  useEffect(() => {
    fetchPlayers(currentPage);
  }, [currentPage]);

  // Scroll to lastVisiblePlayer with MutationObserver
  useEffect(() => {
    if (lastVisiblePlayer && players.length > 0) {
      const playerIndex = players.findIndex(
        (player) => player.user_id === lastVisiblePlayer
      );

      if (playerIndex !== -1) {
        const scrollToElement = () => {
          const playerElement = buyScrollRef.current.children[playerIndex];
          if (playerElement) {
            playerElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
            setLastVisiblePlayer(null); // Reset lastVisiblePlayer after scrolling
          }
        };

        const observer = new MutationObserver(() => {
          scrollToElement();
        });

        observer.observe(buyScrollRef.current, {
          childList: true,
          subtree: true,
        });

        // Ensure the scroll happens if the element is already present
        scrollToElement();

        // Clean up the observer when done
        return () => observer.disconnect();
      } else {
        setCurrentPageState((prevPage) => prevPage + 1); // Load next page if player not found
      }
    }
  }, [lastVisiblePlayer, players]);

  // Set previous page on component mount
  useEffect(() => {
    setPreviousPage("main");
  }, []);

  return (
    <div className="playersBuyContainer">
      <div className="playersBuyTitle">Worker's store</div>
      <div className="buyScrollContainer" ref={buyScrollRef}>
        {players.length === 0 && !isLoading && (
          <div className="emptyStoreMessage">The store is empty!</div>
        )}
        {players.map((player) => (
          <WorkerBuy
            key={player.id} // Ensure player.id is unique
            id={player.user_id}
            name={player.username}
            status={player.status}
            owner={player.owner}
            ownerID={player.work}
            avatar={player.img}
            price={player.price}
            setCurrentPage={setCurrentPage}
            setBuyWorkerID={setBuyWorkerID}
            player={player}
            setPreviousPage={setPreviousPage}
            setLastVisiblePlayer={setLastVisiblePlayer}
            lastVisiblePlayer={lastVisiblePlayer}
          />
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
}

export default PlayersBuy;

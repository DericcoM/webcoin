import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./PlayersBuy.css";
import WorkerBuy from "../../components/WorkerBuy/WorkerBuy";

function PlayersBuy({
  userID,
  setCurrentPage,
  setBuyWorkerID,
  setPreviousPage,
}) {
  const buyScrollRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPageState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPlayers = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://ammolin.ru/api/get_shop/${userID}`,
        {
          params: { page, limit: 10 },
        }
      );
      const { players: newPlayers, hasMore: newHasMore } = response.data;
      setPlayers((prev) => [...prev, ...newPlayers]);
      setHasMore(newHasMore);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(currentPage);
  }, [currentPage]);

  const handleScroll = () => {
    if (buyScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = buyScrollRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        setCurrentPageState((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = buyScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoading, hasMore]);
  useEffect(() => {
    setPreviousPage("main"); // Устанавливаем предыдущую страницу в "main" при монтировании компонента
  }, []);

  const adjustMainScrollHeight = () => {
    if (buyScrollRef.current) {
      const windowHeight = window.innerHeight;
      const footerHeight = 80; // Высота подвала
      const maxScrollHeight = windowHeight - footerHeight - 90; // 100 пикселей от низа
      buyScrollRef.current.style.maxHeight = `${maxScrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustMainScrollHeight();
    window.addEventListener("resize", adjustMainScrollHeight);
    return () => {
      window.removeEventListener("resize", adjustMainScrollHeight);
    };
  }, []);

  return (
    <div className="playersBuyContainer">
      <div className="playersBuyTitle">Покупка игроков</div>
      <div className="buyScrollContainer" ref={buyScrollRef}>
        {players.map((player) => (
          <WorkerBuy
            key={player.id}
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
          />
        ))}
        {isLoading && <div className="loading">Загрузка...</div>}
      </div>
    </div>
  );
}

export default PlayersBuy;

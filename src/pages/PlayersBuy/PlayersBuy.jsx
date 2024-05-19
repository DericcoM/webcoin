import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./PlayersBuy.css";
import WorkerBuy from "../../components/WorkerBuy/WorkerBuy";

function PlayersBuy({ setCurrentPage, setBuyWorkerID, setPreviusPage }) {
  const buyScrollRef = useRef(null);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Ева Ефимома",
      status: "worked",
      owner: "Fierro",
      ownerID: 123,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 2,
      name: "Petya Klyukvin",
      status: "worked",
      owner: "Nikita",
      ownerID: 11235,
      avatar: "../../assets/buyWorker2.png",
      price: 5000,
    },
    {
      id: 3,
      name: "Rules of life",
      status: "free",
      owner: "",
      ownerID: 0,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 4,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 999999,
    },
    {
      id: 5,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 1245534,
    },
    {
      id: 6,
      name: "Ева Ефимома",
      status: "worked",
      owner: "Fierro",
      ownerID: 123,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 7,
      name: "Petya Klyukvin",
      status: "worked",
      owner: "Nikita",
      ownerID: 11235,
      avatar: "../../assets/buyWorker2.png",
      price: 5000,
    },
    {
      id: 8,
      name: "Rules of life",
      status: "free",
      owner: "",
      ownerID: 0,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 9,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 999999,
    },
    {
      id: 10,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 1245534,
    },
    {
      id: 11,
      name: "Ева Ефимома",
      status: "worked",
      owner: "Fierro",
      ownerID: 123,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 12,
      name: "Petya Klyukvin",
      status: "worked",
      owner: "Nikita",
      ownerID: 11235,
      avatar: "../../assets/buyWorker2.png",
      price: 5000,
    },
    {
      id: 13,
      name: "Rules of life",
      status: "free",
      owner: "",
      ownerID: 0,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 14,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 999999,
    },
    {
      id: 15,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 1245534,
    },
    {
      id: 16,
      name: "Ева Ефимома",
      status: "worked",
      owner: "Fierro",
      ownerID: 123,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 17,
      name: "Petya Klyukvin",
      status: "worked",
      owner: "Nikita",
      ownerID: 11235,
      avatar: "../../assets/buyWorker2.png",
      price: 5000,
    },
    {
      id: 18,
      name: "Rules of life",
      status: "free",
      owner: "",
      ownerID: 0,
      avatar: "../../assets/buyWorker1.png",
      price: 5000,
    },
    {
      id: 19,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 999999,
    },
    {
      id: 20,
      name: "Катя Сидорова",
      status: "worked",
      owner: "Thomas Vien",
      ownerID: 1,
      avatar: "../../assets/buyWorker3.png",
      price: 1245534,
    },
  ]);
  const [currentPage, setCurrentPageState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //   const fetchPlayers = async (page) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(`http://localhost:3100/players`, {
  //         params: { page, limit: 10 },
  //       });
  //       const { players: newPlayers, hasMore: newHasMore } = response.data;
  //       setPlayers((prev) => [...prev, ...newPlayers]);
  //       setHasMore(newHasMore);
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchPlayers(currentPage);
  //   }, [currentPage]);

  //   const handleScroll = () => {
  //     if (buyScrollRef.current) {
  //       const { scrollTop, scrollHeight, clientHeight } = buyScrollRef.current;
  //       if (
  //         scrollTop + clientHeight >= scrollHeight - 100 &&
  //         !isLoading &&
  //         hasMore
  //       ) {
  //         setCurrentPageState((prevPage) => prevPage + 1);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     const scrollContainer = buyScrollRef.current;
  //     if (scrollContainer) {
  //       scrollContainer.addEventListener("scroll", handleScroll);
  //       return () => {
  //         scrollContainer.removeEventListener("scroll", handleScroll);
  //       };
  //     }
  //   }, [isLoading, hasMore]);
  useEffect(() => {
    setPreviusPage("main"); // Устанавливаем предыдущую страницу в "main" при монтировании компонента
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
            id={player.id}
            name={player.name}
            status={player.status}
            owner={player.owner}
            ownerID={player.ownerID}
            avatar={player.avatar}
            price={player.price}
            setCurrentPage={setCurrentPage}
            setBuyWorkerID={setBuyWorkerID}
            player={player}
            setPreviusPage={setPreviusPage}
          />
        ))}
        {isLoading && <div className="loading">Загрузка...</div>}
      </div>
    </div>
  );
}

export default PlayersBuy;

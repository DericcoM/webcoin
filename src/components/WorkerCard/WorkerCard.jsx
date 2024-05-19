import React, { useEffect, useState } from "react";
import "./WorkerCard.css";

function WorkerCard({ userData, setCurrentPage, setWorkerID }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch player data
    fetchPlayerData().then((data) => {
      setPlayers(data);
    });
  }, []);

  const fetchPlayerData = async () => {
    return [
      {
        id: 1,
        name: "Илья Коломин",
        price: 5000,
        avatar: "../../assets/worker1.png",
        status: "Работает на Fierro",
      },
      {
        id: 2,
        name: "Sunny day",
        price: 1000,
        avatar: "../../assets/worker2.png",
        status: "Работает на Nikita",
      },
      {
        id: 3,
        name: "Sunny day",
        price: 3000,
        avatar: "../../assets/worker3.png",
        status: "Работает на Nikita",
      },
      {
        id: 4,
        name: "Ford",
        price: 11200,
        avatar: "../../assets/worker2.png",
        status: "Работает на Nikita",
      },
      {
        id: 5,
        name: "Alice",
        price: 1240,
        avatar: "../../assets/worker3.png",
        status: "Работает на Nikita",
      },
      {
        id: 1,
        name: "Илья Коломин",
        price: 5000,
        avatar: "../../assets/worker1.png",
        status: "Работает на Fierro",
      },
      {
        id: 2,
        name: "Sunny day",
        price: 1000,
        avatar: "../../assets/worker2.png",
        status: "Работает на Nikita",
      },
      {
        id: 3,
        name: "Sunny day",
        price: 3000,
        avatar: "../../assets/worker3.png",
        status: "Работает на Nikita",
      },
      {
        id: 4,
        name: "Ford",
        price: 11200,
        avatar: "../../assets/worker2.png",
        status: "Работает на Nikita",
      },
      {
        id: 5,
        name: "Alice",
        price: 1240,
        avatar: "../../assets/worker3.png",
        status: "Работает на Nikita",
      },
    ];
  };

  const chunkedPlayers = players.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  if (!players || players.length === 0) {
    return (
      <div className="workers">
        <div className="noWorkersContainer">
          <div className="bigDoubleCoin">
            <img
              className="bigDoubleCoinImage"
              src="assets/bigDoubleCoin.png"
              alt=""
            />
          </div>
          <div className="noWorkersText">
            <div className="noWorkersTitle">У вас нет работников.</div>
            <div className="noWorkersButtons">
              <div className="noWorkerButton">
                <div className="noWorkerButtonContainer">
                  <div className="mainRefQrSVG"></div>
                </div>
              </div>
              <div className="noWorkerButton">
                <div className="noWorkerButtonContainer">
                  <div className="mainRefShareSVG"></div>
                </div>
              </div>
            </div>
            <div className="noWorkersSubTittle">
              Пригласи друзей по реферальной ссылке, чтобы начать зарабатывать.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workers">
      {chunkedPlayers.map((chunk, index) => (
        <div key={index} className="workerRow">
          {chunk.map((player) => (
            <div
              key={player.id}
              className="workerCard"
              onClick={() => {
                setCurrentPage("worker");
                setWorkerID(player.id);
              }}
            >
              <div className="workerAvatar">
                <img className="workerAvatarIMG" src={player.avatar} alt="" />
              </div>
              <div className="workerName">{player.name}</div>
              <div className="workerPrice">{player.price}/min</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WorkerCard;

import axios from "axios";
import {
	useEffect,
	useState,
} from "react";

import { ReactComponent as DiceOutlined } from "../../assets/icon-dice.svg";
import styles from "./style.module.scss";

type Advice = {
  advice: string;
  id: number;
};

const Card = () => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(false);

  const singleAdviceFetch = async () => {
    const response = await axios.get(
      `https://api.adviceslip.com/advice/${advice!.id + 1}`
    );
    setAdvice(response.data.slip);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      if (response.data.slip.id === advice?.id) {
        singleAdviceFetch();
      } else {
        setAdvice(response.data.slip);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {advice !== null && (
        <section className={styles.card}>
          <h1 className={styles.neonText}>Advice #{advice?.id}</h1>
          <q className={styles.advice}>{advice?.advice}</q>
          <div className={styles.divider}></div>
          {loading ? null : (
            <div className={styles.icon} onClick={fetchData}>
              <DiceOutlined />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Card;

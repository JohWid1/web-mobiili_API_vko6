import { useState, useEffect } from 'react';

const card_url = 'https://api.scryfall.com/cards/random'

const useRandomCard = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRandomCard = async () => {
    try {
      const response = await fetch(card_url, {
        headers: {
          'User-Agent': 'vko6cardAPI',
          'Accept': 'application/json',
        },
      });

      
      if (response.ok) {
        const data = await response.json();
        setCard(data);
        setLoading(false);
      } else {
        if (response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError('Unknown error');
        }
        setLoading(false);
      }
    } catch (err) {
      setError({err});
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getRandomCard();
  }, []);

  return { card, loading, error, getRandomCard };
};

export default useRandomCard;
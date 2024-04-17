import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  picturesIds: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export default function FavoritesContextProvider({ children }) {
  const [picturesIds, setPicturesIds] = useState([]);

  const addFavorite = (id) => {
    setPicturesIds((currentIds) => [...currentIds, id]);
  };

  const removeFavorite = (id) => {
    setPicturesIds((currentIds) =>
      currentIds.filter((currentId) => currentId !== id)
    );
  };

  const value = {
    picturesIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

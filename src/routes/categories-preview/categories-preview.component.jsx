import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  // initial value of categoryMap is {} => Object.keys(categoryMap) is undefined
  const { categoriesMap } = useContext(CategoriesContext);

  if (Object.keys(categoriesMap)) {
    return (
      <>
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
      </>
    );
  } else {
    return <h1>Loading Items</h1>;
  }
};

export default CategoriesPreview;

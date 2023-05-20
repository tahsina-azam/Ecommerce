import { useEffect, useState } from "react";
// import Checkbox from "./form-builder/checkbox";

// data
import productsTypes from "@/utils/data/products-types";
import { Checkbox } from "@mantine/core";
import { useRouter } from "next/router";

const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();
  const existingFilter = router.query.filter as string;

  const addQueryParams = () => {
    // query params changes
  };

  const handleFilter = (checked: boolean, type: string) => {
    if (checked) {
      setFilter(type);
      router.push({
        pathname: router.pathname,
        query: { filter: type.toLowerCase() },
      });
    }
  };

  useEffect(() => {
    if (!existingFilter && filter) {
      setFilter("");
    }
  }, [existingFilter]);

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {productsTypes.map((type) => (
              <Checkbox
                className="my-2"
                key={type.id}
                color="dark"
                checked={filter == type.name}
                onChange={(event) =>
                  handleFilter(event.currentTarget.checked, type.name)
                }
                label={type.name}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;

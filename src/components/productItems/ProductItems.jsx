import { UseSoppingCartContext } from "../../context/UseShoppingCartContext";
import icon from "./../../assets/images/icon-add-to-cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function ProductItems({ product }) {
  const { handleIncreaseQty, getProductQty, handleDecreaseQty } =
    UseSoppingCartContext();

  return (
    <>
      <div className="flex flex-col h-72 gap-5 rounded-lg relative min-[1440px]:mb-6">
        <picture className=" h-[80%] overflow-hidden">
          <source media="(max-width: 799px)" srcSet={product.mobile_url} />
          <img
            className={`w-full h-full rounded-lg ${
              getProductQty(product.id) !== 0
                ? "border border-[var(--Red)] border-2"
                : ""
            }`}
            src={product.desktop_url}
            alt={product.name}
          />
        </picture>

        {getProductQty(product.id) === 0 ? (
          <button
            className=" w-40 flex justify-center items-center hover:text-[var(--Red)] absolute border border-[var(--Rose-500)] right-[24%] top-[65%]  bg-[var(--Rose-50)] px-6 py-2 rounded-full font-medium text-sm gap-1 min-[375px]:right-[25%] min-[425px]:right-[27%] min-[768px]:right-[25%] min-[768px]:top-[66%] min-[799px]:right-[16%]  min-[1440px]:right-[20%]"
            onClick={() => handleIncreaseQty(product.id)}
          >
            <span>
              <img src={icon} alt="icon" />
            </span>
            Add to Cart
          </button>
        ) : (
          <button className="w-40 flex justify-between items-center cursor-default bg-[var(--Red)] absolute border border-[var(--Rose-500)] right-[24%] top-[65%]  text-[var(--Rose-50)] px-2 py-2 rounded-full font-medium text-sm gap-1 min-[375px]:right-[25%] min-[425px]:right-[27%] min-[768px]:right-[25%] min-[768px]:top-[66%] min-[799px]:right-[16%]  min-[1440px]:right-[20%]">
            <span
              className="border cursor-pointer rounded-full border-[var(--Rose-50)] w-5 h-5 flex justify-center items-center hover:bg-[var(--Rose-50)] hover:text-[var(--Red)] transition-all duration-200 "
              onClick={() => handleIncreaseQty(product.id)}
            >
              {<FontAwesomeIcon icon={faPlus} />}
            </span>
            <span className="font-light ">{getProductQty(product.id)}</span>
            <span
              className="border cursor-pointer rounded-full border-[var(--Rose-50)] w-5 h-5 flex justify-center items-center hover:bg-[var(--Rose-50)] hover:text-[var(--Red)] transition-all duration-200 "
              onClick={() => handleDecreaseQty(product.id)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </button>
        )}

        <div className=" text-sm grid gap-1 h-[20%]">
          <p className="text-[var(--Rose-400)] font-medium">
            {product.category}
          </p>
          <h3 className="font-bold">{product.name}</h3>
          <h4 className="text-[var(--Red)] font-bold text-lg">
            ${product.price}
          </h4>
        </div>
      </div>
    </>
  );
}

export default ProductItems;

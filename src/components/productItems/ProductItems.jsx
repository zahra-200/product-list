import styled from "./productItems.module.css";
import icon from "./../../assets/images/icon-add-to-cart.svg";

function ProductItems(props) {
  return (
    <>
      <div className={styled.cartContainer}>
        <picture>
          <source
            media="(max-width: 799px)"
            srcSet={props.product.image.mobile}
          />
          <source
            media="(max-width: 1280px)"
            srcSet={props.product.image.tablet}
          />
          <img src={props.product.image.desktop} alt={props.product.name} />
        </picture>

        <button>
          <span>
            <img src={icon} alt="icon" />
          </span>
          Add to cart
        </button>
        <div className={styled.title}>
          <p>{props.product.category}</p>
          <h3>{props.product.name}</h3>
          <h4>${props.product.price}</h4>
        </div>
      </div>
    </>
  );
}

export default ProductItems;

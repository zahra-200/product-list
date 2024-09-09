import ProductList from "../../components/productList/ProductList";
import styled from "./homePage.module.css";
function HomePage() {
    return(
        <div className={styled.container}>
        <div><ProductList /> </div>
        <div></div>
        
        </div>
    )
}

export default HomePage;
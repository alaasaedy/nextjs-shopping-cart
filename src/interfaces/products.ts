export interface Products {
  products: {
    id: number;
    title: string;
    image: string;
    price: string;
  }[];
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
}

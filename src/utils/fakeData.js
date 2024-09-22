import axios from "axios";

const getallProducts = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    const products = res.data.products;
    const fakeData = [];
    products.map((product) => {
      fakeData.push({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        availabilityStatus: product.availabilityStatus,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags.map((tag) => tag),
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        dimensions: product.dimensions,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        reviews: product.reviews.map((review) => review),
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        meta: product.meta,
        images: [product.images.map((image) => image)],
        thumbnail: product.thumbnail,
      });
    });

    // prinitng the fake products
    for (let i = 0; i < fakeData.length; i++) {
      console.log(fakeData[i]);
    }
    return fakeData;
  } catch (error) {}
};

getallProducts();

import fs from "fs";
import classes from "@styles/gallery.module.css";
import path from "path";

const GetPortfolio = ({ params }) => {
  const pathname = params.category;
  const directoryPath = path.join(
    process.cwd(),
    `public/assets/img/${pathname}`
  );

  const files = fs.readdirSync(directoryPath);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  console.log(files);
  const images = imageFiles.map((file, index) => ({
    id: index,
    src: `/assets/img/${pathname}/${file}`,
    alt: file.split(".")[0],
  }));

  return (
    <main>
      <header className={classes.container_header}>
        <h2>{pathname}</h2>
      </header>
      <section className={classes.container_grid}>
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id}>
              <img src={image.src} alt={image.alt} />{" "}
              {/* Adjust width and height as needed */}
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </section>
    </main>
  );
};

export default GetPortfolio;

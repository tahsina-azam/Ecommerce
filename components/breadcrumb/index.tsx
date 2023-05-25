import Link from "next/link";

const Breadcrumb = ({ path = "All Products" }: { path?: string }) => (
  <section className="breadcrumb">
    <div className="container">
      <ul className="breadcrumb-list">
        <li>
          <Link href="/">
            <i className="icon-home"></i>
          </Link>
        </li>
        <li>{path}</li>
      </ul>
    </div>
  </section>
);

export default Breadcrumb;
